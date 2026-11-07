// Aba Atividade: dados ao vivo do GitHub, buscados só quando a aba é aberta.
// - Perfil e repositórios: API pública do GitHub (sem token, limite de 60 consultas por hora).
// - Gráfico de contribuições: github-contributions-api.jogruber.de, que lê o mesmo calendário
//   do perfil, um ano inteiro por vez. Se ele não responder, o gráfico usa os eventos públicos dos últimos 90 dias.
// Tudo fica guardado no navegador por 30 minutos (as linguagens e os anos que já acabaram, por 24 horas)
// para não gastar o limite da API.
// O gráfico abre no ano atual e tem um botão para cada ano desde 2016; anos sem commits aparecem vazios.

const ATIVIDADE = {
	usuario: "ravelroot",
	validade: 30 * 60 * 1000,
	validadeAnoAtual: 5 * 60 * 1000,
	validadeLinguagens: 24 * 60 * 60 * 1000,
	chaveCache: "atividade-github-v2",
	chaveCacheAnos: "atividade-github-anos-v2",
	// Primeiro ano com botão no gráfico (o calendário começa em 1º de janeiro dele).
	anoInicial: 2016,
	reposRecentes: 5,
	linguagensVisiveis: 8,
	reposOcultos: ["ravelroot.github.io", "ravelroot"]
};

const API_GITHUB = "https://api.github.com";
const API_CONTRIBUICOES = "https://github-contributions-api.jogruber.de/v4/";

async function buscarJson(url) {
	const resposta = await fetch(url);
	if (!resposta.ok) throw new Error(`HTTP ${resposta.status} em ${url}`);
	return resposta.json();
}

function lerCacheAtividade() {
	try {
		return JSON.parse(localStorage.getItem(ATIVIDADE.chaveCache)) || null;
	} catch (erro) {
		return null;
	}
}

function salvarCacheAtividade(dados) {
	try {
		localStorage.setItem(ATIVIDADE.chaveCache, JSON.stringify(dados));
	} catch (erro) {}
}

/* ---------- Datas ---------- */

function dataLocal(texto) {
	const [ano, mes, dia] = texto.split("-").map(Number);
	return new Date(ano, mes - 1, dia);
}

function textoData(data) {
	const mes = String(data.getMonth() + 1).padStart(2, "0");
	const dia = String(data.getDate()).padStart(2, "0");
	return `${data.getFullYear()}-${mes}-${dia}`;
}

function tempoRelativo(iso) {
	const formato = new Intl.RelativeTimeFormat(I18n.locale(), { numeric: "auto" });
	let valor = (Date.parse(iso) - Date.now()) / 1000;
	const unidades = [[60, "second"], [60, "minute"], [24, "hour"], [7, "day"], [4.345, "week"], [12, "month"], [Infinity, "year"]];
	for (const [tamanho, unidade] of unidades) {
		if (Math.abs(valor) < tamanho) return formato.format(Math.round(valor), unidade);
		valor /= tamanho;
	}
	return "";
}

/* ---------- Busca ---------- */

async function buscarPerfilERepos() {
	const [perfil, repos] = await Promise.all([
		buscarJson(`${API_GITHUB}/users/${ATIVIDADE.usuario}`),
		buscarJson(`${API_GITHUB}/users/${ATIVIDADE.usuario}/repos?per_page=100&sort=pushed`)
	]);
	const proprios = repos.filter((repo) => !repo.fork && !repo.archived);
	return {
		perfil: { repositorios: perfil.public_repos, seguidores: perfil.followers, url: perfil.html_url, criadoEm: perfil.created_at },
		repos: proprios.map((repo) => ({
			nome: repo.name,
			url: repo.html_url,
			descricao: repo.description || "",
			linguagem: repo.language || "",
			atualizado: repo.pushed_at
		}))
	};
}

async function buscarLinguagens(repos) {
	const contas = await Promise.allSettled(
		repos.map((repo) => buscarJson(`${API_GITHUB}/repos/${ATIVIDADE.usuario}/${repo.nome}/languages`))
	);
	const total = {};
	const presenca = {};
	let falhou = false;
	contas.forEach((conta) => {
		if (conta.status !== "fulfilled") {
			falhou = true;
			return;
		}
		Object.entries(conta.value).forEach(([nome, bytes]) => {
			total[nome] = (total[nome] || 0) + bytes;
			presenca[nome] = (presenca[nome] || 0) + 1;
		});
	});

	// Sem os bytes de todos os repositórios, a proporção ficaria torta: conta a linguagem principal de cada um.
	if (falhou || !Object.keys(total).length) {
		const porRepo = {};
		repos.forEach((repo) => {
			if (repo.linguagem) porRepo[repo.linguagem] = (porRepo[repo.linguagem] || 0) + 1;
		});
		return { fonte: "repos", itens: Object.entries(porRepo).map(([nome, valor]) => ({ nome, valor, repos: valor })) };
	}
	return { fonte: "bytes", itens: Object.entries(total).map(([nome, valor]) => ({ nome, valor, repos: presenca[nome] })) };
}

// O gráfico abre no ano atual, de 1º de janeiro até hoje.
async function buscarContribuicoes() {
	try {
		return await buscarContribuicoesDoAno(new Date().getFullYear());
	} catch (erro) {
		return buscarContribuicoesPorEventos();
	}
}

// O ano inteiro, de 1º de janeiro a 31 de dezembro. Dia sem dado (antes da conta existir ou sem commits) fica zerado.
function anoCompleto(ano, porData = {}) {
	const hoje = textoData(new Date());
	const dias = [];
	for (let data = new Date(ano, 0, 1, 12); data.getFullYear() === ano; data.setDate(data.getDate() + 1)) {
		const chave = textoData(data);
		const dia = porData[chave];
		dias.push({ data: chave, total: dia ? dia.count : 0, nivel: dia ? dia.level : 0, futuro: chave > hoje });
	}
	return { fonte: "ano", ano, dias, total: dias.reduce((soma, dia) => soma + dia.total, 0) };
}

function lerCacheAnos() {
	try {
		return JSON.parse(localStorage.getItem(ATIVIDADE.chaveCacheAnos)) || {};
	} catch (erro) {
		return {};
	}
}

// Anos anteriores à criação da conta não têm o que buscar: o calendário vem vazio, sem gastar consulta.
async function buscarContribuicoesDoAno(ano, anoCriacao) {
	if (anoCriacao && ano < anoCriacao) return anoCompleto(ano);
	const anoAtual = new Date().getFullYear();
	const validade = ano < anoAtual ? ATIVIDADE.validadeLinguagens : ATIVIDADE.validadeAnoAtual;
	const anos = lerCacheAnos();
	if (anos[ano] && Date.now() - anos[ano].quando < validade) return anos[ano].contribuicoes;

	const dados = await buscarJson(`${API_CONTRIBUICOES}${ATIVIDADE.usuario}?y=${ano}`);
	const porData = {};
	(dados.contributions || []).forEach((dia) => {
		if (dia.date && dia.date.startsWith(`${ano}-`)) porData[dia.date] = dia;
	});
	const contribuicoes = anoCompleto(ano, porData);
	if (dados.total && typeof dados.total[ano] === "number") contribuicoes.total = dados.total[ano];
	anos[ano] = { quando: Date.now(), contribuicoes };
	try {
		localStorage.setItem(ATIVIDADE.chaveCacheAnos, JSON.stringify(anos));
	} catch (erro) {}
	return contribuicoes;
}

// Anos com botão no gráfico, do atual até 2016, mesmo os que não tiveram nenhum commit.
function anosDisponiveis() {
	const anoAtual = new Date().getFullYear();
	const anos = [];
	for (let ano = anoAtual; ano >= Math.min(ATIVIDADE.anoInicial, anoAtual); ano--) anos.push(ano);
	return anos;
}

async function buscarContribuicoesPorEventos() {
	const eventos = await buscarJson(`${API_GITHUB}/users/${ATIVIDADE.usuario}/events/public?per_page=100`);
	const porDia = {};
	eventos.forEach((evento) => {
		const dia = textoData(new Date(evento.created_at));
		porDia[dia] = (porDia[dia] || 0) + 1;
	});
	const dias = [];
	const hoje = new Date();
	for (let atras = 90; atras >= 0; atras--) {
		const data = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate() - atras);
		const chave = textoData(data);
		dias.push({ data: chave, total: porDia[chave] || 0, nivel: 0 });
	}
	const maximo = Math.max(1, ...dias.map((dia) => dia.total));
	dias.forEach((dia) => {
		dia.nivel = dia.total === 0 ? 0 : Math.min(4, Math.ceil((dia.total / maximo) * 4));
	});
	return { fonte: "eventos", dias, total: dias.reduce((acumulado, dia) => acumulado + dia.total, 0) };
}

async function carregarDadosGithub() {
	const salvo = lerCacheAtividade();
	if (salvo && Date.now() - salvo.quando < ATIVIDADE.validade) {
		try {
			salvo.contribuicoes = await buscarContribuicoesDoAno(new Date().getFullYear());
		} catch (erro) {}
		return salvo;
	}

	const [base, contribuicoes] = await Promise.allSettled([buscarPerfilERepos(), buscarContribuicoes()]);
	const dados = { quando: Date.now(), desatualizado: false };

	if (base.status === "fulfilled") {
		dados.perfil = base.value.perfil;
		dados.repos = base.value.repos;
		// Contar as linguagens custa uma consulta por repositório: reaproveita a conta do dia se nada mudou.
		const assinatura = base.value.repos.map((repo) => repo.nome).sort().join(",");
		const linguagensValidas = salvo && salvo.linguagens && salvo.linguagens.fonte === "bytes"
			&& salvo.assinatura === assinatura && Date.now() - salvo.quandoLinguagens < ATIVIDADE.validadeLinguagens;
		if (linguagensValidas) {
			dados.linguagens = salvo.linguagens;
			dados.quandoLinguagens = salvo.quandoLinguagens;
		} else {
			dados.linguagens = await buscarLinguagens(base.value.repos);
			dados.quandoLinguagens = Date.now();
		}
		dados.assinatura = assinatura;
	} else if (salvo && salvo.repos) {
		dados.perfil = salvo.perfil;
		dados.repos = salvo.repos;
		dados.linguagens = salvo.linguagens;
		dados.quandoLinguagens = salvo.quandoLinguagens;
		dados.assinatura = salvo.assinatura;
		dados.desatualizado = true;
	}

	if (contribuicoes.status === "fulfilled") dados.contribuicoes = contribuicoes.value;
	else if (salvo && salvo.contribuicoes) {
		dados.contribuicoes = salvo.contribuicoes;
		dados.desatualizado = true;
	}

	if (!dados.repos && !dados.contribuicoes) throw new Error("GitHub indisponível");
	if (dados.desatualizado) dados.quando = salvo.quando;
	else salvarCacheAtividade(dados);
	return dados;
}

/* ---------- Dica flutuante (gráfico e barras) ---------- */

function prepararDicas() {
	const dica = criar("div", "dica");
	dica.setAttribute("role", "tooltip");
	dica.hidden = true;
	document.body.append(dica);

	const mostrar = (alvo) => {
		dica.textContent = alvo.dataset.dica;
		dica.hidden = false;
		const caixa = alvo.getBoundingClientRect();
		const largura = dica.offsetWidth;
		const esquerda = Math.min(Math.max(caixa.left + caixa.width / 2 - largura / 2, 8), window.innerWidth - largura - 8);
		let topo = caixa.top - dica.offsetHeight - 8;
		if (topo < 8) topo = caixa.bottom + 8;
		dica.style.left = `${esquerda}px`;
		dica.style.top = `${topo}px`;
	};
	const esconder = () => {
		dica.hidden = true;
	};

	const painel = document.getElementById("painel-atividade");
	painel.addEventListener("mouseover", (evento) => {
		const alvo = evento.target.closest("[data-dica]");
		if (alvo) mostrar(alvo);
		else esconder();
	});
	painel.addEventListener("focusin", (evento) => {
		const alvo = evento.target.closest("[data-dica]");
		if (alvo) mostrar(alvo);
	});
	painel.addEventListener("mouseleave", esconder);
	painel.addEventListener("focusout", esconder);
	window.addEventListener("scroll", esconder, { passive: true });
}

/* ---------- Montagem ---------- */

function sequencias(dias) {
	let maior = 0;
	let corrente = 0;
	dias.forEach((dia) => {
		corrente = dia.total > 0 ? corrente + 1 : 0;
		maior = Math.max(maior, corrente);
	});
	// Hoje ainda não acabou: um dia vazio hoje não quebra a sequência.
	let atual = 0;
	let indice = dias.length - 1;
	if (indice >= 0 && dias[indice].total === 0) indice--;
	while (indice >= 0 && dias[indice].total > 0) {
		atual++;
		indice--;
	}
	return { atual, maior };
}

function tamanhoArquivo(bytes) {
	const kb = bytes / 1024;
	return kb >= 1024 ? `${I18n.decimal(kb / 1024)} MB` : `${I18n.decimal(kb)} KB`;
}

function textoQuantidade(contribuicoes, total) {
	if (contribuicoes.fonte !== "eventos") return total === 0 ? I18n.t("atividade.nenhumaContribuicao") : I18n.tn("atividade.contribuicoes", total);
	return total === 0 ? I18n.t("atividade.nenhumaAtividade") : I18n.tn("atividade.atividades", total);
}

function dataDoDia(texto) {
	return I18n.data(dataLocal(texto), { weekday: "short", day: "numeric", month: "short", year: "numeric" });
}

function criarNumero(rotulo, valor, detalhe) {
	const bloco = criar("div", "numero");
	bloco.append(criar("p", "numero-rotulo", rotulo));
	bloco.append(criar("p", "numero-valor", valor));
	if (detalhe) bloco.append(criar("p", "numero-detalhe", detalhe));
	return bloco;
}

function montarCalendario(contribuicoes) {
	const { dias } = contribuicoes;
	const primeiro = dataLocal(dias[0].data);
	const vazios = primeiro.getDay();
	const semanas = Math.ceil((vazios + dias.length) / 7);

	const rolagem = criar("div", "calendario-rolagem");
	const calendario = criar("div", "calendario");
	calendario.style.setProperty("--semanas", semanas);

	const meses = criar("div", "calendario-meses");
	meses.setAttribute("aria-hidden", "true");
	let ultimaColuna = -3;
	let primeiroRotulo = true;
	dias.forEach((dia, indice) => {
		const data = dataLocal(dia.data);
		if (data.getDate() !== 1 && indice !== 0) return;
		const coluna = Math.floor((vazios + indice) / 7);
		if (indice === 0 && data.getDate() > 14) return;
		if (coluna - ultimaColuna < 3) return;
		ultimaColuna = coluna;
		let nome = I18n.nomeMes(data.getMonth(), "short");
		if (primeiroRotulo || data.getMonth() === 0) nome += ` ${data.getFullYear()}`;
		primeiroRotulo = false;
		const rotulo = criar("span", "", nome);
		rotulo.style.gridColumn = `${coluna + 2} / span ${Math.max(1, Math.min(3, semanas - coluna))}`;
		meses.append(rotulo);
	});

	const corpo = criar("div", "calendario-corpo");
	corpo.setAttribute("role", "img");
	corpo.tabIndex = 0;
	const ativos = dias.filter((dia) => dia.total > 0).length;
	const totalTexto = contribuicoes.fonte !== "eventos"
		? I18n.tn("atividade.contribuicoes", contribuicoes.total)
		: I18n.tn("atividade.atividadesPublicas", contribuicoes.total);
	corpo.setAttribute("aria-label", I18n.t("atividade.graficoRotulo", { total: totalTexto, dias: I18n.tn("atividade.dias", ativos) }));
	for (let linha = 0; linha < 7; linha++) {
		corpo.append(criar("span", "calendario-dia-semana", linha % 2 === 1 ? I18n.nomeDiaSemana(linha) : ""));
	}
	for (let i = 0; i < vazios; i++) corpo.append(criar("span", "celula celula-vazia"));
	dias.forEach((dia) => {
		if (dia.futuro) {
			corpo.append(criar("span", "celula celula-futura"));
			return;
		}
		const celula = criar("span", "celula");
		celula.dataset.nivel = dia.nivel;
		celula.dataset.dica = `${textoQuantidade(contribuicoes, dia.total)} · ${dataDoDia(dia.data)}`;
		corpo.append(celula);
	});

	calendario.append(meses, corpo);
	rolagem.append(calendario);
	return rolagem;
}

function montarLegendaCalendario() {
	const legenda = criar("div", "calendario-legenda");
	legenda.setAttribute("aria-hidden", "true");
	legenda.append(criar("span", "", I18n.t("atividade.menos")));
	for (let nivel = 0; nivel <= 4; nivel++) {
		const amostra = criar("span", "celula");
		amostra.dataset.nivel = nivel;
		legenda.append(amostra);
	}
	legenda.append(criar("span", "", I18n.t("atividade.mais")));
	return legenda;
}

function preencherContribuicoes(corpo, dados, contribuicoes) {
	corpo.replaceChildren();
	corpo.removeAttribute("aria-busy");

	const numeros = criar("div", "numeros");
	if (contribuicoes) {
		const passados = contribuicoes.dias.filter((dia) => !dia.futuro);
		const { atual, maior } = sequencias(passados);
		if (contribuicoes.fonte === "ano") {
			numeros.append(criarNumero(I18n.t("atividade.contribuicoesEm", { ano: contribuicoes.ano }), I18n.numero(contribuicoes.total)));
			numeros.append(criarNumero(I18n.t("atividade.diasComContribuicoes"), I18n.numero(passados.filter((dia) => dia.total > 0).length)));
		} else {
			numeros.append(criarNumero(I18n.t("atividade.atividades90"), I18n.numero(contribuicoes.total)));
			numeros.append(criarNumero(I18n.t("atividade.sequenciaAtual"), I18n.tn("atividade.dias", atual)));
		}
		numeros.append(criarNumero(I18n.t("atividade.maiorSequencia"), I18n.tn("atividade.dias", maior)));
	}
	if (dados.perfil) numeros.append(criarNumero(I18n.t("atividade.repositoriosPublicos"), I18n.numero(dados.perfil.repositorios)));
	corpo.append(numeros);

	if (!contribuicoes) {
		corpo.append(criar("p", "atividade-aviso", I18n.t("atividade.semGrafico")));
		return;
	}

	corpo.append(montarCalendario(contribuicoes));
	const rodape = criar("div", "calendario-rodape");
	const formatoPeriodo = { day: "numeric", month: "short", year: "numeric" };
	const passados = contribuicoes.dias.filter((dia) => !dia.futuro);
	const inicio = I18n.data(dataLocal(contribuicoes.dias[0].data), formatoPeriodo);
	const fim = I18n.data(dataLocal(passados[passados.length - 1].data), formatoPeriodo);
	let nota;
	if (contribuicoes.fonte === "ano" && passados.length < contribuicoes.dias.length) {
		nota = I18n.t("atividade.notaAteHoje", { inicio });
	} else if (contribuicoes.fonte === "ano") {
		nota = I18n.t("atividade.notaAno", { inicio, fim });
	} else {
		nota = I18n.t("atividade.notaEventos", { inicio, fim });
	}
	rodape.append(criar("p", "calendario-nota", nota));
	rodape.append(montarLegendaCalendario());
	corpo.append(rodape);
	desenharCidade(contribuicoes);
	requestAnimationFrame(() => rolarCalendario(corpo));
}

function montarSeletorDeAnos(dados, corpo) {
	const anos = anosDisponiveis();
	if (anos.length < 2) return null;
	const anoCriacao = dados.perfil && dados.perfil.criadoEm ? Number(dados.perfil.criadoEm.slice(0, 4)) : null;

	const grupo = criar("div", "anos");
	grupo.setAttribute("role", "group");
	grupo.setAttribute("aria-label", I18n.t("atividade.periodo"));
	let pedido = 0;

	// O ano atual já vem carregado com a aba; os outros são buscados no clique.
	anos.forEach((ano, indice) => {
		const botao = criar("button", "ano", String(ano));
		botao.type = "button";
		botao.setAttribute("aria-pressed", indice === 0 ? "true" : "false");
		botao.addEventListener("click", () => {
			if (botao.getAttribute("aria-pressed") === "true") return;
			grupo.querySelectorAll(".ano").forEach((item) => item.setAttribute("aria-pressed", item === botao ? "true" : "false"));
			const meu = ++pedido;
			if (dados.contribuicoes && dados.contribuicoes.fonte === "ano" && dados.contribuicoes.ano === ano) {
				preencherContribuicoes(corpo, dados, dados.contribuicoes);
				return;
			}
			corpo.setAttribute("aria-busy", "true");
			buscarContribuicoesDoAno(ano, anoCriacao)
				.then((contribuicoes) => {
					if (meu === pedido) preencherContribuicoes(corpo, dados, contribuicoes);
				})
				.catch(() => {
					if (meu !== pedido) return;
					desenharCidade(null);
					corpo.removeAttribute("aria-busy");
					corpo.replaceChildren(criar("p", "atividade-aviso", I18n.t("atividade.anoFalhou", { ano })));
				});
		});
		grupo.append(botao);
	});
	return grupo;
}

function montarCartaoContribuicoes(dados) {
	const cartao = criar("article", "cartao cartao-largo cartao-estatico");
	const conteudo = criar("div", "cartao-conteudo");
	const topo = criar("div", "contribuicoes-topo");
	topo.append(criar("h3", "cartao-titulo", I18n.t("atividade.titulo")));
	const corpo = criar("div", "contribuicoes-corpo");
	const seletor = montarSeletorDeAnos(dados, corpo);
	if (seletor) topo.append(seletor);
	conteudo.append(topo, corpo);
	preencherContribuicoes(corpo, dados, dados.contribuicoes);
	cartao.append(conteudo);
	return cartao;
}

const cidadeArredondar = (valor) => Math.round(valor * 10) / 10;
const cidadePontos = (lista) => lista.map(([x, y]) => `${cidadeArredondar(x)},${cidadeArredondar(y)}`).join(" ");
const cidadeEscapar = (texto) => String(texto).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const cidadeDataCurta = (texto) => {
	const data = dataLocal(texto);
	return I18n.t("comum.dataCurta", { dia: data.getDate(), mes: I18n.nomeMes(data.getMonth(), "short", false) });
};

function cidadeFace(poligono, classe, sombra) {
	const pontos = cidadePontos(poligono);
	return `<polygon points="${pontos}" class="${classe}"/><polygon points="${pontos}" fill="#000" opacity="${sombra}"/>`;
}

function estatisticasCidade(contribuicoes) {
	const dias = contribuicoes.dias.filter((dia) => !dia.futuro);
	const ativos = dias.filter((dia) => dia.total > 0).length;
	const melhor = dias.reduce((a, b) => (b.total > a.total ? b : a), dias[0]);
	const { atual, maior } = sequencias(dias);
	const porMes = {};
	dias.forEach((dia) => {
		const chave = dia.data.slice(0, 7);
		porMes[chave] = (porMes[chave] || 0) + dia.total;
	});
	const topo = Object.entries(porMes).sort((a, b) => b[1] - a[1])[0];
	const mesMaisAtivo = topo && topo[1] > 0 ? I18n.nomeMes(Number(topo[0].slice(5)) - 1, "long") : "—";
	return { dias, ativos, melhor, atual, maior, mesMaisAtivo, maximo: Math.max(1, melhor ? melhor.total : 0) };
}

function svgCidade(contribuicoes) {
	const S = estatisticasCidade(contribuicoes);
	const W = 880, H = 420, AW = 8.0, BW = 3.9, AD = 6.6, BD = 3.6, MAXH = 112, INSET = 0.1, OX = 384, OY = 142;
	const P = (w, d) => [OX + w * AW - d * AD, OY + w * BW + d * BD];
	const vazios = dataLocal(contribuicoes.dias[0].data).getDay();
	const NW = Math.ceil((vazios + contribuicoes.dias.length) / 7);
	const passo = Math.ceil(S.maximo / 4);
	const celulas = S.dias
		.map((dia, indice) => ({ ...dia, w: Math.floor((vazios + indice) / 7), d: (vazios + indice) % 7 }))
		.sort((a, b) => a.w + a.d - (b.w + b.d) || a.w - b.w);

	const T = 9, c0 = P(0, 0), c1 = P(NW, 0), c2 = P(NW, 7), c3 = P(0, 7), desce = ([x, y]) => [x, y + T];
	let cidade = cidadeFace([c3, c2, desce(c2), desce(c3)], "cidade-n0", 0.55) +
		cidadeFace([c2, c1, desce(c1), desce(c2)], "cidade-n0", 0.75) +
		cidadeFace([c0, c1, c2, c3], "cidade-n0", 0.3);

	let marca = "";
	for (const c of celulas) {
		const nivel = c.total === 0 ? 0 : Math.min(4, Math.ceil(c.total / passo));
		const h = c.total === 0 ? 1.5 : 4 + MAXH * Math.pow(c.total / S.maximo, 0.8);
		const i = INSET, o = 1 - INSET;
		const t = P(c.w + i, c.d + i), r = P(c.w + o, c.d + i), b = P(c.w + o, c.d + o), l = P(c.w + i, c.d + o);
		const sobe = ([x, y]) => [x, y - h];
		const classe = `cidade-n${nivel}`;
		let luzes = "";
		if (nivel >= 3 && h > 26) {
			for (let y = 7; y < h - 5; y += 8) {
				for (const [p, q] of [[l, b], [b, r]]) {
					const x = (p[0] + q[0]) / 2, yy = (p[1] + q[1]) / 2 - y;
					luzes += `<rect x="${cidadeArredondar(x - 0.9)}" y="${cidadeArredondar(yy - 1.5)}" width="1.8" height="3" class="cidade-luz"/>`;
				}
			}
		}
		const dica = cidadeEscapar(`${textoQuantidade(contribuicoes, c.total)} · ${dataDoDia(c.data)}`);
		cidade += `<g class="cidade-predio" style="animation-delay:${c.w * 24 + c.d * 6}ms" data-dica="${dica}">` +
			(c.total ? cidadeFace([sobe(l), sobe(b), b, l], classe, 0.35) + cidadeFace([sobe(b), sobe(r), r, b], classe, 0.6) : "") +
			`<polygon points="${cidadePontos([sobe(t), sobe(r), sobe(b), sobe(l)])}" class="${classe}"/>${luzes}</g>`;
		if (S.melhor && c.data === S.melhor.data && c.total > 0) {
			const x = (t[0] + b[0]) / 2, y = Math.max(40, sobe(t)[1]);
			marca = `<g class="cidade-marca"><line x1="${cidadeArredondar(x)}" y1="${cidadeArredondar(y - 3)}" x2="${cidadeArredondar(x)}" y2="${cidadeArredondar(y - 18)}"/>` +
				`<text x="${cidadeArredondar(x)}" y="${cidadeArredondar(y - 23)}" text-anchor="middle">${cidadeEscapar(`${cidadeDataCurta(c.data)}: ${I18n.numero(c.total)}`)}</text></g>`;
		}
	}

	const anoAtual = new Date().getFullYear();
	const porAno = contribuicoes.fonte === "ano";
	const periodo = porAno ? I18n.t("atividade.cidadePeriodoAno", { ano: contribuicoes.ano }) : I18n.t("atividade.cidadePeriodoEventos");
	const rotuloSequencia = I18n.t(porAno && contribuicoes.ano < anoAtual ? "atividade.sequenciaFimAno" : "atividade.sequenciaAtual");
	const melhorTexto = S.melhor && S.melhor.total > 0 ? `${I18n.numero(S.melhor.total)} (${cidadeDataCurta(S.melhor.data)})` : "—";
	const ativosTexto = I18n.tn("atividade.diasAtivos", S.ativos);
	const textos = [
		ativosTexto,
		I18n.t("atividade.diaMaisAtivo", { valor: melhorTexto }),
		I18n.t("atividade.sequenciaValor", { rotulo: rotuloSequencia, valor: I18n.tn("atividade.dias", S.atual) }),
		I18n.t("atividade.sequenciaValor", { rotulo: I18n.t("atividade.maiorSequencia"), valor: I18n.tn("atividade.dias", S.maior) }),
		I18n.t("atividade.mesMaisAtivo", { mes: S.mesMaisAtivo })
	].map((texto, indice) => `<text x="40" y="${222 + indice * 23}" class="cidade-dado">${cidadeEscapar(texto)}</text>`).join("");

	const descricao = porAno
		? I18n.t("atividade.cidadeDescricaoAno", { total: I18n.numero(contribuicoes.total), ano: contribuicoes.ano, ativos: ativosTexto })
		: I18n.t("atividade.cidadeDescricaoEventos", { total: I18n.numero(contribuicoes.total), ativos: ativosTexto });
	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" class="cidade-svg" role="img" aria-label="${cidadeEscapar(descricao)}">
<circle class="cidade-ponto" cx="40" cy="48" r="3.5"/><text x="50" y="52" class="cidade-rotulo">${cidadeEscapar(I18n.t("atividade.cidadeAoVivo"))}</text>
<text x="40" y="94" class="cidade-rotulo">${cidadeEscapar(I18n.t("atividade.cidadeTitulo"))}</text>
<text x="38" y="152" class="cidade-total">${cidadeEscapar(I18n.numero(contribuicoes.total))}</text>
<text x="40" y="180" class="cidade-texto" font-size="14">${cidadeEscapar(periodo)}</text>
${textos}
<text x="40" y="370" class="cidade-texto" font-size="12">@${cidadeEscapar(ATIVIDADE.usuario)}</text>
<text x="40" y="388" class="cidade-pequeno">${cidadeEscapar(I18n.t("atividade.cidadeLegenda"))}</text>
${cidade}
${marca}
</svg>`;
}

function desenharCidade(contribuicoes) {
	const alvo = document.getElementById("cidade");
	if (!alvo) return;
	if (!contribuicoes || !contribuicoes.dias || !contribuicoes.dias.length) {
		alvo.replaceChildren(criar("p", "atividade-aviso", I18n.t("atividade.cidadeEspera")));
		return;
	}
	alvo.innerHTML = svgCidade(contribuicoes);
}

function montarCartaoCidade() {
	const cartao = criar("article", "cartao cartao-largo cartao-estatico");
	const conteudo = criar("div", "cartao-conteudo");
	const rolagem = criar("div", "cidade-rolagem");
	rolagem.id = "cidade";
	conteudo.append(rolagem);
	cartao.append(conteudo);
	return cartao;
}

async function atualizarAnoAtual(dados) {
	if (document.hidden) return;
	const anoAtual = new Date().getFullYear();
	let contribuicoes;
	try {
		contribuicoes = await buscarContribuicoesDoAno(anoAtual);
	} catch (erro) {
		return;
	}
	const anterior = dados.contribuicoes;
	if (anterior && anterior.fonte === "ano" && anterior.ano === anoAtual && anterior.total === contribuicoes.total) return;
	dados.contribuicoes = contribuicoes;
	const selecionado = document.querySelector('#atividade .ano[aria-pressed="true"]');
	const corpo = document.querySelector("#atividade .contribuicoes-corpo");
	if (corpo && (!selecionado || Number(selecionado.textContent) === anoAtual)) preencherContribuicoes(corpo, dados, contribuicoes);
}

function montarCartaoLinguagens(linguagens) {
	const cartao = criar("article", "cartao cartao-estatico");
	const conteudo = criar("div", "cartao-conteudo");
	conteudo.append(criar("h3", "cartao-titulo", I18n.t("atividade.linguagens")));
	const explicacao = I18n.t(linguagens.fonte === "bytes" ? "atividade.linguagensBytes" : "atividade.linguagensRepos");
	conteudo.append(criar("p", "grupo-rotulo", explicacao));

	const ordenadas = [...linguagens.itens].sort((a, b) => b.valor - a.valor);
	const total = ordenadas.reduce((soma, item) => soma + item.valor, 0) || 1;
	const visiveis = ordenadas.slice(0, ATIVIDADE.linguagensVisiveis);
	const resto = ordenadas.slice(ATIVIDADE.linguagensVisiveis);
	if (resto.length) {
		visiveis.push({ nome: I18n.t("atividade.outras"), valor: resto.reduce((soma, item) => soma + item.valor, 0), outras: resto.length });
	}
	const maior = Math.max(...visiveis.map((item) => item.valor));

	const lista = criar("ul", "linguagens");
	visiveis.forEach((item) => {
		const linha = criar("li", item.outras ? "linguagem linguagem-outras" : "linguagem");
		const percentual = (item.valor / total) * 100;
		const topo = criar("div", "linguagem-topo");
		topo.append(criar("span", "linguagem-nome", item.nome));
		topo.append(criar("span", "linguagem-valor", `${I18n.decimal(percentual)}%`));
		const barra = criar("div", "linguagem-barra");
		barra.dataset.largura = `${Math.max((item.valor / maior) * 100, 1)}%`;
		if (item.outras) {
			linha.dataset.dica = I18n.tn("atividade.outrasDica", item.outras);
		} else if (linguagens.fonte === "bytes") {
			linha.dataset.dica = I18n.t("atividade.codigoEm", { tamanho: tamanhoArquivo(item.valor), repos: I18n.tn("atividade.repositorios", item.repos) });
		} else {
			linha.dataset.dica = I18n.t("atividade.principalEm", { repos: I18n.tn("atividade.repositorios", item.repos) });
		}
		linha.append(topo, barra);
		lista.append(linha);
	});
	conteudo.append(lista);
	cartao.append(conteudo);
	return cartao;
}

function montarCartaoRepos(repos) {
	const projetoPorLink = {};
	PROJETOS.forEach((projeto) => {
		projetoPorLink[projeto.link.toLowerCase()] = projeto;
	});

	const cartao = criar("article", "cartao cartao-estatico");
	const conteudo = criar("div", "cartao-conteudo");
	conteudo.append(criar("h3", "cartao-titulo", I18n.t("atividade.recentes")));
	conteudo.append(criar("p", "grupo-rotulo", I18n.t("atividade.recentesTexto")));

	const lista = criar("ul", "repos");
	repos
		.filter((repo) => !ATIVIDADE.reposOcultos.includes(repo.nome))
		.sort((a, b) => Date.parse(b.atualizado) - Date.parse(a.atualizado))
		.slice(0, ATIVIDADE.reposRecentes)
		.forEach((repo) => {
			const projeto = projetoPorLink[repo.url.toLowerCase()];
			const item = criar("li");
			const link = criar("a", "repo");
			link.href = repo.url;
			link.target = "_blank";
			link.rel = "noopener noreferrer";

			const nome = criar("span", "repo-nome");
			if (projeto && projeto.icone) {
				const icone = criar("img", "cartao-icone");
				icone.src = projeto.icone;
				icone.alt = "";
				icone.setAttribute("aria-hidden", "true");
				nome.append(icone);
			}
			nome.append(criar("span", "repo-titulo", projeto ? projeto.titulo : repo.nome));
			if (projeto) nome.append(criar("span", "repo-sub", repo.nome));
			link.append(nome);

			if (repo.descricao) link.append(criar("span", "repo-descricao", repo.descricao));
			const meta = criar("span", "repo-meta");
			if (repo.linguagem) meta.append(criar("span", "habilidade", repo.linguagem));
			meta.append(criar("span", "", I18n.t("atividade.atualizado", { tempo: tempoRelativo(repo.atualizado) })));
			link.append(meta);

			item.append(link);
			lista.append(item);
		});
	conteudo.append(lista);
	cartao.append(conteudo);
	return cartao;
}

function montarRodapeAtividade(dados) {
	const rodape = criar("p", "atividade-rodape");
	const hora = I18n.data(new Date(dados.quando), { hour: "2-digit", minute: "2-digit" });
	rodape.append(I18n.t(dados.desatualizado ? "atividade.limitado" : "atividade.aoVivo", { hora }));
	const link = criar("a", "atividade-link", I18n.t("atividade.verPerfil"));
	link.href = (dados.perfil && dados.perfil.url) || `https://github.com/${ATIVIDADE.usuario}`;
	link.target = "_blank";
	link.rel = "noopener noreferrer";
	rodape.append(link);
	return rodape;
}

let atividadeDados = null;
let atividadeComErro = false;
let atividadeRelogio = null;

function montarAtividade(dados) {
	atividadeDados = dados;
	atividadeComErro = false;
	const grade = document.getElementById("atividade");
	grade.replaceChildren();
	grade.setAttribute("aria-busy", "false");
	document.querySelectorAll("#painel-atividade > .atividade-rodape").forEach((rodape) => rodape.remove());
	grade.append(montarCartaoContribuicoes(dados));
	grade.append(montarCartaoCidade());
	desenharCidade(dados.contribuicoes);
	clearInterval(atividadeRelogio);
	atividadeRelogio = setInterval(() => atualizarAnoAtual(dados), ATIVIDADE.validadeAnoAtual);
	if (dados.linguagens && dados.linguagens.itens.length) grade.append(montarCartaoLinguagens(dados.linguagens));
	if (dados.repos) grade.append(montarCartaoRepos(dados.repos));
	grade.after(montarRodapeAtividade(dados));
	requestAnimationFrame(() => {
		grade.querySelectorAll(".linguagem-barra").forEach((barra) => {
			barra.style.width = barra.dataset.largura;
		});
		rolarCalendario(grade);
	});
}

// No celular o gráfico rola na horizontal: começa mostrando o último dia que já passou.
function rolarCalendario(raiz = document.getElementById("atividade")) {
	const rolagem = raiz && raiz.querySelector(".calendario-rolagem");
	if (!rolagem || !rolagem.clientWidth) return;
	const dias = rolagem.querySelectorAll(".celula:not(.celula-vazia):not(.celula-futura)");
	const ultimo = dias[dias.length - 1];
	if (!ultimo) return;
	const fimDia = ultimo.getBoundingClientRect().right - rolagem.getBoundingClientRect().left + rolagem.scrollLeft;
	rolagem.scrollLeft = Math.max(0, fimDia - rolagem.clientWidth + 16);
}

function mostrarErroAtividade() {
	atividadeComErro = true;
	const grade = document.getElementById("atividade");
	grade.replaceChildren();
	grade.setAttribute("aria-busy", "false");
	const cartao = criar("article", "cartao cartao-largo cartao-estatico");
	const conteudo = criar("div", "cartao-conteudo");
	conteudo.append(criar("h3", "cartao-titulo", I18n.t("atividade.foraDoAr")));
	conteudo.append(criar("p", "cartao-descricao atividade-erro", I18n.t("atividade.erro")));
	const botao = criar("a", "cartao-botao", I18n.t("atividade.verPerfil"));
	botao.href = `https://github.com/${ATIVIDADE.usuario}`;
	botao.target = "_blank";
	botao.rel = "noopener noreferrer";
	conteudo.append(botao);
	cartao.append(conteudo);
	grade.append(cartao);
}

let atividadeIniciada = false;

function iniciarAtividade() {
	if (atividadeIniciada) return;
	atividadeIniciada = true;
	prepararDicas();
	carregarDadosGithub().then(montarAtividade).catch(mostrarErroAtividade);
}

I18n.aoTrocar(() => {
	if (atividadeDados) montarAtividade(atividadeDados);
	else if (atividadeComErro) mostrarErroAtividade();
});

document.addEventListener("aba-ativada", (evento) => {
	if (evento.detail !== "aba-atividade") return;
	iniciarAtividade();
	requestAnimationFrame(() => rolarCalendario());
});

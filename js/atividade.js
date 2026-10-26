// Aba Atividade: dados ao vivo do GitHub, buscados só quando a aba é aberta.
// - Perfil e repositórios: API pública do GitHub (sem token, limite de 60 consultas por hora).
// - Gráfico de contribuições: github-contributions-api.jogruber.de, que lê o mesmo calendário
//   do perfil, um ano inteiro por vez. Se ele não responder, o gráfico usa os eventos públicos dos últimos 90 dias.
// Tudo fica guardado no navegador por 30 minutos (as linguagens e os anos que já acabaram, por 24 horas)
// para não gastar o limite da API.
// O gráfico abre no ano atual e tem um botão para cada ano desde 2022; anos sem commits aparecem vazios.

const ATIVIDADE = {
	usuario: "ravelroot",
	validade: 30 * 60 * 1000,
	validadeLinguagens: 24 * 60 * 60 * 1000,
	chaveCache: "atividade-github-v2",
	chaveCacheAnos: "atividade-github-anos-v2",
	// Primeiro ano com botão no gráfico (o calendário começa em 1º de janeiro dele).
	anoInicial: 2022,
	reposRecentes: 5,
	linguagensVisiveis: 8,
	reposOcultos: ["ravelroot.github.io", "ravelroot"]
};

const API_GITHUB = "https://api.github.com";
const API_CONTRIBUICOES = "https://github-contributions-api.jogruber.de/v4/";
const numeroBR = new Intl.NumberFormat("pt-BR");
const decimalBR = new Intl.NumberFormat("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

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
	const formato = new Intl.RelativeTimeFormat("pt-BR", { numeric: "auto" });
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
	const validade = ano < anoAtual ? ATIVIDADE.validadeLinguagens : ATIVIDADE.validade;
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

// Anos com botão no gráfico, do atual até 2022, mesmo os que não tiveram nenhum commit.
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
	if (salvo && Date.now() - salvo.quando < ATIVIDADE.validade) return salvo;

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
	return kb >= 1024 ? `${decimalBR.format(kb / 1024)} MB` : `${decimalBR.format(kb)} KB`;
}

function plural(valor, singular, pluralTexto) {
	return `${numeroBR.format(valor)} ${valor === 1 ? singular : pluralTexto}`;
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
	const formatoDia = new Intl.DateTimeFormat("pt-BR", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
	const formatoMes = new Intl.DateTimeFormat("pt-BR", { month: "short" });

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
		let nome = formatoMes.format(data).replace(".", "");
		nome = nome.charAt(0).toUpperCase() + nome.slice(1);
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
		? plural(contribuicoes.total, "contribuição", "contribuições")
		: plural(contribuicoes.total, "atividade pública", "atividades públicas");
	corpo.setAttribute("aria-label", `Gráfico de contribuições: ${totalTexto} em ${plural(ativos, "dia", "dias")} com atividade.`);
	["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].forEach((nome, linha) => {
		corpo.append(criar("span", "calendario-dia-semana", linha % 2 === 1 ? nome : ""));
	});
	for (let i = 0; i < vazios; i++) corpo.append(criar("span", "celula celula-vazia"));
	dias.forEach((dia) => {
		if (dia.futuro) {
			corpo.append(criar("span", "celula celula-futura"));
			return;
		}
		const celula = criar("span", "celula");
		celula.dataset.nivel = dia.nivel;
		const quantidade = contribuicoes.fonte !== "eventos"
			? (dia.total === 0 ? "Nenhuma contribuição" : plural(dia.total, "contribuição", "contribuições"))
			: (dia.total === 0 ? "Nenhuma atividade" : plural(dia.total, "atividade", "atividades"));
		celula.dataset.dica = `${quantidade} · ${formatoDia.format(dataLocal(dia.data))}`;
		corpo.append(celula);
	});

	calendario.append(meses, corpo);
	rolagem.append(calendario);
	return rolagem;
}

function montarLegendaCalendario() {
	const legenda = criar("div", "calendario-legenda");
	legenda.setAttribute("aria-hidden", "true");
	legenda.append(criar("span", "", "Menos"));
	for (let nivel = 0; nivel <= 4; nivel++) {
		const amostra = criar("span", "celula");
		amostra.dataset.nivel = nivel;
		legenda.append(amostra);
	}
	legenda.append(criar("span", "", "Mais"));
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
			numeros.append(criarNumero(`Contribuições em ${contribuicoes.ano}`, numeroBR.format(contribuicoes.total)));
			numeros.append(criarNumero("Dias com contribuições", numeroBR.format(passados.filter((dia) => dia.total > 0).length)));
		} else {
			numeros.append(criarNumero("Atividades em 90 dias", numeroBR.format(contribuicoes.total)));
			numeros.append(criarNumero("Sequência atual", plural(atual, "dia", "dias")));
		}
		numeros.append(criarNumero("Maior sequência", plural(maior, "dia", "dias")));
	}
	if (dados.perfil) numeros.append(criarNumero("Repositórios públicos", numeroBR.format(dados.perfil.repositorios)));
	corpo.append(numeros);

	if (!contribuicoes) {
		corpo.append(criar("p", "atividade-aviso", "O gráfico de contribuições não respondeu agora. Tente de novo em alguns minutos."));
		return;
	}

	corpo.append(montarCalendario(contribuicoes));
	const rodape = criar("div", "calendario-rodape");
	const formatoPeriodo = new Intl.DateTimeFormat("pt-BR", { day: "numeric", month: "short", year: "numeric" });
	const passados = contribuicoes.dias.filter((dia) => !dia.futuro);
	const inicio = formatoPeriodo.format(dataLocal(contribuicoes.dias[0].data));
	const fim = formatoPeriodo.format(dataLocal(passados[passados.length - 1].data));
	let nota;
	if (contribuicoes.fonte === "ano" && passados.length < contribuicoes.dias.length) {
		nota = `Commits, pull requests e issues de ${inicio} até hoje. Os dias que ainda não chegaram aparecem vazados.`;
	} else if (contribuicoes.fonte === "ano") {
		nota = `Commits, pull requests e issues de ${inicio} a ${fim}.`;
	} else {
		nota = `O calendário completo não respondeu agora: mostrando a atividade pública de ${inicio} a ${fim}.`;
	}
	rodape.append(criar("p", "calendario-nota", nota));
	rodape.append(montarLegendaCalendario());
	corpo.append(rodape);
	requestAnimationFrame(() => rolarCalendario(corpo));
}

function montarSeletorDeAnos(dados, corpo) {
	const anos = anosDisponiveis();
	if (anos.length < 2) return null;
	const anoCriacao = dados.perfil && dados.perfil.criadoEm ? Number(dados.perfil.criadoEm.slice(0, 4)) : null;

	const grupo = criar("div", "anos");
	grupo.setAttribute("role", "group");
	grupo.setAttribute("aria-label", "Período do gráfico de contribuições");
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
					corpo.removeAttribute("aria-busy");
					corpo.replaceChildren(criar("p", "atividade-aviso", `Não deu para buscar ${ano} agora. Tente de novo em alguns minutos.`));
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
	topo.append(criar("h3", "cartao-titulo", "Contribuições"));
	const corpo = criar("div", "contribuicoes-corpo");
	const seletor = montarSeletorDeAnos(dados, corpo);
	if (seletor) topo.append(seletor);
	conteudo.append(topo, corpo);
	preencherContribuicoes(corpo, dados, dados.contribuicoes);
	cartao.append(conteudo);
	return cartao;
}

function montarCartaoLinguagens(linguagens) {
	const cartao = criar("article", "cartao cartao-estatico");
	const conteudo = criar("div", "cartao-conteudo");
	conteudo.append(criar("h3", "cartao-titulo", "Linguagens mais usadas"));
	const explicacao = linguagens.fonte === "bytes"
		? "Proporção do código somado de todos os repositórios públicos."
		: "Linguagem principal de cada repositório público.";
	conteudo.append(criar("p", "grupo-rotulo", explicacao));

	const ordenadas = [...linguagens.itens].sort((a, b) => b.valor - a.valor);
	const total = ordenadas.reduce((soma, item) => soma + item.valor, 0) || 1;
	const visiveis = ordenadas.slice(0, ATIVIDADE.linguagensVisiveis);
	const resto = ordenadas.slice(ATIVIDADE.linguagensVisiveis);
	if (resto.length) {
		visiveis.push({ nome: "Outras", valor: resto.reduce((soma, item) => soma + item.valor, 0), outras: resto.length });
	}
	const maior = Math.max(...visiveis.map((item) => item.valor));

	const lista = criar("ul", "linguagens");
	visiveis.forEach((item) => {
		const linha = criar("li", item.outras ? "linguagem linguagem-outras" : "linguagem");
		const percentual = (item.valor / total) * 100;
		const topo = criar("div", "linguagem-topo");
		topo.append(criar("span", "linguagem-nome", item.nome));
		topo.append(criar("span", "linguagem-valor", `${decimalBR.format(percentual)}%`));
		const barra = criar("div", "linguagem-barra");
		barra.dataset.largura = `${Math.max((item.valor / maior) * 100, 1)}%`;
		if (item.outras) {
			linha.dataset.dica = `${plural(item.outras, "linguagem", "linguagens")} com menos código`;
		} else if (linguagens.fonte === "bytes") {
			linha.dataset.dica = `${tamanhoArquivo(item.valor)} de código em ${plural(item.repos, "repositório", "repositórios")}`;
		} else {
			linha.dataset.dica = `Principal em ${plural(item.repos, "repositório", "repositórios")}`;
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
	conteudo.append(criar("h3", "cartao-titulo", "Repositórios recentes"));
	conteudo.append(criar("p", "grupo-rotulo", "Os últimos a receber commits."));

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
			meta.append(criar("span", "", `atualizado ${tempoRelativo(repo.atualizado)}`));
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
	const hora = new Intl.DateTimeFormat("pt-BR", { hour: "2-digit", minute: "2-digit" }).format(new Date(dados.quando));
	rodape.append(
		dados.desatualizado
			? `O GitHub limitou as consultas agora; mostrando os dados salvos às ${hora}. `
			: `Dados ao vivo do GitHub, atualizados às ${hora}. `
	);
	const link = criar("a", "atividade-link", "Ver perfil no GitHub");
	link.href = (dados.perfil && dados.perfil.url) || `https://github.com/${ATIVIDADE.usuario}`;
	link.target = "_blank";
	link.rel = "noopener noreferrer";
	rodape.append(link);
	return rodape;
}

function montarAtividade(dados) {
	const grade = document.getElementById("atividade");
	grade.replaceChildren();
	grade.setAttribute("aria-busy", "false");
	grade.append(montarCartaoContribuicoes(dados));
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
	const grade = document.getElementById("atividade");
	grade.replaceChildren();
	grade.setAttribute("aria-busy", "false");
	const cartao = criar("article", "cartao cartao-largo cartao-estatico");
	const conteudo = criar("div", "cartao-conteudo");
	conteudo.append(criar("h3", "cartao-titulo", "GitHub fora do ar por agora"));
	conteudo.append(criar("p", "cartao-descricao atividade-erro", "Não deu para buscar os dados ao vivo. O GitHub limita as consultas sem login a 60 por hora; tente de novo em alguns minutos."));
	const botao = criar("a", "cartao-botao", "Ver perfil no GitHub");
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

document.addEventListener("aba-ativada", (evento) => {
	if (evento.detail !== "aba-atividade") return;
	iniciarAtividade();
	requestAnimationFrame(() => rolarCalendario());
});

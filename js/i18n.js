const I18n = (() => {
	const IDIOMAS = [
		{ codigo: "pt", nome: "Português (Brasil)", sigla: "PT", locale: "pt-BR" },
		{ codigo: "en", nome: "English (US)", sigla: "EN", locale: "en-US" },
		{ codigo: "fr", nome: "Français", sigla: "FR", locale: "fr-FR" },
		{ codigo: "es", nome: "Español", sigla: "ES", locale: "es-ES" }
	];
	const PADRAO = "pt";
	const CHAVE_SALVA = "idioma";
	const PARAMETRO = "lang";
	const VERSAO_PACOTES = "1";
	const TEMPO_LIMITE = 8000;

	const pacotes = {
		pt: {
			ui: {
				"idioma.trocar": "Trocar idioma",
				"idioma.menu": "Idioma do site",
				"idioma.atual": "Idioma: {nome}. Trocar idioma",
				"idioma.alterado": "Idioma alterado para {nome}.",
				"idioma.falhou": "Não deu para carregar esse idioma agora. Tente de novo em alguns instantes.",
				"tema.claro": "Ativar tema claro",
				"tema.escuro": "Ativar tema escuro",
				"copiar.copiado": "E-mail copiado",
				"copiar.aviso": "E-mail {email} copiado.",
				"comum.fechar": "Fechar (Esc)",
				"comum.codigoGithub": "Código no GitHub",
				"comum.manual": "Manual técnico",
				"comum.bancoDados": "Arquitetura do BD",
				"comum.dataCurta": "{dia} {mes}",
				"projetos.filtrar": "Filtrar projetos por linguagem",
				"projetos.todos": "Todos",
				"projetos.total": { um: "{n} projeto", outros: "{n} projetos" },
				"projetos.parcial": { um: "{n} de {total} projeto", outros: "{n} de {total} projetos" },
				"projetos.removerFiltroRotulo": { um: "{nome}: {n} projeto. Remover filtro", outros: "{nome}: {n} projetos. Remover filtro" },
				"projetos.removerFiltro": "Remover filtro",
				"projetos.estudo": "Estudo de caso",
				"projetos.estudoRotulo": "Ver o estudo de caso do {titulo} na aba Destaques",
				"projetos.demo": "Abrir demo",
				"habilidades.itens": { um: "{n} item", outros: "{n} itens" },
				"habilidades.mostrar": "Mostrar habilidades",
				"habilidades.todas": "Todas",
				"habilidades.usadas": "Usadas nos projetos",
				"documentacao.abrirBanco": "Abrir a arquitetura do banco do {titulo} (PDF)",
				"documentacao.abrirManual": "Abrir o manual técnico do {titulo} (PDF)",
				"documentacao.decisao": "Decisão de arquitetura",
				"galeria.rotulo": "Imagem ampliada",
				"galeria.fechar": "Fechar imagem",
				"galeria.anterior": "Imagem anterior",
				"galeria.proxima": "Próxima imagem",
				"destaques.sumario": "Projetos em destaque",
				"destaques.posicao": "Destaque {n} / {total}",
				"destaques.navegador": "Abrir no navegador",
				"destaques.ampliarTela": "Ampliar a tela principal do {titulo}",
				"destaques.ampliar": "Ampliar",
				"destaques.ideia": "A ideia",
				"destaques.tecnologiasDe": "Tecnologias do {titulo}",
				"destaques.tecnologias": "Tecnologias",
				"destaques.galeria": "Galeria",
				"destaques.galeriaExtra": { um: "{n} tela · clique para ampliar", outros: "{n} telas · clique para ampliar" },
				"destaques.ampliarFoto": "Ampliar: {legenda}",
				"destaques.porDentro": "Por dentro",
				"destaques.porDentroExtra": { um: "{n} decisão de engenharia", outros: "{n} decisões de engenharia" },
				"destaques.arquitetura": "Arquitetura",
				"destaques.arquiteturaComando": "{nome} --arquitetura",
				"destaques.arquiteturaRotulo": "Diagrama da arquitetura do {titulo}",
				"destaques.testes": "Testes e verificações",
				"destaques.testesLegenda": "Resultados da rodada de testes da versão {versao} do {titulo}",
				"destaques.outros": { um: "O outro projeto, de sistemas distribuídos a um alocador de memória em C, está na aba Projetos.", outros: "Os outros {n} projetos, de sistemas distribuídos a um alocador de memória em C, estão na aba Projetos." },
				"destaques.verTodos": "Ver todos os projetos",
				"notas.leitura": "{n} min de leitura",
				"notas.fechar": "Fechar nota",
				"notas.outras": "Outras notas",
				"notas.anterior": "Anterior",
				"notas.proxima": "Próxima",
				"notas.ler": "Ler nota",
				"contato.enviando": "Enviando…",
				"contato.enviadoTitulo": "mensagem enviada",
				"contato.enviadoTexto": "Obrigado! Sua mensagem chegou no meu e-mail e respondo em breve no endereço que você deixou.",
				"contato.enviadoTextoNome": "Obrigado, {nome}! Sua mensagem chegou no meu e-mail e respondo em breve no endereço que você deixou.",
				"contato.outra": "Enviar outra mensagem",
				"contato.erro": "Não deu para enviar agora. Tente de novo em alguns minutos ou escreva direto para",
				"atividade.contribuicoes": { um: "{n} contribuição", outros: "{n} contribuições" },
				"atividade.atividadesPublicas": { um: "{n} atividade pública", outros: "{n} atividades públicas" },
				"atividade.atividades": { um: "{n} atividade", outros: "{n} atividades" },
				"atividade.dias": { um: "{n} dia", outros: "{n} dias" },
				"atividade.diasAtivos": { um: "{n} dia ativo", outros: "{n} dias ativos" },
				"atividade.nenhumaContribuicao": "Nenhuma contribuição",
				"atividade.nenhumaAtividade": "Nenhuma atividade",
				"atividade.graficoRotulo": "Gráfico de contribuições: {total} em {dias} com atividade.",
				"atividade.menos": "Menos",
				"atividade.mais": "Mais",
				"atividade.contribuicoesEm": "Contribuições em {ano}",
				"atividade.diasComContribuicoes": "Dias com contribuições",
				"atividade.atividades90": "Atividades em 90 dias",
				"atividade.sequenciaAtual": "Sequência atual",
				"atividade.sequenciaFimAno": "Sequência no fim do ano",
				"atividade.maiorSequencia": "Maior sequência",
				"atividade.repositoriosPublicos": "Repositórios públicos",
				"atividade.semGrafico": "O gráfico de contribuições não respondeu agora. Tente de novo em alguns minutos.",
				"atividade.notaAteHoje": "Commits, pull requests e issues de {inicio} até hoje. Os dias que ainda não chegaram aparecem vazados.",
				"atividade.notaAno": "Commits, pull requests e issues de {inicio} a {fim}.",
				"atividade.notaEventos": "O calendário completo não respondeu agora: mostrando a atividade pública de {inicio} a {fim}.",
				"atividade.periodo": "Período do gráfico de contribuições",
				"atividade.anoFalhou": "Não deu para buscar {ano} agora. Tente de novo em alguns minutos.",
				"atividade.titulo": "Contribuições",
				"atividade.cidadeAoVivo": "AO VIVO",
				"atividade.cidadeTitulo": "CIDADE DE CONTRIBUIÇÕES",
				"atividade.cidadePeriodoAno": "contribuições em {ano}",
				"atividade.cidadePeriodoEventos": "atividades nos últimos 90 dias",
				"atividade.cidadeDescricaoAno": "Cidade de contribuições: {total} contribuições em {ano}, {ativos}.",
				"atividade.cidadeDescricaoEventos": "Cidade de contribuições: {total} atividades nos últimos 90 dias, {ativos}.",
				"atividade.diaMaisAtivo": "Dia mais ativo: {valor}",
				"atividade.sequenciaValor": "{rotulo}: {valor}",
				"atividade.mesMaisAtivo": "Mês mais ativo: {mes}",
				"atividade.cidadeLegenda": "um prédio para cada dia ativo",
				"atividade.cidadeEspera": "A cidade aparece assim que o gráfico de contribuições responder.",
				"atividade.linguagens": "Linguagens mais usadas",
				"atividade.linguagensBytes": "Proporção do código somado de todos os repositórios públicos.",
				"atividade.linguagensRepos": "Linguagem principal de cada repositório público.",
				"atividade.outras": "Outras",
				"atividade.outrasDica": { um: "{n} linguagem com menos código", outros: "{n} linguagens com menos código" },
				"atividade.repositorios": { um: "{n} repositório", outros: "{n} repositórios" },
				"atividade.codigoEm": "{tamanho} de código em {repos}",
				"atividade.principalEm": "Principal em {repos}",
				"atividade.recentes": "Repositórios recentes",
				"atividade.recentesTexto": "Os últimos a receber commits.",
				"atividade.atualizado": "atualizado {tempo}",
				"atividade.limitado": "O GitHub limitou as consultas agora; mostrando os dados salvos às {hora}. ",
				"atividade.aoVivo": "Dados ao vivo do GitHub, atualizados às {hora}. ",
				"atividade.verPerfil": "Ver perfil no GitHub",
				"atividade.foraDoAr": "GitHub fora do ar por agora",
				"atividade.erro": "Não deu para buscar os dados ao vivo. O GitHub limita as consultas sem login a 60 por hora; tente de novo em alguns minutos."
			},
			conteudo: {}
		}
	};

	const ouvintes = [];
	const carregamentos = {};
	let atual = PADRAO;

	const valido = (codigo) => IDIOMAS.some((idioma) => idioma.codigo === codigo);
	const info = (codigo = atual) => IDIOMAS.find((idioma) => idioma.codigo === codigo);
	const locale = () => info().locale;

	function registrar(codigo, pacote) {
		if (!valido(codigo) || codigo === PADRAO || !pacote || typeof pacote !== "object") return;
		pacotes[codigo] = { ui: pacote.ui || {}, conteudo: pacote.conteudo || {} };
	}

	function interpolar(texto, variaveis) {
		if (!variaveis) return texto;
		return texto.replace(/\{(\w+)\}/g, (marca, nome) => (variaveis[nome] === undefined ? marca : String(variaveis[nome])));
	}

	function bruto(chave) {
		const pacote = pacotes[atual];
		if (pacote && pacote.ui[chave] !== undefined) return pacote.ui[chave];
		return pacotes[PADRAO].ui[chave];
	}

	function t(chave, variaveis) {
		const texto = bruto(chave);
		if (texto === undefined) return chave;
		return interpolar(typeof texto === "string" ? texto : texto.outros, variaveis);
	}

	function singular(n) {
		return atual === "fr" ? Math.abs(n) < 2 : n === 1;
	}

	function tn(chave, n, variaveis) {
		const texto = bruto(chave);
		if (texto === undefined) return chave;
		const forma = typeof texto === "string" ? texto : (singular(n) ? texto.um : texto.outros);
		return interpolar(forma, { n: numero(n), ...variaveis });
	}

	const formatos = {};
	function formato(nome, criarFormato) {
		const chave = `${atual}:${nome}`;
		if (!formatos[chave]) formatos[chave] = criarFormato(locale());
		return formatos[chave];
	}

	function numero(valor) {
		return formato("numero", (codigo) => new Intl.NumberFormat(codigo)).format(valor);
	}

	function decimal(valor) {
		return formato("decimal", (codigo) => new Intl.NumberFormat(codigo, { minimumFractionDigits: 1, maximumFractionDigits: 1 })).format(valor);
	}

	function data(valor, opcoes) {
		return formato(`data:${JSON.stringify(opcoes)}`, (codigo) => new Intl.DateTimeFormat(codigo, opcoes)).format(valor);
	}

	function capitalizar(texto) {
		return texto.charAt(0).toLocaleUpperCase(locale()) + texto.slice(1);
	}

	function nomeMes(indice, tamanho, maiuscula = true) {
		const nome = data(new Date(2024, indice, 1, 12), { month: tamanho }).replace(/\.$/, "");
		return maiuscula ? capitalizar(nome) : nome;
	}

	function nomeDiaSemana(indice) {
		return capitalizar(data(new Date(2023, 0, 1 + indice, 12), { weekday: "short" }).replace(/\.$/, ""));
	}

	const PROTEGIDOS = new Set(["id", "link", "online", "manual", "banco", "icone", "imagem", "miniatura", "claro", "escuro", "endereco", "versao", "tecnologias", "projetos", "documentos", "largo"]);

	function mesclar(base, extra) {
		if (extra === undefined || extra === null) return base;
		if (Array.isArray(base)) {
			return Array.isArray(extra) ? base.map((item, indice) => mesclar(item, extra[indice])) : base;
		}
		if (base && typeof base === "object") {
			if (typeof extra !== "object" || Array.isArray(extra)) return base;
			const resultado = {};
			Object.keys(base).forEach((chave) => {
				resultado[chave] = PROTEGIDOS.has(chave) ? base[chave] : mesclar(base[chave], extra[chave]);
			});
			return resultado;
		}
		return typeof extra === typeof base ? extra : base;
	}

	function secao(nome) {
		const pacote = pacotes[atual];
		return (pacote && pacote.conteudo[nome]) || {};
	}

	function traduzirLista(lista, nome, chave) {
		const traducoes = secao(nome);
		return lista.map((item) => ({ ...mesclar(item, traducoes[item[chave]]), [chave]: item[chave] }));
	}

	function traduzirObjeto(objeto, nome) {
		return mesclar(objeto, pacotes[atual] && pacotes[atual].conteudo[nome]);
	}

	function lerAtributos(elemento) {
		return elemento.dataset.i18nAttr.split(";").map((par) => par.split(":").map((parte) => parte.trim())).filter(([atributo, chave]) => atributo && chave);
	}

	function colherTextosDoHtml() {
		const base = pacotes[PADRAO].ui;
		document.querySelectorAll("[data-i18n]").forEach((elemento) => {
			const chave = elemento.dataset.i18n;
			if (base[chave] === undefined) base[chave] = elemento.textContent.replace(/\s+/g, " ").trim();
		});
		document.querySelectorAll("[data-i18n-attr]").forEach((elemento) => {
			lerAtributos(elemento).forEach(([atributo, chave]) => {
				if (base[chave] === undefined && elemento.hasAttribute(atributo)) base[chave] = elemento.getAttribute(atributo);
			});
		});
	}

	function aplicarNoHtml() {
		document.querySelectorAll("[data-i18n]").forEach((elemento) => {
			const texto = t(elemento.dataset.i18n);
			if (elemento.textContent !== texto) elemento.textContent = texto;
		});
		document.querySelectorAll("[data-i18n-attr]").forEach((elemento) => {
			lerAtributos(elemento).forEach(([atributo, chave]) => elemento.setAttribute(atributo, t(chave)));
		});
		document.documentElement.lang = locale();
		const canonico = document.querySelector('link[rel="canonical"]');
		if (canonico) {
			const endereco = new URL(canonico.href);
			endereco.search = atual === PADRAO ? "" : `?${PARAMETRO}=${atual}`;
			canonico.href = endereco.href;
		}
	}

	function carregar(codigo) {
		if (pacotes[codigo]) return Promise.resolve();
		if (carregamentos[codigo]) return carregamentos[codigo];
		carregamentos[codigo] = new Promise((resolver, rejeitar) => {
			const script = document.createElement("script");
			const relogio = setTimeout(() => falhar(new Error(`Tempo esgotado ao carregar o idioma ${codigo}`)), TEMPO_LIMITE);
			function falhar(erro) {
				clearTimeout(relogio);
				script.remove();
				delete carregamentos[codigo];
				rejeitar(erro);
			}
			script.src = `js/idiomas/${codigo}.js?v=${VERSAO_PACOTES}`;
			script.async = true;
			script.onload = () => {
				clearTimeout(relogio);
				if (pacotes[codigo]) resolver();
				else falhar(new Error(`Pacote de idioma inválido: ${codigo}`));
			};
			script.onerror = () => falhar(new Error(`Falha ao carregar o idioma ${codigo}`));
			document.head.append(script);
		});
		return carregamentos[codigo];
	}

	function lerPreferencia() {
		const pedido = new URLSearchParams(location.search).get(PARAMETRO);
		if (pedido && valido(pedido.toLowerCase())) return pedido.toLowerCase();
		try {
			const salvo = localStorage.getItem(CHAVE_SALVA);
			if (valido(salvo)) return salvo;
		} catch (erro) {}
		return PADRAO;
	}

	function atualizarEndereco() {
		const endereco = new URL(location.href);
		if (atual === PADRAO) endereco.searchParams.delete(PARAMETRO);
		else endereco.searchParams.set(PARAMETRO, atual);
		if (endereco.href === location.href) return;
		try {
			history.replaceState(history.state, "", endereco.pathname + endereco.search + endereco.hash);
		} catch (erro) {}
	}

	async function iniciar() {
		colherTextosDoHtml();
		const codigo = lerPreferencia();
		if (codigo !== PADRAO) {
			try {
				await carregar(codigo);
				atual = codigo;
			} catch (erro) {
				atual = PADRAO;
			}
		}
		aplicarNoHtml();
		atualizarEndereco();
		return atual;
	}

	async function definir(codigo) {
		if (!valido(codigo)) throw new Error(`Idioma desconhecido: ${codigo}`);
		await carregar(codigo);
		if (codigo === atual) return false;
		atual = codigo;
		try {
			localStorage.setItem(CHAVE_SALVA, codigo);
		} catch (erro) {}
		aplicarNoHtml();
		atualizarEndereco();
		ouvintes.forEach((ouvinte) => ouvinte(atual));
		return true;
	}

	function aoTrocar(ouvinte) {
		ouvintes.push(ouvinte);
	}

	return {
		idiomas: () => IDIOMAS.slice(),
		atual: () => atual,
		info,
		locale,
		registrar,
		carregar: (codigo) => (valido(codigo) ? carregar(codigo) : Promise.reject(new Error(`Idioma desconhecido: ${codigo}`))),
		iniciar,
		definir,
		aoTrocar,
		t,
		tn,
		numero,
		decimal,
		data,
		nomeMes,
		nomeDiaSemana,
		traduzirLista,
		traduzirObjeto
	};
})();

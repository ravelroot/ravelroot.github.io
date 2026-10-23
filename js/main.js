function criar(tag, classe, texto) {
	const elemento = document.createElement(tag);
	if (classe) elemento.className = classe;
	if (texto) elemento.textContent = texto;
	return elemento;
}

function montarProjetos() {
	const grade = document.getElementById("projetos");
	PROJETOS.forEach((projeto) => {
		const cartao = criar("article", "cartao");
		const conteudo = criar("div", "cartao-conteudo");
		const titulo = criar("h3", "cartao-titulo");
		if (projeto.icone) {
			const icone = criar("img", "cartao-icone");
			icone.src = projeto.icone;
			icone.alt = "";
			icone.setAttribute("aria-hidden", "true");
			titulo.append(icone);
		}
		titulo.append(projeto.titulo);
		conteudo.append(titulo);
		conteudo.append(criar("p", "cartao-descricao", projeto.descricao));

		const habilidades = criar("div", "habilidades");
		projeto.tecnologias.forEach((nome) => {
			habilidades.append(criar("span", "habilidade", nome));
		});
		conteudo.append(habilidades);

		const botao = criar("a", "cartao-botao", "Ver projeto");
		botao.href = projeto.link;
		botao.target = "_blank";
		botao.rel = "noopener noreferrer";
		conteudo.append(botao);

		cartao.append(conteudo);
		grade.append(cartao);
	});
}

function montarHabilidades() {
	const grade = document.getElementById("habilidades");
	HABILIDADES.forEach((area) => {
		const cartao = criar("article", area.largo ? "cartao cartao-largo" : "cartao");
		const conteudo = criar("div", "cartao-conteudo");
		conteudo.append(criar("h3", "cartao-titulo", area.titulo));
		area.grupos.forEach((grupo) => {
			conteudo.append(criar("p", "grupo-rotulo", grupo.nome));
			const lista = criar("div", "habilidades habilidades-grupo");
			grupo.itens.forEach((nome) => lista.append(criar("span", "habilidade", nome)));
			conteudo.append(lista);
		});
		cartao.append(conteudo);
		grade.append(cartao);
	});
}

function criarLinkPdf(texto, url, classe) {
	const link = criar("a", classe);
	link.href = url;
	link.target = "_blank";
	link.rel = "noopener noreferrer";
	link.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M9 13h6M9 17h6"/></svg>';
	link.append(texto);
	return link;
}

function montarDocumentacao() {
	const grade = document.getElementById("documentacao");
	const projetoPorTitulo = {};
	PROJETOS.forEach((projeto) => {
		projetoPorTitulo[projeto.titulo] = projeto;
	});
	DOCUMENTACAO.forEach((doc) => {
		const projeto = projetoPorTitulo[doc.titulo] || {};
		const cartao = criar("article", "cartao cartao-doc");

		const miniatura = criar("a", "doc-miniatura");
		miniatura.href = doc.banco || doc.manual;
		miniatura.target = "_blank";
		miniatura.rel = "noopener noreferrer";
		miniatura.setAttribute("aria-label", `Abrir ${doc.banco ? "a arquitetura do banco" : "o manual técnico"} do ${doc.titulo} (PDF)`);
		// O diagrama é um PNG/SVG branco; no tema claro, o filtro do tema o deixa em grafite.
		// (Imagem comum de propósito: máscaras CSS com url() não carregam ao abrir o index.html direto do arquivo.)
		const diagrama = criar("img", "doc-diagrama");
		diagrama.src = doc.miniatura;
		diagrama.alt = doc.miniaturaDescricao;
		diagrama.loading = "lazy";
		diagrama.decoding = "async";
		miniatura.append(diagrama);
		cartao.append(miniatura);

		const conteudo = criar("div", "cartao-conteudo");
		const titulo = criar("h3", "cartao-titulo");
		if (projeto.icone) {
			const icone = criar("img", "cartao-icone");
			icone.src = projeto.icone;
			icone.alt = "";
			icone.setAttribute("aria-hidden", "true");
			titulo.append(icone);
		}
		titulo.append(doc.titulo);
		conteudo.append(titulo);
		conteudo.append(criar("p", "grupo-rotulo", "Decisão de arquitetura"));
		conteudo.append(criar("p", "doc-decisao", doc.decisao));
		conteudo.append(criar("p", "cartao-descricao", doc.texto));

		const destaques = criar("div", "habilidades");
		doc.destaques.forEach((nome) => destaques.append(criar("span", "habilidade", nome)));
		conteudo.append(destaques);

		const botoes = criar("div", "doc-botoes");
		botoes.append(criarLinkPdf("Manual técnico", doc.manual, "cartao-botao"));
		if (doc.banco) botoes.append(criarLinkPdf("Arquitetura do BD", doc.banco, "cartao-botao cartao-botao-secundario"));
		conteudo.append(botoes);

		cartao.append(conteudo);
		grade.append(cartao);
	});
}

function contarMinutos(nota) {
	const texto = [nota.resumo, ...nota.corpo.map((bloco) => (typeof bloco === "string" ? bloco : bloco.codigo))].join(" ");
	const palavras = texto.split(/\s+/).filter(Boolean).length;
	return Math.max(1, Math.round(palavras / 200));
}

const ICONE_SETA = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
const ICONE_SETA_VOLTAR = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>';
const ICONE_RELOGIO = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>';
const ICONE_FECHAR = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>';

function numeroDaNota(indice) {
	return String(indice + 1).padStart(2, "0");
}

// Tema e tempo de leitura; no leitor, também a posição da nota ("03 / 07").
function preencherMeta(meta, nota, indice) {
	meta.replaceChildren();
	if (indice !== undefined) {
		meta.append(criar("span", "leitor-numero", `${numeroDaNota(indice)} / ${numeroDaNota(NOTAS.length - 1)}`));
	}
	meta.append(criar("span", "nota-tema", nota.tema));
	const tempo = criar("span", "nota-tempo");
	tempo.innerHTML = ICONE_RELOGIO;
	tempo.append(`${contarMinutos(nota)} min de leitura`);
	meta.append(tempo);
}

function criarEtiquetasProjetos(nomes, projetoPorTitulo) {
	const projetos = criar("div", "habilidades");
	nomes.forEach((nome) => {
		const projeto = projetoPorTitulo[nome] || {};
		const etiqueta = criar(projeto.link ? "a" : "span", "habilidade nota-projeto");
		if (projeto.link) {
			etiqueta.href = projeto.link;
			etiqueta.target = "_blank";
			etiqueta.rel = "noopener noreferrer";
		}
		if (projeto.icone) {
			const icone = criar("img", "cartao-icone");
			icone.src = projeto.icone;
			icone.alt = "";
			icone.setAttribute("aria-hidden", "true");
			etiqueta.append(icone);
		}
		etiqueta.append(nome);
		projetos.append(etiqueta);
	});
	return projetos;
}

// Vitrine do cartão: a "citacao" da nota, se houver; senão o primeiro bloco de código;
// senão a primeira frase do texto.
function criarVitrine(nota, indice) {
	const vitrine = criar("div", "nota-vitrine");
	vitrine.setAttribute("aria-hidden", "true");
	vitrine.append(criar("span", "nota-numero", numeroDaNota(indice)));
	const codigo = nota.corpo.find((bloco) => typeof bloco !== "string");
	if (!nota.citacao && codigo) {
		const pre = criar("pre", "nota-vitrine-codigo");
		pre.append(criar("code", "", codigo.codigo));
		vitrine.append(pre);
	} else {
		const frase = nota.citacao || nota.corpo.find((bloco) => typeof bloco === "string").split(/(?<=[.!?])\s/)[0];
		vitrine.append(criar("p", "nota-vitrine-citacao", frase));
	}
	return vitrine;
}

// Leitor: um <dialog> só, reaproveitado por todas as notas, com anterior/próxima.
function criarLeitor(projetoPorTitulo, botoes) {
	const dialogo = criar("dialog", "leitor");
	dialogo.setAttribute("aria-labelledby", "leitor-titulo");

	const topo = criar("div", "leitor-topo");
	const meta = criar("p", "nota-meta");
	const fechar = criar("button", "leitor-fechar");
	fechar.type = "button";
	fechar.setAttribute("aria-label", "Fechar nota");
	fechar.title = "Fechar (Esc)";
	fechar.innerHTML = ICONE_FECHAR;
	topo.append(meta, fechar);

	const artigo = criar("article", "leitor-artigo");
	const titulo = criar("h2", "leitor-titulo");
	titulo.id = "leitor-titulo";
	const resumo = criar("p", "leitor-resumo");
	const corpo = criar("div", "nota-corpo");
	const projetos = criar("div", "leitor-projetos");

	const navegacao = criar("nav", "leitor-navegacao");
	navegacao.setAttribute("aria-label", "Outras notas");
	const criarPasso = (classe, rotulo, icone, iconeDepois) => {
		const botao = criar("button", `leitor-passo ${classe}`);
		botao.type = "button";
		const linha = criar("span", "leitor-passo-rotulo");
		linha.innerHTML = iconeDepois ? "" : icone;
		linha.append(rotulo);
		if (iconeDepois) linha.insertAdjacentHTML("beforeend", icone);
		const nome = criar("span", "leitor-passo-titulo");
		botao.append(linha, nome);
		return { botao, nome };
	};
	const anterior = criarPasso("leitor-anterior", "Anterior", ICONE_SETA_VOLTAR, false);
	const proxima = criarPasso("leitor-proxima", "Próxima", ICONE_SETA, true);
	navegacao.append(anterior.botao, proxima.botao);

	artigo.append(titulo, resumo, corpo, projetos, navegacao);
	dialogo.append(topo, artigo);
	document.getElementById("pagina").append(dialogo);

	let atual = 0;
	const prepararPasso = (passo, indice) => {
		const existe = indice >= 0 && indice < NOTAS.length;
		passo.botao.hidden = !existe;
		if (existe) passo.nome.textContent = NOTAS[indice].titulo;
	};
	const mostrar = (indice) => {
		atual = indice;
		const nota = NOTAS[indice];
		preencherMeta(meta, nota, indice);
		titulo.textContent = nota.titulo;
		resumo.textContent = nota.resumo;
		corpo.replaceChildren();
		nota.corpo.forEach((bloco) => {
			if (typeof bloco === "string") {
				corpo.append(criar("p", "nota-paragrafo", bloco));
			} else {
				const pre = criar("pre", "nota-codigo");
				pre.append(criar("code", "", bloco.codigo));
				pre.tabIndex = 0;
				corpo.append(pre);
			}
		});
		projetos.replaceChildren(criarEtiquetasProjetos(nota.projetos, projetoPorTitulo));
		prepararPasso(anterior, indice - 1);
		prepararPasso(proxima, indice + 1);
		dialogo.scrollTop = 0;
	};
	const passar = (direcao) => {
		const origem = direcao < 0 ? anterior.botao : proxima.botao;
		const outro = direcao < 0 ? proxima.botao : anterior.botao;
		const tinhaFoco = document.activeElement === origem;
		mostrar(atual + direcao);
		// Se o botão usado sumiu (chegou à primeira ou à última nota), o foco vai para o outro.
		if (tinhaFoco && origem.hidden) outro.focus();
	};
	anterior.botao.addEventListener("click", () => passar(-1));
	proxima.botao.addEventListener("click", () => passar(1));
	fechar.addEventListener("click", () => dialogo.close());
	// Clique fora do painel (no fundo escurecido) fecha.
	dialogo.addEventListener("click", (evento) => {
		if (evento.target === dialogo) dialogo.close();
	});
	// Ao fechar, o foco volta ao cartão da última nota lida.
	dialogo.addEventListener("close", () => {
		const botao = botoes[atual];
		if (botao) botao.focus({ preventScroll: true });
		const cartao = botao && botao.closest(".cartao-nota");
		if (cartao) {
			const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
			cartao.scrollIntoView({ block: "nearest", behavior: reduzir ? "auto" : "smooth" });
		}
	});

	return {
		abrir(indice) {
			mostrar(indice);
			if (!dialogo.open) dialogo.showModal();
		}
	};
}

function montarNotas() {
	const grade = document.getElementById("notas");
	const projetoPorTitulo = {};
	PROJETOS.forEach((projeto) => {
		projetoPorTitulo[projeto.titulo] = projeto;
	});
	const botoes = [];
	const leitor = criarLeitor(projetoPorTitulo, botoes);

	NOTAS.forEach((nota, indice) => {
		const cartao = criar("article", "cartao cartao-nota");
		const vitrine = criarVitrine(nota, indice);
		vitrine.addEventListener("click", () => leitor.abrir(indice));
		cartao.append(vitrine);

		const conteudo = criar("div", "cartao-conteudo");
		const meta = criar("p", "nota-meta");
		preencherMeta(meta, nota);
		conteudo.append(meta);
		conteudo.append(criar("h3", "cartao-titulo", nota.titulo));
		conteudo.append(criar("p", "cartao-descricao", nota.resumo));

		const rodape = criar("div", "nota-rodape");
		rodape.append(criarEtiquetasProjetos(nota.projetos, projetoPorTitulo));
		const botao = criar("button", "cartao-botao nota-ler", "Ler nota");
		botao.type = "button";
		botao.setAttribute("aria-haspopup", "dialog");
		botao.insertAdjacentHTML("beforeend", ICONE_SETA);
		botao.addEventListener("click", () => leitor.abrir(indice));
		botoes.push(botao);
		rodape.append(botao);
		conteudo.append(rodape);
		cartao.append(conteudo);

		// A luz do cartão segue o mouse (em %, para não depender da escala da página).
		cartao.addEventListener("pointermove", (evento) => {
			const area = cartao.getBoundingClientRect();
			cartao.style.setProperty("--luz-x", `${((evento.clientX - area.left) / area.width) * 100}%`);
			cartao.style.setProperty("--luz-y", `${((evento.clientY - area.top) / area.height) * 100}%`);
		});

		grade.append(cartao);
	});
}

// No celular as abas rolam na horizontal: garante que a aba ativa fique à vista.
function mostrarAbaNaLista(aba) {
	const lista = aba.parentElement;
	const inicio = aba.offsetLeft - lista.offsetLeft;
	const fim = inicio + aba.offsetWidth;
	if (inicio < lista.scrollLeft) lista.scrollLeft = inicio;
	else if (fim > lista.scrollLeft + lista.clientWidth) lista.scrollLeft = fim - lista.clientWidth;
}

function alternarAbas() {
	const abas = Array.from(document.querySelectorAll(".aba"));
	const ativar = (aba, focar) => {
		abas.forEach((item) => {
			const ativa = item === aba;
			item.setAttribute("aria-selected", ativa ? "true" : "false");
			item.tabIndex = ativa ? 0 : -1;
			document.getElementById(item.getAttribute("aria-controls")).hidden = !ativa;
		});
		if (focar) aba.focus();
		mostrarAbaNaLista(aba);
		document.dispatchEvent(new CustomEvent("aba-ativada", { detail: aba.id }));
		try {
			localStorage.setItem("aba", aba.id);
		} catch (erro) {}
	};
	abas.forEach((aba, indice) => {
		aba.addEventListener("click", () => ativar(aba, false));
		aba.addEventListener("keydown", (evento) => {
			let alvo = null;
			if (evento.key === "ArrowRight") alvo = abas[(indice + 1) % abas.length];
			else if (evento.key === "ArrowLeft") alvo = abas[(indice - 1 + abas.length) % abas.length];
			else if (evento.key === "Home") alvo = abas[0];
			else if (evento.key === "End") alvo = abas[abas.length - 1];
			if (alvo) {
				evento.preventDefault();
				ativar(alvo, true);
			}
		});
	});
	let salva = null;
	try {
		salva = document.getElementById(localStorage.getItem("aba"));
	} catch (erro) {}
	ativar(salva && abas.includes(salva) ? salva : abas[0], false);
}

function digitarTitulo() {
	const alvo = document.getElementById("titulo-digitado");
	const texto = alvo.dataset.texto;
	const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	if (reduzir) {
		alvo.textContent = texto;
		return;
	}
	const duracao = 2000;
	const atraso = 500;
	let inicio = null;
	const suavizar = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
	const passo = (agora) => {
		if (inicio === null) inicio = agora + atraso;
		const t = Math.min(Math.max((agora - inicio) / duracao, 0), 1);
		alvo.textContent = texto.slice(0, Math.round(suavizar(t) * texto.length));
		if (t < 1) requestAnimationFrame(passo);
	};
	requestAnimationFrame(passo);
}

function acompanharRolagem() {
	const topo = document.getElementById("topo");
	const atualizar = () => topo.classList.toggle("rolado", window.scrollY > 0);
	window.addEventListener("scroll", atualizar, { passive: true });
	atualizar();
}

function alternarTema() {
	const raiz = document.documentElement;
	const botao = document.getElementById("botao-tema");
	const aplicar = (tema) => {
		if (tema === "claro") raiz.dataset.tema = "claro";
		else delete raiz.dataset.tema;
		const proximo = tema === "claro" ? "Ativar tema escuro" : "Ativar tema claro";
		botao.setAttribute("aria-label", proximo);
		botao.title = proximo;
	};
	aplicar(raiz.dataset.tema === "claro" ? "claro" : "escuro");
	botao.addEventListener("click", () => {
		const tema = raiz.dataset.tema === "claro" ? "escuro" : "claro";
		aplicar(tema);
		try {
			localStorage.setItem("tema", tema);
		} catch (erro) {}
	});
}

document.addEventListener("DOMContentLoaded", () => {
	alternarTema();
	montarProjetos();
	montarHabilidades();
	montarDocumentacao();
	montarNotas();
	alternarAbas();
	acompanharRolagem();
	digitarTitulo();
	requestAnimationFrame(() => document.getElementById("pagina").classList.add("visivel"));
});

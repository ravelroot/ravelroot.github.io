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
	alternarAbas();
	acompanharRolagem();
	digitarTitulo();
	requestAnimationFrame(() => document.getElementById("pagina").classList.add("visivel"));
});

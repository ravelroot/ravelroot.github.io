function criar(tag, classe, texto) {
	const elemento = document.createElement(tag);
	if (classe) elemento.className = classe;
	if (texto) elemento.textContent = texto;
	return elemento;
}

// Linguagens que viram filtro na aba Projetos (só aparecem as que algum projeto usa).
const LINGUAGENS = ["Python", "Java", "TypeScript", "JavaScript", "C#", "C", "C++", "Go", "Rust", "Kotlin", "PHP", "Ruby"];

const ICONE_GITHUB = '<svg viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>';

// Posição do mouse em % do elemento (em %, para não depender da escala da página).
function marcarPonteiro(elemento, evento, nomeX, nomeY) {
	const area = elemento.getBoundingClientRect();
	elemento.style.setProperty(nomeX, `${((evento.clientX - area.left) / area.width) * 100}%`);
	elemento.style.setProperty(nomeY, `${((evento.clientY - area.top) / area.height) * 100}%`);
}

// Os cartões entram um a um quando aparecem na tela (ao abrir a aba ou ao rolar a página).
function revelarAoAparecer(cartoes) {
	const inicio = performance.now();
	const mostrar = (lista) => {
		// Na primeira carga, espera a página terminar de surgir (ver .pagina no CSS).
		const espera = Math.max(0, 1000 - (performance.now() - inicio));
		lista.forEach((cartao, ordem) => {
			cartao.style.setProperty("--atraso", `${Math.round(espera + ordem * 70)}ms`);
			cartao.classList.add("visivel");
		});
	};
	if (!("IntersectionObserver" in window)) return { repetir: () => {} };

	const observador = new IntersectionObserver((entradas) => {
		const novos = entradas.filter((entrada) => entrada.isIntersecting).map((entrada) => entrada.target);
		novos.forEach((cartao) => observador.unobserve(cartao));
		mostrar(novos);
	}, { rootMargin: "0px 0px -6% 0px" });
	cartoes.forEach((cartao) => {
		cartao.classList.add("revelar");
		observador.observe(cartao);
	});

	return {
		// Depois de um filtro, os cartões que ficaram à vista entram de novo, em sequência.
		repetir(lista) {
			lista.forEach((cartao) => {
				observador.unobserve(cartao);
				cartao.classList.remove("visivel");
			});
			void document.body.offsetWidth;
			mostrar(lista);
		}
	};
}

function montarFiltros(painel, grade, cartoes, revelacao) {
	const linguagens = LINGUAGENS
		.map((nome) => ({
			nome,
			chave: nome.toLowerCase(),
			total: cartoes.filter((item) => item.tecnologias.includes(nome.toLowerCase())).length
		}))
		.filter((linguagem) => linguagem.total > 0)
		.sort((a, b) => b.total - a.total);

	const barra = criar("div", "filtros");
	const grupo = criar("div", "filtros-botoes");
	grupo.setAttribute("role", "group");
	grupo.setAttribute("aria-label", "Filtrar projetos por linguagem");
	const resultado = criar("p", "filtros-resultado");
	resultado.setAttribute("aria-live", "polite");
	const botoes = [];

	// Filtro por uma tecnologia que não é linguagem (vem da aba Habilidades): aparece como
	// um botão a mais, já marcado, e um clique nele volta para "Todos".
	const extra = criar("button", "filtro filtro-extra");
	extra.type = "button";
	extra.hidden = true;
	extra.setAttribute("aria-pressed", "true");
	extra.addEventListener("click", () => aplicar(null, botoes[0]));

	const aplicar = (chave, escolhido) => {
		botoes.forEach((botao) => botao.setAttribute("aria-pressed", botao === escolhido ? "true" : "false"));
		if (escolhido !== extra) extra.hidden = true;
		const visiveis = [];
		cartoes.forEach((item) => {
			const mostra = chave === null || item.tecnologias.includes(chave);
			item.cartao.hidden = !mostra;
			item.etiquetas.forEach((etiqueta, indice) => {
				etiqueta.classList.toggle("habilidade-realce", chave !== null && item.tecnologias[indice] === chave);
			});
			if (mostra) visiveis.push(item.cartao);
		});
		resultado.textContent = chave === null
			? `${cartoes.length} projetos`
			: `${visiveis.length} de ${cartoes.length} projetos`;
		revelacao.repetir(visiveis);
	};

	const criarBotao = (rotulo, chave, total) => {
		const botao = criar("button", "filtro", rotulo);
		botao.type = "button";
		botao.dataset.chave = chave === null ? "" : chave;
		botao.setAttribute("aria-pressed", chave === null ? "true" : "false");
		botao.append(criar("span", "filtro-total", String(total)));
		botao.addEventListener("click", () => {
			if (botao.getAttribute("aria-pressed") !== "true") aplicar(chave, botao);
		});
		botoes.push(botao);
		grupo.append(botao);
	};
	criarBotao("Todos", null, cartoes.length);
	linguagens.forEach((linguagem) => criarBotao(linguagem.nome, linguagem.chave, linguagem.total));
	grupo.append(extra);

	resultado.textContent = `${cartoes.length} projetos`;
	barra.append(grupo, resultado);
	painel.insertBefore(barra, grade);

	return {
		filtrar(nome) {
			const chave = nome.toLowerCase();
			const botao = botoes.find((item) => item.dataset.chave === chave);
			if (botao) {
				aplicar(chave, botao);
				return;
			}
			const total = cartoes.filter((item) => item.tecnologias.includes(chave)).length;
			extra.replaceChildren(nome, criar("span", "filtro-total", String(total)));
			extra.insertAdjacentHTML("beforeend", ICONE_FECHAR);
			extra.setAttribute("aria-label", `${nome}: ${total} projetos. Remover filtro`);
			extra.title = "Remover filtro";
			extra.hidden = false;
			aplicar(chave, extra);
		}
	};
}

function montarProjetos() {
	const painel = document.getElementById("painel-projetos");
	const grade = document.getElementById("projetos");
	const manuais = {};
	if (typeof DOCUMENTACAO !== "undefined") {
		DOCUMENTACAO.forEach((doc) => {
			manuais[doc.titulo] = doc.manual;
		});
	}

	const cartoes = PROJETOS.map((projeto) => {
		const cartao = criar("article", "cartao cartao-projeto");

		// Vitrine: repositório, linguagem principal e o ícone grande sobre um pontilhado
		const vitrine = criar("a", "projeto-vitrine");
		vitrine.href = projeto.link;
		vitrine.target = "_blank";
		vitrine.rel = "noopener noreferrer";
		vitrine.tabIndex = -1;
		vitrine.setAttribute("aria-hidden", "true");
		const topo = criar("div", "projeto-vitrine-topo");
		const repo = criar("span", "projeto-repo");
		repo.innerHTML = ICONE_GITHUB;
		repo.append(criar("span", "projeto-repo-nome", projeto.link.replace("https://github.com/", "")));
		repo.append(criar("span", "projeto-cursor"));
		topo.append(repo, criar("span", "projeto-linguagem", projeto.tecnologias[0]));
		vitrine.append(topo);
		if (projeto.icone) {
			const icone = criar("img", "projeto-icone");
			icone.src = projeto.icone;
			icone.alt = "";
			vitrine.append(icone);
		}
		cartao.append(vitrine);

		const conteudo = criar("div", "cartao-conteudo");
		if (projeto.categoria) {
			const meta = criar("p", "nota-meta");
			meta.append(criar("span", "nota-tema", projeto.categoria));
			conteudo.append(meta);
		}
		conteudo.append(criar("h3", "cartao-titulo", projeto.titulo));
		conteudo.append(criar("p", "cartao-descricao", projeto.descricao));

		const habilidades = criar("div", "habilidades");
		const etiquetas = projeto.tecnologias.map((nome) => {
			const etiqueta = criar("span", "habilidade", nome);
			habilidades.append(etiqueta);
			return etiqueta;
		});
		conteudo.append(habilidades);

		const botoes = criar("div", "doc-botoes projeto-botoes");
		const ver = criar("a", "cartao-botao projeto-ver", "Ver projeto");
		ver.href = projeto.link;
		ver.target = "_blank";
		ver.rel = "noopener noreferrer";
		ver.insertAdjacentHTML("beforeend", ICONE_SETA);
		botoes.append(ver);
		if (manuais[projeto.titulo]) {
			botoes.append(criarLinkPdf("Manual técnico", manuais[projeto.titulo], "cartao-botao cartao-botao-secundario"));
		}
		conteudo.append(botoes);
		cartao.append(conteudo);

		// A luz do cartão e o pontilhado da vitrine seguem o mouse.
		cartao.addEventListener("pointermove", (evento) => {
			marcarPonteiro(cartao, evento, "--luz-x", "--luz-y");
			marcarPonteiro(vitrine, evento, "--ponto-x", "--ponto-y");
		});

		grade.append(cartao);
		return { cartao, etiquetas, tecnologias: projeto.tecnologias.map((nome) => nome.toLowerCase()) };
	});

	const revelacao = revelarAoAparecer(cartoes.map((item) => item.cartao));
	return montarFiltros(painel, grade, cartoes, revelacao);
}

// Desenhos do topo de cada cartão de habilidades (campo "icone" em js/habilidades.js).
const ICONES_AREAS = {
	tela: '<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>',
	servidor: '<rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><path d="M6 6h.01M6 18h.01"/>',
	banco: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/>',
	ia: '<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/><path d="M19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9z"/>',
	ferramentas: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
	// Usados no fim da aba Destaques (DESTAQUES_EM_COMUM, em js/destaques.js)
	build: '<path d="M21 12a9 9 0 1 1-2.64-6.36"/><path d="M21 4v5h-5"/><path d="m8.5 12.5 2.5 2.5 5-5.5"/>',
	escudo: '<path d="M12 22s8-3.5 8-10V5l-8-3-8 3v7c0 6.5 8 10 8 10z"/><path d="M9.5 12 11 13.5l3.5-3.5"/>',
	livro: '<path d="M2 4h6a4 4 0 0 1 4 4v13a3 3 0 0 0-3-3H2z"/><path d="M22 4h-6a4 4 0 0 0-4 4v13a3 3 0 0 1 3-3h7z"/>'
};

function juntarNomes(nomes) {
	return nomes.length > 1 ? `${nomes.slice(0, -1).join(", ")} e ${nomes[nomes.length - 1]}` : nomes[0];
}

// Abre a aba Projetos já filtrada pela tecnologia escolhida.
function verProjetosCom(nome, projetos) {
	document.getElementById("aba-projetos").click();
	projetos.filtrar(nome);
	const abas = document.querySelector(".abas");
	const altura = document.getElementById("topo").getBoundingClientRect().height;
	const posicao = abas.getBoundingClientRect().top;
	if (posicao < altura || posicao > window.innerHeight * 0.6) {
		const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		window.scrollTo({ top: window.scrollY + posicao - altura - 16, behavior: reduzir ? "auto" : "smooth" });
	}
	document.getElementById("aba-projetos").focus({ preventScroll: true });
}

function montarHabilidades(projetos) {
	const painel = document.getElementById("painel-habilidades");
	const grade = document.getElementById("habilidades");

	// Em quais projetos cada tecnologia aparece (pelo nome exato, sem diferenciar maiúsculas).
	const usos = {};
	PROJETOS.forEach((projeto) => {
		projeto.tecnologias.forEach((nome) => {
			const chave = nome.toLowerCase();
			(usos[chave] = usos[chave] || []).push(projeto.titulo);
		});
	});

	const usadas = new Set();
	let totalGeral = 0;
	const cartoes = HABILIDADES.map((area) => {
		const cartao = criar("article", area.largo ? "cartao cartao-largo cartao-area" : "cartao cartao-area");
		const conteudo = criar("div", "cartao-conteudo");

		const topo = criar("div", "area-topo");
		if (ICONES_AREAS[area.icone]) {
			const icone = criar("span", "area-icone");
			icone.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONES_AREAS[area.icone]}</svg>`;
			topo.append(icone);
		}
		topo.append(criar("h3", "cartao-titulo", area.titulo));
		const total = area.grupos.reduce((soma, grupo) => soma + grupo.itens.length, 0);
		totalGeral += total;
		topo.append(criar("span", "area-total", `${total} itens`));
		conteudo.append(topo);

		let ordem = 0;
		area.grupos.forEach((grupo) => {
			conteudo.append(criar("p", "grupo-rotulo", grupo.nome));
			const lista = criar("div", "habilidades habilidades-grupo");
			grupo.itens.forEach((nome) => {
				const projetosDaTecnologia = usos[nome.toLowerCase()];
				let etiqueta;
				if (projetosDaTecnologia) {
					usadas.add(nome.toLowerCase());
					const quantidade = projetosDaTecnologia.length;
					const resumo = `${quantidade} ${quantidade === 1 ? "projeto" : "projetos"}: ${juntarNomes(projetosDaTecnologia)}`;
					etiqueta = criar("button", "habilidade habilidade-usada", nome);
					etiqueta.type = "button";
					etiqueta.setAttribute("aria-label", `${nome}, usada em ${resumo}. Ver na aba Projetos`);
					etiqueta.addEventListener("click", () => verProjetosCom(nome, projetos));
				} else {
					etiqueta = criar("span", "habilidade", nome);
				}
				etiqueta.style.setProperty("--i", ordem);
				ordem += 1;
				lista.append(etiqueta);
			});
			conteudo.append(lista);
		});

		cartao.append(conteudo);
		cartao.addEventListener("pointermove", (evento) => marcarPonteiro(cartao, evento, "--luz-x", "--luz-y"));
		grade.append(cartao);
		return cartao;
	});

	// Barra acima da grade: todas ou só as que aparecem nos projetos.
	const barra = criar("div", "filtros");
	const grupo = criar("div", "filtros-botoes");
	grupo.setAttribute("role", "group");
	grupo.setAttribute("aria-label", "Mostrar habilidades");
	const opcoes = [
		{ rotulo: "Todas", total: totalGeral, so: false },
		{ rotulo: "Usadas nos projetos", total: usadas.size, so: true }
	];
	const botoes = opcoes.map((opcao) => {
		const botao = criar("button", "filtro", opcao.rotulo);
		botao.type = "button";
		botao.setAttribute("aria-pressed", opcao.so ? "false" : "true");
		botao.append(criar("span", "filtro-total", String(opcao.total)));
		botao.addEventListener("click", () => {
			botoes.forEach((outro) => outro.setAttribute("aria-pressed", outro === botao ? "true" : "false"));
			grade.classList.toggle("so-usadas", opcao.so);
		});
		grupo.append(botao);
		return botao;
	});
	barra.append(grupo);
	painel.insertBefore(barra, grade);

	revelarAoAparecer(cartoes);
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

// ---------- Aba Destaques ----------

const ICONE_AMPLIAR = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>';
const ICONE_EXTERNO = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 3h7v7M10 14 21 3"/><path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"/></svg>';

function doisDigitos(numero) {
	return String(numero).padStart(2, "0");
}

function temaEscuro() {
	return document.documentElement.dataset.tema !== "claro";
}

// Rola até um elemento, descontando o topo fixo (respeita prefers-reduced-motion).
function rolarAte(elemento) {
	const altura = document.getElementById("topo").getBoundingClientRect().height;
	const posicao = elemento.getBoundingClientRect().top;
	const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	window.scrollTo({ top: window.scrollY + posicao - altura - 16, behavior: reduzir ? "auto" : "smooth" });
}

// Visualizador de imagens da aba Destaques: um <dialog> só, reaproveitado pelas duas galerias,
// com anterior/próxima (dá a volta no fim), setas do teclado e deslize no celular.
function criarGaleria() {
	const dialogo = criar("dialog", "galeria");
	dialogo.setAttribute("aria-label", "Imagem ampliada");

	const topo = criar("div", "galeria-topo");
	const contador = criar("p", "nota-meta galeria-contador");
	const fechar = criar("button", "leitor-fechar");
	fechar.type = "button";
	fechar.setAttribute("aria-label", "Fechar imagem");
	fechar.title = "Fechar (Esc)";
	fechar.innerHTML = ICONE_FECHAR;
	topo.append(contador, fechar);

	const palco = criar("div", "galeria-palco");
	const imagem = criar("img", "galeria-imagem");
	imagem.decoding = "async";
	const criarPasso = (classe, rotulo, icone) => {
		const botao = criar("button", `galeria-passo ${classe}`);
		botao.type = "button";
		botao.setAttribute("aria-label", rotulo);
		botao.title = rotulo;
		botao.innerHTML = icone;
		return botao;
	};
	const anterior = criarPasso("galeria-anterior", "Imagem anterior", ICONE_SETA_VOLTAR);
	const proxima = criarPasso("galeria-proxima", "Próxima imagem", ICONE_SETA);
	palco.append(imagem, anterior, proxima);

	const legenda = criar("p", "galeria-legenda");
	legenda.setAttribute("aria-live", "polite");
	dialogo.append(topo, palco, legenda);
	document.getElementById("pagina").append(dialogo);

	let lista = [];
	let atual = 0;
	let nome = "";
	let origem = null;
	// A capa tem uma imagem para cada tema; as fotos da galeria, uma só.
	const fonte = (item) => (temaEscuro() && item.imagemEscura) || item.imagem;
	const mostrar = (indice) => {
		atual = (indice + lista.length) % lista.length;
		const item = lista[atual];
		imagem.classList.remove("carregada");
		imagem.alt = item.legenda;
		imagem.src = fonte(item);
		if (imagem.complete) imagem.classList.add("carregada");
		contador.replaceChildren(
			criar("span", "leitor-numero", `${doisDigitos(atual + 1)} / ${doisDigitos(lista.length)}`),
			criar("span", "nota-tema", nome)
		);
		legenda.textContent = item.legenda;
		// As vizinhas já ficam carregadas para a troca não piscar.
		[atual - 1, atual + 1].forEach((vizinha) => {
			new Image().src = fonte(lista[(vizinha + lista.length) % lista.length]);
		});
	};
	imagem.addEventListener("load", () => imagem.classList.add("carregada"));
	anterior.addEventListener("click", () => mostrar(atual - 1));
	proxima.addEventListener("click", () => mostrar(atual + 1));
	fechar.addEventListener("click", () => dialogo.close());
	dialogo.addEventListener("keydown", (evento) => {
		if (evento.key === "ArrowLeft" || evento.key === "ArrowRight") {
			evento.preventDefault();
			mostrar(atual + (evento.key === "ArrowLeft" ? -1 : 1));
		}
	});
	// Clique fora do painel (no fundo escurecido) fecha.
	dialogo.addEventListener("click", (evento) => {
		if (evento.target === dialogo) dialogo.close();
	});
	// No celular, deslizar o dedo para o lado troca de imagem.
	let inicioX = null;
	palco.addEventListener("pointerdown", (evento) => {
		inicioX = evento.pointerType === "mouse" ? null : evento.clientX;
	});
	palco.addEventListener("pointerup", (evento) => {
		if (inicioX === null) return;
		const distancia = evento.clientX - inicioX;
		inicioX = null;
		if (Math.abs(distancia) > 40) mostrar(atual + (distancia < 0 ? 1 : -1));
	});
	palco.addEventListener("pointercancel", () => {
		inicioX = null;
	});
	// Ao fechar, o foco volta para a foto que abriu o visualizador.
	dialogo.addEventListener("close", () => {
		if (origem) origem.focus({ preventScroll: true });
	});

	return {
		abrir(itens, indice, titulo, botao) {
			lista = itens;
			nome = titulo;
			origem = botao;
			const varias = itens.length > 1;
			anterior.hidden = !varias;
			proxima.hidden = !varias;
			mostrar(indice);
			if (!dialogo.open) dialogo.showModal();
		}
	};
}

function criarRotulo(texto, extra) {
	const rotulo = criar("h4", "destaque-rotulo");
	rotulo.append(criar("span", "", texto));
	if (extra) rotulo.append(criar("span", "destaque-rotulo-extra", extra));
	return rotulo;
}

function criarLinkExterno(texto, url, classe, icone) {
	const link = criar("a", classe);
	link.href = url;
	link.target = "_blank";
	link.rel = "noopener noreferrer";
	link.innerHTML = icone;
	link.append(texto);
	return link;
}

function montarDestaques() {
	const area = document.getElementById("destaques");
	const projetoPorTitulo = {};
	PROJETOS.forEach((projeto) => {
		projetoPorTitulo[projeto.titulo] = projeto;
	});
	const documentoPorTitulo = {};
	if (typeof DOCUMENTACAO !== "undefined") {
		DOCUMENTACAO.forEach((doc) => {
			documentoPorTitulo[doc.titulo] = doc;
		});
	}
	const galeria = criarGaleria();
	const blocos = [];
	const bloco = (tag, classe) => {
		const elemento = criar(tag, `${classe} destaque-bloco`);
		blocos.push(elemento);
		return elemento;
	};
	const ancora = (titulo) => `destaque-${titulo.toLowerCase()}`;

	// Sumário: um atalho para cada projeto, com ícone, categoria e versão.
	const sumario = bloco("nav", "destaques-sumario");
	sumario.setAttribute("aria-label", "Projetos em destaque");
	DESTAQUES.forEach((destaque, indice) => {
		const projeto = projetoPorTitulo[destaque.titulo] || {};
		const atalho = criar("a", "destaques-atalho");
		atalho.href = `#${ancora(destaque.titulo)}`;
		atalho.append(criar("span", "destaques-atalho-numero", doisDigitos(indice + 1)));
		if (projeto.icone) {
			// A moldura fica num <span> à parte: o filtro do tema claro escurece só o ícone.
			const moldura = criar("span", "destaques-atalho-moldura");
			const icone = criar("img", "destaques-atalho-icone");
			icone.src = projeto.icone;
			icone.alt = "";
			moldura.append(icone);
			atalho.append(moldura);
		}
		const textos = criar("span", "destaques-atalho-textos");
		textos.append(criar("span", "destaques-atalho-titulo", destaque.titulo));
		textos.append(criar("span", "destaques-atalho-categoria", `${projeto.categoria || ""} · v${destaque.versao}`));
		atalho.append(textos);
		atalho.insertAdjacentHTML("beforeend", ICONE_SETA);
		atalho.addEventListener("click", (evento) => {
			evento.preventDefault();
			rolarAte(document.getElementById(ancora(destaque.titulo)));
		});
		atalho.addEventListener("pointermove", (evento) => marcarPonteiro(atalho, evento, "--luz-x", "--luz-y"));
		sumario.append(atalho);
	});
	area.append(sumario);

	DESTAQUES.forEach((destaque, indice) => {
		const projeto = projetoPorTitulo[destaque.titulo] || {};
		const documento = documentoPorTitulo[destaque.titulo] || {};
		const secao = criar("article", "destaque");
		secao.id = ancora(destaque.titulo);
		secao.setAttribute("aria-labelledby", `${secao.id}-titulo`);

		// Cabeçalho: posição, categoria, versão, nome, frase e links
		const cabecalho = bloco("header", "destaque-cabecalho");
		const meta = criar("p", "nota-meta destaque-meta");
		meta.append(criar("span", "leitor-numero", `Destaque ${doisDigitos(indice + 1)} / ${doisDigitos(DESTAQUES.length)}`));
		if (projeto.categoria) meta.append(criar("span", "nota-tema", projeto.categoria));
		meta.append(criar("span", "destaque-versao", `v${destaque.versao}`));
		const titulo = criar("h3", "destaque-titulo");
		titulo.id = `${secao.id}-titulo`;
		if (projeto.icone) {
			const icone = criar("img", "destaque-icone");
			icone.src = projeto.icone;
			icone.alt = "";
			icone.setAttribute("aria-hidden", "true");
			titulo.append(icone);
		}
		titulo.append(destaque.titulo);
		const botoes = criar("div", "doc-botoes destaque-botoes");
		if (destaque.online) botoes.append(criarLinkExterno("Abrir no navegador", destaque.online, "cartao-botao", ICONE_EXTERNO));
		if (projeto.link) botoes.append(criarLinkExterno("Código no GitHub", projeto.link, "cartao-botao cartao-botao-secundario", ICONE_GITHUB));
		if (documento.manual) botoes.append(criarLinkPdf("Manual técnico", documento.manual, "cartao-botao cartao-botao-secundario"));
		if (documento.banco) botoes.append(criarLinkPdf("Arquitetura do BD", documento.banco, "cartao-botao cartao-botao-secundario"));
		cabecalho.append(meta, titulo, criar("p", "destaque-frase", destaque.frase), botoes);
		secao.append(cabecalho);

		// Capa: a tela principal numa janela, com uma imagem para cada tema da página
		const itensDaGaleria = [
			{ imagem: destaque.capa.claro, imagemEscura: destaque.capa.escuro, legenda: destaque.capa.legenda },
			...destaque.galeria
		];
		const capa = bloco("figure", "destaque-capa");
		const janela = criar("div", "destaque-janela");
		const barra = criar("div", "destaque-janela-barra");
		const pontos = criar("span", "terminal-pontos destaque-janela-pontos");
		[["#eb695d", "#d45246"], ["#ebd65d", "#d4b346"], ["#5deb5d", "#3bb636"]].forEach(([cor, hover]) => {
			const ponto = criar("span", "ponto");
			ponto.style.setProperty("--cor", cor);
			ponto.style.setProperty("--cor-hover", hover);
			pontos.append(ponto);
		});
		barra.append(pontos, criar("span", "destaque-janela-endereco", destaque.endereco || ""));
		const tela = criar("button", "destaque-janela-tela");
		tela.type = "button";
		tela.setAttribute("aria-label", `Ampliar a tela principal do ${destaque.titulo}`);
		[["destaque-capa-escura", destaque.capa.escuro], ["destaque-capa-clara", destaque.capa.claro]].forEach(([classe, src]) => {
			const imagem = criar("img", classe);
			imagem.src = src;
			imagem.alt = destaque.capa.legenda;
			imagem.loading = "lazy";
			imagem.decoding = "async";
			imagem.width = 1600;
			imagem.height = 1000;
			tela.append(imagem);
		});
		const ampliar = criar("span", "destaque-ampliar");
		ampliar.innerHTML = ICONE_AMPLIAR;
		ampliar.append("Ampliar");
		tela.append(ampliar);
		tela.addEventListener("click", () => galeria.abrir(itensDaGaleria, 0, destaque.titulo, tela));
		janela.append(barra, tela);
		capa.append(janela, criar("figcaption", "destaque-legenda", destaque.capa.legenda));
		secao.append(capa);

		// Números
		const numeros = bloco("dl", "destaque-numeros");
		destaque.numeros.forEach((numero) => {
			const item = criar("div", "destaque-numero");
			// Na página o valor vem em cima (column-reverse), mas para o leitor de tela o rótulo vem antes.
			item.append(criar("dt", "destaque-numero-rotulo", numero.rotulo), criar("dd", "destaque-numero-valor", numero.valor));
			numeros.append(item);
		});
		secao.append(numeros);

		// A ideia (texto) e as tecnologias, lado a lado no computador
		const colunas = bloco("div", "destaque-colunas");
		const ideia = criar("div", "destaque-ideia");
		ideia.append(criarRotulo("A ideia"));
		destaque.historia.forEach((paragrafo) => ideia.append(criar("p", "nota-paragrafo", paragrafo)));
		const pilha = criar("aside", "destaque-pilha");
		pilha.setAttribute("aria-label", `Tecnologias do ${destaque.titulo}`);
		pilha.append(criarRotulo("Tecnologias"));
		destaque.pilha.forEach((grupo) => {
			pilha.append(criar("p", "grupo-rotulo", grupo.nome));
			const etiquetas = criar("div", "habilidades habilidades-grupo");
			grupo.itens.forEach((nome) => etiquetas.append(criar("span", "habilidade", nome)));
			pilha.append(etiquetas);
		});
		colunas.append(ideia, pilha);
		secao.append(colunas);

		// Galeria: as fotos abrem no visualizador (a capa é a primeira da sequência)
		const blocoGaleria = bloco("section", "destaque-secao");
		blocoGaleria.append(criarRotulo("Galeria", `${destaque.galeria.length} telas · clique para ampliar`));
		const grade = criar("div", "destaque-galeria");
		destaque.galeria.forEach((foto, posicao) => {
			const figura = criar("figure", "destaque-foto");
			const botao = criar("button", "destaque-foto-botao");
			botao.type = "button";
			botao.setAttribute("aria-label", `Ampliar: ${foto.legenda}`);
			const imagem = criar("img", "destaque-foto-imagem");
			imagem.src = foto.miniatura || foto.imagem;
			imagem.alt = "";
			imagem.loading = "lazy";
			imagem.decoding = "async";
			imagem.width = 800;
			imagem.height = 500;
			const lupa = criar("span", "destaque-foto-lupa");
			lupa.innerHTML = ICONE_AMPLIAR;
			botao.append(imagem, lupa);
			botao.addEventListener("click", () => galeria.abrir(itensDaGaleria, posicao + 1, destaque.titulo, botao));
			figura.append(botao, criar("figcaption", "destaque-foto-legenda", foto.legenda));
			grade.append(figura);
		});
		blocoGaleria.append(grade);
		secao.append(blocoGaleria);

		// Por dentro: as decisões de engenharia, numeradas
		const blocoDetalhes = bloco("section", "destaque-secao");
		blocoDetalhes.append(criarRotulo("Por dentro", `${destaque.porDentro.length} decisões de engenharia`));
		const detalhes = criar("div", "destaque-detalhes");
		destaque.porDentro.forEach((detalhe, posicao) => {
			const cartao = criar("article", "destaque-detalhe");
			cartao.append(criar("span", "destaque-detalhe-numero", doisDigitos(posicao + 1)));
			cartao.append(criar("h5", "destaque-detalhe-titulo", detalhe.titulo));
			cartao.append(criar("p", "destaque-detalhe-texto", detalhe.texto));
			if (detalhe.codigo) {
				const pre = criar("pre", "nota-codigo destaque-detalhe-codigo");
				pre.append(criar("code", "", detalhe.codigo));
				pre.tabIndex = 0;
				cartao.append(pre);
			}
			cartao.addEventListener("pointermove", (evento) => marcarPonteiro(cartao, evento, "--luz-x", "--luz-y"));
			detalhes.append(cartao);
		});
		blocoDetalhes.append(detalhes);
		secao.append(blocoDetalhes);

		// Arquitetura (no estilo do terminal) e os resultados dos testes
		const tecnico = bloco("div", "destaque-colunas destaque-tecnico");
		const arquitetura = criar("div", "destaque-arquitetura");
		arquitetura.append(criarRotulo("Arquitetura"));
		const terminal = criar("div", "terminal");
		const terminalBarra = criar("div", "terminal-barra");
		const terminalPontos = pontos.cloneNode(true);
		terminalPontos.className = "terminal-pontos";
		terminalBarra.append(terminalPontos, criar("p", "terminal-titulo", `${destaque.titulo.toLowerCase()} --arquitetura`));
		const desenho = criar("pre", "destaque-arquitetura-desenho");
		desenho.append(criar("code", "", destaque.arquitetura));
		desenho.tabIndex = 0;
		desenho.setAttribute("aria-label", `Diagrama da arquitetura do ${destaque.titulo}`);
		terminal.append(terminalBarra, desenho);
		arquitetura.append(terminal);

		const testes = criar("div", "destaque-testes");
		testes.append(criarRotulo("Testes e verificações"));
		const tabela = criar("table", "destaque-tabela");
		const legendaTabela = criar("caption", "", `Resultados da rodada de testes da versão ${destaque.versao} do ${destaque.titulo}`);
		const corpo = criar("tbody");
		destaque.testes.forEach((teste) => {
			const linha = criar("tr");
			const suite = criar("th", "destaque-tabela-suite");
			suite.scope = "row";
			suite.append(criar("span", "destaque-tabela-nome", teste.suite), criar("span", "destaque-tabela-detalhe", teste.detalhe));
			linha.append(suite, criar("td", "destaque-tabela-resultado", teste.resultado));
			corpo.append(linha);
		});
		tabela.append(legendaTabela, corpo);
		testes.append(tabela);
		tecnico.append(arquitetura, testes);
		secao.append(tecnico);

		area.append(secao);
	});

	// O que os dois têm em comum, e o caminho de volta para os outros projetos
	const comum = bloco("section", "destaques-comum");
	comum.setAttribute("aria-labelledby", "destaques-comum-titulo");
	const tituloComum = criar("h3", "destaques-comum-titulo", DESTAQUES_EM_COMUM.titulo);
	tituloComum.id = "destaques-comum-titulo";
	comum.append(tituloComum, criar("p", "destaques-comum-texto", DESTAQUES_EM_COMUM.texto));
	const itens = criar("div", "destaques-comum-itens");
	DESTAQUES_EM_COMUM.itens.forEach((item) => {
		const cartao = criar("article", "destaques-comum-item");
		const topo = criar("div", "area-topo");
		if (ICONES_AREAS[item.icone]) {
			const icone = criar("span", "area-icone");
			icone.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONES_AREAS[item.icone]}</svg>`;
			topo.append(icone);
		}
		topo.append(criar("h4", "destaques-comum-item-titulo", item.titulo));
		cartao.append(topo, criar("p", "cartao-descricao", item.texto));
		itens.append(cartao);
	});
	comum.append(itens);

	const outros = PROJETOS.length - DESTAQUES.length;
	const rodape = criar("div", "destaques-comum-rodape");
	rodape.append(criar("p", "", `Os outros ${outros} projetos, de sistemas distribuídos a um alocador de memória em C, estão na aba Projetos.`));
	const voltar = criar("button", "cartao-botao destaques-ver-todos", "Ver todos os projetos");
	voltar.type = "button";
	voltar.insertAdjacentHTML("beforeend", ICONE_SETA);
	voltar.addEventListener("click", () => {
		const aba = document.getElementById("aba-projetos");
		aba.click();
		aba.focus({ preventScroll: true });
		rolarAte(document.querySelector(".abas"));
	});
	rodape.append(voltar);
	comum.append(rodape);
	area.append(comum);

	revelarAoAparecer(blocos);
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
function criarVitrine(nota) {
	const vitrine = criar("div", "nota-vitrine");
	vitrine.setAttribute("aria-hidden", "true");
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
		projetos.replaceChildren();
		if (nota.projetos.length) projetos.append(criarEtiquetasProjetos(nota.projetos, projetoPorTitulo));
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
		const vitrine = criarVitrine(nota);
		vitrine.addEventListener("click", () => leitor.abrir(indice));
		cartao.append(vitrine);

		const conteudo = criar("div", "cartao-conteudo");
		const meta = criar("p", "nota-meta");
		preencherMeta(meta, nota);
		conteudo.append(meta);
		conteudo.append(criar("h3", "cartao-titulo", nota.titulo));
		conteudo.append(criar("p", "cartao-descricao", nota.resumo));

		const rodape = criar("div", "nota-rodape");
		if (nota.projetos.length) rodape.append(criarEtiquetasProjetos(nota.projetos, projetoPorTitulo));
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
	const projetos = montarProjetos();
	montarHabilidades(projetos);
	montarDocumentacao();
	if (typeof DESTAQUES !== "undefined") montarDestaques();
	montarNotas();
	alternarAbas();
	acompanharRolagem();
	digitarTitulo();
	requestAnimationFrame(() => document.getElementById("pagina").classList.add("visivel"));
});

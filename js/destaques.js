// Aba Destaques: os dois projetos apresentados em detalhe.
// "titulo" precisa ser igual ao de js/projetos.js (de onde vêm ícone, categoria e repositório)
// e ao de js/documentacao.js (de onde vêm o manual técnico e o PDF do banco).
// "capa" tem uma imagem para cada tema da página; a galeria usa "miniatura" na grade
// e "imagem" no visualizador em tela cheia. Os números dos testes vêm dos READMEs dos projetos.
const DESTAQUES = [
	{
		titulo: "Crivo",
		versao: "2.2.0",
		frase: "Um editor de pixel art que trata a imagem como ela é: uma matriz de pixels RGBA.",
		online: "https://ravelroot.github.io/Pixel-Art-Matrix-Editor/",
		endereco: "ravelroot.github.io/Pixel-Art-Matrix-Editor",
		capa: {
			claro: "assets/destaques/crivo/camadas-grupos.webp",
			escuro: "assets/destaques/crivo/escuro.webp",
			legenda: "O exemplo Modos de mesclagem: um nascer do sol em 16 × 16 com um grupo, camadas em multiplicar, tela e sobrepor e uma camada de referência, que aparece no editor e fica fora das exportações."
		},
		numeros: [
			{ valor: "23", rotulo: "ferramentas de desenho" },
			{ valor: "19", rotulo: "modos de mistura" },
			{ valor: "263", rotulo: "testes, todos passando" },
			{ valor: "3", rotulo: "linguagens, os mesmos pixels" }
		],
		historia: [
			"A premissa do Crivo é que o editor mostre exatamente o que o jogo vai receber. A imagem não é tratada como uma pintura, e sim como o que ela é: uma matriz de pixels RGBA, em que cada traço altera números que podem sair do editor como PNG, GIF, sprite sheet ou código-fonte em JSON, CSV, JavaScript, Python, C e Java.",
			"Em volta dessa matriz está um editor completo: 23 ferramentas, seleção por retângulo, elipse, laço e varinha mágica, camadas em grupos com 19 modos de mistura, animação quadro a quadro com tags e cels vinculados, tilemaps, slices e arquivos .ase com camadas. As paletas clássicas já vêm prontas: Game Boy, NES, Pico-8, CGA, Commodore 64 e 1 bit.",
			"E ele roda onde for mais prático: como Crivo.exe no Windows, sem instalar nada; como servidor Django com PostgreSQL, API e histórico de versões; ou num único Crivo.html que abre com dois cliques, sem internet. A mesma versão está publicada no GitHub Pages."
		],
		pilha: [
			{ nome: "Editor", itens: ["JavaScript", "Canvas 2D", "HTML5", "CSS3"] },
			{ nome: "Servidor e API", itens: ["Python 3.13", "Django 6.1", "Gunicorn", "PostgreSQL 17", "SQLite"] },
			{ nome: "Desktop e linha de comando", itens: ["Go 1.24", "WebView2", "Java 21"] },
			{ nome: "Qualidade e entrega", itens: ["Node Test Runner", "Playwright", "Ruff", "Bandit", "Docker", "GitHub Actions"] }
		],
		galeria: [
			{ imagem: "assets/destaques/crivo/editor.webp", miniatura: "assets/destaques/crivo/mini/editor.webp", legenda: "A poção de exemplo aberta: três camadas, quatro quadros na linha do tempo e a paleta Crivo ao lado." },
			{ imagem: "assets/destaques/crivo/pontilhado.webp", miniatura: "assets/destaques/crivo/mini/pontilhado.webp", legenda: "Céu feito com o degradê pontilhado de Bayer e nuvens com o pincel de pontilhado. O padrão é fixo na matriz, então traços vizinhos se encaixam sem emendas." },
			{ imagem: "assets/destaques/crivo/simetria.webp", miniatura: "assets/destaques/crivo/mini/simetria.webp", legenda: "Simetria horizontal e vertical: cada traço vira quatro, com os dois eixos tracejados na tela." },
			{ imagem: "assets/destaques/crivo/ladrilho.webp", miniatura: "assets/destaques/crivo/mini/ladrilho.webp", legenda: "Modo ladrilho, no tema escuro: o tile de tijolos repetido 3 × 3 para conferir as emendas da textura." },
			{ imagem: "assets/destaques/crivo/tags.webp", miniatura: "assets/destaques/crivo/mini/tags.webp", legenda: "Animação com tags: a faixa Nascer do sol acima dos quadros e o diálogo de nova tag, com direção e repetições." },
			{ imagem: "assets/destaques/crivo/editor-paleta.webp", miniatura: "assets/destaques/crivo/mini/editor-paleta.webp", legenda: "Editor de paleta com seletor HSV, rampa entre duas cores e ordenação por matiz, luminosidade ou saturação." },
			{ imagem: "assets/destaques/crivo/exportar-dados.webp", miniatura: "assets/destaques/crivo/mini/exportar-dados.webp", legenda: "A matriz exportada como dado: o índice da paleta de cada pixel, pronto para entrar no código do jogo." },
			{ imagem: "assets/destaques/crivo/sprite-sheet.webp", miniatura: "assets/destaques/crivo/mini/sprite-sheet.webp", legenda: "Sprite sheet dos quatro quadros, com o JSON das posições no formato que Phaser, PixiJS e Godot leem." },
			{ imagem: "assets/destaques/crivo/abas.webp", miniatura: "assets/destaques/crivo/mini/abas.webp", legenda: "Vários projetos abertos em abas e a janela de pré-visualização (F7), com a própria reprodução." }
		],
		porDentro: [
			{
				titulo: "A matriz é a imagem",
				texto: "Cada camada é um Uint32Array: um inteiro de 32 bits por pixel, com os bytes R, G, B e A na ordem da memória, o mesmo layout do ImageData. A tela é composta direto num ImageData e ampliada por vizinho mais próximo, de 100% a 12.800%, sem suavização: o que aparece no visor é o que sai na exportação."
			},
			{
				titulo: "RLE com varint",
				texto: "Cada célula (quadro × camada) é gravada como sequências de pixels iguais: o tamanho em varint, 7 bits por byte, seguido dos 4 bytes da cor. Um sprite 32 × 32 com fundo transparente costuma caber em poucas dezenas de bytes, e o mesmo formato é lido em JavaScript, Python e Java.",
				codigo: "e8 07 │ 00 00 00 00   1.000 pixels transparentes\n03    │ 5d 1c 16 ff   3 pixels vinho (#5d1c16)"
			},
			{
				titulo: "Histórico que não estoura a memória",
				texto: "Um traço guarda só os índices alterados, com a cor antes e a cor depois: 12 bytes por pixel. Um balde numa área enorme vira o RLE da célula, e mudanças de estrutura viram um instantâneo comprimido. O histórico é ilimitado, e a barra de status mostra quanto ele ocupa."
			},
			{
				titulo: "Algoritmos clássicos, escritos à mão",
				texto: "Bresenham nas linhas, elipse de ponto médio, balde por varredura com 4 ou 8 vizinhos, pontilhado ordenado de Bayer e RotSprite para girar sem borrar. Os codificadores de GIF (LZW), APNG, ZIP e zlib também são próprios, e o .ase foi implementado a partir da especificação pública."
			},
			{
				titulo: "Cor pensada para pixel art",
				texto: "O gerador de tons cria rampas de sombra e luz em OKLCH, com o desvio de matiz que a pixel art feita à mão costuma ter: sombras puxam para o azul, luzes para o amarelo. O pincel de clarear e escurecer anda um degrau na rampa da paleta, ordenada por luminosidade no OKLab."
			},
			{
				titulo: "Mesmos pixels em três linguagens",
				texto: "O editor (JavaScript), o servidor (Python) e a linha de comando (Java) compõem grupos e os 19 modos de mistura cada um do seu lado. Um teste de paridade monta 30 documentos aleatórios e exige os mesmos pixels nos três."
			}
		],
		arquitetura: [
			"Crivo.exe  (Go + WebView2)",
			"  └─► Crivo.html embutido · janela Salvar como nativa · F11",
			"",
			"Navegador  (JavaScript + Canvas 2D)",
			"  ├─► IndexedDB ................. sem servidor",
			"  └─► HTTP/JSON + CSRF",
			"        └─► Django 6.1 + Gunicorn",
			"              └─► PostgreSQL 17 ou SQLite",
			"                  projetos · camadas · células · revisões",
			"",
			"tools/java  (CLI, só o JDK 21)",
			"  └─► lê .crivo ─► PNG · sprite sheet · classe Java"
		].join("\n"),
		testes: [
			{ suite: "Núcleo JavaScript", detalhe: "Geometria, flood fill, RLE, histórico, GIF, .ase e APNG de ida e volta", resultado: "107 de 107" },
			{ suite: "API Django", detalhe: "Revisões, conflitos, exportação e o conjunto de segurança", resultado: "72 de 72" },
			{ suite: "Ferramenta Java", detalhe: "Leitura do .crivo, PNG, sprite sheet e classe compilada em memória", resultado: "36 de 36" },
			{ suite: "Interface no Chromium", detalhe: "Playwright contra o Django e o Crivo.html direto do disco", resultado: "48 de 48" },
			{ suite: "Paridade de composição", detalhe: "30 documentos aleatórios em JavaScript, Python e Java", resultado: "Mesmos pixels" },
			{ suite: "Ruff e Bandit", detalhe: "Estilo, bugs prováveis e padrões inseguros no Python", resultado: "0 problemas" },
			{ suite: "Crivo.exe gerado de novo", detalhe: "Build reproduzível, comparado com o do repositório", resultado: "Idêntico" }
		]
	},
	{
		titulo: "Grafo",
		versao: "1.1.0",
		frase: "Um editor de interfaces e de diagramas no navegador, em que várias pessoas desenham no mesmo arquivo ao mesmo tempo.",
		online: "https://ravelroot.github.io/Collaborative-Design-and-Diagram-Editor/",
		endereco: "ravelroot.github.io/Collaborative-Design-and-Diagram-Editor",
		capa: {
			claro: "assets/destaques/grafo/diagrama.webp",
			escuro: "assets/destaques/grafo/escuro.webp",
			legenda: "Fluxograma de pedidos numa piscina, com decisão, documento e banco de dados, conectores ortogonais com rótulos e duas entidades ligadas por pé-de-galinha."
		},
		numeros: [
			{ valor: "107", rotulo: "formas em oito bibliotecas" },
			{ valor: "37 KB", rotulo: "de núcleo em WebAssembly" },
			{ valor: "80 ms", rotulo: "para 50 clientes convergirem" },
			{ valor: "3.000", rotulo: "objetos abaixo de 50 ms de CPU" }
		],
		historia: [
			"O Grafo junta no mesmo arquivo duas coisas que costumam viver em ferramentas separadas: o design de interfaces, com frames, auto layout, restrições, componentes e protótipo clicável, e os diagramas, com 107 formas em oito bibliotecas, de fluxograma e UML a BPMN, entidade-relacionamento e organograma.",
			"E o arquivo é de todo mundo ao mesmo tempo. Quem abre o mesmo link vê os cursores e as seleções dos outros na cor de cada um, comenta em pinos presos ao canvas e salva versões que voltam com um clique. Cada mudança vira um update binário de poucos bytes, que o servidor em Rust aplica, distribui para a sala e grava no PostgreSQL.",
			"Por baixo, a renderização fica com o PixiJS sobre WebGL2 ou WebGPU, e a geometria pesada roda num núcleo em C++ compilado para WebAssembly. Como o Crivo, ele roda de três maneiras: Grafo.exe no Windows, servidor completo com Docker Compose ou um Grafo.html que abre com dois cliques."
		],
		pilha: [
			{ nome: "Editor", itens: ["JavaScript", "PixiJS 8", "WebGL2", "WebGPU", "Yjs"] },
			{ nome: "Núcleo geométrico", itens: ["C++17", "WebAssembly", "Emscripten"] },
			{ nome: "Servidor de colaboração", itens: ["Rust", "Tokio", "Axum", "Yrs", "PostgreSQL 17", "Redis 7", "NATS JetStream"] },
			{ nome: "Desktop, qualidade e entrega", itens: ["Go 1.24", "WebView2", "Node Test Runner", "Playwright", "Docker", "GitHub Actions"] }
		],
		galeria: [
			{ imagem: "assets/destaques/grafo/editor.webp", miniatura: "assets/destaques/grafo/mini/editor.webp", legenda: "Duas telas de celular, um componente de botão e uma nota adesiva, com páginas e camadas à esquerda e o painel Design à direita." },
			{ imagem: "assets/destaques/grafo/colaboracao.webp", miniatura: "assets/destaques/grafo/mini/colaboracao.webp", legenda: "Clara e Bruno no mesmo arquivo: cursores ao vivo, a seleção de cada um destacada na cor dele e os avatares no topo." },
			{ imagem: "assets/destaques/grafo/comentarios.webp", miniatura: "assets/destaques/grafo/mini/comentarios.webp", legenda: "Conversa presa a um ponto do canvas, com resposta, e a aba Comentários listando as conversas da página." },
			{ imagem: "assets/destaques/grafo/auto-layout.webp", miniatura: "assets/destaques/grafo/mini/auto-layout.webp", legenda: "Cartão com auto layout vertical: ele cresce sozinho conforme o conteúdo, com espaçamento e margem no painel Design." },
			{ imagem: "assets/destaques/grafo/componentes.webp", miniatura: "assets/destaques/grafo/mini/componentes.webp", legenda: "Instância do botão com o texto substituído por Continuar, sem deixar de acompanhar o componente principal." },
			{ imagem: "assets/destaques/grafo/bibliotecas.webp", miniatura: "assets/destaques/grafo/mini/bibliotecas.webp", legenda: "A aba Formas, com o componente Botão e as bibliotecas de formas básicas e de fluxograma." },
			{ imagem: "assets/destaques/grafo/dados.webp", miniatura: "assets/destaques/grafo/mini/dados.webp", legenda: "Organograma gerado a partir de um CSV com sete pessoas: cartões, conectores e layout de uma vez." },
			{ imagem: "assets/destaques/grafo/prototipo.webp", miniatura: "assets/destaques/grafo/mini/prototipo.webp", legenda: "Link de protótipo do botão Começar até o frame Detalhes, pronto para apresentar em tela cheia." },
			{ imagem: "assets/destaques/grafo/versoes.webp", miniatura: "assets/destaques/grafo/mini/versoes.webp", legenda: "Histórico de versões nomeadas, com autor, data, tamanho e o botão Restaurar." }
		],
		porDentro: [
			{
				titulo: "O documento é um CRDT",
				texto: "Cada arquivo é um Y.Doc: Yjs no editor e Yrs no servidor. Três réplicas com 600 edições concorrentes, entregues fora de ordem, chegam ao mesmo documento. O desfazer de cada pessoa mexe só nas próprias alterações, e sem servidor as abas do mesmo arquivo colaboram entre si."
			},
			{
				titulo: "Estado mais updates é o documento",
				texto: "O PostgreSQL guarda o estado compactado e a fila de updates desde a última compactação, feita a cada 200 updates. Ao reconectar, o cliente manda o que fez offline e recebe só o que falta.",
				codigo: "document_states    estado compactado (Yrs v1) + última seq\ndocument_updates   (file_id, seq) → update binário\n\nestado + updates na ordem de seq = o documento, byte a byte"
			},
			{
				titulo: "Geometria em WebAssembly",
				texto: "Booleanas, rotas de conectores, layout de diagramas e a simplificação do lápis rodam num núcleo em C++17 sem biblioteca padrão e com alocador próprio, compilado para um engine.wasm de 37 KB sem imports. Se ele não carregar, a ponte usa versões em JavaScript das mesmas funções, e os testes exigem o mesmo resultado nas duas."
			},
			{
				titulo: "Conectores que desviam",
				texto: "O roteamento ortogonal usa A* numa grade de visibilidade esparsa, com penalidade de curvas e margem em volta das formas: uma rota com 500 obstáculos sai em 0,9 a 35 ms. O layout automático segue Sugiyama, com quebra de ciclos, camadas, ordenação por baricentro e coordenadas sem sobreposição."
			},
			{
				titulo: "Um servidor que cresce para os lados",
				texto: "Cada instância em Rust mantém as salas em memória com Yrs, publica os updates no NATS JetStream para as outras instâncias e guarda presença e limite de taxa no Redis. Cada serviço é opcional: sem eles, o servidor roda em memória e avisa no log."
			},
			{
				titulo: "Desenha só o que mudou",
				texto: "A tela só é redesenhada quando algo muda, objetos fora da vista não são desenhados e o PixiJS refaz apenas os nós alterados. A árvore de filhos e a versão de cada nó ficam em índices: com 20.000 objetos, 200 consultas de filhos levam cerca de 10 ms."
			}
		],
		arquitetura: [
			"Grafo.exe  (Go + WebView2)",
			"  └─► Grafo.html embutido · janela Salvar como nativa",
			"",
			"Interface ──► Y.Doc + UndoManager ──► PixiJS 8 (WebGL2 ou WebGPU)",
			"                │                        │",
			"                │                        ▼",
			"                │              núcleo C++17 → WebAssembly",
			"                │              rotas · booleanas · layout",
			"                ▼",
			"  IndexedDB · BroadcastChannel (abas)",
			"  WebSocket (y-websocket) + REST",
			"                │",
			"                ▼",
			"Servidor Rust  (Tokio + Axum) · um Yrs Doc por sala",
			"  ├─► PostgreSQL 17     estado, updates, versões, comentários",
			"  ├─► NATS JetStream    updates entre instâncias",
			"  └─► Redis 7           presença, cache, limite de taxa"
		].join("\n"),
		testes: [
			{ suite: "Núcleo C++/WASM", detalhe: "Fuzz de 300 pares de polígonos, índice com 10.000 caixas contra força bruta", resultado: "33 testes" },
			{ suite: "Editor", detalhe: "Três réplicas, 600 edições concorrentes fora de ordem", resultado: "Convergem" },
			{ suite: "Ponta a ponta", detalhe: "Playwright com GPU e WASM ativos, duas abas colaborando", resultado: "11 cenários" },
			{ suite: "Servidor Rust", detalhe: "Reconexão após 25 updates perdidos, 50 clientes numa sala", resultado: "24 testes" },
			{ suite: "Carga", detalhe: "1.000 updates distribuídos em 20 salas em paralelo", resultado: "288 ms" },
			{ suite: "Grafo.exe gerado de novo", detalhe: "Build reproduzível, comparado com o do repositório", resultado: "Idêntico" }
		]
	}
];

// O que os dois projetos têm em comum, no fim da aba. "icone" usa os desenhos de ICONES_AREAS (js/main.js).
const DESTAQUES_EM_COMUM = {
	titulo: "Dois editores, as mesmas regras",
	texto: "Projetos diferentes, a mesma forma de entregar. É isso que faz os dois funcionarem na mão de quem baixa, e não só no computador de quem escreveu.",
	itens: [
		{
			icone: "tela",
			titulo: "Três maneiras de rodar",
			texto: "Um .exe para Windows em Go com o WebView2, que abre maximizado e usa a janela Salvar como do sistema; um servidor completo com Docker Compose; e um único .html que abre com dois cliques, sem servidor e sem internet."
		},
		{
			icone: "build",
			titulo: "Builds reproduzíveis",
			texto: "O mesmo código gera sempre o mesmo .exe, byte a byte. A cada push, o CI gera o executável de novo, compara com o do repositório e confere se o .html único está em dia com o código."
		},
		{
			icone: "escudo",
			titulo: "Fechados por padrão",
			texto: "Content-Security-Policy sem eval e nenhum dado do usuário entrando como HTML. O arquivo único só executa o próprio script, conferido por hash SHA-256, e não abre conexão de rede; o app desktop roda sem administrador e não abre portas."
		},
		{
			icone: "livro",
			titulo: "Feitos para quem chega",
			texto: "Um tutorial rápido na primeira abertura, que acende cada ferramenta e diz para que ela serve, um manual técnico em PDF e o documento do banco de dados, com diagramas, tabelas e consultas prontas."
		}
	]
};

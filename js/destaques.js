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
	},
	{
		titulo: "Nexo",
		versao: "2.1.0",
		frase: "Uma plataforma de agentes de IA que respondem só com a própria base de conhecimento, citando o trecho e a página de cada informação.",
		endereco: "127.0.0.1:8000",
		capa: {
			claro: "assets/destaques/nexo/chats.webp",
			escuro: "assets/destaques/nexo/escuro.webp",
			legenda: "Dois chats lado a lado: o Técnico de campo responde sobre o compressor e a bomba BC-40, a Aurora sobre trocas, produtos e pagamentos, e cada item da resposta leva o número do trecho de onde saiu."
		},
		numeros: [
			{ valor: "7", rotulo: "formatos na base de conhecimento" },
			{ valor: "2", rotulo: "cortes de relevância antes do modelo" },
			{ valor: "41", rotulo: "testes, todos passando" },
			{ valor: "3", rotulo: "formas de conectar o WhatsApp" }
		],
		historia: [
			"O Nexo parte de uma regra simples: se a informação não está nos documentos, ele não responde. Cada agente tem nome, instruções de tom, saudação e uma base de conhecimento própria, com PDF, Word, planilhas, textos e mais, e cada frase da resposta cita o trecho e a página de onde saiu. Quando falta base, ele diz que não encontrou, e a pergunta vira uma lacuna no Painel de qualidade.",
			"Entre a pergunta e o modelo existe um funil. A pergunta é reescrita com o histórico da conversa, a busca vetorial traz os candidatos, um cross-encoder reordena tudo pela relação real com a pergunta e dois cortes de relevância descartam o que não serve; se nada passa, o modelo nem é chamado. As peças trocam pelo .env, sem mudar código: Ollama ou OpenAI, ChromaDB ou Qdrant, reranker do HuggingFace ou da Cohere.",
			"O mesmo agente atende no WhatsApp, pela Evolution API, pela API oficial da Meta ou por um simulador. Ele responde sozinho, passa o contato para a equipe quando não sabe ou quando o cliente pede um atendente, e a equipe assume, devolve ou pede uma sugestão de resposta com as fontes. Para outros sistemas, há chaves de API, a rota /api/ask e webhooks assinados."
		],
		pilha: [
			{ nome: "Interface", itens: ["React 19", "TypeScript", "Vite", "React Router"] },
			{ nome: "API e RAG", itens: ["Python 3.11+", "FastAPI", "LlamaIndex", "SQLAlchemy", "PyJWT", "bcrypt"] },
			{ nome: "Modelos e busca", itens: ["Ollama", "OpenAI", "HuggingFace", "Cohere", "ChromaDB", "Qdrant"] },
			{ nome: "Atendimento e entrega", itens: ["Evolution API", "WhatsApp Cloud API", "Docker Compose", "pytest", "GitHub Actions"] }
		],
		galeria: [
			{ imagem: "assets/destaques/nexo/conversa.webp", miniatura: "assets/destaques/nexo/mini/conversa.webp", legenda: "Uma conversa com o acervo inteiro: cada item da resposta leva o número do trecho, e o painel Trechos usados mostra documento, página, termos destacados, similaridade e o link para abrir o PDF na página certa." },
			{ imagem: "assets/destaques/nexo/agentes.webp", miniatura: "assets/destaques/nexo/mini/agentes.webp", legenda: "Três agentes, cada um preso à sua base: a Aurora atende a loja, o RH responde cuida de férias e benefícios e o Técnico de campo tira dúvidas de manutenção." },
			{ imagem: "assets/destaques/nexo/novo-agente.webp", miniatura: "assets/destaques/nexo/mini/novo-agente.webp", legenda: "Novo agente: nome, base de conhecimento, instruções de tom, saudação, resposta para quando não souber, cor e a opção de citar as fontes." },
			{ imagem: "assets/destaques/nexo/bases.webp", miniatura: "assets/destaques/nexo/mini/bases.webp", legenda: "A base Loja Aurora com seis itens prontos, quatro arquivos de Markdown a Word e dois textos digitados, e as abas Arquivos, Textos, Testar e Integrar." },
			{ imagem: "assets/destaques/nexo/testar.webp", miniatura: "assets/destaques/nexo/mini/testar.webp", legenda: "A aba Testar busca só dentro da base, sem gerar resposta: três trechos em 4 ms, com os termos da pergunta destacados." },
			{ imagem: "assets/destaques/nexo/whatsapp.webp", miniatura: "assets/destaques/nexo/mini/whatsapp.webp", legenda: "Caixa de entrada do WhatsApp: a cliente pediu um atendente, o agente avisou que ia chamar a equipe e o administrador assumiu a conversa." },
			{ imagem: "assets/destaques/nexo/conexoes.webp", miniatura: "assets/destaques/nexo/mini/conexoes.webp", legenda: "Nova conexão em três passos: Evolution API pelo QR code, API oficial da Meta ou simulador, e o agente que vai responder." },
			{ imagem: "assets/destaques/nexo/painel.webp", miniatura: "assets/destaques/nexo/mini/painel.webp", legenda: "Painel de qualidade: taxa de resposta, tempo médio, perguntas por dia, lacunas do acervo e os documentos mais citados." },
			{ imagem: "assets/destaques/nexo/integracoes.webp", miniatura: "assets/destaques/nexo/mini/integracoes.webp", legenda: "Integrações: chaves de API, a rota POST /api/ask com exemplos em curl, Python e JavaScript, e webhooks assinados com HMAC SHA-256." }
		],
		porDentro: [
			{
				titulo: "Dois cortes antes do modelo",
				texto: "A busca vetorial traz 12 candidatos e descarta os que ficam abaixo da similaridade mínima. Um cross-encoder reordena o resto pela relação real com a pergunta, e só os 4 melhores acima da nota mínima do reranker chegam ao modelo. Se nenhum passar, a resposta é \"não encontrei\" sem chamar o LLM.",
				codigo: "NEXO_TOP_K=12              candidatos da busca vetorial\nNEXO_MIN_SIMILARITY=0.15   corte 1: cosseno\nNEXO_MIN_RERANK_SCORE=0.1  corte 2: cross-encoder\nNEXO_TOP_N=4               trechos que chegam ao modelo"
			},
			{
				titulo: "Regras acima do agente",
				texto: "As instruções de cada agente entram no prompt só como tom e estilo, abaixo de regras que valem acima delas: usar apenas os trechos, citar [n] em cada afirmação e responder a frase de não encontrado quando faltar base. A temperatura fica em 0,1, e a verificação de fidelidade com o FaithfulnessEvaluator pode ser ligada no .env."
			},
			{
				titulo: "Bases sem reindexar",
				texto: "Agente não tem coleção vetorial própria. Cada trecho guarda o id do documento nos metadados, e a busca filtra pelos documentos da base do agente. Mover um arquivo entre bases muda uma linha no banco, sem recalcular vetor nenhum, e a migração da 2.0 levou o acervo antigo para a base Acervo geral do mesmo jeito."
			},
			{
				titulo: "Indexar de novo dá no mesmo",
				texto: "Cada trecho recebe um UUID v5 calculado a partir do documento e da posição. Reindexar apaga e regrava os mesmos ids, sem deixar vetores órfãos. A fila de indexação roda numa thread própria, e o que ficou pendente volta para a fila quando o servidor reinicia."
			},
			{
				titulo: "Testes sem modelo nenhum",
				texto: "Um embedding léxico próprio, com palavras, pares de palavras e pedaços de quatro letras espalhados por hash BLAKE2b em 768 dimensões, e um modo extrativo que devolve as frases mais relevantes deixam a suíte inteira rodar sem GPU, sem internet e sem Ollama. As telas deste estudo foram feitas nesse modo."
			},
			{
				titulo: "Do agente para a equipe",
				texto: "No WhatsApp, o agente responde até não encontrar a resposta ou até o cliente pedir um atendente. Aí o contato vai para Aguardando atendente, o agente pausa nele e sai o webhook whatsapp.handoff. Na API oficial, a assinatura X-Hub-Signature-256 da Meta é conferida em cada mensagem recebida."
			}
		],
		arquitetura: [
			"Navegador  (React 19 + TypeScript)",
			"  └─► HTTP/JSON · JWT ou X-API-Key",
			"        └─► FastAPI  (python -m nexo)",
			"              ├─► SQLAlchemy ─► SQLite ou PostgreSQL",
			"              │     bases · agentes · conversas · WhatsApp",
			"              ├─► fila de indexação",
			"              │     PDF · DOCX · CSV · JSON · HTML · MD",
			"              └─► LlamaIndex",
			"                    ├─► vetores ...... ChromaDB ou Qdrant",
			"                    ├─► reranker ..... HuggingFace ou Cohere",
			"                    └─► LLM .......... Ollama ou OpenAI",
			"",
			"WhatsApp  (Evolution API · Cloud API da Meta)",
			"  └─► webhook da conexão ─► agente ─► resposta com fontes",
			"",
			"Webhooks assinados ─► Slack, n8n, Zapier ou seu backend"
		].join("\n"),
		testes: [
			{ suite: "Fluxo RAG", detalhe: "Envio, indexação, resposta com fontes, escopo e exclusão de vetores", resultado: "5 de 5" },
			{ suite: "Motor de busca", detalhe: "Embedding léxico, reranker, cortes de relevância e pergunta sem base", resultado: "4 de 4" },
			{ suite: "Agentes e bases", detalhe: "Formatos, textos, mover entre bases, saudação e migração da 2.0", resultado: "6 de 6" },
			{ suite: "WhatsApp", detalhe: "Simulador, passagem para atendente, assinatura da Meta e QR da Evolution", resultado: "4 de 4" },
			{ suite: "Integrações", detalhe: "Chaves de API, /api/ask, exportação, painel e webhooks assinados", resultado: "12 de 12" },
			{ suite: "Contas e scripts", detalhe: "Login, bloqueio após cinco tentativas, cadastro, senha e avaliação da busca", resultado: "10 de 10" },
			{ suite: "Interface React", detalhe: "Checagem de tipos do TypeScript e build do Vite", resultado: "Sem erros" }
		]
	},
	{
		titulo: "Talos",
		versao: "1.1.0",
		frase: "Um sistema desktop de central de serviços, helpdesk e inventário de TI, com os conceitos do GLPI e o banco que a equipe escolher.",
		endereco: "Talos-1.1.0.exe",
		capa: {
			claro: "assets/destaques/talos/painel.webp",
			escuro: "assets/destaques/talos/escuro.webp",
			legenda: "O Painel no modo demonstração: indicadores do atendimento, abertos e solucionados nos últimos 30 dias, a fila do técnico, a carga de cada um e os chamados abertos por prioridade."
		},
		numeros: [
			{ valor: "6", rotulo: "bancos com o mesmo modelo" },
			{ valor: "3", rotulo: "módulos, domínio sem framework" },
			{ valor: "84", rotulo: "testes passando no build" },
			{ valor: "600 mil", rotulo: "iterações de PBKDF2 por senha" }
		],
		historia: [
			"O Talos reúne num programa só o que uma equipe de TI usa todo dia: chamados com SLA, problemas e mudanças no modelo ITIL, Kanban, Gantt, agenda dos técnicos, inventário de equipamentos, software, licenças e contratos, base de conhecimento, relatórios e integrações com o chat da equipe. Os conceitos vêm do GLPI, de entidades e perfis a regras de negócio e lixeira, mas nenhuma linha de código.",
			"Ele instala no Windows como qualquer programa, com o Java embutido, e não tem site nem servidor web. Os dados ficam no banco que a equipe escolher: um arquivo H2 local para começar ou um PostgreSQL, MySQL, MariaDB, SQL Server ou Oracle compartilhado, com o esquema criado e versionado pelo Flyway. Cada estação aponta para o mesmo banco, e é ele que coordena alertas, webhooks e rotinas.",
			"Por baixo, a arquitetura é hexagonal: as regras de negócio não conhecem Spring, JPA nem JavaFX, e a interface encontra o backend pelo ServiceLoader. É isso que permite abrir todas as telas com dados fictícios, sem banco nenhum, e testar o domínio inteiro contra um repositório em memória."
		],
		pilha: [
			{ nome: "Desktop e instalador", itens: ["Java 21", "JavaFX 21", "jpackage", "WiX Toolset"] },
			{ nome: "Infraestrutura", itens: ["Spring Boot 4", "Spring Data JPA", "Hibernate", "HikariCP", "Flyway"] },
			{ nome: "Bancos", itens: ["H2", "PostgreSQL", "MySQL", "MariaDB", "SQL Server", "Oracle"] },
			{ nome: "Qualidade e entrega", itens: ["Maven", "JUnit 5", "Testcontainers", "GitHub Actions"] }
		],
		galeria: [
			{ imagem: "assets/destaques/talos/chamados.webp", miniatura: "assets/destaques/talos/mini/chamados.webp", legenda: "Chamados abertos com status, prioridade, prazo de SLA em verde ou vermelho, técnico, requerente, categoria e grupo técnico, e as visões Atribuídos a mim, Atrasados e Lixeira." },
			{ imagem: "assets/destaques/talos/chamado.webp", miniatura: "assets/destaques/talos/mini/chamado.webp", legenda: "A linha do tempo do chamado #21, com acompanhamentos e uma tarefa, as propriedades ao lado e os prazos de SLA: atendimento cumprido e solução estourada." },
			{ imagem: "assets/destaques/talos/kanban.webp", miniatura: "assets/destaques/talos/mini/kanban.webp", legenda: "Kanban de chamados: colunas com itens, horas trabalhadas e atrasados, e cartões com categoria, tipo, responsável, prazo e tarefas. Os atrasados ficam em vermelho." },
			{ imagem: "assets/destaques/talos/gantt.webp", miniatura: "assets/destaques/talos/mini/gantt.webp", legenda: "Gantt do projeto Renovação do parque de notebooks, com dependências, o marco de aprovação do orçamento e o caminho crítico destacado." },
			{ imagem: "assets/destaques/talos/graficos.webp", miniatura: "assets/destaques/talos/mini/graficos.webp", legenda: "O mesmo Painel com outros gráficos: colunas para abertos e solucionados, rosca para status e prioridade e barras para a carga por técnico." },
			{ imagem: "assets/destaques/talos/integracoes.webp", miniatura: "assets/destaques/talos/mini/integracoes.webp", legenda: "Central de integrações: webhooks para Slack, Microsoft Teams e JSON genérico, o botão Enviar teste e as últimas entregas, inclusive uma falha HTTP 503." },
			{ imagem: "assets/destaques/talos/comandos.webp", miniatura: "assets/destaques/talos/mini/comandos.webp", legenda: "Paleta de comandos no Ctrl + K: novo chamado, problema ou mudança, alternar o tema, atalhos e qualquer tela do sistema." },
			{ imagem: "assets/destaques/talos/ativos.webp", miniatura: "assets/destaques/talos/mini/ativos.webp", legenda: "Inventário de ativos com patrimônio, tipo, estado, usuário, localização, fabricante, número de série, IP e fim da garantia." },
			{ imagem: "assets/destaques/talos/perfis.webp", miniatura: "assets/destaques/talos/mini/perfis.webp", legenda: "Perfis e permissões por módulo: ler, criar, editar, excluir, expurgar, atribuir, ver todos e aprovar. O Super-Administrador é protegido." }
		],
		porDentro: [
			{
				titulo: "Domínio sem framework",
				texto: "Três módulos Maven: talos-domain em Java puro, talos-infrastructure com Spring Boot e JPA e talos-desktop com JavaFX. O domínio define as portas DataStore e BackendProvider, a infraestrutura as implementa e a interface encontra o backend pelo ServiceLoader. Sem ele, um repositório em memória sustenta o modo demonstração."
			},
			{
				titulo: "Prioridade por matriz, como no GLPI",
				texto: "Urgência e impacto, de 1 a 5, entram numa matriz que devolve a prioridade. Os prazos de atendimento (TTO) e de solução (TTR) contam só o horário comercial, pulam feriados e param enquanto o chamado está pendente.",
				codigo: "            urgência →  1  2  3  4  5\nimpacto 1               1  1  2  2  2\nimpacto 3               2  2  3  4  4\nimpacto 5               2  3  4  5  5"
			},
			{
				titulo: "Um modelo, seis bancos",
				texto: "As entidades são as mesmas em todos os bancos, e o Flyway guarda um conjunto de migrações para cada um. Um teste confere se os scripts SQL de todos os bancos batem com as entidades, e um job do CI roda a persistência contra PostgreSQL, MySQL, MariaDB, SQL Server e Oracle de verdade, no Docker."
			},
			{
				titulo: "Várias estações, uma rotina",
				texto: "Cada computador instala o Talos e aponta para o mesmo banco. Antes de rodar uma rotina, como alertas de SLA ou chamados recorrentes, a estação grava na tabela pyh_job_lock até quando ela é dona da rotina; com o controle de versão, se duas tentarem ao mesmo tempo, só uma ganha.",
				codigo: "pyh_job_lock  job_name · locked_by · locked_until · version\n\nestação A  trava livre ──► grava locked_until ──► roda\nestação B  trava valendo ─────────────────────────► pula"
			},
			{
				titulo: "Login que não dá pista",
				texto: "Senhas com PBKDF2-HMAC-SHA256, 600 mil iterações e salt aleatório, com hashes antigos atualizados no próximo login. Usuário inexistente, senha errada e conta bloqueada recebem a mesma resposta no mesmo tempo, e a sessão é revalidada a cada 30 segundos. A senha do banco fica cifrada com a DPAPI do Windows."
			},
			{
				titulo: "Integrações que não travam a tela",
				texto: "Os webhooks para Slack, Teams, Discord, Google Chat e JSON genérico saem em segundo plano pelo java.net.http, sem dependência extra e com 10 segundos de limite. O JSON genérico pode ser assinado com HMAC-SHA256 no cabeçalho X-Talos-Signature, e uma falha nunca impede o atendimento."
			}
		],
		arquitetura: [
			"Talos-1.1.0.exe  (jpackage, Java embutido)",
			"  └─► talos-desktop  (JavaFX 21)",
			"        telas · Kanban · Gantt · paleta de comandos",
			"        │",
			"        ▼",
			"      talos-domain  (Java puro)",
			"        chamados · SLA · regras · inventário · projetos",
			"        portas DataStore e BackendProvider",
			"        ├─► webhooks HTTPS ─► Slack · Teams · Discord",
			"        │",
			"        ▼  ServiceLoader",
			"      talos-infrastructure  (Spring Boot 4, sem web)",
			"        ├─► JPA + Hibernate + HikariCP",
			"        ├─► Flyway ........ migrações por banco",
			"        └─► rotinas ....... trava em pyh_job_lock",
			"              │",
			"              ▼",
			"  H2 · PostgreSQL · MySQL · MariaDB · SQL Server · Oracle"
		].join("\n"),
		testes: [
			{ suite: "Chamados e SLA", detalhe: "Ciclo de vida, pessoas, calendário comercial e matriz de prioridade", resultado: "28 de 28" },
			{ suite: "Regras e projetos", detalhe: "Motor de regras, caminho crítico, repositório em memória e dados de demonstração", resultado: "15 de 15" },
			{ suite: "Segurança e administração", detalhe: "Escalada de privilégio, senhas, aprovações, CSV sem fórmulas e links seguros", resultado: "20 de 20" },
			{ suite: "Integrações e primeiro uso", detalhe: "Webhooks, assinatura HMAC e o assistente de configuração", resultado: "9 de 9" },
			{ suite: "Infraestrutura com H2", detalhe: "Spring Boot real, migrações Flyway, bloqueio otimista e scripts iguais às entidades", resultado: "10 de 10" },
			{ suite: "Interface", detalhe: "Traduções completas e iguais em português e inglês", resultado: "2 de 2" },
			{ suite: "Cinco servidores reais", detalhe: "PostgreSQL, MySQL, MariaDB, SQL Server e Oracle com Testcontainers", resultado: "Job do CI" }
		]
	},
	{
		titulo: "Bento",
		versao: "1.2.0",
		frase: "Um painel administrativo para SaaS montado em bento grid, com tempo real pelo próprio PostgreSQL e uma API completa e testada por trás.",
		endereco: "localhost:8080",
		projeto: {
			categoria: "Painel administrativo",
			icone: "assets/projetos/bento.png?v=2",
			link: "https://github.com/ravelroot/Data-Driven-Admin-Panel"
		},
		documentos: {
			manual: "https://github.com/ravelroot/Data-Driven-Admin-Panel/blob/main/Manual-Bento.pdf",
			banco: "https://github.com/ravelroot/Data-Driven-Admin-Panel/blob/main/Banco-de-Dados-Bento.pdf"
		},
		capa: {
			claro: "assets/destaques/bento/visao-geral.webp",
			escuro: "assets/destaques/bento/escuro.webp",
			legenda: "Visão geral dos últimos 30 dias: a receita do período na tampa escura, com o gráfico diário, e os usuários e as assinaturas ativas nos compartimentos ao lado, cada um com a variação e um mini gráfico."
		},
		numeros: [
			{ valor: "22", rotulo: "tabelas no PostgreSQL" },
			{ valor: "16", rotulo: "paletas de cores" },
			{ valor: "71", rotulo: "testes, todos passando" },
			{ valor: "0", rotulo: "Redis ou filas para o tempo real" }
		],
		historia: [
			"O Bento parte da imagem do nome: uma caixa só, dividida em compartimentos. Cada página é uma caixa de cantos arredondados em que os blocos dividem paredes finas, com o menu e os títulos impressos no fundo, e a grade de 12 colunas encaixa cartões de tamanhos diferentes e se reorganiza no tablet e no celular.",
			"Dentro dela está o dia a dia de um SaaS: visão geral com receita, MRR e meta do mês, analytics com funil, coortes e mapa de calor, transações com reembolso, usuários com papéis e exceções por pessoa, notificações em tempo real, relatórios em CSV e PDF com envios agendados, trilha de auditoria e paleta de comandos com atalhos de teclado.",
			"Por trás, uma API em TypeScript com Fastify 5 e Zod, documentada em /api/v1/docs. Com Docker, ela sobe com um PostgreSQL 18; sem ele, o PGlite roda o mesmo PostgreSQL embutido no processo do Node, sem instalar nada, e o painel funciona igual."
		],
		pilha: [
			{ nome: "Interface", itens: ["TypeScript", "Tailwind CSS 4", "HTML5", "ApexCharts", "Vite"] },
			{ nome: "API", itens: ["Node.js 22", "Fastify 5", "Zod", "PDFKit", "bcrypt.js"] },
			{ nome: "Banco e tempo real", itens: ["PostgreSQL 18", "PGlite", "LISTEN/NOTIFY", "Server-Sent Events"] },
			{ nome: "Qualidade e entrega", itens: ["Node Test Runner", "Docker Compose", "GitHub Actions"] }
		],
		galeria: [
			{ imagem: "assets/destaques/bento/analytics.webp", miniatura: "assets/destaques/bento/mini/analytics.webp", legenda: "Analytics com intervalo de datas, períodos prontos e agrupamento por dia: receita, novos usuários, visitantes, conversão, receita e reembolsos e o funil da visita à assinatura." },
			{ imagem: "assets/destaques/bento/transacoes.webp", miniatura: "assets/destaques/bento/mini/transacoes.webp", legenda: "Transações com o resumo do filtro (valor pago, reembolsado e taxa de falha), as abas por status, os filtros por método, tipo e período e a lista com cliente, plano e valor." },
			{ imagem: "assets/destaques/bento/usuarios.webp", miniatura: "assets/destaques/bento/mini/usuarios.webp", legenda: "Usuários com contagens por status, filtros por papel e plano, seleção para ações em massa, colunas ordenáveis e paginação de 2.415 contas." },
			{ imagem: "assets/destaques/bento/notificacoes.webp", miniatura: "assets/destaques/bento/mini/notificacoes.webp", legenda: "Notificações chegando ao vivo por Server-Sent Events, com filtros por categoria e a escolha de onde receber cada uma." },
			{ imagem: "assets/destaques/bento/relatorios.webp", miniatura: "assets/destaques/bento/mini/relatorios.webp", legenda: "Relatórios em três passos (dados, período e formato), com a prévia da receita antes de gerar o PDF ou o CSV." },
			{ imagem: "assets/destaques/bento/auditoria.webp", miniatura: "assets/destaques/bento/mini/auditoria.webp", legenda: "Trilha de auditoria com filtros por ação, pessoa e período, busca na descrição, o IP de cada registro e exportação em CSV." },
			{ imagem: "assets/destaques/bento/configuracoes.webp", miniatura: "assets/destaques/bento/mini/configuracoes.webp", legenda: "Aparência: tema claro, escuro ou do sistema, 16 paletas de cores, densidade e menu recolhido, salvos no navegador e na conta." },
			{ imagem: "assets/destaques/bento/sistema.webp", miniatura: "assets/destaques/bento/mini/sistema.webp", legenda: "Status do sistema: versão, banco (aqui, o PGlite) e latência, tempo no ar, memória, conexões em tempo real, volume das tabelas e migrações aplicadas." },
			{ imagem: "assets/destaques/bento/componentes.webp", miniatura: "assets/destaques/bento/mini/componentes.webp", legenda: "A biblioteca de componentes em Tailwind CSS, com as escalas principal, de destaque e neutra que mudam junto com a paleta escolhida." }
		],
		porDentro: [
			{
				titulo: "Tempo real pelo próprio banco",
				texto: "Cada evento é publicado no canal bento_eventos com pg_notify, e cada instância da API escuta com LISTEN e repassa aos navegadores por Server-Sent Events. Várias instâncias atrás de um balanceador entregam o mesmo evento sem Redis nem fila. Se o canal cai, a instância reconecta em 3 segundos.",
				codigo: "API 1 ── pg_notify('bento_eventos', json) ──► PostgreSQL\nPostgreSQL ── LISTEN ──► API 1 · API 2 · API 3\nAPI n ── text/event-stream ──► navegadores"
			},
			{
				titulo: "O mesmo SQL, com ou sem servidor",
				texto: "Sem DATABASE_URL, a API abre o PGlite, o PostgreSQL compilado para WebAssembly, que roda dentro do Node e grava na pasta dados/. Migrações, consultas e testes são os mesmos nos dois casos; só o barramento de eventos troca o LISTEN/NOTIFY por um emissor em memória."
			},
			{
				titulo: "Sessão que gira",
				texto: "O acesso usa um JWT de 15 minutos num cookie httpOnly, e a renovação usa outro token, guardado só como hash SHA-256 na tabela sessoes e com o cookie restrito a /api/v1/auth. Cada renovação troca o token num UPDATE condicional, que só acerta se o antigo ainda valer."
			},
			{
				titulo: "CSRF sem token escondido",
				texto: "Pedidos que alteram dados pelo cookie de sessão precisam do cabeçalho X-Bento: 1, que um formulário de outro site não consegue enviar. Chaves de API dispensam o cabeçalho, ficam guardadas só como hash e podem ser apenas de leitura."
			},
			{
				titulo: "Webhooks que não entram na rede interna",
				texto: "Antes de cada envio, o nome do destino é resolvido, e qualquer endereço de loopback, rede privada, link-local (os metadados de nuvem), CGNAT ou NAT64 é recusado; o envio não segue redirecionamentos. Os segredos das integrações ficam cifrados com AES-256-GCM."
			},
			{
				titulo: "Permissões conferidas duas vezes",
				texto: "Cada pessoa tem as permissões do papel, mais as concedidas e menos as negadas. A interface esconde o que não pode ser usado e a API confere de novo em cada rota: quem não controla permissões só altera contas de nível menor que o seu, a correção da falha crítica achada na auditoria de segurança da 1.1."
			}
		],
		arquitetura: [
			"Navegador  (TypeScript + Tailwind CSS 4 + ApexCharts)",
			"  ├─► HTTP/JSON · cookie httpOnly + X-Bento",
			"  └◄── Server-Sent Events  (avisos, transações, contas)",
			"        │",
			"        ▼",
			"API  (Node.js 22 + Fastify 5 + Zod)",
			"  ├─► PostgreSQL 18 .......... com DATABASE_URL",
			"  │     └─ LISTEN/NOTIFY bento_eventos",
			"  ├─► PGlite embutido ........ sem DATABASE_URL",
			"  ├─► relatórios ─► CSV · PDF (PDFKit) · agendador",
			"  └─► webhooks assinados ─► Slack · Discord · seu endpoint"
		].join("\n"),
		testes: [
			{ suite: "Autenticação e permissões", detalhe: "Sessão, CSRF, papéis, renovação com troca do token e chave só leitura", resultado: "7 de 7" },
			{ suite: "Listagens e contas", detalhe: "Paginação, ordenação, filtros, bloqueio e permissões individuais", resultado: "7 de 7" },
			{ suite: "Visão geral e analytics", detalhe: "Períodos de 7d a 12m, funil, coortes e mapa de calor no formato do contrato", resultado: "8 de 8" },
			{ suite: "Relatórios, avisos e reembolsos", detalhe: "CSV, PDF, agendados, preferências, reembolso e filtros da auditoria", resultado: "14 de 14" },
			{ suite: "Segurança", detalhe: "JWT forjado, injeção SQL, IDOR, SSRF, mass assignment, CSV e path traversal", resultado: "20 de 20" },
			{ suite: "Banco vazio", detalhe: "Primeiro administrador criado uma vez e painel zerado sem erros", resultado: "2 de 2" },
			{ suite: "Interface", detalhe: "Escape de HTML, formatação, menu, atalhos e paleta de comandos", resultado: "13 de 13" },
			{ suite: "TypeScript strict", detalhe: "Checagem de tipos da interface e da API", resultado: "Sem erros" }
		]
	},
	{
		titulo: "Turno",
		versao: "1.7.0",
		frase: "Um motor de tarefas distribuídas em C#, no estilo Hangfire, em que vários workers idênticos dividem a mesma fila e cada tarefa roda uma única vez por tentativa.",
		endereco: "localhost:8080",
		capa: {
			claro: "assets/destaques/turno/painel.webp",
			escuro: "assets/destaques/turno/escuro.webp",
			legenda: "Visão geral do cluster: 1.665 execuções na última hora na tampa escura, com sucessos e falhas por minuto, 16 de 24 vagas ocupadas, a fila e os indicadores das últimas 24 horas."
		},
		numeros: [
			{ valor: "2", rotulo: "camadas contra execução dupla" },
			{ valor: "6", rotulo: "camadas de resiliência" },
			{ valor: "99", rotulo: "testes, 11 com cluster real" },
			{ valor: "60", rotulo: "tarefas em 3 workers, uma vez cada" }
		],
		historia: [
			"O Turno resolve o problema de toda fila de trabalho com mais de um consumidor: garantir que cada tarefa rode uma vez só, mesmo com mensagens duplicadas, workers que caem no meio do processo e reinícios do broker. Quantos workers forem precisos, todos iguais, consomem as mesmas filas do RabbitMQ ou do Azure Service Bus pelo MassTransit, e qualquer um pode cair, reiniciar ou entrar a qualquer momento.",
			"A tarefa pode rodar na hora, com atraso, em data marcada ou por expressão cron com segundos e fuso horário. Falhas passageiras são repetidas pelo Polly, um disjuntor por tipo de tarefa segura a avalanche, as novas tentativas esperam com backoff exponencial e jitter, e o que esgota as tentativas vai para a fila de erros, com o stack trace, para ser reenfileirado pelo painel ou pela API.",
			"O painel em Blazor WebAssembly acompanha tudo em tempo real pelo SignalR, com a mesma identidade de caixa única do Bento: execuções por minuto, o quadro de turnos com cada vaga de cada worker, tarefas com tentativas e linha do tempo, recorrentes e fila de erros. A API REST aceita Idempotency-Key, lotes de até mil tarefas e tem documentação no Scalar."
		],
		pilha: [
			{ nome: "Workers e API", itens: ["C#", ".NET 10", "Worker Services", "ASP.NET Core", "SignalR"] },
			{ nome: "Mensageria e locks", itens: ["MassTransit", "RabbitMQ", "Azure Service Bus", "Redis", "RedLock.net", "Polly"] },
			{ nome: "Banco e painel", itens: ["PostgreSQL", "EF Core 10", "Npgsql", "Blazor WebAssembly", "Cronos"] },
			{ nome: "Qualidade e entrega", itens: ["xUnit", "Docker Compose", "GitHub Actions", "Scalar"] }
		],
		galeria: [
			{ imagem: "assets/destaques/turno/tarefas.webp", miniatura: "assets/destaques/turno/mini/tarefas.webp", legenda: "Tarefas com a contagem por estado, de agendadas a canceladas, e a lista com tipo, fila, tentativa, o worker que executou e a duração. As que estão rodando mostram o progresso." },
			{ imagem: "assets/destaques/turno/detalhes.webp", miniatura: "assets/destaques/turno/mini/detalhes.webp", legenda: "Uma tarefa integration.sync que deu certo na segunda de seis tentativas, com a chave de concorrência parceiro-42, o payload e o resultado em JSON." },
			{ imagem: "assets/destaques/turno/workers.webp", miniatura: "assets/destaques/turno/mini/workers.webp", legenda: "Workers registrados: três online com oito vagas cada, um encerrando com calma e os antigos offline, com filas, tarefas processadas, falhas e último sinal." },
			{ imagem: "assets/destaques/turno/recorrentes.webp", miniatura: "assets/destaques/turno/mini/recorrentes.webp", legenda: "Recorrentes por expressão cron com fuso horário e controle de sobreposição, com a próxima execução, a última e o botão para disparar na hora." },
			{ imagem: "assets/destaques/turno/erros.webp", miniatura: "assets/destaques/turno/mini/erros.webp", legenda: "Fila de erros com o stack trace aberto: falhas 503 de um parceiro que esgotaram as seis tentativas e um erro permanente que pulou as restantes." }
		],
		porDentro: [
			{
				titulo: "Token de despacho",
				texto: "Toda vez que uma tarefa entra na fila, ela ganha um dispatch_id novo, que vai dentro da mensagem. Só a mensagem com o token atual consegue iniciar a tarefa, numa única instrução: reenvios, duplicatas e mensagens antigas encontram zero linhas e são descartadas.",
				codigo: "UPDATE jobs SET state = 'Processing'\n WHERE id = @id\n   AND state = 'Enqueued'\n   AND dispatch_id = @token\n\n0 linhas  mensagem velha ou duplicada, descartada\n1 linha   este worker é o dono da tentativa"
			},
			{
				titulo: "Redlock antes do banco",
				texto: "Antes de tocar no banco, o worker pega o lock job:{id} no Redis, com renovação automática. Com três ou cinco instâncias independentes de Redis, o lock exige quórum, como no algoritmo original. Se o Redis falhar, a troca atômica no PostgreSQL continua impedindo a segunda execução."
			},
			{
				titulo: "Lease com cerca",
				texto: "Cada execução tem um lease renovado a cada 10 segundos. Se o worker some, a recuperação devolve a tarefa à fila e registra a tentativa como worker perdido. O término só é gravado se o worker ainda for o dono, com o mesmo worker_id, dispatch_id e estado: quem travou e voltou depois não sobrescreve quem assumiu."
			},
			{
				titulo: "Outbox na mesma transação",
				texto: "A mensagem para o broker é gravada na mesma transação da tarefa, pelo outbox do MassTransit com EF Core. Se o banco aceitou, a mensagem sai; se recusou, nada é publicado. O broker só avisa que existe trabalho: estado, tentativas e lease vivem no PostgreSQL."
			},
			{
				titulo: "Resiliência em camadas",
				texto: "O Polly repete na hora as falhas passageiras, abre o disjuntor de um tipo quando metade das execuções falha em 30 segundos e corta a tarefa no tempo limite. Depois, o agendador do Turno faz até cinco tentativas, com espera que dobra de 15 segundos até 15 minutos e 20% de jitter.",
				codigo: "tentativa 1  falhou ─► espera 15 s ± 20%\ntentativa 2  falhou ─► espera 30 s ± 20%\ntentativa 3  falhou ─► espera 60 s ± 20%\n...          esgotou ─► dead_letters + turno-dead-letter"
			},
			{
				titulo: "Um líder por rotina",
				texto: "Agendador, recuperação e limpeza rodam em um líder por vez, eleito a cada ciclo pelo próprio Redlock, então dá para ligar quantos workers quiser sem duplicar essas rotinas. Na subida, a API aplica as migrações protegida por pg_advisory_lock, e duas instâncias nunca migram ao mesmo tempo."
			}
		],
		arquitetura: [
			"Cliente  (curl, sistemas ou o painel)",
			"  └─► API  (ASP.NET Core · REST · SignalR · Scalar)",
			"        └─► PostgreSQL  (EF Core 10, schema turno)",
			"              jobs · tentativas · recorrentes · workers",
			"              │  outbox na mesma transação",
			"              ▼",
			"        MassTransit ─► RabbitMQ ou Azure Service Bus",
			"              │  ExecuteJob { id, dispatch_id }",
			"              ▼",
			"Workers × N  (Worker Services, todos iguais)",
			"  ├─► Redis ......... Redlock em job:{id} e no líder",
			"  ├─► Polly ......... retry · disjuntor · tempo limite",
			"  └─► lease de 10 s ─► término só se ainda for o dono",
			"",
			"Painel  (Blazor WebAssembly) ◄── SignalR ── API"
		].join("\n"),
		testes: [
			{ suite: "Domínio", detalhe: "Máquina de estados, nomes de tipo e fila, backoff com jitter e cron com segundos e fuso", resultado: "48 testes" },
			{ suite: "Handlers", detalhe: "Registro por atributo, payload tipado, progresso e os handlers de exemplo", resultado: "10 testes" },
			{ suite: "Infraestrutura", detalhe: "Nomes em snake_case, migrações iguais ao modelo, validação da API e pipeline do Polly", resultado: "30 testes" },
			{ suite: "Cluster distribuído", detalhe: "60 tarefas em 3 workers uma vez cada, duplicatas, worker zumbi e chave de concorrência", resultado: "11 cenários" },
			{ suite: "CI com serviços reais", detalhe: "As duas suítes com PostgreSQL, Redis e RabbitMQ e as imagens Docker", resultado: "A cada push" }
		]
	}
];

const DESTAQUES_EM_COMUM = {
	titulo: "Seis projetos, as mesmas regras",
	texto: "Projetos diferentes, a mesma forma de entregar. É isso que faz os seis funcionarem na mão de quem baixa, e não só no computador de quem escreveu.",
	itens: [
		{
			icone: "tela",
			titulo: "Começam com dois cliques",
			texto: "O Crivo e o Grafo têm um .exe e um .html que abrem direto; o Talos instala como qualquer programa do Windows, com o Java e um banco H2 embutidos; o Nexo e o Bento sobem com o iniciar.cmd, em SQLite ou PGlite; e o Turno sobe o cluster inteiro, com PostgreSQL, Redis, RabbitMQ e três workers, pelo mesmo iniciar.cmd, com senhas geradas na hora."
		},
		{
			icone: "build",
			titulo: "Testados a cada push",
			texto: "Cada repositório roda a própria suíte no GitHub Actions. No Crivo e no Grafo, o CI ainda gera o .exe de novo e confere se é idêntico ao do repositório, byte a byte; no Talos, um job à parte roda a persistência contra cinco bancos de verdade; no Turno, o cluster de teste sobe com PostgreSQL, Redis e RabbitMQ reais."
		},
		{
			icone: "escudo",
			titulo: "Fechados por padrão",
			texto: "Senhas com bcrypt ou PBKDF2, chaves de API guardadas só como hash, webhooks assinados com HMAC-SHA256 e CSV exportado sem fórmulas. Nos editores, Content-Security-Policy sem eval e nenhum dado do usuário entrando como HTML; no Talos, a senha do banco cifrada pela DPAPI do Windows; no Turno, portas presas a 127.0.0.1 e chave de acesso comparada em tempo constante."
		},
		{
			icone: "livro",
			titulo: "Feitos para quem chega",
			texto: "Todos trazem um manual técnico em PDF e o modelo do banco documentado, com tabelas, campos e relacionamentos. O Crivo, o Grafo e o Nexo abrem com um tutorial, o Talos com um assistente de configuração, e o Nexo, o Talos e o Bento têm paleta de comandos no Ctrl + K."
		}
	]
};

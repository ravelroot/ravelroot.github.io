const PROJETOS = [
	{
		titulo: "Velo",
		icone: "assets/projetos/velo.png?v=3",
		descricao: "Loja virtual completa e de código aberto: catálogo, carrinho com cupons, checkout com cartão em até 10 vezes, PIX ou boleto (simulados ou Stripe), acompanhamento do pedido e painel com faturamento, estoque e três perfis de acesso. Um único esquema para H2, PostgreSQL, MySQL, MariaDB, SQL Server e Oracle.",
		link: "https://github.com/ravelroot/Payment-and-Checkout-System",
		tecnologias: ["Java", "Spring Boot", "React", "Typescript", "Flyway", "PostgreSQL", "Stripe"]
	},
	{
		titulo: "Talos",
		icone: "assets/projetos/talos.png?v=2",
		descricao: "Aplicativo desktop para Windows de gestão de serviços de TI, central de suporte e inventário de ativos, inspirado no GLPI: chamados com SLA, problemas e mudanças (ITIL), Kanban, Gantt e base de conhecimento. Instalador próprio e banco à escolha, do H2 local ao PostgreSQL ou Oracle.",
		link: "https://github.com/ravelroot/Information-Technology-Service-Management",
		tecnologias: ["Java", "Spring Boot", "JavaFX", "JPA", "Flyway", "PostgreSQL"]
	},
	{
		titulo: "Doca",
		icone: "assets/projetos/doca.png",
		descricao: "Pedidos de venda, compras e estoque multi-depósito com API REST e painel web com login. O estoque é reservado na confirmação e nenhum pedido vende acima do saldo, mesmo com acessos simultâneos. Custo médio ponderado, curva ABC, giro, sugestão de compra, quatro perfis de acesso e auditoria.",
		link: "https://github.com/ravelroot/Order-and-Inventory-System",
		tecnologias: ["Python", "FastAPI", "SQLAlchemy", "Alembic", "PostgreSQL", "Docker", "Javascript"]
	},
	{
		titulo: "Nexo",
		icone: "assets/projetos/nexo.png",
		descricao: "Chatbot RAG que responde dúvidas sobre manuais técnicos e livros em PDF usando só o conteúdo enviado. Cada resposta cita o trecho e a página e, se a informação não estiver nos documentos, ele diz que não encontrou, com reranking e dois cortes de relevância contra alucinações.",
		link: "https://github.com/ravelroot/Retrieval-Augmented-QA-System",
		tecnologias: ["Python", "FastAPI", "LlamaIndex", "React", "Typescript", "ChromaDB", "Qdrant"]
	},
	{
		titulo: "Turno",
		icone: "assets/projetos/turno.png",
		descricao: "Motor de tarefas distribuídas no estilo Hangfire: vários workers idênticos dividem a mesma fila e cada tarefa roda uma única vez por tentativa, mesmo com mensagens duplicadas ou workers que caem. Redlock e lease no PostgreSQL, Polly, fila de erros, cron e painel em tempo real.",
		link: "https://github.com/ravelroot/Distributed-Task-Processing-Engine",
		tecnologias: ["C#", ".NET 10", "MassTransit", "RabbitMQ", "Redis", "PostgreSQL", "Blazor", "Docker"]
	},
	{
		titulo: "Sonda",
		icone: "assets/projetos/sonda.png",
		descricao: "Motor de busca de texto completo escrito do zero em C#, no estilo Lucene e Elasticsearch, que indexa pastas inteiras de .txt, .md e .html em paralelo: stemming em português e inglês, índice invertido binário em disco e ranking por BM25 ou TF-IDF, sem banco SQL. Painel web, API REST e linha de comando.",
		link: "https://github.com/ravelroot/Inverted-Index-Search-Engine",
		tecnologias: ["C#", ".NET 10", "ASP.NET Core", "TPL", "Brotli", "xUnit", "Docker"]
	},
	{
		titulo: "Argo",
		icone: "assets/projetos/argo.png?v=2",
		descricao: "Plataforma de microserviços para vendas em Django: vários vendedores cadastram produtos, o estoque muda em tempo real por Redis e Server-Sent Events e cada pedido é confirmado por uma fila no Celery, sem travar a compra. As notas fiscais saem de um serviço em Java, tudo atrás de um gateway Nginx.",
		link: "https://github.com/ravelroot/E-commerce-Microservices-Platform",
		tecnologias: ["Python", "Django", "Celery", "Redis", "MySQL", "Java", "Spring Boot", "Docker"]
	},
	{
		titulo: "Delco",
		icone: "assets/projetos/delco.png",
		descricao: "Motor de orquestração de workflows no estilo Airflow e Temporal, feito em Django: você escreve o pipeline em Python e o Delco agenda por cron, distribui as tarefas entre workers pela fila no Redis, repete o que falhar e, se um servidor cair no meio, continua do passo exato onde parou, com painel em tempo real.",
		link: "https://github.com/ravelroot/Workflow-Orchestration-Engine",
		tecnologias: ["Python", "Django", "Django REST", "Channels", "MySQL", "Redis", "Docker"]
	},
	{
		titulo: "Crivo",
		icone: "assets/projetos/crivo.png",
		descricao: "Editor de pixel art no navegador que trata a imagem como ela é, uma matriz de pixels RGBA: lápis, balde, linhas e formas, camadas, animação quadro a quadro, simetria e paletas clássicas, com exportação em PNG, sprite sheet ou a própria matriz em JSON, CSV, JavaScript, Python, C e Java.",
		link: "https://github.com/ravelroot/Pixel-Art-Matrix-Editor",
		tecnologias: ["Javascript", "Canvas 2D", "Python", "Django", "PostgreSQL", "Java", "Docker"]
	},
	{
		titulo: "Lume",
		icone: "assets/projetos/lume.png",
		descricao: "Biblioteca de PDFs e DOCX que roda inteira no computador, num único Lume.exe sem instalador, servidor ou conta: gera as capas, escreve a descrição de cada documento com IA, busca no texto inteiro e abre tudo num leitor próprio que lembra onde você parou, com destaques e notas.",
		link: "https://github.com/ravelroot/Document-Library-Desktop",
		tecnologias: ["Java", "Spring Boot", "SQLite", "PDFBox", "pdf.js", "Javascript", "Playwright"]
	},
	{
		titulo: "Bento",
		icone: "assets/projetos/bento.png?v=2",
		descricao: "Painel administrativo para SaaS em bento grid: receita, MRR, usuários e assinaturas em blocos, com modo escuro nativo, gráficos interativos, tabelas com ordenação, busca e paginação, gavetas laterais, notificações em tempo real e relatórios em CSV e PDF, sobre uma API completa com permissões por papel.",
		link: "https://github.com/ravelroot/Data-Driven-Admin-Panel",
		tecnologias: ["Typescript", "Tailwind CSS", "Node.js", "Fastify", "PostgreSQL", "ApexCharts", "Docker"]
	}
];

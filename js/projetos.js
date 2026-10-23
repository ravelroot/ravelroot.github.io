// Projetos da aba Projetos. "categoria" aparece em destaque no cartão;
// a primeira tecnologia é a linguagem principal, mostrada na vitrine.
// Os filtros por linguagem são montados sozinhos a partir de "tecnologias".
const PROJETOS = [
	{
		titulo: "Velo",
		categoria: "Pagamentos e checkout",
		icone: "assets/projetos/velo.png?v=4",
		descricao: "Velo é um sistema de pagamento desenvolvido em Java 21, Spring Boot 4 (REST, Security, JPA, Flyway) que integra catálogo, carrinho, cupons, pedidos e meios de pagamento (cartão, PIX e boleto simulados ou Stripe), com gestão de usuários e painel administrativo. Com suporte a H2, PostgreSQL, MySQL, MariaDB, SQL Server e Oracle.",
		link: "https://github.com/ravelroot/Payment-and-Checkout-System",
		tecnologias: ["Java", "Spring Boot", "React", "Typescript", "Flyway", "PostgreSQL", "Stripe"]
	},
	{
		titulo: "Talos",
		categoria: "ITSM e helpdesk",
		icone: "assets/projetos/talos.png?v=2",
		descricao: "Talos é um sistema desktop de ITSM, helpdesk e inventário de ativos em Java 21 com Spring Boot (JPA e Flyway) e interface JavaFX. Arquitetura hexagonal inspirada no GLPI: chamados, problemas, mudanças, SLA, regras de negócio, Kanban e Gantt. Banco à escolha (PostgreSQL, MySQL, MariaDB, SQL Server, Oracle ou H2) e instalador .msi via jpackage.",
		link: "https://github.com/ravelroot/Information-Technology-Service-Management",
		tecnologias: ["Java", "Spring Boot", "JavaFX", "JPA", "Flyway", "PostgreSQL"]
	},
	{
		titulo: "Doca",
		categoria: "Pedidos e estoque",
		icone: "assets/projetos/doca.png?v=2",
		descricao: "Doca é uma plataforma de gestão de pedidos, compras e estoque multi-depósito, desenvolvida com Python e FastAPI. Oferece reserva transacional de estoque, custo médio ponderado, análises ABC, giro e reposição, além de painel web com controle de acesso, auditoria, PostgreSQL, Docker e integração contínua.",
		link: "https://github.com/ravelroot/Order-and-Inventory-System",
		tecnologias: ["Python", "FastAPI", "SQLAlchemy", "Alembic", "PostgreSQL", "Docker", "Javascript"]
	},
	{
		titulo: "Nexo",
		categoria: "IA e RAG",
		icone: "assets/projetos/nexo.png?v=2",
		descricao: "Nexo é um chatbot RAG para manuais técnicos e livros em PDF desenvolvido em Python com FastAPI, LlamaIndex e interface React + TypeScript. Responde com base estrita nos documentos, citando trecho e página, com reranking e cortes de relevância contra alucinações. Com suporte a ChromaDB, Qdrant, Ollama, OpenAI e Cohere.",
		link: "https://github.com/ravelroot/Retrieval-Augmented-QA-System",
		tecnologias: ["Python", "FastAPI", "LlamaIndex", "React", "Typescript", "ChromaDB", "Qdrant"]
	},
	{
		titulo: "Turno",
		categoria: "Tarefas distribuídas",
		icone: "assets/projetos/turno.png",
		descricao: "Turno é um motor de agendamento e processamento de tarefas distribuídas em C# e .NET 10, no estilo Hangfire. Workers clonados consomem filas do RabbitMQ ou Azure Service Bus via MassTransit, com lock Redlock no Redis, Polly (retry, circuit breaker e fila de erros), PostgreSQL e painel em Blazor WebAssembly em tempo real.",
		link: "https://github.com/ravelroot/Distributed-Task-Processing-Engine",
		tecnologias: ["C#", ".NET 10", "MassTransit", "RabbitMQ", "Redis", "PostgreSQL", "Blazor", "Docker"]
	},
	{
		titulo: "Sonda",
		categoria: "Motor de busca",
		icone: "assets/projetos/sonda.png",
		descricao: "Sonda é um motor de busca de texto completo escrito do zero em C# e .NET 10, no estilo Lucene e Elasticsearch. Indexa pastas de .txt, .md e .html em paralelo com TPL e ConcurrentDictionary, aplica tokenização e stemming RSLP e Porter, grava um índice invertido binário via FileStream e ordena por BM25 ou TF-IDF, com painel web, API e CLI.",
		link: "https://github.com/ravelroot/Inverted-Index-Search-Engine",
		tecnologias: ["C#", ".NET 10", "ASP.NET Core", "TPL", "Brotli", "xUnit", "Docker"]
	},
	{
		titulo: "Argo",
		categoria: "Microsserviços",
		icone: "assets/projetos/argo.png?v=2",
		descricao: "Argo é uma plataforma de microserviços para vendas com vários vendedores, feita em Django: estoque em tempo real (Redis + SSE), checkout assíncrono com Celery, notas fiscais por um serviço em Java (Spring Boot), banco MySQL, gateway Nginx e Docker Compose. Pronta para usar, com manual e PDF do banco de dados.",
		link: "https://github.com/ravelroot/E-commerce-Microservices-Platform",
		tecnologias: ["Python", "Django", "Celery", "Redis", "MySQL", "Java", "Spring Boot", "Docker"]
	},
	{
		titulo: "Delco",
		categoria: "Orquestração de workflows",
		icone: "assets/projetos/delco.png",
		descricao: "Delco é um motor de orquestração de workflows em Python e Django, no estilo Airflow/Temporal: pipelines como código, agendamento cron, worker pool em Redis Streams, retentativas e retomada exata após quedas. API em Django REST Framework, painel em tempo real com Django Channels, MySQL, Docker e Pytest.",
		link: "https://github.com/ravelroot/Workflow-Orchestration-Engine",
		tecnologias: ["Python", "Django", "Django REST", "Channels", "MySQL", "Redis", "Docker"]
	},
	{
		titulo: "Crivo",
		categoria: "Editor de pixel art",
		icone: "assets/projetos/crivo.png",
		descricao: "Crivo é um editor de pixel art no navegador em JavaScript puro: matriz RGBA via ImageData, balde por varredura, Bresenham e elipse de ponto médio, camadas, animação, simetria e histórico ilimitado com diffs e RLE. Paletas Game Boy, NES, Pico-8 e CGA, tons em OKLCH, PNG, sprite sheet e matrizes JSON/CSV/JS/Python. API Django e CLI Java.",
		link: "https://github.com/ravelroot/Pixel-Art-Matrix-Editor",
		tecnologias: ["Javascript", "Canvas 2D", "Python", "Django", "PostgreSQL", "Java", "Docker"]
	},
	{
		titulo: "Lume",
		categoria: "Biblioteca de documentos",
		icone: "assets/projetos/lume.png",
		descricao: "Lume é uma biblioteca de PDFs e DOCX em Java 21 + Spring Boot 4, com capas automáticas (PDFBox), descrição por IA, leitor próprio, estantes, coleções e busca em texto completo (SQLite FTS5). Um único Lume.exe portátil, com o Java embutido.",
		link: "https://github.com/ravelroot/Document-Library-Desktop",
		tecnologias: ["Java", "Spring Boot", "SQLite", "PDFBox", "pdf.js", "Javascript", "Playwright"]
	},
	{
		titulo: "Bento",
		categoria: "Painel administrativo",
		icone: "assets/projetos/bento.png?v=2",
		descricao: "Bento é um painel administrativo SaaS em bento grid feito com Tailwind CSS v4: modo claro/escuro salvo no localStorage, KPIs com tendência, gráficos ApexCharts, tabelas com ordenação, busca e paginação, e gavetas laterais. API em TypeScript (Fastify) com PostgreSQL, JWT, permissões por papel, alertas em tempo real (SSE) e relatórios em CSV e PDF.",
		link: "https://github.com/ravelroot/Data-Driven-Admin-Panel",
		tecnologias: ["Typescript", "Tailwind CSS", "Node.js", "Fastify", "PostgreSQL", "ApexCharts", "Docker"]
	},
	{
		titulo: "Favo",
		categoria: "Alocador de memória",
		icone: "assets/projetos/favo.png",
		descricao: "Favo é um alocador de memória escrito do zero em C11 que substitui o malloc e o free do sistema: pede memória ao kernel com sbrk e mmap (VirtualAlloc no Windows), alinha blocos a 16 bytes, aloca por First-Fit, Next-Fit ou Best-Fit em árvore rubro-negra e funde vizinhos livres. Funciona via LD_PRELOAD, com API em FastAPI e painel web do heap ao vivo.",
		link: "https://github.com/ravelroot/Custom-Memory-Allocator",
		tecnologias: ["C", "CMake", "LD_PRELOAD", "Python", "FastAPI", "SQLite", "Typescript", "Docker"]
	}
];

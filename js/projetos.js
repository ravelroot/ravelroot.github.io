const PROJETOS = [
	{
		titulo: "Velo",
		icone: "assets/projetos/velo.png?v=3",
		descricao: "Loja virtual completa com catálogo, carrinho, cupons, pedidos e pagamentos por cartão, PIX e boleto (simulados ou Stripe), além de painel administrativo e gestão de usuários. Funciona com H2, PostgreSQL, MySQL, MariaDB, SQL Server e Oracle.",
		link: "https://github.com/ravelroot/Payment-and-Checkout-System",
		tecnologias: ["Java", "Spring Boot", "React", "Typescript", "Flyway", "PostgreSQL", "Stripe"]
	},
	{
		titulo: "Pyhoma",
		icone: "assets/projetos/pyhoma.png?v=2",
		descricao: "Sistema desktop de ITSM, helpdesk e inventário de ativos inspirado no GLPI: chamados, problemas, mudanças, SLA, regras de negócio, Kanban e Gantt. Arquitetura hexagonal, banco de dados à escolha e instalador para Windows.",
		link: "https://github.com/ravelroot/Information-Technology-Service-Management",
		tecnologias: ["Java", "Spring Boot", "JavaFX", "JPA", "Flyway", "PostgreSQL"]
	},
	{
		titulo: "Doca",
		icone: "assets/projetos/doca.png",
		descricao: "Gestão de pedidos, compras e estoque multi-depósito com reserva transacional sem venda dupla, custo médio ponderado, curva ABC, giro e sugestão de reposição. Painel web com perfis de acesso, auditoria e integração contínua.",
		link: "https://github.com/ravelroot/Order-and-Inventory-System",
		tecnologias: ["Python", "FastAPI", "SQLAlchemy", "PostgreSQL", "Docker", "Javascript"]
	},
	{
		titulo: "Nexo",
		icone: "assets/projetos/nexo.png",
		descricao: "Chatbot RAG para manuais técnicos e livros em PDF que responde somente com base nos documentos enviados, citando trecho e página, com reranking e cortes de relevância contra alucinações.",
		link: "https://github.com/ravelroot/Retrieval-Augmented-QA-System",
		tecnologias: ["Python", "FastAPI", "LlamaIndex", "React", "Typescript", "ChromaDB", "Qdrant"]
	},
	{
		titulo: "Turno",
		icone: "assets/projetos/turno.png",
		descricao: "Motor de agendamento e processamento de tarefas distribuídas no estilo Hangfire: vários workers dividem a mesma fila com execução única garantida por Redlock e lease no PostgreSQL, retentativas com Polly, fila de erros, agendamento cron e painel em tempo real.",
		link: "https://github.com/ravelroot/Distributed-Task-Processing-Engine",
		tecnologias: ["C#", ".NET 10", "MassTransit", "RabbitMQ", "Redis", "PostgreSQL", "Blazor", "Docker"]
	},
	{
		titulo: "Sonda",
		icone: "assets/projetos/sonda.png",
		descricao: "Motor de busca de texto completo escrito do zero, no estilo Lucene: indexação paralela, stemming em português e inglês, índice invertido binário em disco e ranking por BM25 ou TF-IDF, com painel web, API REST e linha de comando.",
		link: "https://github.com/ravelroot/Inverted-Index-Search-Engine",
		tecnologias: ["C#", ".NET 10", "ASP.NET Core", "TPL", "Brotli", "xUnit", "Docker"]
	},
	{
		titulo: "Argo",
		icone: "assets/projetos/argo.png?v=2",
		descricao: "Plataforma de microserviços para vendas com vários vendedores, feita em Django: estoque atualizado em tempo real por Redis e Server-Sent Events, checkout assíncrono que confirma o pedido por fila no Celery e notas fiscais emitidas por um serviço em Java, tudo atrás de um gateway Nginx.",
		link: "https://github.com/ravelroot/E-commerce-Microservices-Platform",
		tecnologias: ["Python", "Django", "Celery", "Redis", "MySQL", "Java", "Spring Boot", "Docker"]
	},
	{
		titulo: "Delco",
		icone: "assets/projetos/delco.png",
		descricao: "Motor de orquestração de workflows no estilo Airflow e Temporal, feito em Django: pipelines em Python viram grafos de tarefas com agendamento cron, um pool de workers consome a fila no Redis e, se um servidor cair no meio, a execução retoma do passo exato onde parou, com painel em tempo real pelo Django Channels.",
		link: "https://github.com/ravelroot/Workflow-Orchestration-Engine",
		tecnologias: ["Python", "Django", "Django REST", "Channels", "MySQL", "Redis", "Docker"]
	},
	{
		titulo: "Crivo",
		icone: "assets/projetos/crivo.png",
		descricao: "Editor de pixel art no navegador que trata a imagem como uma matriz de pixels RGBA: lápis, balde, formas, camadas, animação quadro a quadro, simetria e paletas clássicas, com exportação em PNG, sprite sheet ou a própria matriz em JSON, CSV, Python, C e Java.",
		link: "https://github.com/ravelroot/Pixel-Art-Matrix-Editor",
		tecnologias: ["Javascript", "Canvas 2D", "Python", "Django", "PostgreSQL", "Java", "Docker"]
	},
	{
		titulo: "Lume",
		icone: "assets/projetos/lume.png",
		descricao: "Biblioteca de PDFs e DOCX para Windows em um único executável: gera as capas, escreve a descrição de cada documento com IA, faz busca no texto inteiro e abre tudo num leitor próprio com destaques, notas e progresso salvo.",
		link: "https://github.com/ravelroot/Document-Library-Desktop",
		tecnologias: ["Java", "Spring Boot", "SQLite", "PDFBox", "pdf.js", "Javascript", "Playwright"]
	}
];

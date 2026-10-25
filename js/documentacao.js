// Documentação técnica de cada projeto. O "titulo" precisa ser igual ao de js/projetos.js,
// de onde vêm o ícone e o link do repositório.
// "banco" é opcional: sem ele, o cartão mostra só o botão do manual.
const DOCUMENTACAO = [
	{
		titulo: "Velo",
		miniatura: "assets/documentacao/velo.png",
		miniaturaDescricao: "Diagrama de relacionamentos das tabelas do Velo",
		decisao: "Um modelo, seis bancos",
		texto: "As 13 tabelas seguem um único modelo de dados. Na primeira execução, o Flyway cria o esquema a partir do script do banco escolhido: H2, PostgreSQL, MySQL, MariaDB, SQL Server ou Oracle.",
		destaques: ["13 tabelas", "6 bancos", "Flyway"],
		manual: "https://github.com/ravelroot/Payment-and-Checkout-System/blob/main/Manual-Velo.pdf",
		banco: "https://github.com/ravelroot/Payment-and-Checkout-System/blob/main/Banco-de-Dados-Velo.pdf"
	},
	{
		titulo: "Talos",
		miniatura: "assets/documentacao/talos.png",
		miniaturaDescricao: "Diagrama de relacionamentos das tabelas de atendimento do Talos, em volta de pyh_ticket",
		decisao: "Domínio sem framework",
		texto: "Arquitetura hexagonal em três módulos Maven. O domínio não depende de framework e a infraestrutura entra pelo ServiceLoader, o que permite rodar a interface com um banco em memória para demonstração e testes.",
		destaques: ["Hexagonal", "3 módulos Maven", "Flyway"],
		manual: "https://github.com/ravelroot/Information-Technology-Service-Management/blob/main/Manual-Talos-Vers%C3%A3o%201.0.0.pdf"
	},
	{
		titulo: "Doca",
		miniatura: "assets/documentacao/doca.png",
		miniaturaDescricao: "Visão geral da arquitetura do Doca: painel, rotas, serviços, SQLAlchemy e banco",
		decisao: "Dinheiro em centavos, estoque com livro",
		texto: "Valores são gravados como inteiro de centavos, para somas exatas em qualquer banco. Cada movimento de estoque grava o saldo atual e o histórico imutável na mesma transação, travando só a tabela de saldo.",
		destaques: ["PostgreSQL ou SQLite", "Alembic", "Máquina de estados"],
		manual: "https://github.com/ravelroot/Order-and-Inventory-System/blob/main/Manual-Doca.pdf"
	},
	{
		titulo: "Nexo",
		miniatura: "assets/documentacao/nexo.png",
		miniaturaDescricao: "Diagrama de relacionamentos das tabelas do Nexo",
		decisao: "Peças plugáveis",
		texto: "Um único processo Python serve a API e a interface. Modelo de linguagem, embeddings, banco vetorial e reranker são escolhidos por configuração, sem mudar uma linha de código.",
		destaques: ["SQLAlchemy", "ChromaDB ou Qdrant", "JWT"],
		manual: "https://github.com/ravelroot/Retrieval-Augmented-QA-System/blob/main/Manual-Nexo.pdf"
	},
	{
		titulo: "Turno",
		miniatura: "assets/documentacao/turno.png",
		miniaturaDescricao: "Diagrama de relacionamentos das tabelas do Turno",
		decisao: "O banco é a fonte da verdade",
		texto: "O RabbitMQ só avisa que existe trabalho: estado, tentativas e lease ficam no PostgreSQL. Toda mudança de estado é um UPDATE condicional, e as mensagens saem por outbox na mesma transação da tarefa.",
		destaques: ["PostgreSQL", "Outbox", "EF Core 10"],
		manual: "https://github.com/ravelroot/Distributed-Task-Processing-Engine/blob/main/Manual-Turno.pdf",
		banco: "https://github.com/ravelroot/Distributed-Task-Processing-Engine/blob/main/Banco-de-Dados-Turno.pdf"
	},
	{
		titulo: "Sonda",
		miniatura: "assets/documentacao/sonda.png",
		miniaturaDescricao: "Diagrama das entidades do índice invertido da Sonda",
		decisao: "O índice é o banco",
		texto: "Nada de SQL nem LIKE: o índice invertido fica em segmentos binários imutáveis, com checksum CRC32 em todo arquivo e troca atômica da lista de segmentos, seguro contra queda de energia e indexação paralela.",
		destaques: ["Índice invertido", "Segmentos imutáveis", "CRC32"],
		manual: "https://github.com/ravelroot/Inverted-Index-Search-Engine/blob/main/Manual-Sonda.pdf",
		banco: "https://github.com/ravelroot/Inverted-Index-Search-Engine/blob/main/Banco-de-Dados-Sonda.pdf"
	},
	{
		titulo: "Argo",
		miniatura: "assets/documentacao/argo.png",
		miniaturaDescricao: "Ligações lógicas entre os quatro bancos do Argo",
		decisao: "Um banco por serviço",
		texto: "Quatro bancos MySQL, um por microserviço, com 10 tabelas no total. Nenhum serviço lê o banco de outro, e cada um recebe só a própria URL de conexão, no mesmo servidor ou em servidores diferentes.",
		destaques: ["4 bancos MySQL", "10 tabelas", "Microserviços"],
		manual: "https://github.com/ravelroot/E-commerce-Microservices-Platform/blob/main/Manual-Argo.pdf",
		banco: "https://github.com/ravelroot/E-commerce-Microservices-Platform/blob/main/Banco-de-Dados-Argo.pdf"
	},
	{
		titulo: "Delco",
		miniatura: "assets/documentacao/delco.png",
		miniaturaDescricao: "Diagrama de relacionamentos das tabelas do Delco",
		decisao: "Redis é só transporte",
		texto: "Definições, execuções, tentativas e logs vivem no MySQL. Se o Redis for apagado, nada se perde: o agendador compara o banco com as filas e republica o que faltar.",
		destaques: ["MySQL", "10 tabelas", "Redis Streams"],
		manual: "https://github.com/ravelroot/Workflow-Orchestration-Engine/blob/main/Manual-Delco.pdf",
		banco: "https://github.com/ravelroot/Workflow-Orchestration-Engine/blob/main/Banco-de-Dados-Delco.pdf"
	},
	{
		titulo: "Crivo",
		miniatura: "assets/documentacao/crivo.png",
		miniaturaDescricao: "Diagrama de relacionamentos de projetos e versões do Crivo",
		decisao: "Salvar sem atropelar",
		texto: "Cada salvamento trava o projeto e confere o número da revisão: se outro salvamento chegou antes, a API responde 409 e nada é gravado. Quem lê ao mesmo tempo vê a versão antiga inteira ou a nova inteira, nunca uma mistura.",
		destaques: ["PostgreSQL 17", "Controle de revisão", "Pixels em bytea"],
		manual: "https://github.com/ravelroot/Pixel-Art-Matrix-Editor/blob/main/Manual-Crivo.pdf",
		banco: "https://github.com/ravelroot/Pixel-Art-Matrix-Editor/blob/main/Banco-de-Dados-Crivo.pdf"
	},
	{
		titulo: "Lume",
		miniatura: "assets/documentacao/lume.png",
		miniaturaDescricao: "Modelo de dados do Lume, com documentos, coleções e anotações",
		decisao: "Um arquivo só",
		texto: "Toda a biblioteca fica num único arquivo SQLite em modo WAL, sem servidor nem senha. A busca em texto completo usa FTS5 com ranking BM25, e copiar a pasta de dados leva a biblioteca inteira para outro computador.",
		destaques: ["SQLite", "FTS5 + BM25", "WAL"],
		manual: "https://github.com/ravelroot/Document-Library-Desktop/blob/main/Manual-Lume-Desktop.pdf",
		banco: "https://github.com/ravelroot/Document-Library-Desktop/blob/main/Banco-de-Dados-Lume-Desktop.pdf"
	},
	{
		titulo: "Grafo",
		miniatura: "assets/documentacao/grafo.png",
		miniaturaDescricao: "Diagrama de relacionamentos do Grafo, das equipes e projetos até a tabela de arquivos",
		decisao: "O documento é um CRDT",
		texto: "Cada arquivo é um Y.Doc (CRDT). O PostgreSQL guarda o estado compactado e a fila de updates desde a última compactação; estado + updates na ordem de seq reconstroem o documento byte a byte. O Redis cuida da presença e o NATS JetStream replica os updates entre instâncias.",
		destaques: ["PostgreSQL 17", "14 tabelas", "Yjs + Yrs"],
		manual: "https://github.com/ravelroot/Collaborative-Design-and-Diagram-Editor/blob/main/Manual-Grafo.pdf",
		banco: "https://github.com/ravelroot/Collaborative-Design-and-Diagram-Editor/blob/main/Banco-de-Dados-Grafo.pdf"
	},
	{
		titulo: "Favo",
		miniatura: "assets/documentacao/favo.png",
		miniaturaDescricao: "Diagrama de relacionamentos das sessões e operações do Favo",
		decisao: "O heap não passa pelo banco",
		texto: "Tudo o que o alocador gerencia vive na memória do processo. O SQLite, num arquivo só e em modo WAL, guarda apenas o histórico do painel: sessões, cada operação feita no heap, traces e benchmarks. Apagar uma sessão apaga as operações dela em cascata.",
		destaques: ["SQLite + WAL", "6 tabelas", "Exclusão em cascata"],
		manual: "https://github.com/ravelroot/Custom-Memory-Allocator/blob/main/Manual-Favo.pdf",
		banco: "https://github.com/ravelroot/Custom-Memory-Allocator/blob/main/Banco-de-Dados-Favo.pdf"
	}
];

// Habilidades por área. "icone" escolhe o desenho do topo do cartão (veja ICONES_AREAS em js/main.js).
// As etiquetas com o mesmo nome de uma tecnologia de js/projetos.js ficam marcadas e levam aos projetos.
const HABILIDADES = [
	{
		titulo: "Front-end",
		icone: "tela",
		grupos: [
			{ nome: "Frameworks", itens: ["React", "Vue.js", "Next.js", "Angular", "Redux", "Svelte", "Ember", "Flutter", "React Native"] },
			{ nome: "Linguagens", itens: ["HTML", "CSS", "Sass/SCSS", "JavaScript", "TypeScript", "Dart"] }
		]
	},
	{
		titulo: "Back-end",
		icone: "servidor",
		grupos: [
			{ nome: "Frameworks", itens: ["Spring Boot", "Quarkus", "FastAPI", "Flask", "Django", "Node.js", "Fastify", "ASP.NET Core"] },
			{ nome: "Linguagens", itens: ["Java", "Python", "C#", "VB.NET", "C", "C++", "JavaScript", "TypeScript"] }
		]
	},
	{
		titulo: "Bancos de Dados",
		icone: "banco",
		grupos: [
			{ nome: "Relacionais", itens: ["PostgreSQL", "MySQL", "Microsoft SQL Server", "SQLite", "MariaDB"] },
			{ nome: "Não relacionais", itens: ["MongoDB", "Redis", "Cassandra", "DynamoDB", "Elasticsearch"] }
		]
	},
	{
		titulo: "Inteligência Artificial & LLMs",
		icone: "ia",
		grupos: [
			{ nome: "Arquitetura RAG", itens: ["Chunking", "Embeddings", "Reranking", "Qdrant", "LlamaIndex"] },
			{ nome: "Modelos e protocolos", itens: ["OpenAI API", "Anthropic Claude", "Protocolo MCP", "Ollama"] }
		]
	},
	{
		titulo: "Ferramentas",
		icone: "ferramentas",
		largo: true,
		grupos: [
			{ nome: "DevOps e infraestrutura", itens: ["Docker", "Kubernetes", "Jenkins", "GitHub Actions", "GitLab CI/CD", "Terraform", "Ansible", "Prometheus", "Datadog", "AWS SQS"] },
			{ nome: "APIs", itens: ["Postman", "Swagger", "Insomnia", "Thunder Client", "GraphQL", "REST", "gRPC", "OpenAPI", "WebSocket", "Server-Sent Events", "JWT"] },
			{ nome: "Desenvolvimento", itens: ["Git", "Visual Studio", "VS Code", "IntelliJ IDEA", "GitHub", "PyCharm", "DBeaver", "Maven", "WSL", "JetBrains Rider", "Vite", "Pytest"] },
			{ nome: "Produtividade", itens: ["Office 365 (avançado)", "Google Workspace", "Notion", "Jira", "Trello", "Confluence", "Slack", "Microsoft Teams", "Figma", "Miro"] }
		]
	}
];

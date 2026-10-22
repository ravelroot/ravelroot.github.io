<p align="center">
  <img src="assets/logo-ravel.png" width="200" alt="Erik Pimenta">
</p>

<h1 align="center">Portfólio<br><sub><sup><sup><sub>Copyright (©) 2026 Erik Pimenta</sub></sup></sup></sub></h1>

<p align="center">
Meu portfólio técnico: quem eu sou, o que estudo e os sistemas que construí do zero, com foco em arquitetura, escalabilidade e consistência de dados, reunidos em uma página só.<br>
Feito com HTML5, CSS e JavaScript puros: sem framework, sem build e sem dependências.
</p>

<p align="center">
HTML5 · CSS3 · JavaScript (ES6+) · Responsivo · Zero dependências
</p>

<p align="center">
  <a href="https://ravelroot.github.io"><b>ravelroot.github.io</b></a>
</p>

---

<p align="center">
  <img src="assets/preview-portfolio.png?v=10" alt="Prévia do portfólio">
</p>

<p align="center"><b>Tema claro, na aba Habilidades</b></p>

<p align="center">
  <img src="assets/preview-portfolio-claro.png?v=9" alt="Prévia do portfólio no tema claro, na aba Habilidades">
</p>

## O que tem na página

- **Topo fixo** com o ícone de computador e o nome **ravel** digitado letra por letra e cursor piscando, que ganha fundo desfocado ao rolar a página.
- **Tema claro e escuro**: o botão redondo no canto superior direito (☀ sol / ☾ lua) troca a página entre o tema escuro (padrão) e o claro, que usa a paleta `#C0C4B6` (fundo e etiquetas), `#EADFDB` (cartões e corpo do terminal), `#AEAFB1` (bordas), `#D8C2B5` (barra do terminal) e `#7D8066` (botões, contorno das etiquetas e prompt do terminal), com textos em preto para manter a leitura. A escolha fica salva no navegador e volta na próxima visita, sem piscar o tema errado ao carregar.
- **Apresentação** com localização, resumo e link discreto para o GitHub, alinhada ao topo do terminal.
- **Terminal `ravel@localhost~`** com o `ravel --info` do Ravel OS: o que priorizo e as áreas em que atuo, com base nos meus projetos.
- **Abas Projetos e Habilidades**: as duas seções ficam em abas separadas na mesma página, com sublinhado animado na aba ativa. Dá para trocar com o mouse ou pelas setas do teclado, e a última aba aberta fica salva no navegador.
  - **Projetos** em cartões com o ícone de cada projeto antes do nome, descrição, etiquetas de tecnologias e link para cada repositório.
  - **Habilidades** organizadas por área (Front-end, Back-end, Bancos de Dados, IA & LLMs e Ferramentas), em cartões com etiquetas agrupadas.
- **Layout responsivo**: duas colunas no computador, uma no celular, sem rolagem lateral.
- **Acessível a quem prefere menos movimento**: com `prefers-reduced-motion`, as animações são desligadas.

## Projetos apresentados

| Projeto | O que é | Tecnologias |
| --- | --- | --- |
| [**Velo**](https://github.com/ravelroot/Payment-and-Checkout-System) | Loja virtual completa com catálogo, carrinho, cupons, pedidos e pagamentos por cartão, PIX e boleto (simulados ou Stripe), com painel administrativo. | Java 21 · Spring Boot 4 · React 19 · TypeScript · Flyway · 6 bancos de dados |
| [**Pyhoma**](https://github.com/ravelroot/Information-Technology-Service-Management) | Sistema desktop de ITSM, helpdesk e inventário de ativos inspirado no GLPI: chamados, problemas, mudanças, SLA, Kanban e Gantt. | Java 21 · Spring Boot · JPA · Flyway · JavaFX · Arquitetura hexagonal |
| [**Doca**](https://github.com/ravelroot/Order-and-Inventory-System) | Gestão de pedidos, compras e estoque multi-depósito com reserva transacional sem venda dupla, custo médio ponderado e curva ABC. | Python · FastAPI · SQLAlchemy 2 · PostgreSQL · Docker · GitHub Actions |
| [**Nexo**](https://github.com/ravelroot/Retrieval-Augmented-QA-System) | Chatbot RAG para manuais técnicos e livros em PDF que responde só com base nos documentos, citando trecho e página. | Python · FastAPI · LlamaIndex · ChromaDB/Qdrant · Ollama/OpenAI · React |
| [**Turno**](https://github.com/ravelroot/Distributed-Task-Processing-Engine) | Motor de agendamento e processamento de tarefas distribuídas no estilo Hangfire, com execução única garantida, retentativas, fila de erros, cron e painel em tempo real. | C# · .NET 10 · MassTransit · RabbitMQ · Redis (Redlock) · PostgreSQL · Blazor · Docker |
| [**Sonda**](https://github.com/ravelroot/Inverted-Index-Search-Engine) | Motor de busca de texto completo escrito do zero, no estilo Lucene, com índice invertido em disco e ranking por BM25 ou TF-IDF. | C# · .NET 10 · ASP.NET Core · Task Parallel Library · Brotli · xUnit · Docker |
| [**Argo**](https://github.com/ravelroot/E-commerce-Microservices-Platform) | Plataforma de microserviços para vendas com vários vendedores, feita em Django: estoque em tempo real, checkout assíncrono por fila e notas fiscais emitidas por um serviço em Java. | Python 3.13 · Django 6 · Django REST Framework · Celery · Redis · MySQL · Java 21 · Spring Boot 4 · Nginx · Docker |
| [**Delco**](https://github.com/ravelroot/Workflow-Orchestration-Engine) | Motor de orquestração de workflows no estilo Airflow e Temporal, feito em Django: pipelines em Python, pool de workers em fila e retomada do passo exato após uma queda, com painel em tempo real. | Python 3.13 · Django 6 · Django REST Framework · Channels · MySQL · Redis Streams · Docker |
| [**Crivo**](https://github.com/ravelroot/Pixel-Art-Matrix-Editor) | Editor de pixel art no navegador que trata a imagem como uma matriz de pixels RGBA, com camadas, animação, paletas e exportação da matriz em JSON, CSV, Python, C e Java. | JavaScript · Canvas 2D · Python 3.13 · Django 6.1 · PostgreSQL 17 · Java 21 · Docker |
| [**Lume**](https://github.com/ravelroot/Document-Library-Desktop) | Biblioteca de PDFs e DOCX para Windows em um único executável, com capas automáticas, descrição por IA, busca no texto inteiro e leitor próprio. | Java 21 · Spring Boot 4 · SQLite + FTS5 · Apache PDFBox · pdf.js · Playwright |

## Como rodar

Não há nada para instalar.

**Windows:** dê dois cliques em `visualizar.bat`. A página abre no seu navegador padrão.

**Qualquer sistema:** abra o arquivo `index.html` no navegador.

Se preferir servir por HTTP (útil para testar como ficará publicado):

```bash
python -m http.server 8080
```

Depois acesse **<http://localhost:8080>**.

## Como personalizar

| Quero mudar... | Onde |
| --- | --- |
| Nome, apresentação, terminal e rodapé | `index.html` |
| Descrição que aparece ao compartilhar o link (WhatsApp, LinkedIn, Discord etc.) | `index.html`, nas tags `<meta name="description">` e `<meta property="og:description">` |
| Tamanho geral da página (escala) | `css/estilo.css`, em `font-size: 80%;` no `html` |
| Lista de projetos | `js/projetos.js`, no vetor `PROJETOS` |
| Habilidades e tecnologias | `js/habilidades.js`, no vetor `HABILIDADES` |
| Cores, fontes, espaçamentos e animações | `css/estilo.css` (variáveis em `:root`) |
| Cores do tema claro | `css/estilo.css`, no bloco `:root[data-tema="claro"]` |
| Botão de tema (ícones e textos) | `index.html`, no `#botao-tema`, e `js/main.js`, em `alternarTema()` |
| Animação do título e do topo | `js/main.js` |
| Abas (nomes e textos de cada seção) | `index.html`, nos botões `.aba` e nos painéis `#painel-projetos` e `#painel-habilidades`; o comportamento fica em `js/main.js`, em `alternarAbas()` |

Depois de alterar um arquivo CSS ou JS, aumente o número de `?v=` nos links do `index.html` (por exemplo, de `?v=2` para `?v=3`). Assim o navegador de quem visita baixa a versão nova em vez de usar a antiga guardada em cache.

Para incluir um projeto novo, basta acrescentar um item:

```js
{
	titulo: "Meu Projeto",
	icone: "assets/projetos/meu-projeto.png",
	descricao: "O que ele faz, em uma ou duas frases.",
	link: "https://github.com/ravelroot/Meu-Projeto",
	tecnologias: ["Python", "FastAPI"]
}
```

O `icone` é opcional: use um PNG quadrado, branco e com fundo transparente em `assets/projetos/`.

## Estrutura

```
Portfolio/
├── index.html          estrutura da página
├── css/
│   └── estilo.css      temas escuro e claro, abas, layout responsivo e animações
├── js/
│   ├── projetos.js     dados dos projetos
│   ├── habilidades.js  habilidades por área
│   └── main.js         monta os cartões, digita o título, controla o topo, as abas e o tema
├── assets/
│   ├── logo-ravel.png  logo
│   ├── icone-computador.png  ícone do topo, ao lado do nome
│   ├── projetos/       ícones dos projetos (brancos, fundo transparente)
│   ├── favicon.png     ícone da aba
│   ├── preview-portfolio.png        prévia do tema escuro usada neste README
│   └── preview-portfolio-claro.png  prévia do tema claro usada neste README
├── .github/
│   ├── workflows/diario.yml  5 commits automáticos por dia, com rodada de reserva
│   └── atividade.txt         registro dos commits automáticos
└── visualizar.bat      abre a página no navegador (Windows)
```

[![GitHub](https://img.shields.io/badge/GitHub-ravelroot-2e2e2e?logo=github)](https://github.com/ravelroot)

## Licença

[MIT](LICENSE). Use, copie, altere e distribua à vontade.

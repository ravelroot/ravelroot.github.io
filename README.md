<p align="center">
  <img src="assets/logo-ravel.png" width="200" alt="Erik Pimenta">
</p>

<h1 align="center">Portfólio<br><sub><sup><sup><sub>Copyright (©) 2026 Erik Pimenta</sub></sup></sup></sub></h1>

<p align="center">
Meu portfólio técnico: quem eu sou, o que estudo e os sistemas que construí do zero, com foco em arquitetura, escalabilidade e consistência de dados, reunidos em uma página só.<br>
Feito com HTML5, CSS e JavaScript puros: sem framework, sem build e sem dependências. A aba Atividade busca dados ao vivo na API pública do GitHub.
</p>

<p align="center">
HTML5 · CSS3 · JavaScript (ES6+) · API do GitHub · Responsivo · Zero dependências
</p>

<p align="center">
  <a href="https://ravelroot.github.io"><b>ravelroot.github.io</b></a>
</p>

---

<p align="center">
  <img src="assets/preview-portfolio.png?v=20" alt="Prévia do portfólio na aba Projetos: apresentação, terminal, abas, filtros por linguagem e a primeira fileira de projetos">
</p>

<p align="center"><b>Aba Destaques</b></p>

<p align="center">
  <img src="assets/preview-portfolio-destaques.png?v=2" alt="Prévia da aba Destaques: atalhos do Crivo e do Grafo, cabeçalho do Crivo e a tela principal numa janela">
</p>

<p align="center"><b>Tema claro, na aba Habilidades</b></p>

<p align="center">
  <img src="assets/preview-portfolio-claro.png?v=24" alt="Prévia do portfólio no tema claro, na aba Habilidades">
</p>

<p align="center"><b>Aba Documentação</b></p>

<p align="center">
  <img src="assets/preview-portfolio-documentacao.png?v=9" alt="Prévia da aba Documentação, com o diagrama do banco e a decisão de arquitetura dos primeiros projetos">
</p>

<p align="center"><b>Aba Atividade</b></p>

<p align="center">
  <img src="assets/preview-portfolio-atividade.png?v=3" alt="Prévia da aba Atividade, com o gráfico de contribuições, as linguagens mais usadas e os repositórios recentes">
</p>

<p align="center"><b>Aba Notas</b></p>

<p align="center">
  <img src="assets/preview-portfolio-notas.png?v=7" alt="Prévia da aba Notas, com as notas em duas colunas e a vitrine de código de cada uma">
</p>

## O que tem na página

- **Topo fixo** com o ícone de computador e o nome **ravel** digitado letra por letra e cursor piscando, que ganha fundo desfocado ao rolar a página.
- **Tema claro e escuro**: o botão redondo no canto superior direito (☀ sol / ☾ lua) troca a página entre o tema escuro (padrão) e o claro, inspirado em **desenho técnico de engenharia**: fundo de papel com quadriculado bem fraco, texto e destaques em grafite, a mesma linguagem dos diagramas dos PDFs. A paleta é Papel `#E8ECEA` (fundo, etiquetas e barra do terminal), Folha `#F6F8F7` (cartões e corpo do terminal), Linha `#B9C4C2` (bordas), Ardósia `#46535A` (textos de apoio, abas fechadas e botões ao passar o mouse) e Grafite `#20282D` (títulos, textos, botões, aba aberta, cursor do título, prompt do terminal, quadriculado, traço dos diagramas na aba Documentação e barras de linguagens). O gráfico de contribuições vai do papel ao grafite, passando por Linha e Ardósia. Os três botões coloridos do terminal continuam como no tema escuro. O tema escuro usa o mesmo quadriculado de engenharia no fundo, em linhas brancas bem fracas. A escolha fica salva no navegador e volta na próxima visita, sem piscar o tema errado ao carregar.
- **Apresentação** com localização, resumo e link discreto para o GitHub, alinhada ao topo do terminal.
- **Terminal `ravel@localhost~`** com o `ravel --info` do Ravel OS: o que priorizo e as áreas em que atuo, com base nos meus projetos.
- **Sete abas: Projetos, Destaques, Habilidades, Documentação, Atividade, Notas e Contato**: as seções ficam em abas separadas na mesma página, com sublinhado animado na aba ativa. Dá para trocar com o mouse ou pelas setas do teclado, e a última aba aberta fica salva no navegador. No celular, a fileira de abas rola para o lado e a aba ativa sempre fica à vista.
  - **Projetos** em cartões com **vitrine no estilo do terminal**: o caminho do repositório no GitHub, a linguagem principal e o ícone do projeto em tamanho grande sobre um pontilhado. Abaixo vêm a categoria em destaque (por exemplo, *Pagamentos e checkout*), o nome, a descrição, as etiquetas de tecnologias e dois botões: **Ver projeto** (repositório) e **Manual técnico** (PDF). Acima da grade ficam os **filtros por linguagem** (Todos, Python, Java, JavaScript, TypeScript, C#, C, C++ e Rust, com o número de projetos em cada um), montados sozinhos a partir das tecnologias; ao filtrar, a etiqueta da linguagem escolhida fica realçada em cada cartão e o contador mostra quantos projetos aparecem. Os cartões **entram um a um** quando surgem na tela (e de novo a cada filtro). Ao passar o mouse, uma luz suave acompanha o cursor, o pontilhado se acende em volta dele, o ícone ganha um leve brilho, um cursor pisca ao lado do repositório e a seta do botão avança. Tudo respeita `prefers-reduced-motion`.
  - **Destaques**: o **Crivo** e o **Grafo** apresentados em detalhe, um depois do outro. No topo, um atalho para cada um (ícone, categoria e versão) rola até ele. Cada projeto abre com a posição (*Destaque 01 / 02*), a categoria, a versão, o nome em tamanho grande, uma frase que resume o projeto e os botões **Abrir no navegador** (versão no GitHub Pages), **Código no GitHub**, **Manual técnico** e **Arquitetura do BD**. Depois vêm: a **tela principal numa janela** com a barra do terminal e o endereço da versão online, que **acompanha o tema da página** (editor escuro no tema escuro, claro no claro); **quatro números** (por exemplo, *263 testes, todos passando* e *37 KB de núcleo em WebAssembly*); **A ideia**, em três parágrafos, ao lado das **tecnologias** agrupadas; uma **galeria de nove telas** com legenda; **Por dentro**, com seis decisões de engenharia numeradas (algumas com um trecho no estilo do terminal, como o RLE do Crivo e as tabelas do documento do Grafo); a **arquitetura** desenhada num terminal; e a tabela de **testes e verificações** com os resultados. Um clique na tela principal ou em qualquer foto abre o **visualizador**: a imagem quase em tela cheia, com legenda, posição (*04 / 10*), botões e setas do teclado para passar (ele dá a volta no fim), deslize no celular, Esc ou clique fora para fechar e o foco de volta na foto. A aba termina com **Dois editores, as mesmas regras** (três maneiras de rodar, builds reproduzíveis, segurança por padrão e documentação para quem chega) e um botão que volta para a aba Projetos. Os blocos sobem e aparecem conforme a página rola, e tudo respeita `prefers-reduced-motion`.
  - **Habilidades** organizadas por área (Front-end, Back-end, Bancos de Dados, IA & LLMs e Ferramentas), em cartões com um ícone para cada área, o número de itens e etiquetas agrupadas. IA & LLMs se divide em Arquitetura RAG e Modelos e protocolos; Ferramentas, em DevOps e infraestrutura, APIs, Desenvolvimento e Produtividade. As tecnologias que aparecem nos projetos podem ser clicadas: o clique abre a aba Projetos já filtrada por ela (o filtro aparece como um botão a mais, com um X para remover). Acima dos cartões, os botões **Todas** e **Usadas nos projetos** deixam as demais etiquetas apagadas. Os cartões entram um a um ao aparecer na tela, as etiquetas acendem em cascata e uma luz suave acompanha o mouse.
  - **Documentação**: um cartão por projeto com a miniatura do diagrama do banco (tirada do próprio PDF, em traço branco no tema escuro e grafite no claro), a decisão de arquitetura que mais pesou, etiquetas com os números principais e botões que abrem o **Manual técnico** e a **Arquitetura do BD** em PDF no GitHub. A miniatura também abre o PDF. O Talos, que ainda não tem o PDF do banco, mostra o diagrama de relacionamentos da área de atendimento (as tabelas em volta de `pyh_ticket`), desenhado a partir do diagrama Mermaid de `docs/banco-de-dados.md` do próprio repositório.
  - **Atividade**: dados ao vivo do GitHub, buscados só quando a aba é aberta. O cartão de contribuições abre no **ano atual**, de 1º de janeiro até hoje, e tem um botão para cada ano desde **2022** (**2026 · 2025 · 2024 · 2023 · 2022**; um botão novo aparece sozinho a cada virada de ano). Os anos sem nenhum commit aparecem com o calendário inteiro vazio, e os anos anteriores à criação da conta nem gastam consulta à API. Para cada ano, mostra o total de contribuições, os dias com contribuições, a maior sequência de dias seguidos e o número de repositórios públicos, com o **gráfico de contribuições** (o mesmo calendário do perfil, em tons neutros que acompanham o tema); no ano em andamento, os dias que ainda não chegaram aparecem vazados, e a nota abaixo do gráfico diz o período exato. Abaixo vêm as **linguagens mais usadas** pela soma do código de todos os repositórios e os **repositórios que receberam commits por último**, com o ícone do projeto quando ele está no portfólio. Passar o mouse sobre um dia ou uma linguagem mostra os detalhes.
  - **Notas**: textos curtos sobre as decisões técnicas por trás dos projetos (o problema, a escolha feita e o que ela custa), em **duas colunas** no computador e uma no celular. Cada cartão abre com uma vitrine no estilo do terminal, com o bloco de código da própria nota (ou uma frase dela, quando a nota não tem código), seguida do tema em destaque, do tempo de leitura (calculado pelo número de palavras), do título, de um resumo e das etiquetas dos projetos citados, com ícone e link para o repositório. Ao passar o mouse, uma luz suave acompanha o cursor, o código sobe um pouco e a seta do botão avança. Quando o número de notas é ímpar, a última ocupa a fileira inteira, com a vitrine ao lado do texto. O botão **Ler nota** (ou um clique na vitrine) abre a nota inteira num painel por cima da página, com a posição dela no topo (por exemplo, 07 / 08), com blocos de código quando ajudam a explicar e os botões **Anterior** e **Próxima** para seguir lendo. O painel fecha no X, com Esc ou com um clique fora dele, e o foco volta ao cartão da última nota lida. As notas atuais: *Fila não é banco de dados* (Turno e Delco), *Dinheiro é inteiro* (Doca), *Concorrência otimista com número de revisão* (Crivo), *Índice invertido: buscar sem LIKE* (Sonda), *RAG: a resposta depende da busca* (Nexo), *Um banco por serviço* (Argo), *Embaralhar sem viés* (Grimório dos Videntes, sem etiqueta de projeto, já que ele não está na aba Projetos) e *Boundary tags: liberar memória em O(1)* (Favo).
  - **Contato**: formulário com **nome**, **sobrenome**, **e-mail para resposta**, **motivo do contato** (Proposta de trabalho, Projeto freelance, Dúvida sobre um projeto, Parceria ou colaboração ou Outro assunto) e **mensagem** (até 3.000 caracteres, com contador). Ao enviar, a mensagem chega no e-mail **ravelroot@outlook.com** pelo [FormSubmit](https://formsubmit.co), sem servidor próprio; o e-mail recebido traz o motivo no assunto, e responder a ele já vai para o endereço de quem escreveu. Enquanto envia, o botão mostra *Enviando…*; depois, o formulário dá lugar a uma confirmação com o botão **Enviar outra mensagem**. Se o envio falhar, aparece um link `mailto:` com a mensagem já preenchida. Um campo invisível barra robôs.
- **Escala fixa de 75% no computador**: a página já abre do tamanho que teria com o zoom do Chrome em 75%, sem o visitante precisar ajustar nada. No celular (até 768 px de largura) ela fica em 100%, para o texto continuar legível.
- **Layout responsivo**: duas colunas no computador, uma no celular, sem rolagem lateral.
- **Acessível a quem prefere menos movimento**: com `prefers-reduced-motion`, as animações são desligadas.

## De onde vêm os dados da aba Atividade

| Dado | Fonte |
| --- | --- |
| Perfil, repositórios e linguagens | [API pública do GitHub](https://docs.github.com/rest) (`/users/ravelroot`, `/users/ravelroot/repos` e `/repos/.../languages`) |
| Gráfico de contribuições | [github-contributions-api.jogruber.de](https://github.com/grubersjoe/github-contributions-api), que lê o calendário do perfil |
| Ano inteiro (botões de ano) | O mesmo serviço, com `?y=2026`, `?y=2025` e assim por diante até 2022; anos que já acabaram ficam guardados por 24 horas, e os anteriores à criação da conta são montados vazios, sem consulta |
| Plano B do gráfico | Eventos públicos dos últimos 90 dias (`/users/ravelroot/events/public`), usados se o calendário não responder |

- Não precisa de token. A API do GitHub permite 60 consultas por hora sem login. A primeira visita do dia gasta cerca de 15 (uma por repositório para contar as linguagens); depois disso, a resposta fica guardada no navegador por **30 minutos** e a conta das linguagens por **24 horas**, então cada atualização gasta só 2.
- Se o GitHub limitar as consultas, a aba mostra os últimos dados salvos e avisa o horário. Sem nenhum dado salvo, aparece um cartão com link para o perfil.
- O gráfico de contribuições conta os commits feitos com o e-mail da conta, inclusive os da rotina diária em `.github/workflows/diario.yml`.

## Projetos apresentados

| Projeto | O que é | Tecnologias |
| --- | --- | --- |
| [**Velo**](https://github.com/ravelroot/Payment-and-Checkout-System) | Velo é um sistema de pagamento desenvolvido em Java 21, Spring Boot 4 (REST, Security, JPA, Flyway) que integra catálogo, carrinho, cupons, pedidos e meios de pagamento (cartão, PIX e boleto simulados ou Stripe), com gestão de usuários e painel administrativo. Com suporte a H2, PostgreSQL, MySQL, MariaDB, SQL Server e Oracle. | Java 21 · Spring Boot 4 · React 19 · TypeScript · Flyway · 6 bancos de dados |
| [**Talos**](https://github.com/ravelroot/Information-Technology-Service-Management) | Talos é um sistema desktop de ITSM, helpdesk e inventário de ativos em Java 21 com Spring Boot (JPA e Flyway) e interface JavaFX. Arquitetura hexagonal inspirada no GLPI: chamados, problemas, mudanças, SLA, regras de negócio, Kanban e Gantt. Banco à escolha (PostgreSQL, MySQL, MariaDB, SQL Server, Oracle ou H2) e instalador .msi via jpackage. | Java 21 · Spring Boot 4 · JavaFX 21 · JPA · Flyway · Arquitetura hexagonal · 6 bancos de dados |
| [**Doca**](https://github.com/ravelroot/Order-and-Inventory-System) | Doca é uma plataforma de gestão de pedidos, compras e estoque multi-depósito, desenvolvida com Python e FastAPI. Oferece reserva transacional de estoque, custo médio ponderado, análises ABC, giro e reposição, além de painel web com controle de acesso, auditoria, PostgreSQL, Docker e integração contínua. | Python · FastAPI · SQLAlchemy 2 · Alembic · PostgreSQL ou SQLite · Docker · GitHub Actions |
| [**Nexo**](https://github.com/ravelroot/Retrieval-Augmented-QA-System) | Nexo é um chatbot RAG para manuais técnicos e livros em PDF desenvolvido em Python com FastAPI, LlamaIndex e interface React + TypeScript. Responde com base estrita nos documentos, citando trecho e página, com reranking e cortes de relevância contra alucinações. Com suporte a ChromaDB, Qdrant, Ollama, OpenAI e Cohere. | Python · FastAPI · LlamaIndex · ChromaDB/Qdrant · Ollama/OpenAI · React 19 · TypeScript |
| [**Turno**](https://github.com/ravelroot/Distributed-Task-Processing-Engine) | Turno é um motor de agendamento e processamento de tarefas distribuídas em C# e .NET 10, no estilo Hangfire. Workers clonados consomem filas do RabbitMQ ou Azure Service Bus via MassTransit, com lock Redlock no Redis, Polly (retry, circuit breaker e fila de erros), PostgreSQL e painel em Blazor WebAssembly em tempo real. | C# · .NET 10 · MassTransit · RabbitMQ ou Azure Service Bus · Redis (Redlock) · PostgreSQL · Blazor · Docker |
| [**Sonda**](https://github.com/ravelroot/Inverted-Index-Search-Engine) | Sonda é um motor de busca de texto completo escrito do zero em C# e .NET 10, no estilo Lucene e Elasticsearch. Indexa pastas de .txt, .md e .html em paralelo com TPL e ConcurrentDictionary, aplica tokenização e stemming RSLP e Porter, grava um índice invertido binário via FileStream e ordena por BM25 ou TF-IDF, com painel web, API e CLI. | C# · .NET 10 · ASP.NET Core · Task Parallel Library · Brotli · xUnit · Docker |
| [**Argo**](https://github.com/ravelroot/E-commerce-Microservices-Platform) | Argo é uma plataforma de microserviços para vendas com vários vendedores, feita em Django: estoque em tempo real (Redis + SSE), checkout assíncrono com Celery, notas fiscais por um serviço em Java (Spring Boot), banco MySQL, gateway Nginx e Docker Compose. Pronta para usar, com manual e PDF do banco de dados. | Python 3.13 · Django 6 · Django REST Framework · Celery · Redis · MySQL · Java 21 · Spring Boot 4 · Nginx · Docker |
| [**Delco**](https://github.com/ravelroot/Workflow-Orchestration-Engine) | Delco é um motor de orquestração de workflows em Python e Django, no estilo Airflow/Temporal: pipelines como código, agendamento cron, worker pool em Redis Streams, retentativas e retomada exata após quedas. API em Django REST Framework, painel em tempo real com Django Channels, MySQL, Docker e Pytest. | Python 3.13 · Django 6 · Django REST Framework · Channels · MySQL · Redis Streams · Docker |
| [**Crivo**](https://github.com/ravelroot/Pixel-Art-Matrix-Editor) | Crivo é um editor de pixel art no navegador em JavaScript puro: matriz RGBA via ImageData, balde por varredura, Bresenham e elipse de ponto médio, camadas, animação, simetria e histórico ilimitado com diffs e RLE. Paletas Game Boy, NES, Pico-8 e CGA, tons em OKLCH, PNG, sprite sheet e matrizes JSON/CSV/JS/Python. API Django e CLI Java. | JavaScript · Canvas 2D · Python 3.13 · Django 6.1 · PostgreSQL 17 · Java 21 · Docker |
| [**Lume**](https://github.com/ravelroot/Document-Library-Desktop) | Lume é uma biblioteca de PDFs e DOCX em Java 21 + Spring Boot 4, com capas automáticas (PDFBox), descrição por IA, leitor próprio, estantes, coleções e busca em texto completo (SQLite FTS5). Um único Lume.exe portátil, com o Java embutido. | Java 21 · Spring Boot 4 · SQLite + FTS5 · Apache PDFBox · pdf.js · Playwright |
| [**Grafo**](https://github.com/ravelroot/Collaborative-Design-and-Diagram-Editor) | Grafo é um editor colaborativo de design e diagramas no navegador, em JavaScript com PixiJS (WebGL2 e WebGPU) e núcleo geométrico em C++ compilado para WebAssembly. Frames, auto layout, componentes, fluxogramas, UML, ER e BPMN, protótipo clicável e edição em tempo real com Yjs, servidor em Rust, PostgreSQL, Redis e NATS. | JavaScript · PixiJS 8 · C++17 → WebAssembly · Rust (Axum + Tokio) · Yjs/Yrs · PostgreSQL 17 · Redis 7 · NATS JetStream · Go + WebView2 · Docker |
| [**Favo**](https://github.com/ravelroot/Custom-Memory-Allocator) | Favo é um alocador de memória escrito do zero em C11 que substitui o malloc e o free do sistema: pede memória ao kernel com sbrk e mmap (VirtualAlloc no Windows), alinha blocos a 16 bytes, aloca por First-Fit, Next-Fit ou Best-Fit em árvore rubro-negra e funde vizinhos livres. Funciona via LD_PRELOAD, com API em FastAPI e painel web do heap ao vivo. | C11 · sbrk e mmap · CMake · LD_PRELOAD · Python 3.13 · FastAPI · WebSocket · SQLite · TypeScript · Vite · Docker |

## Como rodar

Não há nada para instalar.

**Windows:** dê dois cliques em `visualizar.bat`. A página abre no seu navegador padrão.

**Qualquer sistema:** abra o arquivo `index.html` no navegador.

A aba Atividade precisa de internet para buscar os dados no GitHub; o resto da página funciona offline.

Se preferir servir por HTTP (útil para testar como ficará publicado):

```bash
python -m http.server 8080
```

Depois acesse **<http://localhost:8080>**.

### Ativar o formulário de contato

O FormSubmit só entrega mensagens depois de uma ativação, feita uma vez:

1. Publique a página e envie uma mensagem de teste pela aba **Contato** do site publicado (aberto como arquivo, pelo `visualizar.bat`, o envio não funciona).
2. Abra o e-mail **ravelroot@outlook.com** e clique em **Activate Form** na mensagem do FormSubmit (se não aparecer, olhe a caixa de spam).
3. A partir daí, cada envio chega como e-mail, com os campos numa tabela.

O mesmo e-mail de ativação traz um código aleatório que pode substituir o endereço em `CONTATO.destino` e no `action` do formulário, para o e-mail não ficar visível no código da página.

## Como personalizar

| Quero mudar... | Onde |
| --- | --- |
| Nome, apresentação, terminal e rodapé | `index.html` |
| Descrição que aparece ao compartilhar o link (WhatsApp, LinkedIn, Discord etc.) | `index.html`, nas tags `<meta name="description">` e `<meta property="og:description">` |
| Tamanho geral da página (escala) | `css/estilo.css`: o zoom de 75% fica em `zoom: 0.75;` na `.pagina`, dentro do `@media (min-width: 769px)` (a dica do gráfico e o quadriculado do fundo têm os tamanhos reduzidos no mesmo bloco); o tamanho base do texto fica em `font-size: 80%;` no `html` |
| Lista de projetos e categoria de cada um | `js/projetos.js`, no vetor `PROJETOS` |
| Linguagens que viram filtro na aba Projetos | `js/main.js`, na lista `LINGUAGENS` (só aparecem as que algum projeto usa, em ordem de quantidade) |
| Habilidades e tecnologias | `js/habilidades.js`, no vetor `HABILIDADES` (o campo `icone` escolhe o desenho do cartão entre `tela`, `servidor`, `banco`, `ia` e `ferramentas`, definidos em `ICONES_AREAS`, em `js/main.js`); uma etiqueta fica marcada como usada quando tem o mesmo nome de uma tecnologia em `js/projetos.js` |
| Quadriculado do fundo | `css/estilo.css`, na variável `--grade` (uma vez em cada tema) |
| Decisão de arquitetura, etiquetas e links dos PDFs de cada projeto | `js/documentacao.js`, no vetor `DOCUMENTACAO` |
| Notas (tema, título, resumo, texto, frase da vitrine e projetos citados) | `js/notas.js`, no vetor `NOTAS` |
| Aba Destaques (projetos, frase, números, textos, tecnologias, fotos e legendas, decisões de engenharia, arquitetura, testes e o bloco final) | `js/destaques.js`, nos vetores `DESTAQUES` e `DESTAQUES_EM_COMUM`; o `titulo` de cada destaque precisa ser igual ao de `js/projetos.js` e de `js/documentacao.js`, de onde vêm o ícone, a categoria, o repositório e os PDFs |
| Fotos da aba Destaques | `assets/destaques/crivo/` e `assets/destaques/grafo/`: as telas em WebP no tamanho original (usadas na capa e no visualizador) e, em `mini/`, as miniaturas de 800 × 500 da galeria, todas convertidas das imagens de `docs/images/` de cada repositório |
| Luz que segue o mouse nos cartões de projeto e de nota, brilho do ícone grande e fundo escurecido atrás do leitor | `css/estilo.css`, nas variáveis `--luz`, `--brilho-icone` e `--fundo-leitor` (uma vez em cada tema) |
| Miniaturas dos diagramas | `assets/documentacao/` (PNG branco com fundo transparente, 1100 × 420) |
| Usuário do GitHub, tempos de cache, quantos repositórios e linguagens mostrar e ano inicial dos botões de ano | `js/atividade.js`, no objeto `ATIVIDADE` (`anoInicial`, hoje 2022: o primeiro botão de ano e o começo do calendário) |
| Tons do gráfico de contribuições e das barras de linguagens | `css/estilo.css`, nas variáveis `--nivel-0` a `--nivel-4`, `--barra` e `--barra-outras` (uma vez em cada tema) |
| Cores, fontes, espaçamentos e animações | `css/estilo.css` (variáveis em `:root`) |
| Cores do tema claro | `css/estilo.css`, no bloco `:root[data-tema="claro"]` |
| Botão de tema (ícones e textos) | `index.html`, no `#botao-tema`, e `js/main.js`, em `alternarTema()` |
| Animação do título e do topo | `js/main.js` |
| Abas (nomes e textos de cada seção) | `index.html`, nos botões `.aba` e nos painéis `#painel-projetos`, `#painel-destaques`, `#painel-habilidades`, `#painel-documentacao`, `#painel-atividade`, `#painel-notas` e `#painel-contato`; o comportamento fica em `js/main.js`, em `alternarAbas()` |
| Formulário de contato (e-mail que recebe, campos e motivos) | E-mail de destino: `js/contato.js`, em `CONTATO.destino`, e no `action` do `#contato-form` em `index.html`; campos, motivos e textos: `index.html`, no `#painel-contato` |

Depois de alterar um arquivo CSS ou JS, aumente o número de `?v=` nos links do `index.html` (por exemplo, de `?v=2` para `?v=3`). Assim o navegador de quem visita baixa a versão nova em vez de usar a antiga guardada em cache.

Para incluir um projeto novo, basta acrescentar um item:

```js
{
	titulo: "Meu Projeto",
	categoria: "O que ele é, em duas ou três palavras",
	icone: "assets/projetos/meu-projeto.png",
	descricao: "O que ele faz, em uma ou duas frases.",
	link: "https://github.com/ravelroot/Meu-Projeto",
	tecnologias: ["Python", "FastAPI"]
}
```

O `icone` é opcional: use um PNG quadrado, branco e com fundo transparente em `assets/projetos/` (ele aparece pequeno nas outras abas e grande na vitrine do cartão). A primeira tecnologia da lista é tratada como a linguagem principal e aparece na vitrine. O botão **Manual técnico** usa o `manual` do item de mesmo `titulo` em `js/documentacao.js`; sem ele, o cartão mostra só **Ver projeto**.

Para o projeto aparecer também na aba Documentação, acrescente um item com o **mesmo `titulo`** em `js/documentacao.js` (o ícone vem de `js/projetos.js`):

```js
{
	titulo: "Meu Projeto",
	miniatura: "assets/documentacao/meu-projeto.png",
	miniaturaDescricao: "Diagrama de relacionamentos das tabelas do Meu Projeto",
	decisao: "A decisão de arquitetura em poucas palavras",
	texto: "Por que essa decisão foi tomada, em duas ou três frases.",
	destaques: ["PostgreSQL", "12 tabelas"],
	manual: "https://github.com/ravelroot/Meu-Projeto/blob/main/Manual-Meu-Projeto.pdf",
	banco: "https://github.com/ravelroot/Meu-Projeto/blob/main/Banco-de-Dados-Meu-Projeto.pdf"
}
```

O `banco` é opcional: sem ele, o cartão mostra só o botão do manual.

Para escrever uma nota nova, acrescente um item em `js/notas.js`. Em `corpo`, cada texto vira um parágrafo e cada `{ codigo: "..." }` vira um bloco de código; os nomes em `projetos` precisam ser iguais aos `titulo` de `js/projetos.js`. Com `projetos: []`, a nota aparece sem etiquetas (útil para projetos que não estão na aba Projetos). A posição no vetor define a ordem das notas e o contador do leitor. A vitrine do cartão mostra o primeiro bloco de código; `citacao` é opcional e põe uma frase no lugar do código (sem código e sem `citacao`, entra a primeira frase do texto):

```js
{
	titulo: "Título da nota",
	tema: "Arquitetura",
	resumo: "Uma frase que diz do que a nota trata.",
	corpo: [
		"Primeiro parágrafo.",
		{ codigo: "SELECT 1;" },
		"Último parágrafo."
	],
	citacao: "Uma frase curta da nota para a vitrine (opcional).",
	projetos: ["Meu Projeto"]
}
```

## Estrutura

```
Portfolio/
├── index.html          estrutura da página
├── css/
│   └── estilo.css      temas escuro e claro, abas, escala de 75%, layout responsivo e animações
├── js/
│   ├── projetos.js     dados dos projetos
│   ├── habilidades.js  habilidades por área
│   ├── documentacao.js decisão de arquitetura e PDFs de cada projeto
│   ├── atividade.js    busca os dados do GitHub e monta a aba Atividade
│   ├── notas.js        textos da aba Notas
│   ├── destaques.js    Crivo e Grafo em detalhe: textos, números, fotos, arquitetura e testes da aba Destaques
│   ├── contato.js      envia o formulário da aba Contato para o e-mail pelo FormSubmit
│   └── main.js         monta os cartões, os filtros dos projetos, a aba Destaques com o visualizador de imagens e o leitor das notas, digita o título, controla o topo, as abas e o tema
├── assets/
│   ├── logo-ravel.png  logo
│   ├── icone-computador.png  ícone do topo, ao lado do nome
│   ├── projetos/       ícones dos projetos (brancos, fundo transparente)
│   ├── destaques/      telas do Crivo e do Grafo em WebP (crivo/ e grafo/, com as miniaturas em mini/)
│   ├── documentacao/   miniaturas dos diagramas de banco, tiradas dos PDFs (a do Talos vem do diagrama Mermaid de docs/banco-de-dados.md)
│   ├── favicon.png     ícone da aba
│   ├── preview-portfolio.png        prévia do tema escuro usada neste README
│   ├── preview-portfolio-claro.png  prévia do tema claro usada neste README
│   ├── preview-portfolio-documentacao.png  prévia da aba Documentação
│   ├── preview-portfolio-destaques.png     prévia da aba Destaques
│   ├── preview-portfolio-atividade.png     prévia da aba Atividade
│   └── preview-portfolio-notas.png         prévia da aba Notas
├── .github/
│   ├── workflows/diario.yml  5 commits automáticos por dia, com rodada de reserva
│   └── atividade.txt         registro dos commits automáticos
└── visualizar.bat      abre a página no navegador (Windows)
```

[![GitHub](https://img.shields.io/badge/GitHub-ravelroot-2e2e2e?logo=github)](https://github.com/ravelroot)

## Licença

[MIT](LICENSE). Use, copie, altere e distribua à vontade.

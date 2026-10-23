// Notas técnicas: textos curtos sobre as decisões por trás dos projetos.
// "projetos" usa o mesmo "titulo" de js/projetos.js, de onde vêm o ícone e o link.
// "corpo" é uma lista de blocos: texto vira parágrafo; { codigo: "..." } vira bloco de código.
// O tempo de leitura é calculado sozinho pelo número de palavras.
// No cartão, a vitrine mostra o primeiro bloco de código da nota. Com "citacao" (opcional), mostra essa
// frase no lugar do código; se a nota não tem código nem citação, entra a primeira frase do texto.
const NOTAS = [
	{
		titulo: "Fila não é banco de dados",
		tema: "Consistência",
		resumo: "No Turno e no Delco, o broker só avisa que existe trabalho. Quem sabe o que já foi feito é o banco.",
		corpo: [
			"Quando a fila guarda o estado do sistema, qualquer falha no broker vira perda de dado: uma mensagem confirmada antes da hora some, e uma reentregue roda duas vezes. Por isso, nos meus motores de tarefas, a mensagem carrega só um aviso.",
			"No Turno, estado, tentativas e lease de cada tarefa ficam no PostgreSQL. Um worker só assume a tarefa se um UPDATE condicional encontrar a linha no estado esperado. Se outro worker chegou antes, o UPDATE afeta zero linhas e nada acontece. Em forma simplificada:",
			{ codigo: "UPDATE tarefas\n   SET estado = 'executando'\n WHERE id = @id\n   AND estado = 'pendente';\n-- 1 linha: a tarefa é sua\n-- 0 linhas: outro worker já pegou" },
			"Para a mensagem não sair antes de a transação gravar, uso outbox: ela é inserida numa tabela na mesma transação da tarefa e publicada depois. No Delco a ideia é a mesma com Redis Streams: se o Redis for apagado, o agendador compara o banco com as filas e republica o que faltar."
		],
		projetos: ["Turno", "Delco"]
	},
	{
		titulo: "Dinheiro é inteiro",
		tema: "Modelagem de dados",
		resumo: "Por que o Doca grava valores em centavos, e não em ponto flutuante.",
		corpo: [
			"Ponto flutuante binário não representa 0,10 com exatidão. Numa conta isolada o erro é invisível; somado em milhares de itens de pedido, ele aparece no fechamento do caixa.",
			{ codigo: "0.1 + 0.2   // 0.30000000000000004\n10 + 20     // 30 (em centavos: exato)" },
			"No Doca, todo valor é um inteiro de centavos. A soma é exata tanto no PostgreSQL quanto no SQLite, sem depender de um tipo decimal que cada banco implementa de um jeito. A conversão para reais acontece só na hora de mostrar.",
			"Com inteiros, arredondar vira uma decisão explícita no código: quando um desconto gera fração de centavo, a regra diz para que lado ir, em vez de deixar o hardware escolher."
		],
		projetos: ["Doca"]
	},
	{
		titulo: "Concorrência otimista com número de revisão",
		tema: "Concorrência",
		resumo: "Dois salvamentos ao mesmo tempo: como o Crivo garante que um não apague o outro.",
		corpo: [
			"Se duas abas editam o mesmo desenho e salvam quase juntas, a última gravação vence e apaga o trabalho da primeira sem aviso. É o problema da atualização perdida.",
			"No Crivo, cada projeto tem um número de revisão. O editor envia a revisão que leu; o servidor trava o projeto, confere o número e só grava se ele ainda for o mesmo, passando-o para o seguinte. Em forma simplificada:",
			{ codigo: "salvar(projeto, revisão lida = 7)\n→ 200  revisão atual é 7: grava e passa para 8\n→ 409  revisão atual já é 8: nada é gravado" },
			"O 409 Conflict devolve a decisão para quem tem contexto: o editor avisa que existe uma versão mais nova em vez de sobrescrevê-la. E como tudo acontece numa transação, quem lê ao mesmo tempo vê a versão antiga inteira ou a nova inteira, nunca uma mistura."
		],
		projetos: ["Crivo"]
	},
	{
		titulo: "Índice invertido: buscar sem LIKE",
		tema: "Busca",
		resumo: "Como a Sonda encontra uma palavra em milhares de documentos sem varrer nenhum deles.",
		corpo: [
			"Um LIKE '%palavra%' lê cada documento a cada busca. O índice invertido faz o contrário: lê tudo uma vez, na indexação, e guarda para cada termo a lista dos documentos em que ele aparece.",
			{ codigo: "consistência → [3, 17, 42]\nevento       → [17, 42, 108]\n\n\"consistência evento\" → interseção → [17, 42]" },
			"Antes de entrar no índice, o texto passa por tokenização e stemming em português e inglês, para que \"eventos\" e \"evento\" caiam no mesmo termo. Na hora de ordenar, o BM25 dá mais peso a termos raros e impede que um documento longo ganhe só por repetir a palavra.",
			"Na Sonda, o índice fica em segmentos binários imutáveis: um segmento novo nunca altera um antigo, e a lista de segmentos válidos é trocada de forma atômica, com CRC32 em todo arquivo. Uma queda de energia no meio da indexação não corrompe o que já existia."
		],
		projetos: ["Sonda"]
	},
	{
		titulo: "RAG: a resposta depende da busca",
		tema: "IA",
		resumo: "No Nexo, o modelo de linguagem é a peça mais fácil de trocar. O que decide a qualidade é o que chega até ele.",
		citacao: "Se a recuperação traz o trecho errado, nenhum modelo salva a resposta.",
		corpo: [
			"Um sistema RAG tem duas etapas: recuperar os trechos certos dos documentos e pedir ao modelo que responda só com eles. Se a recuperação traz o trecho errado, nenhum modelo salva a resposta.",
			"Por isso o Nexo busca mais candidatos do que precisa e passa todos por um reranker, que reordena os trechos pela relevância real para a pergunta. O que fica abaixo do corte de relevância é descartado antes de chegar ao modelo, o que ataca a principal fonte de alucinação: responder sem base.",
			"Toda resposta cita o trecho e a página de origem, então quem lê pode conferir. E como modelo, embeddings, banco vetorial e reranker são escolhidos por configuração, dá para comparar combinações sem mudar uma linha de código."
		],
		projetos: ["Nexo"]
	},
	{
		titulo: "Um banco por serviço",
		tema: "Arquitetura",
		resumo: "No Argo, nenhum microsserviço lê o banco do outro. O que isso custa e o que isso compra.",
		citacao: "Microsserviços que dividem o mesmo banco continuam acoplados.",
		corpo: [
			"Microsserviços que dividem o mesmo banco continuam acoplados: uma migração numa tabela pode quebrar outro serviço sem que nada no código dele mude.",
			"No Argo são quatro bancos MySQL, um por serviço, e cada serviço recebe só a própria URL de conexão. Os bancos podem ficar no mesmo servidor ou em servidores diferentes, sem mudar o código.",
			"O custo é que não existe JOIN entre serviços: quando um precisa de dados de outro, pede pela API ou recebe por evento. Em troca, cada serviço evolui o próprio esquema sozinho, sem quebrar os outros."
		],
		projetos: ["Argo"]
	},
	{
		titulo: "Boundary tags: liberar memória em O(1)",
		tema: "Gerenciamento de memória",
		resumo: "Como o free do Favo descobre se os vizinhos estão livres sem percorrer o heap.",
		corpo: [
			"Depois de muitos malloc e free, o heap vira um mosaico de buracos: a soma do espaço livre é grande, mas nenhum pedaço serve para um pedido maior. É a fragmentação externa, e o remédio é fundir blocos livres vizinhos assim que um deles é liberado.",
			"O difícil é achar os vizinhos. O da direita é fácil: basta somar o tamanho do bloco ao endereço dele. O da esquerda não dá para calcular, e percorrer o heap desde o início custaria O(n) a cada free. No Favo, todo bloco repete o tamanho no fim, num rodapé de 8 bytes (a boundary tag). Como os blocos são múltiplos de 16, os 4 bits mais baixos do tamanho ficam livres e guardam a marca de usado. Em forma simplificada:",
			{ codigo: "[cabeçalho 16 B][ payload ......... ][rodapé 8 B]\n\ndireita  = bloco + tamanho(bloco)\nesquerda = bloco - tamanho(rodapé logo antes)\nusado    = tamanho & 1" },
			"Assim o free lê só o rodapé do bloco anterior e o cabeçalho do seguinte, e resolve os quatro casos (nenhum vizinho livre, só a esquerda, só a direita ou os dois) em tempo constante. Para o primeiro e o último bloco não virarem exceção, cada arena começa com um rodapé falso e termina com um bloco de tamanho zero, os dois marcados como usados.",
			"O custo são 24 bytes por bloco e um bloco mínimo de 64 bytes, para caber os ponteiros da lista e da árvore rubro-negra quando ele está livre. Em troca, o rodapé também vira verificação: se uma escrita passar do fim do payload, ele deixa de bater com o cabeçalho e o Favo acusa a corrupção quando o bloco é liberado."
		],
		projetos: ["Favo"]
	}
];

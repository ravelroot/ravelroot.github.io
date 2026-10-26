// Aba Contato: o formulário manda a mensagem para o meu e-mail pelo FormSubmit (formsubmit.co),
// sem servidor próprio e sem chave. Na primeira mensagem enviada pelo site publicado, o FormSubmit
// manda um e-mail de ativação para o endereço abaixo; depois de clicar em "Activate Form",
// as mensagens passam a chegar normalmente (o mesmo e-mail traz um código que pode substituir o endereço).
// Sem JavaScript, o formulário continua funcionando pelo action do <form>, que abre a página do FormSubmit.

const CONTATO = {
	destino: "ravelroot@outlook.com",
	tempoLimite: 15000
};

function linkEmailContato(campos) {
	const link = criar("a", "contato-link", CONTATO.destino);
	const assunto = campos && campos.motivo ? `${campos.motivo} (pelo portfólio)` : "Contato pelo portfólio";
	const corpo = campos && campos.mensagem ? `${campos.mensagem}\n\n${campos.nome} ${campos.sobrenome}` : "";
	link.href = `mailto:${CONTATO.destino}?subject=${encodeURIComponent(assunto)}${corpo ? `&body=${encodeURIComponent(corpo)}` : ""}`;
	return link;
}

function iniciarContato() {
	const form = document.getElementById("contato-form");
	if (!form) return;
	const status = document.getElementById("contato-status");
	const botao = form.querySelector(".contato-enviar");
	const textoBotao = botao.textContent;
	const mensagem = form.elements.mensagem;
	const contador = document.getElementById("contato-contador");
	const limite = Number(mensagem.maxLength) || 3000;

	const contar = () => {
		contador.textContent = `${mensagem.value.length} / ${limite}`;
	};
	mensagem.addEventListener("input", contar);
	contar();

	const avisar = (texto, estado, extra) => {
		status.replaceChildren();
		if (texto) status.append(texto);
		if (extra) status.append(" ", extra, ".");
		status.dataset.estado = estado || "";
	};

	// Depois de enviar, o formulário dá lugar a uma confirmação com opção de mandar outra mensagem.
	const enviado = criar("div", "contato-enviado");
	enviado.hidden = true;
	enviado.tabIndex = -1;
	form.after(enviado);
	const mostrarEnviado = (nome) => {
		enviado.replaceChildren();
		const titulo = criar("p", "contato-enviado-titulo");
		titulo.append(criar("span", "caminho", "$"), "mensagem enviada");
		enviado.append(titulo);
		enviado.append(criar("p", "cartao-descricao", `Obrigado${nome ? `, ${nome}` : ""}! Sua mensagem chegou no meu e-mail e respondo em breve no endereço que você deixou.`));
		const outra = criar("button", "filtro", "Enviar outra mensagem");
		outra.type = "button";
		outra.addEventListener("click", () => {
			form.reset();
			contar();
			avisar("");
			enviado.hidden = true;
			form.hidden = false;
			form.elements.nome.focus();
		});
		enviado.append(outra);
		form.hidden = true;
		enviado.hidden = false;
		enviado.focus();
	};

	form.addEventListener("submit", async (evento) => {
		evento.preventDefault();
		if (botao.disabled) return;
		const campos = {};
		new FormData(form).forEach((valor, chave) => {
			campos[chave] = typeof valor === "string" ? valor.trim() : valor;
		});
		["nome", "sobrenome", "email", "mensagem"].forEach((chave) => {
			form.elements[chave].value = campos[chave];
		});
		if (!form.reportValidity()) return;
		// Campo invisível: só robô preenche. Finge que deu certo e não envia nada.
		if (campos._honey) {
			mostrarEnviado(campos.nome);
			return;
		}

		const corpo = {
			nome: campos.nome,
			sobrenome: campos.sobrenome,
			email: campos.email,
			motivo: campos.motivo,
			mensagem: campos.mensagem,
			_subject: `Contato pelo portfólio: ${campos.motivo} (${campos.nome} ${campos.sobrenome})`,
			_template: "table",
			_captcha: "false"
		};

		botao.disabled = true;
		botao.textContent = "Enviando…";
		form.setAttribute("aria-busy", "true");
		avisar("");
		const controle = new AbortController();
		const relogio = setTimeout(() => controle.abort(), CONTATO.tempoLimite);
		try {
			const resposta = await fetch(`https://formsubmit.co/ajax/${CONTATO.destino}`, {
				method: "POST",
				headers: { "Content-Type": "application/json", Accept: "application/json" },
				body: JSON.stringify(corpo),
				signal: controle.signal
			});
			const dados = await resposta.json().catch(() => ({}));
			if (!resposta.ok || String(dados.success) !== "true") throw new Error(dados.message || `HTTP ${resposta.status}`);
			mostrarEnviado(campos.nome);
		} catch (erro) {
			avisar("Não deu para enviar agora. Tente de novo em alguns minutos ou escreva direto para", "erro", linkEmailContato(campos));
		} finally {
			clearTimeout(relogio);
			botao.disabled = false;
			botao.textContent = textoBotao;
			form.removeAttribute("aria-busy");
		}
	});
}

document.addEventListener("DOMContentLoaded", iniciarContato);

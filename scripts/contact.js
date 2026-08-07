const form = document.querySelector(".contact-form");
const btn = form.querySelector(".contact-btn");

/* ── Validation helpers ─────────────────────────────────────── */
function getError(input) {
  if (input.validity.valueMissing) return "This field is required.";
  // Para o campo de e-mail, valide o formato apenas se um valor for inserido
  if (input.type === "email" && input.value.trim() !== '' && input.validity.typeMismatch) {
    return "Please enter a valid email address.";
  }
  return "";
}

function setFieldState(input, error) {
  const group = input.closest(".form-group");
  const existing = group.querySelector(".field-msg");
  if (existing) existing.remove();

  if (error) {
    input.classList.add("input-error");
    input.classList.remove("input-valid");
    const msg = document.createElement("span");
    msg.className = "field-msg field-msg--error";
    msg.textContent = error;
    group.appendChild(msg);
  } else { // Sem erro
    input.classList.remove("input-error");
    // Se o campo for opcional e estiver vazio, não mostre 'Looks good!'
    if (input.value.trim() === '' && !input.required) {
      input.classList.remove("input-valid");
      // Nenhuma mensagem é necessária para campos opcionais vazios
    } else {
      input.classList.add("input-valid");
      const msg = document.createElement("span");
      msg.className = "field-msg field-msg--valid";
      msg.textContent = "Looks good!";
      group.appendChild(msg);
    }
  }
}

/* ── Per-field blur validation ──────────────────────────────── */
form.querySelectorAll("input, textarea").forEach((input) => {
  input.addEventListener("blur", () => {
    const error = getError(input);
    // Se um campo opcional estiver vazio ao perder o foco, limpe qualquer estado e retorne
    if (input.value.trim() === "" && !input.required) {
      setFieldState(input, ""); // Limpa qualquer estado anterior
      return;
    }
    setFieldState(input, error);
  });

  input.addEventListener("input", () => {
    if (input.classList.contains("input-error")) {
      const error = getError(input);
      // Se o campo for opcional e estiver vazio, limpe o estado. Caso contrário, atualize o estado.
      if (input.value.trim() === "" && !input.required) setFieldState(input, "");
      else setFieldState(input, error);
    }
  });
});

/* ── Submit ─────────────────────────────────────────────────── */
form.addEventListener("submit", (e) => {
  e.preventDefault();

  let hasError = false;

  form.querySelectorAll("input, textarea").forEach((input) => {
    const error = getError(input);
    if (error) {
      setFieldState(input, error);
      hasError = true;
    }
  });
  if (hasError) return;

  const name = form.querySelector("#contactName").value;
  const message = form.querySelector("#contactMessage").value;

  // Obtenha os valores após a validação
  /* Loading state */
  btn.disabled = true;
  btn.classList.add("btn--loading");
  btn.textContent = "Sending…";

  /* Simulate async send */
  setTimeout(() => {
    form.classList.add("form--success");
    form.innerHTML = `
      <div class="form-success">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="10"/>
          <path d="M9 12l2 2 4-4"/>
        </svg>
        <h3>Mensagem encaminhada!</h3>
        <p>Obrigada por entrar em contato, você será redirecionado para o nosso WhatsApp agora.</p>
      </div>`;

    // Redirect to WhatsApp
    setTimeout(() => {
      const phone = "351910526079";
      const whatsappMessage = `Olá, meu nome é ${name}.\n\n${message}`;
      const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(
        whatsappMessage
      )}`;
      window.location.href = whatsappUrl;
    }, 2000); // Wait 2s before redirecting
  }, 1500);
});

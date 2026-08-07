const pricingButtons = document.querySelectorAll('.pricing-card .pricing-btn');
const contactSection = document.getElementById('contact');
const contactMessageTextarea = document.getElementById('contactMessage');
const contactNameInput = document.getElementById('contactName');

if (pricingButtons.length && contactSection && contactMessageTextarea && contactNameInput) {
  const generatedMessageTemplate = 'Olá! Tenho interesse em agendar uma sessão de ';

  pricingButtons.forEach(button => {
    button.addEventListener('click', event => {
      event.preventDefault(); // Impede o salto padrão da âncora

      const card = button.closest('.pricing-card');
      const massageType = card.querySelector('h3').textContent.trim();
      const newMessage = `${generatedMessageTemplate}${massageType}.`;

      const currentMessage = contactMessageTextarea.value.trim();

      if (currentMessage === '' || currentMessage.startsWith(generatedMessageTemplate)) {
        contactMessageTextarea.value = newMessage;
        contactMessageTextarea.dispatchEvent(new Event('input'));
      }

      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

      setTimeout(() => {
        contactNameInput.focus({ preventScroll: true });
      }, 500); // Atraso para permitir a rolagem suave
    });
  });
}
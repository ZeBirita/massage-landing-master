// ── About: left column slides in from left, right from right ──
const aboutSection = document.getElementById("about");

const aboutObserver = new IntersectionObserver(
  ([entry]) => {
    if (entry.isIntersecting) {
      aboutSection.classList.add("in-view");
      aboutObserver.disconnect();
    }
  },
  { threshold: 0.2 },
);

aboutObserver.observe(aboutSection);

// ── Benefits & Testimonials: cards fade up with stagger ───────
function animateCards(sectionId, cardSelector) {
  const section = document.getElementById(sectionId);
  const cards = section.querySelectorAll(cardSelector);

  cards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.15}s`;
  });

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        cards.forEach((card) => card.classList.add("in-view"));
        observer.disconnect();
      }
    },
    {
      /* Um threshold mais baixo (0.01) garante que a animação dispare mesmo que apenas uma pequena parte da seção esteja visível no carregamento da página. Isso corrige o problema em dispositivos onde o cálculo da interseção no carregamento inicial falhava com um threshold mais alto. */
      threshold: 0.01,
    },
  );

  observer.observe(section);
}

animateCards("benefits", ".benefit-item");
animateCards("testimonials", ".testimonial-item");
animateCards("pricing", ".pricing-card");

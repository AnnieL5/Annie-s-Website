
document.addEventListener('DOMContentLoaded', function() {
  // -------- Content slideshow (cards) --------
  const cards = document.querySelectorAll('.card');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  const indicators = document.querySelectorAll('.indicator');
  let currentIndex = 0;
  const totalCards = cards.length;

  function updateCards() {
    cards.forEach((card, index) => {
      card.className = card.className
        .replace(/\b(active|left|right|far-left|far-right)\b/g, '')
        .trim();
      if (index === currentIndex) card.classList.add('active');
      else if (index === (currentIndex - 1 + totalCards) % totalCards) card.classList.add('left');
      else if (index === (currentIndex + 1) % totalCards) card.classList.add('right');
      else if (index === (currentIndex - 2 + totalCards) % totalCards) card.classList.add('far-left');
      else if (index === (currentIndex + 2) % totalCards) card.classList.add('far-right');
    });

    indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === currentIndex);
    });
  }

  function nextCard() { currentIndex = (currentIndex + 1) % totalCards; updateCards(); }
  function prevCard() { currentIndex = (currentIndex - 1 + totalCards) % totalCards; updateCards(); }

  if (nextBtn) nextBtn.addEventListener('click', nextCard);
  if (prevBtn) prevBtn.addEventListener('click', prevCard);
  indicators.forEach(ind => ind.addEventListener('click', function() {
    currentIndex = parseInt(this.getAttribute('data-index'));
    updateCards();
  }));
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') nextCard();
    else if (e.key === 'ArrowLeft') prevCard();
  });
  updateCards();


  // -------- Image slideshow (dots + captions) --------
  // 0-based indexing + modulo wraparound = no more “stops after 3rd slide”
  let slideIndex = 0;
  const slides = document.querySelectorAll('.mySlides');
  const dots   = document.querySelectorAll('.slidedot');

  function showSlides(n) {
    if (!slides.length) return;

    // modulo wrap both directions
    slideIndex = ((n % slides.length) + slides.length) % slides.length;

    slides.forEach((s, i) => {
      s.style.display = i === slideIndex ? 'block' : 'none';
    });

    // safe even if dots count != slides count
    dots.forEach((d, i) => d.classList.toggle('active', i === slideIndex));
  }

  function plusSlides(n)  { showSlides(slideIndex + n); }
  // If your HTML uses 1-based values in dot onclicks, convert here:
  function currentSlide(n) { showSlides(n - 1); }

  // Auto-advance every 3s
  const autoTimer = setInterval(() => plusSlides(1), 3000);

  // OPTIONAL: if you use inline HTML handlers like onclick="plusSlides(1)"
  // expose functions globally:
  window.plusSlides = plusSlides;
  window.currentSlide = currentSlide;
});
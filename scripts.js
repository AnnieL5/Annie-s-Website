
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
      card.classList.remove('active', 'left', 'right', 'far-left', 'far-right');
      
      if (index === currentIndex) {
        card.classList.add('active');
      } else if (index === (currentIndex - 1 + totalCards) % totalCards) {
        card.classList.add('left');
      } else if (index === (currentIndex + 1) % totalCards) {
        card.classList.add('right');
      } else if (index === (currentIndex - 2 + totalCards) % totalCards) {
        card.classList.add('far-left');
      } else if (index === (currentIndex + 2) % totalCards) {
        card.classList.add('far-right');
      }
    });
    
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === currentIndex);
    });
  }

  function nextCard() {
    currentIndex = (currentIndex + 1) % totalCards;
    updateCards();
  }
  function prevCard() {
    currentIndex = (currentIndex - 1 + totalCards) % totalCards;
    updateCards();
  }

  nextBtn.addEventListener('click', nextCard);
  prevBtn.addEventListener('click', prevCard);

  indicators.forEach(indicator => {
    indicator.addEventListener('click', function() {
      currentIndex = parseInt(this.getAttribute('data-index'));
      updateCards();
    });
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowRight') nextCard();
    else if (e.key === 'ArrowLeft') prevCard();
  });

  updateCards();


  // -------- Image slideshow (slides) --------
  let currentSlide = 0;
  const slides = document.querySelectorAll('.slide');

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  showSlide(currentSlide); // Initial display
  setInterval(nextSlide, 3000);

  // example button
  function handleClick() {
    alert("You clicked the button! You can link this to another page or action.");
  }
});
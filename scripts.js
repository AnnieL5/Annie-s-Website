document.addEventListener('DOMContentLoaded', function() {
const cards = document.querySelectorAll('.card');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const indicators = document.querySelectorAll('.indicator');
let currentIndex = 0;
const totalCards = cards.length;

// 更新卡片位置
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
    
    // 更新指示器
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentIndex);
    });
}

// 下一张卡片
function nextCard() {
    currentIndex = (currentIndex + 1) % totalCards;
    updateCards();
}

// 上一张卡片
function prevCard() {
    currentIndex = (currentIndex - 1 + totalCards) % totalCards;
    updateCards();
}

// 按钮事件
nextBtn.addEventListener('click', nextCard);
prevBtn.addEventListener('click', prevCard);

// 指示器点击事件
indicators.forEach(indicator => {
    indicator.addEventListener('click', function() {
        currentIndex = parseInt(this.getAttribute('data-index'));
        updateCards();
    });
});

// 键盘导航
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowRight') {
        nextCard();
    } else if (e.key === 'ArrowLeft') {
        prevCard();
    }
});

// 初始化
updateCards();
});
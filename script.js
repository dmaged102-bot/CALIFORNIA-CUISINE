AOS.init({
    duration: 1200,
    once: true
});

window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        if(loader) {
            loader.style.opacity = '0';
            loader.style.filter = 'blur(15px)';
            setTimeout(() => loader.style.display = 'none', 800);
        }
    }, 1200);
});

const scrollLinks = document.querySelectorAll('.nav-scroll-link');
const networkLoader = document.getElementById('network-loader');
const networkProgress = networkLoader ? networkLoader.querySelector('.network-progress') : null;

scrollLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (!targetSection) return;

        if (networkLoader && networkProgress) {
            networkLoader.classList.add('active');
            networkProgress.style.width = '40%';
            setTimeout(() => {
                networkProgress.style.width = '85%';
            }, 150);
        }

        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 1200; 
        let start = null;

        function luxuryEaseOut(t) {
            return 1 - Math.pow(1 - t, 5);
        }

        function step(timestamp) {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const timePercent = Math.min(progress / duration, 1);
            
            window.scrollTo(0, startPosition + distance * luxuryEaseOut(timePercent));

            if (progress < duration) {
                window.requestAnimationFrame(step);
            } else {
                if (networkLoader && networkProgress) {
                    networkProgress.style.width = '100%';
                    setTimeout(() => {
                        networkLoader.classList.remove('active');
                        networkProgress.style.width = '0%';
                    }, 250);
                }
                
                targetSection.classList.add('highlight-luxury');
                setTimeout(() => {
                    targetSection.classList.remove('highlight-luxury');
                }, 1400);
            }
        }
        window.requestAnimationFrame(step);
    });
});

const tabButtons = document.querySelectorAll('.tab-btn');
const menuCards = document.querySelectorAll('.menu-card');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const selectedCategory = button.getAttribute('data-category');

        menuCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.94) translateY(10px)';
            
            setTimeout(() => {
                if (card.getAttribute('data-category') === selectedCategory) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1) translateY(0)';
                    }, 50);
                } else {
                    card.style.display = 'none';
                }
            }, 200);
        });
    });
});

menuCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const xc = rect.width / 2;
        const yc = rect.height / 2;
        const angleX = (yc - y) / 14;
        const angleY = (x - xc) / 14;
        card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.025)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
    });
});
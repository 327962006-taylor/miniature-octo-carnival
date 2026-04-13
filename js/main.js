document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initAudioPlayers();
    initScrollEffects();
});

/**
 * 导航栏滚动效果 + 移动端菜单
 */
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // 滚动时添加背景
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 移动端菜单切换
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // 点击链接关闭菜单
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // 滚动时高亮当前 section
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

/**
 * 音频播放器控制
 */
function initAudioPlayers() {
    const playButtons = document.querySelectorAll('.play-btn');

    playButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const card = button.closest('.work-card');
            const audio = card.querySelector('audio');

            // 暂停其他所有音频
            document.querySelectorAll('audio').forEach(a => {
                if (a !== audio) {
                    a.pause();
                    a.currentTime = 0;
                }
            });
            document.querySelectorAll('.work-card').forEach(c => {
                c.classList.remove('playing');
            });

            // 切换当前音频
            if (audio.paused) {
                audio.play();
                card.classList.add('playing');
            } else {
                audio.pause();
                card.classList.remove('playing');
            }
        });
    });

    // 音频结束时的处理
    document.querySelectorAll('audio').forEach(audio => {
        audio.addEventListener('ended', () => {
            const card = audio.closest('.work-card');
            card.classList.remove('playing');
        });
    });
}

/**
 * 滚动动画效果
 */
function initScrollEffects() {
    // 为元素添加淡入动画
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // 初始隐藏需要动画的元素
    const animateElements = document.querySelectorAll('.work-card, .section-title, .about-text, .social-link');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

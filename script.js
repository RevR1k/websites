// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.profile-card, .service-card, .step, .pricing-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// Navbar shadow on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
});

// ハンバーガーメニューの制御
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
}

// メニュー項目をクリックしたらメニューを閉じる
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// ウィンドウサイズ変更時の処理
window.addEventListener('resize', () => {
    if (window.innerWidth > 968) {
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// Google Formsへの送信処理
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const GOOGLE_FORM_ACTION = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSdhccybQwthNT7EYGCEWTWOGPXtnc4lFZBpI6i-aZ3xChUCUg/formResponse?pli=1';

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // フォームデータを取得
        const companyElement = document.getElementById('company');
        const fullNameElement = document.getElementById('fullName');
        const emailElement = document.getElementById('email');
        const phoneElement = document.getElementById('phone');
        const messageElement = document.getElementById('message');
        
        const company = companyElement ? companyElement.value : '';
        const fullName = fullNameElement ? fullNameElement.value : '';
        const email = emailElement ? emailElement.value : '';
        const phone = phoneElement ? phoneElement.value : '';
        const message = messageElement ? messageElement.value : '';
        
        // 非表示iframeを使用して送信
        const iframe = document.getElementById('hidden_iframe');
        const tempForm = document.createElement('form');
        tempForm.action = GOOGLE_FORM_ACTION;
        tempForm.method = 'POST';
        tempForm.target = 'hidden_iframe';
        tempForm.style.display = 'none';
        
        // 各フィールドを追加
        const fields = [
            { name: 'entry.513799394', value: company },
            { name: 'entry.2058224728', value: fullName },
            { name: 'entry.370321104', value: email },
            { name: 'entry.413561068', value: phone },
            { name: 'entry.127117433', value: message }
        ];
        
        fields.forEach(field => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = field.name;
            input.value = field.value;
            tempForm.appendChild(input);
        });
        
        document.body.appendChild(tempForm);
        tempForm.submit();
        
        // 送信後の処理
        setTimeout(() => {
            // 成功メッセージを表示
            formSuccess.style.display = 'block';
            
            // フォームをリセット
            contactForm.reset();
            
            // 一時フォームを削除
            document.body.removeChild(tempForm);
            
            // 成功メッセージまでスクロール
            formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 500);
    });
}

// iframe読み込み完了時の処理
function iframeLoaded() {
    if (formSubmitted) {
        const formSuccess = document.getElementById('formSuccess');
        const contactForm = document.getElementById('contactForm');
        
        if (formSuccess && contactForm) {
            formSuccess.style.display = 'block';
            contactForm.reset();
            formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        
        formSubmitted = false;
    }
}

// ページ読み込み時にスムーススクロールを設定
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

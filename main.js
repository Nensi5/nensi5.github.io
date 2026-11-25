// Mobile menu
const nav = document.querySelector('.nav');
const toggle = document.querySelector('.nav-toggle');
toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
});
nav.querySelectorAll('nav a').forEach(a =>
    a.addEventListener('click', () => {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
    })
);

// Fade sections in on scroll
const targets = document.querySelectorAll('.section, .card, .timeline > li');
if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
        });
    }, { threshold: 0.12 });
    targets.forEach(el => { el.classList.add('reveal'); io.observe(el); });
}

document.getElementById('year').textContent = new Date().getFullYear();

// Contact form: send through Web3Forms without leaving the page
const form = document.getElementById('contact-form');
if (form) {
    const status = form.querySelector('.form-status');
    const button = form.querySelector('button[type="submit"]');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        button.disabled = true;
        button.textContent = 'Sending…';
        status.className = 'form-status';
        status.textContent = '';
        try {
            const res = await fetch(form.action, {
                method: 'POST',
                headers: { 'Accept': 'application/json' },
                body: new FormData(form)
            });
            const data = await res.json();
            if (!data.success) throw new Error(data.message || 'Something went wrong');
            form.reset();
            status.classList.add('ok');
            status.textContent = 'Thanks! Your message was sent ♡';
        } catch (err) {
            status.classList.add('err');
            status.textContent = 'Sorry, the message could not be sent. Please email me directly at nevenacelic@yahoo.com.';
        } finally {
            button.disabled = false;
            button.textContent = 'Send message';
        }
    });
}
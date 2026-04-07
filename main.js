emailjs.init('hGRXPG-mP7R1Pvs8m');

/* Render email via JS so Cloudflare cannot obfuscate it */
var e = 'support' + '@' + 'opsistech.ro';
var el = document.getElementById('contact-email');
if (el) el.innerHTML = '<a href="mailto:' + e + '" style="color:inherit;text-decoration:none;">' + e + '</a>';

/* Header scroll */
var header = document.getElementById('site-header');
var hero   = document.getElementById('home');

function updateHeader() {
  var pastHero = window.scrollY > hero.offsetTop + hero.offsetHeight - header.offsetHeight - 10;
  header.classList.toggle('scrolled', pastHero);
  header.classList.toggle('shrunk', window.scrollY > 10);
}
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

/* Contact form */
var form     = document.getElementById('contact-form');
var btn      = document.getElementById('send-btn');
var lastSent = 0;
var COOLDOWN = 30000; // 30 seconds between submissions

form.addEventListener('submit', function(e) {
  e.preventDefault();

  var now = Date.now();
  if (now - lastSent < COOLDOWN) {
    btn.textContent = 'Please wait...';
    setTimeout(function() { btn.textContent = 'Send Message'; }, 2000);
    return;
  }

  var name    = document.getElementById('f-name').value.trim().slice(0, 100);
  var email   = document.getElementById('f-email').value.trim().slice(0, 200);
  var message = document.getElementById('f-message').value.trim().slice(0, 2000);

  if (!name || !email || !message) return;

  /* Basic email format check */
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    btn.textContent = 'Invalid email';
    setTimeout(function() { btn.textContent = 'Send Message'; }, 2000);
    return;
  }

  btn.textContent = 'Sending...';
  btn.disabled = true;
  lastSent = now;

  emailjs.send('service_49dntx2', 'template_rut1ctu', {
    name:    name,
    email:   email,
    message: message
  }).then(function() {
    btn.textContent = 'Message Sent!';
    btn.style.background = '#2a7a2a';
    form.reset();
    setTimeout(function() {
      btn.textContent = 'Send Message';
      btn.style.background = '';
      btn.disabled = false;
    }, 3000);
  }, function() {
    btn.textContent = 'Failed — Try Again';
    btn.style.background = '#a02020';
    btn.disabled = false;
    lastSent = 0; // allow retry on failure
    setTimeout(function() {
      btn.textContent = 'Send Message';
      btn.style.background = '';
    }, 3000);
  });
});

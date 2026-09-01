// nav scroll state
const nav = document.getElementById('nav');
const onScroll = () => {
  if (window.scrollY > 40) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
};
document.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// mobile menu
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    burger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

// scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
revealEls.forEach(el => io.observe(el));

// faq accordion
document.querySelectorAll('.faq-item').forEach(item => {
  const q = item.querySelector('.faq-q');
  const a = item.querySelector('.faq-a');
  q.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(other => {
      if (other !== item) {
        other.classList.remove('open');
        other.querySelector('.faq-a').style.maxHeight = null;
      }
    });
    if (isOpen) {
      item.classList.remove('open');
      a.style.maxHeight = null;
    } else {
      item.classList.add('open');
      a.style.maxHeight = a.scrollHeight + 'px';
    }
  });
});

// lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    lightboxImg.src = item.dataset.full;
    lightboxImg.alt = item.querySelector('img').alt;
    lightbox.classList.add('open');
  });
});
const closeLightbox = () => lightbox.classList.remove('open');
lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

// video lightbox
const videoLightbox = document.getElementById('videoLightbox');
const videoPlayer = document.getElementById('videoLightboxPlayer');
const videoLightboxClose = document.getElementById('videoLightboxClose');
document.querySelectorAll('.video-card').forEach(card => {
  card.addEventListener('click', () => {
    videoPlayer.src = card.dataset.video;
    videoLightbox.classList.add('open');
    videoPlayer.play().catch(() => {});
  });
});
const closeVideoLightbox = () => {
  videoLightbox.classList.remove('open');
  videoPlayer.pause();
  videoPlayer.removeAttribute('src');
  videoPlayer.load();
};
videoLightboxClose.addEventListener('click', closeVideoLightbox);
videoLightbox.addEventListener('click', (e) => { if (e.target === videoLightbox) closeVideoLightbox(); });

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') { closeLightbox(); closeVideoLightbox(); }
});

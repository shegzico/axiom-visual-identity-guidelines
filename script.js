/* ──────────────────────────────────────────────────────────
   AXIOM — Visual Identity Guidelines
   Script
   ────────────────────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Section mapping: nav button → section element ─────── */
  const sectionMap = {
    'sub-strategy': 'strategy',
    'sub-logo':     'logo',
    'sub-type':     'typography',
    'sub-color':    'color',
    'sub-photo':    'photography',
    'sub-app':      'applications'
  };

  /* ── Smooth-scroll helper ───────────────────────────────── */
  function scrollToId(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  /* ── Logo → back to top ─────────────────────────────────── */
  const logoLink = document.getElementById('sidebar-logo-link');
  if (logoLink) {
    logoLink.addEventListener('click', e => {
      e.preventDefault();
      scrollToId('home');
    });
  }

  /* ── Sidebar accordion + scroll to section banner ────────── */
  document.querySelectorAll('.nav-item[data-target]').forEach(btn => {
    btn.addEventListener('click', () => {
      const target    = btn.dataset.target;
      const sub       = document.getElementById(target);
      const arrow     = btn.querySelector('.nav-arrow');
      const sectionId = sectionMap[target];

      if (!sub) return;

      const isOpen = sub.classList.contains('open');

      // Close all other submenus
      document.querySelectorAll('.nav-sub.open').forEach(openSub => {
        if (openSub !== sub) {
          openSub.classList.remove('open');
          const openBtn = document.querySelector(`[data-target="${openSub.id}"]`);
          if (openBtn) openBtn.querySelector('.nav-arrow')?.classList.remove('open');
        }
      });

      // Toggle this submenu
      sub.classList.toggle('open', !isOpen);
      arrow.classList.toggle('open', !isOpen);

      // Scroll to the corresponding section banner
      if (sectionId) scrollToId(sectionId);
    });
  });

  /* ── Sub-nav links: smooth scroll ──────────────────────── */
  document.querySelectorAll('.nav-sub-item[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const id = link.getAttribute('href').slice(1);
      scrollToId(id);
    });
  });

  /* ── Active section highlight ──────────────────────────── */
  const sections = document.querySelectorAll('main section[id]');
  const navItems = document.querySelectorAll('.nav-item[data-target]');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      navItems.forEach(item => {
        const mappedId = sectionMap[item.dataset.target];
        item.classList.toggle('active-section', mappedId === entry.target.id);
      });
    });
  }, { rootMargin: '-20% 0px -60% 0px' });

  sections.forEach(section => observer.observe(section));

});

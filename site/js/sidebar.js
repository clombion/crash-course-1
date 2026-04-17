/* ================================================
   Sidebar — single source of truth for navigation
   ================================================ */

const SIDEBAR_DATA = {
  sections: [
    {
      title: 'Self-Paced Review',
      links: [
        { href: 'foundations.html', icon: 'fa-solid fa-diamond fa-xs', label: 'Foundations' },
        { href: 'section-a.html', letter: 'A', label: 'Reading an RFP' },
        { href: 'section-b.html', letter: 'B', label: 'Example to Proposal' },
        { href: 'section-c.html', letter: 'C', label: 'Finding & Getting Data' },
        { href: 'section-d.html', letter: 'D', label: 'Verification & Cleaning' },
        { href: 'section-e.html', letter: 'E', label: 'Enrichment' },
        { href: 'section-f.html', letter: 'F', label: 'Visualisation' },
        { href: 'section-g.html', letter: 'G', label: 'Storytelling' },
      ]
    },
    {
      title: 'Course Materials',
      links: [
        { href: 'course-day1.html', icon: 'fa-solid fa-1 fa-xs', label: 'Project Definition' },
        { href: 'course-day2.html', icon: 'fa-solid fa-2 fa-xs', label: 'From Data to Map' },
        { href: 'course-day3.html', icon: 'fa-solid fa-3 fa-xs', label: 'Enrichment & Cleaning' },
        { href: 'course-day4.html', icon: 'fa-solid fa-4 fa-xs', label: 'Analysis & Storytelling' },
        { href: 'course-day5.html', icon: 'fa-solid fa-5 fa-xs', label: 'Refining Your Story' },
      ]
    },
    {
      title: 'More',
      links: [
        { href: 'resources.html', icon: 'fa-solid fa-folder-open fa-xs', label: 'Resources' },
        { href: '../demos/index.html', icon: 'fa-solid fa-globe fa-xs', label: 'Demos', badge: 'live', rootHref: 'demos/index.html' },
        { href: 'exam.html', icon: 'fa-solid fa-pen-to-square fa-xs', label: 'Exam' },
      ]
    }
  ]
};

function renderSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (!sidebar) return;

  // Detect if we're at root level (index.html) or inside site/
  const path = window.location.pathname;
  const isRoot = path.endsWith('/index.html') || path.endsWith('/') || !path.includes('/site/');
  const prefix = isRoot ? 'site/' : '';

  // Current page filename for active state
  const currentPage = path.split('/').pop() || 'index.html';

  let html = '';

  for (const section of SIDEBAR_DATA.sections) {
    html += `<div class="sidebar-section">`;
    html += `<div class="sidebar-section-title">${section.title}</div>`;

    for (const link of section.links) {
      // Determine href: root pages need site/ prefix, except demos which has its own rootHref
      let href;
      if (isRoot && link.rootHref) {
        href = link.rootHref;
      } else if (isRoot && !link.href.startsWith('../')) {
        href = prefix + link.href;
      } else {
        href = link.href;
      }

      // Active state
      const linkFile = link.href.split('/').pop();
      const isActive = currentPage === linkFile;
      const activeClass = isActive ? ' active' : '';

      // Icon
      let iconHtml;
      if (link.icon) {
        iconHtml = `<i class="${link.icon}"></i>`;
      } else if (link.letter) {
        iconHtml = link.letter;
      }

      // Badge
      const badgeHtml = link.badge ? ` <span class="badge">${link.badge}</span>` : '';

      // Target
      const target = link.href.startsWith('http') ? ' target="_blank"' : '';

      html += `<a href="${href}" class="sidebar-link${activeClass}"${target}><span class="icon">${iconHtml}</span> ${link.label}${badgeHtml}</a>`;
    }

    html += `</div>`;
  }

  sidebar.innerHTML = html;

  // Mobile: add hamburger button to header and overlay
  const header = document.querySelector('.site-header');
  if (header && !document.querySelector('.menu-toggle')) {
    const btn = document.createElement('button');
    btn.className = 'menu-toggle';
    btn.setAttribute('aria-label', 'Toggle navigation');
    btn.innerHTML = '<i class="fa-solid fa-bars"></i>';
    header.insertBefore(btn, header.firstChild);

    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    document.body.appendChild(overlay);

    btn.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      overlay.classList.toggle('open');
    });

    overlay.addEventListener('click', () => {
      sidebar.classList.remove('open');
      overlay.classList.remove('open');
    });
  }
}

document.addEventListener('DOMContentLoaded', renderSidebar);

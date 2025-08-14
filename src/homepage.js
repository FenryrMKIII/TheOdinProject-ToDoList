// homepage.js
// Creates and appends the homepage content to the #content div

export function loadHomePage() {
    const content = document.getElementById('content');
    if (!content) return;
    
    content.innerHTML = '';

    // Navigation menu (add to header)
    const header = document.querySelector('header');
    if (header) {
        header.innerHTML = '';
        const nav = document.createElement('nav');
        nav.className = 'homepage-nav';
        ['home', 'menu', 'book'].forEach(tab => {
            const btn = document.createElement('button');
            btn.textContent = tab;
            btn.className = 'nav-btn';
            nav.appendChild(btn);
        });
        header.appendChild(nav);
    }

    // Main grid container
    const grid = document.createElement('div');
    grid.className = 'homepage-grid';

    // Restaurant name
    const name = document.createElement('h1');
    name.textContent = 'Les délices de Jounieh';
    name.className = 'restaurant-name';
    grid.appendChild(name);

    // Logo (SVG)
    const logoWrapper = document.createElement('div');
    logoWrapper.className = 'logo-wrapper';
    logoWrapper.innerHTML = `
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="60" cy="60" r="55" stroke="orange" stroke-width="8" fill="none"/>
        <path d="M60 30 C65 45, 80 55, 60 90 C40 55, 55 45, 60 30 Z" fill="#228B22" stroke="#228B22" stroke-width="2"/>
      </svg>
    `;
    grid.appendChild(logoWrapper);

    content.appendChild(grid);
}

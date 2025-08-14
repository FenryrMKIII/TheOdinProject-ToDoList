import { loadHomePage } from './homepage.js';
import { loadMenuPage } from './menu.js';
import "./style.css";

function setupNavListeners() {
    
    // Handles nav in both header and homepage grid
    document.addEventListener('click', (e) => {
        if (e.target.matches('button')) {
            const text = e.target.textContent.trim().toLowerCase();
            if (text === 'home') {
                loadHomePage();
            } else if (text === 'menu') {
                loadMenuPage();
            }
            // Add more cases for other nav buttons if needed
        }
    });
}

window.addEventListener('DOMContentLoaded', () => {
    loadHomePage();
    setupNavListeners();
});

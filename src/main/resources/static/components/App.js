// To prikker (../) betyder: Gå ud af 'components' mappen, og gå ind i 'api' mappen!
import { OccasionAPI } from '../api/OccasionAPI.js';
import { OccasionFilter } from '../api/OccasionFilter.js';
import productApi from "../api/productApi.js";

// En prik (./) betyder: Bliv i 'components' mappen!
import { Navbar } from './Navbar.js';
import { Hero } from './Hero.js';
import { ProductCard } from './ProductCard.js';
import { Footer } from './Footer.js';

let currentView = 'home'; // Kan være 'home' eller 'catalog'
let productsData = [];
let occasionsData = [];

async function initApp() {
    try {
        // 2. Synkroniseret objekt-kald (productApi og OccasionAPI med præcis stavning)
        productsData = await productApi.getAllProducts();
        occasionsData = await OccasionAPI.getAllOccasions();

        // Kør den første rendering (forsiden)
        render();
    } catch (error) {
        console.error("Fejl under initialisering af app:", error);
    }
}

function navigateTo(view) {
    currentView = view;
    render();
}

function render() {
    const app = document.getElementById('app');

    if (currentView === 'home') {
        // --- FORSIDE VISNING ---
        app.innerHTML = `
            ${Navbar()}
            ${Hero(productsData[0], "Sæson/Højtidlighed Fremvisning", "Oplev vores unikke udvalg af sæsonens smukkeste blomster.")}
            ${Hero(productsData[1] || productsData[0], "Byg din egen buket", "Sammensæt din helt egen personlige hilsen.", true)}
            <section class="catalog">
                <div class="container">
                    <h2 class="section-title">Katalog Fremvisning</h2>
                    <div class="product-grid">
                        ${productsData.map(p => ProductCard(p)).join('')}
                    </div>
                </div>
            </section>
            ${Footer()}
        `;
    } else if (currentView === 'catalog') {
        // --- KATALOG / OCCASION VISNING ---
        app.innerHTML = `
            ${Navbar()}
            <div class="container" style="display: grid; grid-template-columns: 250px 1fr; gap: 40px; padding: 40px 20px;">
                
                <aside>
                    <h3>Anledninger</h3>
                    <div id="occasion-cards-container" class="filter-sidebar">
                    </div>
                </aside>
                
                <main>
                    <h2 class="section-title">Anlednings Katalog</h2>
                    <div class="product-grid" id="product-cards-container">
                        <p style="color: #666;">Vælg en anledning i menuen til venstre for at se udvalget...</p>
                    </div>
                </main>
                
            </div>
            ${Footer()}
        `;

        const container = document.getElementById('occasion-cards-container');
        occasionsData.forEach(occasion => {
            const el = document.createElement('div');
            el.classList.add('occasion-card');
            el.style.cssText = "padding: 15px; margin-bottom: 10px; background: #fff; border: 1px solid #ddd; cursor: pointer; border-radius: 4px;";
            el.dataset.occasion = occasion;
            el.textContent = occasion;
            container.appendChild(el);
        });

        // Aktiver filter-scriptet
        OccasionFilter.init();
    }

    // Bind klik-events til navbaren efter hver rendering
    setupNavbarListeners();
}

function setupNavbarListeners() {
    // 1. Lyt på almindelige links i menuen (Katalog, Hjem osv.)
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        if (link.textContent === 'Katalog') {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                navigateTo('catalog');
            });
        }
        if (link.textContent === 'Hjem') {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                navigateTo('home');
            });
        }
    });

    // 2. Lyt specifikt på Ullas Blomster logoet uanset om det er en <div> eller <a>
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.style.cursor = 'pointer'; // Sikrer at musen bliver til en hånd
        logo.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo('home');
        });
    }
}

// Start appen når DOM er klar
document.addEventListener('DOMContentLoaded', initApp);
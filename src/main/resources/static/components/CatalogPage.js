import { Navbar } from './Navbar.js';
import { Footer } from './Footer.js';
import { OccasionFilter } from '../api/OccasionFilter.js';

export const renderCatalogPage = (container, occasionsData) => {
    container.innerHTML = `
        ${Navbar()}
        <div class="container" style="display: grid; grid-template-columns: 250px 1fr; gap: 40px; padding: 40px 20px;">
            <aside>
                <h3>Anledninger</h3>
                <div id="occasion-cards-container" class="filter-sidebar"></div>
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

    // Populate the occasion filter list once elements are on screen
    const cardsContainer = document.getElementById('occasion-cards-container');
    if (cardsContainer) {
        occasionsData.forEach(occasion => {
            const el = document.createElement('div');
            el.classList.add('occasion-card');
            el.style.cssText = "padding: 15px; margin-bottom: 10px; background: #fff; border: 1px solid #ddd; cursor: pointer; border-radius: 4px;";
            el.dataset.occasion = occasion;
            el.textContent = occasion;
            cardsContainer.appendChild(el);
        });
    }

    // Fire up your existing filter event bindings
    OccasionFilter.init();
};
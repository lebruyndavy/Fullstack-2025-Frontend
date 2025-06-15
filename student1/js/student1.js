/*  Name: Davy Le Bruyn
    Class: 1 ITF WT
    R-number: r1034516  */

// Core JS for assignment
function initVenobox() {
    new VenoBox({
        selector: '.venobox',
        numeration: true,
        infinigall: true,
        share: true,
        spinner: 'rotating-plane',
        titleattr: 'data-title'
    });
}

function getPortfolioCategories() {
    fetch('https://fullstack-2025-backend.ashyisland-75fa9c90.westeurope.azurecontainerapps.io/v1/portfolio/categories')
        .then(response => response.json())
        .then(data => {
            let portfolioCategoriesHTML = "<ul class='portfolio__categories'>";
            portfolioCategoriesHTML += `
                    <li class="me-2 mb-2">
                        <button class="portfolio__button active" data-category-id="">
                            All
                        </button>
                    </li>
                `
            data.portfolio_categories.forEach((category) => {
                portfolioCategoriesHTML += `
                    <li class="me-2 mb-2">
                        <button class="portfolio__button" data-category-id="${category.id}">
                            ${category.name}
                        </button>
                    </li>
                `
            });
            portfolioCategoriesHTML += "</ul>";
            document.getElementById("portfolio-categories").innerHTML = portfolioCategoriesHTML;
        }).then(() => bindPortfolioButtons())
        .catch(error => {
            console.log('Error:', error);
            document.getElementById('portfolio-categories').innerHTML = `
                <div class="text-center text-danger mt-3">
                    Failed to fetch portfolio categories. Please try again.
                </div>
            `;
        });
}

function bindPortfolioButtons() {
    const buttons = document.querySelectorAll('.portfolio__button');
    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            buttons.forEach((btn) => btn.classList.remove('active'));
            button.classList.add('active');
            document.getElementById('portfolio-items').innerHTML = `
                <div class="d-flex justify-content-center">
                    <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Loading items...</span>
                    </div>
                </div>
            `
            getPortfolioItems(button.dataset.categoryId);
        });
    });
}

function getPortfolioItems(categoryId) {
    const baseUrl = "https://fullstack-2025-backend.ashyisland-75fa9c90.westeurope.azurecontainerapps.io/v1/portfolio/items";
    const url = categoryId ? `${baseUrl}?category_id=${encodeURIComponent(categoryId)}` : baseUrl;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            let portfolioItemsHTML = "";
            data.portfolio_items.forEach((item) => {
                portfolioItemsHTML += `
                    <div class="portfolio__item anim-elem">
                        <a href="${item.image_url}" data-title="${item.name}" class="venobox" data-gall="${item.category_id}">
                            <figure>
                                <img src="${item.image_url}" alt="${item.name}">
                            </figure>
                        </a>
                    </div>
                `;
            });

            document.getElementById("portfolio-items").innerHTML = portfolioItemsHTML;
        })
        .then(() => initVenobox())
        .catch(error => {
            console.log('Error:', error);
            document.getElementById('portfolio-items').innerHTML = `
                <div class="text-center text-danger mt-3">
                    Failed to fetch portfolio items. Please try again.
                </div>
            `;
        });
}

function postNewsletterSubscribe() {
    document.getElementById('newsletter-form').addEventListener('submit', async function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const spinner = document.getElementById('newsletter-spinner');
        const button = document.getElementById('newsletter-submit');
        const feedback = document.getElementById('newsletter-feedback');
        const successBox = document.getElementById('newsletter-success');
        const form = document.getElementById('newsletter-form');

        feedback.textContent = '';
        feedback.className = '';
        spinner.classList.remove('d-none');
        button.disabled = true;

        try {
            const response = await fetch('https://fullstack-2025-backend.ashyisland-75fa9c90.westeurope.azurecontainerapps.io/v1/newsletter/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email })
                });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.detail || 'Unknown error');
            }

            form.classList.add('d-none');
            successBox.classList.remove('d-none');
        } catch (err) {
            feedback.textContent = err.message || 'Could not subscribe, please try again.'
            feedback.className = 'alert alert-danger mt-3';
        } finally {
            spinner.classList.add('d-none');
            button.disabled = false;
        }
    });
}

getPortfolioCategories()
getPortfolioItems()
postNewsletterSubscribe()

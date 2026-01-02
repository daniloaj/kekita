// Datos de los productos
const products = [
    {
        id: 1,
        name: "Jabón de nácar y arroz",
        category: "exfoliante",
        description: "Aclara y unifica el tono de la piel, suaviza, ilumina, exfolia suavemente, hidrata y ayuda con la regeneración, siendo ideal para reducir manchas y cicatrices leves.",
        price: 1.75,
        image: "assets/img/nacarArroz.jpeg",
        natural: true
    },
    {
        id: 2,
        name: "Jabón de nácar y cúrcuma",
        category: "humectante",
        description: "Sus propiedades antioxidantes y antiinflamatorias ayudan a iluminar el tono, reducir manchas oscuras, combatir el acné y el envejecimiento, calmar irritaciones y mejorar la luminosidad.",
        price: 1.75,
        image: "assets/img/curcuma.jpeg",
        natural: true
    },
    {
        id: 3,
        name: "Jabón de nácar con avena y miel",
        category: "hidratante",
        description: "Limpia, hidrata, calma y exfolia suavemente la piel, siendo ideal para pieles sensibles o con problemas como acné o irritación, su avena suaviza y su miel aporta propiedades antibióticas y antioxidantes, dejando la piel más luminosa, suave y saludable.",
        price: 1.75,
        image: "assets/img/nacarAvena.jpeg",
        natural: true
    },
    {
        id: 4,
        name: "Jabón masajeador de nácar y cúrcuma",
        category: "masaje",
        description: "Jabón masajeador con que ayuda a reducir manchas oscuras, combatir el acné y mejorar la luminosidad.",
        price: 3.00,
        image: "assets/img/nacarMasaje.jpeg",
        natural: true
    },
    {
        id: 5,
        name: "Jabón masajeador de lavada",
        category: "aromaterapia",
        description: "Aromaterapia revitalizante con lavanda que relaja la piel y la mente, calma irritaciones y limpia profundamente siendo ideal para una rutina de baño relajante antes de dormir.",
        price: 3.00,
        image: "assets/img/lavandaMasaje.jpeg",
        natural: true
    },
    {
        id: 6,
        name: "Jabón romero y limón",
        category: "aromaterapia",
        description: "Ayuda a controlar el sebo, purificar poros y dejar una sensación fresca y limpia, ideal para pieles grasas y con tendencia al acné.",
        price: 1.75,
        image: "assets/img/limon.jpeg",
        natural: true
    },
    {
        id: 7,
        name: "Jabón de nácar y arroz",
        category: "humectante",
        description: "Aclara y unifica el tono de la piel, suaviza, ilumina, exfolia suavemente, hidrata y ayuda con la regeneración, siendo ideal para reducir manchas y cicatrices leves.",
        price: 1.75,
        image: "assets/img/nacarArroz2.jpeg",
        natural: true
    },
    {
        id: 8,
        name: "Jabón de nácar y cúrcuma",
        category: "humectante",
        description: "Sus propiedades antioxidantes y antiinflamatorias ayudan a iluminar el tono, reducir manchas oscuras, combatir el acné y el envejecimiento, calmar irritaciones y mejorar la luminosidad.",
        price: 1.75,
        image: "assets/img/curcuma2.jpeg",
        natural: true
    },
    {
        id: 9,
        name: "Jabón de rosas",
        category: "masaje",
        description: "Ideal para pieles sensibles y maduras, ya que ayuda a equilibrar el pH, combatir el envejecimiento prematuro y mejorar la elasticidad, dejando una sensación fresca y radiante.",
        price: 3.00,
        image: "assets/img/rosas.jpeg",
        natural: true
    },
];

// Variables globales
let filteredProducts = [...products];
let sortAscending = false;

// Inicializar la página
document.addEventListener('DOMContentLoaded', function () {
    renderProducts(filteredProducts);
    setupFilterButtons();
    setupSortButton();
});

// Renderizar productos
function renderProducts(productsToRender) {
    const productGrid = document.getElementById('product-grid');
    productGrid.innerHTML = '';

    productsToRender.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';

        // Crear etiqueta "100% Natural" si corresponde
        const naturalBadge = product.natural ? '<div class="natural-badge"><i class="fas fa-leaf"></i> 100% Natural</div>' : '';

        productCard.innerHTML = `
                    ${naturalBadge}
                    <img src="${product.image}" alt="${product.name}" class="product-img">
                    <div class="product-info">
                        <span class="product-category">${product.category}</span>
                        <h3 class="product-name">${product.name}</h3>
                        <p class="product-description">${product.description}</p>
                        <div class="product-footer">
                            <div class="product-price">$${product.price.toFixed(2)}</div>
                            <button class="add-to-cart" data-id="${product.id}">
                                <a href="https://wa.me/+50371746107?text=¡Hola!%20Me%20interesa%20el%20producto:%20${encodeURIComponent(product.name)}%20con%20precio%20de%20$${product.price.toFixed(2)}">
                                 <i class="fas fa-shopping-cart"></i>
                                </a>
                            </button>
                        </div>
                    </div>
                `;
        productGrid.appendChild(productCard);
    });

    // Actualizar contador
    document.querySelector('.product-count').textContent = `(${productsToRender.length} productos)`;

    // Añadir eventos a los botones de carrito
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function () {
            const productId = this.getAttribute('data-id');
            const product = products.find(p => p.id == productId);
            // addToCart(product);
        });
    });
}

// Configurar botones de filtro
function setupFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Remover clase active de todos los botones
            filterButtons.forEach(btn => btn.classList.remove('active'));

            // Añadir clase active al botón clickeado
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');

            if (filter === 'all') {
                filteredProducts = [...products];
            } else {
                filteredProducts = products.filter(product => product.category === filter);
            }

            renderProducts(filteredProducts);
        });
    });
}

// Configurar botón de ordenación
function setupSortButton() {
    const sortButton = document.getElementById('sort-price');

    sortButton.addEventListener('click', function () {
        sortAscending = !sortAscending;

        filteredProducts.sort((a, b) => {
            if (sortAscending) {
                return a.price - b.price;
            } else {
                return b.price - a.price;
            }
        });

        renderProducts(filteredProducts);

        // Actualizar texto del botón
        const icon = sortAscending ? 'fa-sort-amount-up' : 'fa-sort-amount-down';
        this.innerHTML = `<i class="fas ${icon}"></i> Ordenar por precio`;
    });
}

// Añadir al carrito (simulación)
function addToCart(product) {
    // Crear notificación visual
    const notification = document.createElement('div');
    notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background-color: var(--success);
                color: white;
                padding: 15px 20px;
                border-radius: 8px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                z-index: 1000;
                display: flex;
                align-items: center;
                gap: 10px;
                animation: slideIn 0.3s ease;
            `;

    notification.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <span>${product.name} añadido al carrito</span>
            `;

    document.body.appendChild(notification);

    // Remover notificación después de 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);

    // Agregar estilos de animación si no existen
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
                    @keyframes slideIn {
                        from { transform: translateX(100%); opacity: 0; }
                        to { transform: translateX(0); opacity: 1; }
                    }
                    @keyframes slideOut {
                        from { transform: translateX(0); opacity: 1; }
                        to { transform: translateX(100%); opacity: 0; }
                    }
                `;
        document.head.appendChild(style);
    }
}
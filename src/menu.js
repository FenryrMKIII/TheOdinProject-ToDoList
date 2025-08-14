// menu.js
// Creates and appends the menu page content to the #content div

const menuData = {
    Starters: [
        'Hummus',
        'Tabbouleh',
        'Baba Ghanoush',
        'Fattoush',
        'Warak Enab (Stuffed Vine Leaves)',
        'Labneh',
        'Moutabal',
    ],
    Main: [
        'Mixed Grill (Mashawi)',
        'Shish Taouk',
        'Kafta',
        'Kibbeh',
        'Sayadieh (Fish with Rice)',
        'Chicken Shawarma',
        'Lamb Chops',
    ],
    Desserts: [
        'Baklava',
        'Knefeh',
        'Maamoul',
        'Atayef',
        'Mouhalabieh',
    ],
    Drinks: [
        'Ayran',
        'Jallab',
        'Lemonade',
        'Mint Lemonade',
        'Coffee',
        'Tea',
        'Water',
    ]
};

function createCategoryNav(categories, onSelect, selected) {
    const nav = document.createElement('nav');
    nav.className = 'menu-category-nav';
    categories.forEach(cat => {
        const btn = document.createElement('button');
        btn.textContent = cat;
        btn.className = 'menu-cat-btn' + (cat === selected ? ' selected' : '');
        btn.onclick = () => onSelect(cat);
        nav.appendChild(btn);
    });
    return nav;
}

function createMenuList(items) {
    const ul = document.createElement('ul');
    ul.className = 'menu-list';
    items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        ul.appendChild(li);
    });
    return ul;
}

export function loadMenuPage() {
    console.log("hello mothafucka")
    const content = document.getElementById('content');
    if (!content) return;
    content.innerHTML = '';

    let selectedCategory = 'Starters';

    const renderMenu = (category) => {
        content.innerHTML = '';
        // Category nav
        const catNav = createCategoryNav(Object.keys(menuData), renderMenu, category);
        content.appendChild(catNav);

        // Menu rectangle
        const menuRect = document.createElement('div');
        menuRect.className = 'menu-rectangle';
        const title = document.createElement('h2');
        title.className = 'menu-category-title';
        title.textContent = category;
        menuRect.appendChild(title);
        menuRect.appendChild(createMenuList(menuData[category]));
        content.appendChild(menuRect);
    };

    renderMenu(selectedCategory);
}

function createMainDiv() {
    const mainDiv = document.createElement('div');
    mainDiv.id = 'main';
    document.body.appendChild(mainDiv);
    return mainDiv;
}

function createSideBar() {
    const sideNav = document.createElement('div');
    sideNav.className = 'side-bar-container'

    return sideNav;
}

function createProjectFilters(toDoList) {
    const projectsDiv = document.createElement('div')
    projectsDiv.className = 'project-selector'
    
    const h1 = document.createElement('h1');
    h1.textContent = 'My projects';
    projectsDiv.appendChild(h1);

    const projectList = new Set();

    toDoList.toDoList.forEach(item => {
        projectList.add(item.project);
    }
    )

    const ul = document.createElement('ul')
    projectList.forEach(project => {
        const li = document.createElement('li');
        li.textContent = project
        li.dataset.project = project
        ul.appendChild(li)
    })

    projectsDiv.appendChild(ul);

    return projectsDiv;
}

function bindProjectFilterClick(handler, container) {
    container.addEventListener('click', event => {
        if (event.target.tagName === 'LI') {
            handler(event.target.dataset.project)
        }
    })
}

/**
 * Renders a ToDoList (array of ToDoItems) inside a container div.
 * Each ToDoItem is displayed in its own <section> with its properties listed.
 * The structure is flexible for future properties.
 * @param {Array} toDoList - Array of ToDoItem objects
 * @returns {HTMLElement} The container div element
 */
function renderToDoList(toDoList) {
    const listContainer = document.createElement('div');
    listContainer.className = 'todo-list';

    toDoList.forEach(item => {
        const itemSection = document.createElement('section');
        itemSection.className = 'todo-item';

        // Use a definition list for flexible property display
        const dl = document.createElement('dl');
        Object.entries(item).forEach(([key, value]) => {
            if (key != 'id') {
                const dt = document.createElement('dt');
                dt.textContent = key;
                const dd = document.createElement('dd');
                dd.textContent = value;
                dl.appendChild(dt);
                dl.appendChild(dd);
            }
        });

        itemSection.appendChild(dl);
        listContainer.appendChild(itemSection);
    });

    return listContainer;
}

function createEditButton(onClick) {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = 'Edit';
    if (typeof onClick === 'function') {
        button.addEventListener('click', onClick);
    }
    return button;
}

function createEditForm(toDoItem, onSubmit) {
    const form = document.createElement('form');
    form.className = 'edit-todo-form';

    Object.entries(toDoItem).forEach(([key, value]) => {
        // Skip id if you don't want it editable
        if (key === 'id') return;

        const label = document.createElement('label');
        label.textContent = key;
        label.htmlFor = `edit-${key}`;

        const input = document.createElement('input');
        input.type = typeof value === 'boolean' ? 'checkbox' : 'text';
        input.id = `edit-${key}`;
        input.name = key;
        input.value = value;
        if (typeof value === 'boolean') input.checked = value;

        label.appendChild(input);
        form.appendChild(label);
    });

    const submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.textContent = 'Save';
    form.appendChild(submitBtn);

    if (typeof onSubmit === 'function') {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const updated = {};
            Object.entries(toDoItem).forEach(([key, value]) => {
                if (key != 'id') {
                    const input = form.elements[key];
                    updated[key] = (typeof value === 'boolean') ? input.checked : input.value;
                }
            });
            onSubmit(updated);
        });
    }

    return form;
}

function showEditFormModal(toDoItem, onSubmit) {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.background = 'rgba(0,0,0,0.4)';
    overlay.style.display = 'grid';
    overlay.style.placeItems = 'center';
    overlay.style.zIndex = 1000;

    // Create modal container
    const modal = document.createElement('div');
    modal.className = 'modal-container';
    modal.style.position = 'relative';
    modal.style.background = '#fff';
    modal.style.padding = '2rem';
    modal.style.borderRadius = '8px';

    // Optional close button
    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.textContent = '×';
    closeBtn.style.position = 'absolute';
    closeBtn.style.top = '1rem';
    closeBtn.style.right = '1rem';
    closeBtn.style.fontSize = '2rem';
    closeBtn.style.background = 'none';
    closeBtn.style.border = 'none';
    closeBtn.style.cursor = 'pointer';
    closeBtn.addEventListener('click', () => overlay.remove());

    // Create the edit form
    const form = createEditForm(toDoItem, (updatedItem) => {
        onSubmit(updatedItem);
        overlay.remove();
    });

    modal.appendChild(closeBtn);
    modal.appendChild(form);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
}

export { createMainDiv, renderToDoList, 
    createSideBar, createProjectFilters, bindProjectFilterClick,
    createEditButton, showEditFormModal };


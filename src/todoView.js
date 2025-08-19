export function createTodoView() {
    // --- Private DOM Element References ---
    const mainDiv = _createDOMElement('div', { id: 'main' });
    const sideBar = _createDOMElement('div', { className: 'side-bar-container' });
    const projectContainer = _createDOMElement('div', { className: 'project-selector' });
    const listContainer = _createDOMElement('div', { className: 'todo-list' });

    // --- Initial Page Composition ---
    document.body.appendChild(mainDiv);
    mainDiv.appendChild(sideBar);
    mainDiv.appendChild(listContainer);
    sideBar.appendChild(projectContainer);

    // --- Private Helper Functions ---

    /**
     * A helper to create DOM elements.
     * @param {string} tag - The HTML tag name.
     * @param {object} attributes - An object of attributes and properties.
     * @returns {HTMLElement}
     */
    function _createDOMElement(tag, attributes = {}) {
        const element = document.createElement(tag);

        for (const key in attributes) {
            // Check for a special 'dataset' object
            if (key === 'dataset' && typeof attributes[key] === 'object') {
                // Loop through the dataset object and apply each data attribute
                for (const dataKey in attributes.dataset) {
                    element.dataset[dataKey] = attributes.dataset[dataKey];
                }
            } else {
                // Otherwise, assign the property directly as before
                element[key] = attributes[key];
            }
        }

        return element;
    }

    /**
       * Renders the list of projects in the sidebar.
       * @param {Array<string>} projects - An array of project names.
       */
    function _renderProjectFilters(projects) {
        projectContainer.innerHTML = ''; // Clear previous projects
        const h1 = _createDOMElement('h1', { textContent: 'My projects' });
        const ul = _createDOMElement('ul');

        projects.forEach(project => {
            const li = _createDOMElement('li', {
                textContent: project,
                'dataset': {
                    project: project
                }
            });
            ul.appendChild(li);
        });

        projectContainer.appendChild(h1);
        projectContainer.appendChild(ul);
    }

     /**
   * Renders the list of to-do items.
   * @param {Array<object>} toDoList - The array of to-do items to display.
   * @param {function} onEditClick - The handler to call when an edit button is clicked.
   */
  function _renderToDoList(toDoList, onEditClick) {
    listContainer.innerHTML = ''; // Clear previous list

    toDoList.forEach(item => {
      const itemSection = _createDOMElement('section', { className: 'todo-item',
        'dataset' : {id : item.id}
      });

      const dl = _createDOMElement('dl');
      Object.entries(item).forEach(([key, value]) => {
        if (key!= "id") {
          const dt = _createDOMElement('dt', { textContent: key });
          const dd = _createDOMElement('dd', { textContent: value });
          dl.appendChild(dt);
          dl.appendChild(dd);
        }
      });
      
      const editButton = _createDOMElement('button', { textContent: 'Edit', type: 'button' });
      editButton.addEventListener('click', () => onEditClick(item.id));

      itemSection.appendChild(dl);
      itemSection.appendChild(editButton);
      listContainer.appendChild(itemSection);
    });
  }

  // --- Public Methods (The API of our View) ---
  return {
    /**
     * The main render function to update the entire view.
     * @param {object} viewData - An object containing the data to display.
     * @param {Array<string>} viewData.projects - List of all unique project names.
     * @param {Array<object>} viewData.todos - The list of to-do items to display.
     * @param {function} onEditClick - Handler for edit button clicks.
     */
    display({ projects, todos }, onEditClick) {
      _renderProjectFilters(projects);
      _renderToDoList(todos, onEditClick);
    },

    /**
     * Binds the project filter click event.
     * @param {function} handler - The controller's function to handle the filter logic.
     */
    bindProjectFilterClick(handler) {
      projectContainer.addEventListener('click', event => {
        if (event.target.tagName === 'LI') {
          handler(event.target.dataset.project);
        }
      });
    },
    
    /**
     * Shows the edit form in a modal window.
     * @param {object} toDoItem - The to-do item to be edited.
     * @param {function} onSubmit - The controller's function to handle the form submission.
     */
    showEditFormModal(toDoItem, onSubmit) {
      // (This modal function is already well-contained, so it's kept as is)
      const overlay = _createDOMElement('div', { className: 'modal-overlay' });
      Object.assign(overlay.style, {
        position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
        background: 'rgba(0,0,0,0.4)', display: 'grid', placeItems: 'center', zIndex: 1000,
      });

      const modal = _createDOMElement('div', { className: 'modal-container' });
      Object.assign(modal.style, {
        position: 'relative', background: '#fff', padding: '2rem', borderRadius: '8px'
      });

      const closeBtn = _createDOMElement('button', { type: 'button', textContent: '×' });
      Object.assign(closeBtn.style, {
        position: 'absolute', top: '1rem', right: '1rem', fontSize: '2rem',
        background: 'none', border: 'none', cursor: 'pointer'
      });
      closeBtn.addEventListener('click', () => overlay.remove());

      const form = _createDOMElement('form', { className: 'edit-todo-form' });
      Object.entries(toDoItem).forEach(([key, value]) => {
        if (key === 'id') return;
        const label = _createDOMElement('label', { textContent: key, htmlFor: `edit-${key}` });
        
        let inputType = 'text';
        let inputValue = value;

        if (typeof value === 'boolean') {
          inputType = 'checkbox';
        } else if (key === 'dueDate') {
          inputType = 'date';
          // A date input requires the value to be in 'YYYY-MM-DD' format.
          // We check if `value` is a valid Date object before formatting.
          if (value instanceof Date && !isNaN(value)) {
            inputValue = value.toISOString().split('T')[0];
          } else {
            inputValue = ''; // Default to empty if no valid date exists
          }
        }
        
        const input = _createDOMElement('input', {
          type: inputType,
          id: `edit-${key}`,
          name: key,
          value: inputValue
        });

        if (typeof value === 'boolean') input.checked = value;
        label.appendChild(input);
        form.appendChild(label);
      });

      const submitBtn = _createDOMElement('button', { type: 'submit', textContent: 'Save' });
      form.appendChild(submitBtn);

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        const updated = {};
        Object.entries(toDoItem).forEach(([key, value]) => {
          if (key !== 'id') {
            const input = form.elements[key];
            updated[key] = (typeof value === 'boolean') ? input.checked : input.value;
          }
        });
        onSubmit(toDoItem.id, updated);
        overlay.remove();
      });

      modal.appendChild(closeBtn);
      modal.appendChild(form);
      overlay.appendChild(modal);
      document.body.appendChild(overlay);
    }
  };

}
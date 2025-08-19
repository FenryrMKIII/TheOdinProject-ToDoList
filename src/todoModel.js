import { v4 as uuidv4 } from 'uuid';

export function createToDoItem(itemName, project = "", priority = "", dueDate = null) {
  return {
    id: uuidv4(),
    name: itemName,
    project: project,
    completed: false,
    priority: "low",
    dueDate: dueDate
  };
}

export function createToDoList(toDoItems = []) {
  const toDoList = toDoItems;

  return {
    // This is the raw data, primarily for initialization in the controller.
    toDoList,

    addItem(toDoItem) {
      toDoList.push(toDoItem);
    },

    removeItem(toDoItem) {
      const index = toDoList.findIndex(todo => todo.id === toDoItem.id);
      if (index !== -1) {
        toDoList.splice(index, 1);
      } else {
        console.warn(`ToDo item with name ${toDoItem.name} not found.`);
      }
    },

    // --- NEW HELPER METHODS ---

    /**
     * Finds a single to-do item by its unique ID.
     * Needed by the controller to fetch an item for editing.
     * @param {string} id - The ID of the to-do item.
     * @returns {object | undefined} The found item or undefined.
     */
    findItemById(id) {
      return toDoList.find(item => item.id === id);
    },

    /**
     * Updates an existing item with new data.
     * Needed by the controller to save changes from the edit form.
     * @param {string} id - The ID of the item to update.
     * @param {object} updatedData - An object with the new data.
     */
    updateItem(id, updatedData) {
      const item = this.findItemById(id);
      if (item) {
        // Object.assign merges the new data into the existing item.
        Object.assign(item, updatedData);
      }
    },

    /**
     * Gets a list of all unique project names.
     * Needed by the controller to display the filter options in the view.
     * @returns {Array<string>} An array of project names.
     */
    getProjects() {
      const projectSet = new Set(toDoList.map(item => item.project));
      // Add 'All' to the beginning of the list for the filter UI.
      return ['All', ...projectSet];
    },

    /**
     * Filters the to-do list by project name.
     * Modified to handle the 'All' case.
     * @param {string} project - The project name to filter by.
     * @returns {Array<object>} The filtered array of to-do items.
     */
    filterByProject(project) {
      if (project === 'All') {
        return [...toDoList]; // Return a copy of the full list
      }
      return toDoList.filter(toDoItem => toDoItem.project === project);
    }
  };
}
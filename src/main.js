import * as todoModel from './todoModel.js';
import { createTodoView } from './todoView.js'; // Import the factory
import './main.css';

/**
 * The Controller.
 * This function orchestrates the Model and the View.
 */
function AppController() {
  // --- Initialization ---
  const model = _initializeModel();
  const view = createTodoView();

  // The application's current state
  let currentTodos = model.toDoList;

  // --- Private Helper Functions ---
  function _initializeModel() {
    const first_todo = todoModel.createToDoItem("Buy groceries", "perso");
    const second_todo = todoModel.createToDoItem("Clean the house", "perso");
    const third_todo = todoModel.createToDoItem("Send email to John", "work");
    const fourth_todo = todoModel.createToDoItem("make ton of money", "work");
    
    const toDoList = todoModel.createToDoList([first_todo, second_todo, third_todo]);
    toDoList.addItem(fourth_todo);
    return toDoList;
  }

  // --- Handlers (Application Logic) ---

  /**
   * Handles the filtering of the to-do list by project.
   * @param {string} project - The project name to filter by.
   */
  function handleProjectFilter(project) {
    currentTodos = model.filterByProject(project);
    // Any time state changes, we re-render the view with the latest data.
    _refreshView();
  }

  /**
   * Handles the request to edit a to-do item.
   * @param {string} todoId - The ID of the item to edit.
   */
  function handleEditClick(todoId) {
    const todoItem = model.findItemById(todoId); // A new helper method in the model
    if (todoItem) {
      view.showEditFormModal(todoItem, handleUpdateTodo);
    }
  }

  /**
   * Handles the submission of updated to-do data.
   * @param {string} todoId - The ID of the item to update.
   * @param {object} updatedData - The new data for the item.
   */
  function handleUpdateTodo(todoId, updatedData) {
    model.updateItem(todoId, updatedData); // A new helper method in the model
    // After an update, we should probably reset the filter and show all items
    currentTodos = model.toDoList;
    _refreshView();
  }
  
  /**
   * Refreshes the view with the current state of the application.
   */
  function _refreshView() {
    view.display({
      projects: model.getProjects(), // A new helper method in the model
      todos: currentTodos
    }, handleEditClick);
  }

  // --- Initial Setup ---
  function init() {
    console.log("App starting...");
    view.bindProjectFilterClick(handleProjectFilter);
    _refreshView(); // Initial render
  }

  return { init };
}

// --- Start the Application ---
const app = AppController();
app.init();
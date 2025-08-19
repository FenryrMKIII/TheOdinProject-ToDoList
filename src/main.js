import * as todoModel from './todoModel.js';
import * as todoView from './todoView.js'

import './main.css';

const first_todo = todoModel.createToDoItem("Buy groceries", "perso");
const second_todo = todoModel.createToDoItem("Clean the house", "perso");
const third_todo = todoModel.createToDoItem("Send email to John", "work");

const toDoList = todoModel.createToDoList([first_todo, second_todo, third_todo])


const fourth_todo = todoModel.createToDoItem("make ton of money", "work");
toDoList.addItem(fourth_todo)

// Compose the view
const mainDiv = todoView.createMainDiv();
const toDoListView = todoView.renderToDoList(toDoList);
const sideBar = todoView.createSideBar();
mainDiv.appendChild(sideBar);
mainDiv.appendChild(toDoListView);

const projectsList = todoView.createProjectFilters(toDoList)
sideBar.appendChild(projectsList)

const handleProjectFilter = (project) => {
        const filteredToDoList = toDoList.filterByProject(project);
        todoView.renderToDoList(filteredToDoList);
    }
todoView.bindProjectFilterClick(handleProjectFilter, projectsList)

function renderToDoList() {
    // Remove the old list if it exists
    const oldList = document.querySelector('.todo-list');
    if (oldList) oldList.remove();

    // Create and append the new list
    const toDoListView = todoView.renderToDoList(toDoList);
    mainDiv.appendChild(toDoListView);

    // Add edit buttons to each item
    const todoItemSections = toDoListView.querySelectorAll('.todo-item');
    todoItemSections.forEach((section, index) => {
        const todoItem = toDoList.toDoList[index];
        const editButton = todoView.createEditButton(() => {
            todoView.showEditFormModal(todoItem, (updatedItem) => {
                Object.assign(todoItem, updatedItem);
                renderToDoList(); // Re-render after editing
            });
        });
        section.appendChild(editButton);
    });
}

renderToDoList();

console.log("hello")
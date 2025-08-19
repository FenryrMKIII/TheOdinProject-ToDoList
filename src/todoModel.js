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
    id: uuidv4(),

    toDoList,

    addItem(toDoItem) {
      toDoList.push(toDoItem);
    },

    removeItem(toDoItem) {
      const index = toDoList.findIndex(todo => todo.id === toDoItem.id);
      if (index !== -1) {
        toDoList.splice(index, 1);

      } else {
        console.warn(`ToDo item with name ${toDoItem.name}`);
      }
    },

    filterByProject(project) {
      console.log("list filtered")

      return toDoList.filter(toDoItem => toDoItem.project === project)

    }
  }



}



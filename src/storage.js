import project from './project'
import tasks from './tasks'
import TodoList from './todolist'

export default class Storage {
  static saveToDoList(data) {
    localStorage.setItem('todoList', JSON.stringify(data))
  }

  static getTodoList() {
    const todoList = Object.assign(
      new TodoList(),
      JSON.parse(localStorage.getItem('todoList'))
    )

    todoList.setProjects(
      todoList
      .getProjects()
      .map((project) => Object.assign(new project(), project))
    )

    todoList
      .getProjects()
      .forEach(project => 
        project.setTasks(
          project.getTasks().map((task) => Object.assign(new task(), task))
        )
      );
    return todoList
  }

  static addProject(project) {
    const todoList = Storage.getTodoList()
    todoList.addProject(project)
    Storage.saveToDoList(todoList)
  }

  static deleteProject(projectName) {
    const todoList = Storage.getTodoList()
    todoList.deleteProject(projectName)
    Storage.saveToDoList(todoList)
  }

  static renameTask(projectName, taskName, newTaskName) {
    const todoList = Storage.getTodoList()
    todoList.getProject(projectName).getTask(taskName).setName(newTaskName)
    Storage.saveToDoList(todoList)
  }

  static setTaskDate(projectName, taskName, newDueDate) {
    const todoList = Storage.getTodoList()
    todoList.getProject(projectName).getTask(taskName).setDate(newDueDate)
    Storage.saveTodoList(todoList)
  }

  static updateTodayProject() {
    const todoList = Storage.getTodoList()
    todoList.updateTodayProject()
    Storage.saveTodoList(todoList)
  }

  static updateWeekProject() {
    const todoList = Storage.getTodoList()
    todoList.updateWeekProject()
    Storage.saveTodoList(todoList)
  }
}
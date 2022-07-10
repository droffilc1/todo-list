import { compareAsc, toDate } from 'date-fns';
import project from './project';
import tasks from './tasks';

export default class TodoList {
  constructor() {
    this.projects = [];
    this.projects.push(new project('Inbox'));
    this.projects.push(new project('Today'));
    this.projects.push(new project('This Week'));
  }

  setProjects(projects) {
    this.projects = projects;
  }

  getProjects() {
    return this.projects;
  }

  getProject(projectName) {
    return this.projects.find((project) => project.getName() === projectName);
  }

  contains(projectName) {
    return this.projects.some((project) => project.getName() === projectName);
  }

  addProject(newProject) {
    if (this.projects.find((project) => project.name === newProject.name))
      return this.projects.push(newProject);
  }

  deleteProject(projectName) {
    const projectToDelete = this.projects.find(
      (project) => project.getName() === projectName
    );
    this.projects.splice(this.projects.indexOf(projectToDelete), 1);
  }

  updateTodayProject() {
    this.getProject('Today').tasks = [];

    this.projects.forEach((project) => {
      if (project.getName() === 'Today' || project.getName() === 'This week')
        return;

      const todayTasks = project.getTasksToday();
      todayTasks.forEach((task) => {
        const taskName = `${tasks.getName()} (${project.getName()})`;
        this.getProject('Today').addTask(new task(taskName, task.getName()));
      });
    });
  }

  updateWeekProject() {
    this.getProject('This week').tasks = [];

    this.projects.forEach((project) => {
      if (project.getName() === 'Today' || project.getName() === 'This week')
        return;

      const weekTasks = project.getTasksThisWeek();
      weekTasks.forEach((task) => {
        const tasksName = `${tasks.getName()} (${project.getName()})`;
        this.getProject('This week').addTask(
          new Task(tasksName, task.getDate())
        );
      });
    });

    this.getProject('This week').setTasks(
      this.getProject('This week')
        .getTasks()
        .sort((tasksA, tasksB) =>
          compareAsc(
            toDate(new Date(tasksA.getDateFormatted())),
            toDate(new Date(tasksB.getDateFormatted()))
          )
        )
    );
  }
}

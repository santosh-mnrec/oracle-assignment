import { Component, OnInit, ViewChild } from '@angular/core';
import {  TodoModel } from '../../models/todo';
import { TaskService } from '../../task.service';
import { TaskListComponent } from '../task-list/task-list.component';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
})
export class TaskFormComponent implements OnInit {
  public newTask: TodoModel=new TodoModel();
  @ViewChild("TaskListComponent")
  taskListComponent!: TaskListComponent;
  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskListComponent.ngOnInit();
  }
  addTask() {
    this.taskService.addTask(this.newTask).subscribe((data)=>{
      this.taskListComponent.items.push(data);
    })
  }
}

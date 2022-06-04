import { Component, OnInit } from '@angular/core';
import {  TodoModel } from '../../models/todo';
import { TaskService } from '../../task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
})
export class TaskFormComponent implements OnInit {
  public newTask: TodoModel=new TodoModel();
  constructor(private taskService: TaskService) {}

  ngOnInit() {
  
  }
  addTask() {
    this.taskService.addTask(this.newTask).subscribe((data)=>{
      console.log(data);
    })
  }
}

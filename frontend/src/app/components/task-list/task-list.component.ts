import { Component, OnInit } from '@angular/core';
import { pipe } from 'rxjs';
import { TaskService } from '../../task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  public items: any;
  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.getTasks().subscribe(data=>{
      console.log(data);
      this.items=data;
    });
  }
}

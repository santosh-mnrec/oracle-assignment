import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TodoModel } from './models/todo';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private url = 'http://localhost:8080/tasks';

  constructor(private http: HttpClient) {}

  getTasks() {
    return this.http.get(this.url);
  }
  addTask(todo) {
    return this.http.post(this.url,todo);
  }
}

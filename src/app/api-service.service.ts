import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpErrorResponse,HttpHeaders, HttpResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Task } from './model';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  taskUrl = 'api/task';  // URL to web api
  tasks: Task[];
  constructor(private http: HttpClient) {
  }
  getTask(): Observable<Task[]> {
    return this.http.get<Task[]>(this.taskUrl)
      .pipe(
        catchError((error) => {
          console.error(error);
          return throwError(error.message);
        })
      );
  }
  addTask(task: Task): Observable<Task> {
    // if(task){
      return this.http.post<Task>(this.taskUrl, task, httpOptions)
      .pipe(
        catchError((error) => {
          console.error(error);
          return throwError(error.message);
        })
      );
    //}
    //return Observable.create(null);
  }
  updateTask(task: Task): Observable<Task> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'my-new-auth-token');

    return this.http.put<Task>(this.taskUrl, task, httpOptions)
      .pipe(
        catchError((error) => {
          console.error(error);
          return throwError(error.message);
        })
      );
  }

}

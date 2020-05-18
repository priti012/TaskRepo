import { Component, OnInit } from '@angular/core';
import * as data2 from './../../assets/task.json';
import {Task} from './../../app/model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, pipe, throwError } from 'rxjs';
import { map, catchError } from "rxjs/operators";
import { empty } from 'rxjs';
import {ApiServiceService} from './../api-service.service';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};
@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.scss']
})
export class HomeComponentComponent implements OnInit {
  taskData: Task[];
  globalTask: Task[];
  personalTask: Task[];
  savedmodel: Task;
  config;
  extractData;
  handleError = 'errors ';
  taskUrl = 'api/tasks';
  global = 'Global Widgets';
  personal = 'Personal Widgets';
  teamLeader = 'teamLeader Widgets';
  constructor(private apiServiceService: ApiServiceService) { }

  ngOnInit() {
    // this.taskData = data2.tasks;
    // this.savedmodel = {
    //   text: 'New ITem added',
    //   isGlobal: true,
    //   isLeader: true,
    //   creator: 'Eoin Morgan',
    //   isCompleted: false,
    //   start: '2019-09-07',
    //   end: '2019-09-10'
    // };
    this.getTask();
    //this.add();

  }
  getTask(): void {
    this.apiServiceService.getTask()
      .subscribe((tasks) => {
        //this.apiServiceService.employees = tasks;
        this.taskData = tasks;
        this.taskData = tasks.filter((data) => {
          return data.isLeader === true;
        });
        this.globalTask = tasks.filter((data) => {
          return data.isGlobal === true;
        });
        this.personalTask = tasks.filter((data) => {
          return data.isGlobal === false;
        });
      });
  }
  // add(): void {
  //     this.apiServiceService.addTask(this.savedmodel)
  //     .subscribe((tasks) => {
  //       this.apiServiceService.employees.push(tasks);
  //       this.taskData.push(tasks);
  //     });
  // }

}

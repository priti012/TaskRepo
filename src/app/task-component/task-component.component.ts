import { Component, OnInit } from '@angular/core';
import {ApiServiceService} from './../api-service.service';
import {Task} from './../../app/model';
@Component({
  selector: 'app-task-component',
  templateUrl: './task-component.component.html',
  styleUrls: ['./task-component.component.scss']
})
export class TaskComponentComponent implements OnInit {
  taskData: Task[];
  originalTask: Task[];
  fields: string[] = ['personal', 'leader', 'others'];
  selectedfield: string;
  constructor(private apiServiceService: ApiServiceService) { }

  ngOnInit() {
    this.getTask();
  }
  getTask(): void {
    this.apiServiceService.getTask()
      .subscribe((tasks) => {
        this.apiServiceService.tasks = tasks;
        this.taskData = tasks;
        this.originalTask = tasks;
      });
  }
  filter(ev) {
    let filteraray = this.originalTask;
    if(ev === 'personal'){
        filteraray = filteraray.filter((el)=>{
          return el.isGlobal === false;
        });
    } else if (ev === 'leader'){
      filteraray= filteraray.filter((el)=>{
        return el.isLeader === true;
      });
    } else {
      filteraray = filteraray.filter((el)=>{
        return (el.isLeader === false && el.isGlobal === true);
      });
    }
    this.taskData = filteraray;
  }
}

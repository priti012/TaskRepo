import { Component, OnInit } from '@angular/core';
import {ApiServiceService} from './../api-service.service';
import {Task} from './../../app/model';
@Component({
  selector: 'app-add-component',
  templateUrl: './add-component.component.html',
  styleUrls: ['./add-component.component.scss']
})
export class AddComponentComponent implements OnInit {
  idNumber: Number;
  addTask: Task = {
    id: 1,
    text: '',
    isGlobal: false,
    isLeader: false,
    creator: '',
    isCompleted: false,
    start: '',
    end: ''
  };
  statusList = [true, false];
  task: Task[];
  constructor(private apiServiceService: ApiServiceService) { }

  ngOnInit() {
    if (this.apiServiceService.tasks) {
      this.idNumber = this.apiServiceService.tasks.length + 1;
      this.addTask.id = this.idNumber;
      }
  }
  formSubmit() {
    this.add();
  }
  add(): void {
    let name;
    if (this.addTask ) {
      this.addTask.creator = this.addTask.creator.trim();
      this.addTask.text = this.addTask.text.trim();
      this.addTask.start = this.addTask.start.trim();
      this.addTask.end = this.addTask.end;
      //name = this.addEmployee.fname;
      let task = this.addTask;
      if (!this.addTask.text ) {
        return;
      }
      const newTask: Task = task ;
      this.apiServiceService
      .addTask(newTask)
      .subscribe((tasks) => {
        this.apiServiceService.tasks.push(tasks);
      });
    }

  }

}

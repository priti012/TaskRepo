import { Component, OnInit, Input, OnChanges, Inject , AfterViewChecked, AfterViewInit} from '@angular/core';
import {Task} from './../model';
import { MatTableDataSource } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import {ApiServiceService} from './../api-service.service';
import { DOCUMENT } from '@angular/common';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss'],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        height: '200px',
        opacity: 1,
        backgroundColor: 'yellow'
      })),
      state('closed', style({
        height: '100px',
        opacity: 0.5,
        backgroundColor: 'green'
      })),
      transition('open => closed', [
        animate('3s')
      ]),
      transition('closed => open', [
        animate('2s')
      ]),
      transition('* => closed', [
        animate('1s')
      ]),
      transition('* => open', [
        animate('0.5s')
      ]),
      transition('open <=> closed', [
        animate('0.5s')
      ]),
      transition ('* => open', [
        animate ('1s',
          style ({ opacity: '*' }),
        ),
      ]),

    ]),
  ]
})
export class WidgetComponent implements OnInit, OnChanges, AfterViewInit {
  @Input()
  data: Task[];
  @Input()
  heading: string;
  dataSource;
  searchField: string;
  fieldName: string;
  selectedfield: string;
  sortingOrder : boolean;
  displayedColumns: string[] = ['text', 'isGlobal', 'isLeader', 'creator',
  'isCompleted','start','end'];
  fields: string[] = ['personal', 'leader', 'others'];
  statusList = [true, false];
  editTask: Task;
  constructor(private apiServiceService: ApiServiceService,
    @Inject(DOCUMENT) public document: Document) { }

  ngOnInit() {
    this.getTask();
  }
  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    console.log('hello task '+ this.data);
    this.dataSource = this.data;
  }
  ngAfterViewInit() {
    let clasees = this.document.getElementsByClassName('open-close-container');
    for(let i =0; i<clasees.length; i++) {
      if(this.data[i].isCompleted){
        clasees[i].setAttribute('style', 'background-color: green');
      } else {
        clasees[i].setAttribute('style', 'background-color: red');
      }
    }
  }
  filter(ev) {
    let filteraray = this.dataSource;
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
    this.data = filteraray;
  }
  sorting() {
    if (this.sortingOrder){
      this.sortingOrder = false;
    } else {
      this.sortingOrder = true;
    }
    let filteraray = this.dataSource;
    if (this.sortingOrder ) {
      filteraray = filteraray.sort((el, eb) => {
        let nameA = el.creator.toLowerCase();
        let nameB = eb.creator.toLowerCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
    } else {
      filteraray = filteraray.sort((el, eb) => {
        let nameA = el.creator.toLowerCase();
        let nameB = eb.creator.toLowerCase();
        if (nameA > nameB) {
            return -1;
        }
        if (nameA < nameB) {
          return 1;
        }
        return 0;
      });
    }

    this.data = filteraray;
  }
  edit(task) {
    this.editTask = task;
  }
  update(task, event) {
    if (task) {
      this.apiServiceService
        .updateTask(task)
        .subscribe(employee => {
        const ix = employee ? this.apiServiceService.tasks.findIndex(h => h.id === employee.id) : -1;
        if (ix > -1) {
          this.apiServiceService.tasks[ix] = employee;
        }
      });
      this.data = this.apiServiceService.tasks;
      //this.changeColor(task, event);
      this.editTask = undefined;
      // this.addEmployee = undefined;
    }
  }
  getTask(): void {
    this.apiServiceService.getTask()
      .subscribe((tasks) => {
        this.apiServiceService.tasks = tasks;
      });
  }
  getColor(task, index) {
    if (task.isCompleted === "true") {
      return 'green';
    } else {
        return 'red';
    }
      // this.document.getElementsByClassName('open-close-container')[index].setAttribute(
      //   'style', 'background-color:red');
  }

  changeColor(task,index) {
      if (task.isCompleted === "true") {
        this.document.getElementsByClassName('open-close-container')[index].setAttribute(
        'style', 'background-color:green');
      } else {
        this.document.getElementsByClassName('open-close-container')[index].setAttribute(
          'style', 'background-color:red');
      }
  }
}

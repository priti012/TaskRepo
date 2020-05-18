import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as data2 from './../assets/task.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TaskProject';
  data = data2;
  constructor(private routes: Router) {

  }
  navigateTo(routes) {
    this.routes.navigateByUrl('/' + routes);
  }
}

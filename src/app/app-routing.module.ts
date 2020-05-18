import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponentComponent} from './home-component/home-component.component';
import {TaskComponentComponent} from './task-component/task-component.component';
import {AppComponent} from './app.component';
import { AddComponentComponent } from './add-component/add-component.component';

const routes: Routes = [
{path: 'Home', component: HomeComponentComponent},
{path: 'Task', component: TaskComponentComponent},
{path: 'Add', component: AddComponentComponent},
{path: '', redirectTo: '/Task', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

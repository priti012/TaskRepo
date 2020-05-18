import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatTableModule,MatFormFieldModule} from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponentComponent } from './home-component/home-component.component';
import { TaskComponentComponent } from './task-component/task-component.component';
import { WidgetComponent } from './widget/widget.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryServiceService }  from './in-memory-service.service';
import { HttpClientXsrfModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AddComponentComponent } from './add-component/add-component.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponentComponent,
    TaskComponentComponent,
    WidgetComponent,
    AddComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'My-Xsrf-Cookie',
      headerName: 'My-Xsrf-Header',
    }),
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryServiceService, {
        dataEncapsulation: false,
        passThruUnknownUrl: true,
        put204: false // return entity after PUT/update
      }
    )],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

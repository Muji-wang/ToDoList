import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule,FormsModule } from '@angular/forms'; // Import FormsModule
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { TodoListComponent } from './todo-list/todo-list.component';
import { LoginComponent } from './login/login.component';
import { AnimeComponent } from './anime/anime.component';
import { LearningPlanComponent } from './learning-plan/learning-plan.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { ComponentAComponent } from './component-a/component-a.component';
import { ComponentBComponent } from './component-b/component-b.component';
import { CounterPageComponent } from './counter-page/counter-page.component';
import { EnterDataComponent } from './person-data-list/enter-data/enter-data.component';
import { DataListComponent } from './person-data-list/data-list/data-list.component';
import { PersonDataListComponent } from './person-data-list/person-data-list.component';
import { DataEditComponent } from './person-data-list/data-edit/data-edit.component';



@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    LoginComponent,
    AnimeComponent,
    LearningPlanComponent,
    NavigationBarComponent,
    ComponentAComponent,
    ComponentBComponent,
    CounterPageComponent,
    EnterDataComponent,
    DataListComponent,
    PersonDataListComponent,
    DataEditComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    RouterModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

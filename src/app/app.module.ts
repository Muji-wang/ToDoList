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


@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    LoginComponent,
    AnimeComponent,
    LearningPlanComponent,
    NavigationBarComponent
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

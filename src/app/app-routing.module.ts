import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { AnimeComponent } from './anime/anime.component';
import { LearningPlanComponent } from './learning-plan/learning-plan.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'todo-list', component: TodoListComponent },
  { path: 'anime', component: AnimeComponent },
  { path: 'learning-plan', component: LearningPlanComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
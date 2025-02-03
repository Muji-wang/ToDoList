import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { AnimeComponent } from './anime/anime.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { LearningPlanComponent } from './learning-plan/learning-plan.component';
import { AuthGuard } from './auth/auth.guard'; // Import the guard


const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard], // 受保護的路由
    component: NavigationBarComponent, // 加入導航列作為父層
    children: [
      { path: 'todo-list', component: TodoListComponent },
      { path: 'anime', component: AnimeComponent },
      { path: 'learning-plan', component: LearningPlanComponent },
    ],
  },
  { path: 'login', component: LoginComponent }, // 登入頁面（無需守衛）
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // 預設路由
  { path: '**', redirectTo: '/login' }, // 未知路由重導至登入頁
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
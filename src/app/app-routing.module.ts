import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { CreateGroceryComponent } from './create-grocery/create-grocery.component';
import { LoginComponent } from './auth/login/login.component';
import { authGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: "",
    component: LandingComponent,
    canActivate: [authGuard]
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "create-list",
    component: CreateGroceryComponent,
    canActivate: [authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

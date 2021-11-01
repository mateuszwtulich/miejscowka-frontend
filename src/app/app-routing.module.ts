import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {
    path: 'home', component: SearchComponent
  },
  {
    path: 'register', component: RegistrationComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

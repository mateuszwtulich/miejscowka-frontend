import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministratorComponent } from './components/administrator/administrator.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { SearchComponent } from './components/search/search.component';

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
  {
    path: 'administrator', component: AdministratorComponent
  },
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

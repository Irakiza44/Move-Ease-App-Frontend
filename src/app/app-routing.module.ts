import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './container/pages/home/home.component';
import { AboutUsComponent } from './container/pages/about-us/about-us.component';
import { ServicesComponent } from './container/pages/services/services.component';
import { SignupComponent } from './container/pages/signup/signup.component';
import { LoginComponent } from './container/pages/login/login.component';
import { ContactUsComponent } from './container/pages/contact-us/contact-us.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'signUp', component: SignupComponent },
  { path: 'logIn', component: LoginComponent },
  { path: 'contact-us', component: ContactUsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

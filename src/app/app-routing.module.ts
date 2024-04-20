import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { HomeComponent } from './container/pages/home/home.component';
import { AboutUsComponent } from './container/pages/about-us/about-us.component';
import { ServicesComponent } from './container/pages/services/services.component';
import { SignupComponent } from './container/pages/signup/signup.component';
import { LoginComponent } from './container/pages/login/login.component';
import { ContactUsComponent } from './container/pages/contact-us/contact-us.component';
import { RegisterComponent } from './container/pages/register/register.component';
import { BudgetingComponent } from './container/pages/budgeting/budgeting.component';
import { SurveyComponent } from './container/pages/survey/survey.component';
import { MapComponent } from './container/pages/map/map.component';
import { AdminDashboardComponent } from './container/pages/admin-dashboard/admin-dashboard.component';
import { DashboardComponent } from './container/pages/admin-dashboard/dashboard/dashboard.component';
import { ChatBotComponent } from './container/pages/chat-bot/chat-bot.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'signUp', component: SignupComponent },
  { path: 'logIn', component: LoginComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'budgeting-Tools', component: BudgetingComponent },
  { path: 'survey', component: SurveyComponent },
  { path: 'map', component: MapComponent },
  { path: 'chat-bot', component: ChatBotComponent },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard],
    children: [{ path: '', component: DashboardComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

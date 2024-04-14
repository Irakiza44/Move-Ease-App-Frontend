import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './container/components/nav/nav.component';
import { FooterComponent } from './container/components/footer/footer.component';
import { HomeComponent } from './container/pages/home/home.component';
import { AboutUsComponent } from './container/pages/about-us/about-us.component';
import { ServicesComponent } from './container/pages/services/services.component';
import { LoginComponent } from './container/pages/login/login.component';
import { SignupComponent } from './container/pages/signup/signup.component';
import { ContactUsComponent } from './container/pages/contact-us/contact-us.component';
import { RegisterComponent } from './container/pages/register/register.component';
import { BudgetingComponent } from './container/pages/budgeting/budgeting.component';
import { SurveyComponent } from './container/pages/survey/survey.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    HomeComponent,
    AboutUsComponent,
    ServicesComponent,
    LoginComponent,
    SignupComponent,
    ContactUsComponent,
    RegisterComponent,
    BudgetingComponent,
    SurveyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

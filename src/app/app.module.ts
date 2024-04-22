import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

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
import { MapComponent } from './container/pages/map/map.component';
import { AdminDashboardComponent } from './container/pages/admin-dashboard/admin-dashboard.component';
import { AdminNavbarComponent } from './container/components/admin-navbar/admin-navbar.component';
import { MoveInCitizenComponent } from './container/pages/admin-dashboard/move-in-citizen/move-in-citizen.component';
import { DashboardComponent } from './container/pages/admin-dashboard/dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ChatBotComponent } from './container/pages/chat-bot/chat-bot.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChatComponent } from './container/components/chat/chat.component';
import { CurrentSurveyComponent } from './container/pages/admin-dashboard/current-survey/current-survey.component';
import { MoveOutCityComponent } from './container/pages/admin-dashboard/move-out-city/move-out-city.component';

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
    MapComponent,
    AdminDashboardComponent,
    AdminNavbarComponent,
    MoveInCitizenComponent,
    DashboardComponent,
    ChatBotComponent,
    ChatComponent,
    CurrentSurveyComponent,
    MoveOutCityComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}

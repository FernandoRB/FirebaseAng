import { NgModule } from '@angular/core'; 
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

//Components
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreateComponent } from './components/create/create.component';
import { ChatComponent } from './components/chat/chat.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { MapsComponent } from './components/maps/maps.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/main' },
  {
    path: 'main',
    component: MainComponent,
    ...canActivate(() => redirectUnauthorizedTo(['/login']))
  },
  { path: 'login', component: LoginComponent },
//components
  { path: 'dashboard', component: DashboardComponent },
  { path: 'create', component: CreateComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'maps', component: MapsComponent },
  { path: 'analytics', component: AnalyticsComponent },

  
  { path: 'register', component: RegisterComponent },//Delete


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { TaskService } from './services/task.service';

import { ActivityService } from './services/activity.service';
import { ListUsersComponent } from './listUsers/list-users.component';
import { ListCategoryComponent } from './category/listCategory/listCategory.component';
import { CategoryService } from './services/category.service';
import { AuthGuard } from './services/authguard';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './login/login.component';

import { Userservice } from './services/userservice.service';
import { AlertService } from './services/alert.service';
import { ROUTES } from './routes';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './pageNotFound/pageNotFound.component';
import { HomeComponent } from './home/home.component';
import { RoleComponent } from './role/role.component';
import { UserComponent } from './user/user.component';
import { AlertComponent } from './alert/alert.component';
import {GrowlModule,ListboxModule,CalendarModule,PanelModule,DataTableModule,
  InputTextareaModule,InputTextModule,DialogModule,InputSwitchModule} from 'primeng/primeng';
import { CategoryComponent } from './category/category.component';
import { ActivityComponent } from './activity/activity.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListActivitiesComponent } from './activity/listActivities/listActivities.component';
import { ViewActivityComponent } from './activity/viewActivity/viewActivity.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PageNotFoundComponent,
    HomeComponent,
    RoleComponent,
    UserComponent,
    AlertComponent,
    LoginComponent,
    CategoryComponent,
    ListCategoryComponent,
    ListUsersComponent,
    ActivityComponent,
    DashboardComponent,
    ListActivitiesComponent,
    ViewActivityComponent
],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    GrowlModule,
    ListboxModule,
    CalendarModule,
    PanelModule,
    DataTableModule,
    InputTextareaModule,
    InputTextModule,
    DialogModule,
    InputSwitchModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    AlertService,
    Userservice,
    AuthService,
    AuthGuard,
    CategoryService,
    ActivityService,
    TaskService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { TreeBuilderService } from './services/treeBuilder.service';
import { TreeComponent } from './activity/tree/tree.component';

import { StatusService } from './services/status.service';
import { ListStatusComponent } from './status/listStatus/listStatus.component';
import { AddStatusComponent } from './status/addStatus/addStatus.component';
import { UtilityService } from './services/utility.service';
import { ActivityComponent } from './activity/addActivity/activity.component';
import { ListPhaseComponent } from './phase/listPhase/listPhase.component';
import { AddPhaseComponent } from './phase/addPhase/addPhase.component';
import { PhaseService } from './services/phase.service';
import { FocusService } from './services/focus.service';
import { ListFoucsComponent } from './focus/listFoucs/listFoucs.component';
import { AddFocusComponent } from './focus/addFocus/addFocus.component';
import { ListVisComponent } from './visibility/listVis/listVis.component';
import { VisibilityService } from './services/visibility.service';
import { AddVisComponent } from './visibility/addVis/addVis.component';
import { ListDeptComponent } from './dept/listDept/listDept.component';
import { DeptService } from './services/dept.service';
import { AddDeptComponent } from './dept/addDept/addDept.component';
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
  InputTextareaModule,InputTextModule,DialogModule,InputSwitchModule,
  ScheduleModule,ConfirmDialogModule,ConfirmationService,AutoCompleteModule,
  SelectButtonModule,SliderModule,MultiSelectModule,DropdownModule,
  FileUploadModule,TabViewModule,TreeModule} from 'primeng/primeng';
import { CategoryComponent } from './category/category.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListActivitiesComponent } from './activity/listActivities/listActivities.component';
import { ViewActivityComponent } from './activity/viewActivity/viewActivity.component';
import { TaskComponent } from './task/task.component';

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
    ViewActivityComponent,
    AddDeptComponent,
    ListDeptComponent,
    AddVisComponent,
    ListVisComponent,
    AddFocusComponent,
    ListFoucsComponent,
    AddPhaseComponent,
    ListPhaseComponent,
    AddStatusComponent,
    ListStatusComponent,
    TreeComponent,
    TaskComponent
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
    ScheduleModule,
    ConfirmDialogModule,
    AutoCompleteModule,
    SelectButtonModule,
    SliderModule,
    MultiSelectModule,
    DropdownModule,
    FileUploadModule,
    TabViewModule,
    TreeModule,

    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    AlertService,
    Userservice,
    AuthService,
    AuthGuard,
    CategoryService,
    ActivityService,
    TaskService,
    ConfirmationService,
    DeptService,
    VisibilityService,
    FocusService,
    PhaseService,
    UtilityService,
    StatusService,

    TreeBuilderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { ViewActivityComponent } from './activity/viewActivity/viewActivity.component';
import { ListActivitiesComponent } from './activity/listActivities/listActivities.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ActivityComponent } from './activity/activity.component';
import { ListUsersComponent } from './listUsers/list-users.component';
import { ListCategoryComponent } from './category/listCategory/listCategory.component';
import { CategoryComponent } from './category/category.component';
import { AuthGuard } from './services/authguard';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { PageNotFoundComponent } from './pageNotFound/pageNotFound.component';
import { HomeComponent } from './home/home.component';
export const ROUTES = [
    {
      path: 'viewActivity/:id',
      component: ViewActivityComponent

    },
    {
        path: 'dashboard',
        component:DashboardComponent,
         canActivate: [AuthGuard]
    },
   {
        path: 'createActivity',
        component:ActivityComponent,
         canActivate: [AuthGuard]
    },
    {
        path: 'listActivities',
        component:ListActivitiesComponent,
         canActivate: [AuthGuard]
    },
     {
        path: 'listActivities',
        component:ActivityComponent,
         canActivate: [AuthGuard]
    },
  {
        path: 'listUsers',
        component:ListUsersComponent,
         canActivate: [AuthGuard]
    },
      {
        path: 'addCategory',
        component: CategoryComponent,
         canActivate: [AuthGuard]
    },
     {
        path: 'listCategories',
        component: ListCategoryComponent,
         canActivate: [AuthGuard]
    },

    {
        path: 'login',
        component: LoginComponent
    },

    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'register',
        component: UserComponent

    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }

]

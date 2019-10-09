import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdminComponent} from './layout/admin/admin.component';
import {AuthComponent} from './layout/auth/auth.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'forms',
        loadChildren: () => import('./theme/forms/forms.module').then(m => m.FormsModule)
      },
      {
        path: 'tasks',
        loadChildren: () => import('./theme/tasks/tasks.module').then(m => m.TasksModule)
      },
      {
        path: 'scheduler',
        loadChildren: () => import('./theme/scheduler/scheduler.module').then(m => m.SchedulerModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./theme/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'options',
        loadChildren: () => import('./theme/options/options.module').then(m => m.OptionsModule)
      },
      {
        path: 'pos',
        loadChildren: () => import('./theme/pos/pos.module').then(m => m.PosModule)
      },
      {
        path: 'reports',
        loadChildren: () => import('./theme/reports/reports.module').then(m => m.ReportsModule)
      }
    ]
  },
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./theme/auth/auth.module').then(m => m.AuthModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

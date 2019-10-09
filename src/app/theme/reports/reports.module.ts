import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DailyComponent} from './daily/daily.component';
import {EmployeeComponent} from './employee/employee.component';
import {ClientComponent} from './client/client.component';
import {MonthlyComponent} from './monthly/monthly.component';
import {RouterModule, Routes} from '@angular/router';
import {EmployeesComponent} from '../options/employees/employees.component';
import {CategoriesComponent} from '../options/categories/categories.component';
import {ServicesComponent} from '../options/services/services.component';

const routes: Routes = [
  {
    path: 'daily',
    component: DailyComponent,
    data: {
      title: 'Daily Report',
      icon: 'icon-layout-sidebar-left',
      // caption: 'lorem ipsum dolor sit amet, consectetur adipisicing elit - sample page',
      status: true
    }
  },
  {
    path: 'monthly',
    component: MonthlyComponent,
    data: {
      title: 'Monthly Report',
      icon: 'icon-layout-sidebar-left',
      // caption: 'lorem ipsum dolor sit amet, consectetur adipisicing elit - sample page',
      status: true
    }
  },
  {
    path: 'employee',
    component: EmployeeComponent,
    data: {
      title: 'Employee Report',
      icon: 'icon-layout-sidebar-left',
      // caption: 'lorem ipsum dolor sit amet, consectetur adipisicing elit - sample page',
      status: true
    }
  },
  {
    path: 'client',
    component: ClientComponent,
    data: {
      title: 'Client Report',
      icon: 'icon-layout-sidebar-left',
      // caption: 'lorem ipsum dolor sit amet, consectetur adipisicing elit - sample page',
      status: true
    }
  }
];


@NgModule({
  declarations: [DailyComponent, EmployeeComponent, ClientComponent, MonthlyComponent],
  imports: [
    CommonModule, RouterModule.forChild(routes)
  ]
})
export class ReportsModule {
}

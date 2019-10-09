import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard.component';
import {RouterModule, Routes} from '@angular/router';
import {ChartModule} from 'angular2-chartjs';
import {SharedModule} from '../../shared/shared.module';
import {ChartAllModule} from '@syncfusion/ej2-angular-charts';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    data: {
      title: 'Salon Dashboard',
      icon: 'icon-layout-sidebar-left',
      // caption: 'lorem ipsum dolor sit amet, consectetur adipisicing elit - sample page',
      status: true
    }
  }
];


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule, RouterModule.forChild(routes), SharedModule,
    ChartModule, ChartAllModule
  ]
})
export class DashboardModule {
}

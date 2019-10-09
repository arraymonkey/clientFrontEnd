import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CalendarComponent} from './calendar/calendar.component';
import {RouterModule, Routes} from '@angular/router';
import {ScheduleAllModule} from '@syncfusion/ej2-angular-schedule';

const routes: Routes = [
  {
    path: '',
    component: CalendarComponent,
    data: {
      title: 'Salon Schedule Calendar',
      icon: 'icon-layout-sidebar-left',
      status: true
    }
  }
];


@NgModule({
  declarations: [CalendarComponent],
  imports: [
    CommonModule, RouterModule.forChild(routes), ScheduleAllModule
  ]
})
export class SchedulerModule {
}

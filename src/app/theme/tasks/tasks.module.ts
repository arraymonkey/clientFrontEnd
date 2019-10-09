import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TasksComponent} from './tasks.component';
import {RouterModule, Routes} from '@angular/router';
import {DragulaModule, DragulaService} from 'ng2-dragula';
import {SharedModule} from '../../shared/shared.module';
import {GridAllModule} from '@syncfusion/ej2-angular-grids';

const routes: Routes = [
  {
    path: '',
    component: TasksComponent,
    data: {
      title: 'POS',
      icon: 'icon-layout-sidebar-left',
      // caption: 'lorem ipsum dolor sit amet, consectetur adipisicing elit - sample page',
      status: true
    }
  }
];


@NgModule({
  declarations: [TasksComponent],
  imports: [
    CommonModule, RouterModule.forChild(routes), SharedModule, DragulaModule.forRoot(), GridAllModule,
  ], providers: [DragulaService]
})
export class TasksModule {
}

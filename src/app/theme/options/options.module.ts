import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesComponent } from './employees/employees.component';
import { CategoriesComponent } from './categories/categories.component';
import { ServicesComponent } from './services/services.component';
import {RouterModule, Routes} from '@angular/router';
import {CalendarComponent} from '../scheduler/calendar/calendar.component';
import {GridAllModule} from '@syncfusion/ej2-angular-grids';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ColorPickerAllModule, MaskedTextBoxAllModule, NumericTextBoxModule} from '@syncfusion/ej2-angular-inputs';
import {ButtonModule, CheckBoxModule, SwitchAllModule} from '@syncfusion/ej2-angular-buttons';
import {DropDownListAllModule, MultiSelectAllModule} from '@syncfusion/ej2-angular-dropdowns';
import { UsersComponent } from './users/users.component';
const routes: Routes = [
  {
    path: 'employees',
    component: EmployeesComponent,
    data: {
      title: 'Employee Options',
      icon: 'icon-layout-sidebar-left',
      // caption: 'lorem ipsum dolor sit amet, consectetur adipisicing elit - sample page',
      status: true
    }
  },
  {
    path: 'categories',
    component: CategoriesComponent,
    data: {
      title: 'Category Options',
      icon: 'icon-layout-sidebar-left',
      // caption: 'lorem ipsum dolor sit amet, consectetur adipisicing elit - sample page',
      status: true
    }
  },
  {
    path: 'services',
    component: ServicesComponent,
    data: {
      title: 'Service Options',
      icon: 'icon-layout-sidebar-left',
      // caption: 'lorem ipsum dolor sit amet, consectetur adipisicing elit - sample page',
      status: true
    }
  },
  {
    path: 'users',
    component: UsersComponent,
    data: {
      title: 'User Options',
      icon: 'icon-layout-sidebar-left',
      // caption: 'lorem ipsum dolor sit amet, consectetur adipisicing elit - sample page',
      status: true
    }
  }
];



@NgModule({
  declarations: [EmployeesComponent, CategoriesComponent, ServicesComponent, UsersComponent],
  imports: [

    CommonModule, RouterModule.forChild(routes), GridAllModule, ReactiveFormsModule, FormsModule,ColorPickerAllModule, SwitchAllModule, ButtonModule, CheckBoxModule, NumericTextBoxModule,MaskedTextBoxAllModule, MultiSelectAllModule, DropDownListAllModule
  ]
})
export class OptionsModule { }

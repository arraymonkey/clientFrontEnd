import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PosComponent } from './pos.component';
import {RouterModule, Routes} from '@angular/router';
import { DndModule } from 'ngx-drag-drop';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap';
import {SharedModule} from '../../shared/shared.module';
import {InvoiceDetailsComponent} from './invoice-details/invoice-details.component';
import {SalesService} from '../../shared/sales.service';
const routes: Routes = [
  {
    path: '',
    component: PosComponent,
    data: {
      title: 'POS',
      icon: 'icon-layout-sidebar-left',
      // caption: 'lorem ipsum dolor sit amet, consectetur adipisicing elit - sample page',
      status: true
    }
  }
];


@NgModule({
  declarations: [PosComponent, InvoiceDetailsComponent],
  imports: [
    CommonModule, RouterModule.forChild(routes), DndModule, ReactiveFormsModule, NgbDatepickerModule, SharedModule, FormsModule
  ], providers: [SalesService]
})
export class PosModule { }

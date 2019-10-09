import {Component, Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {dragula, DragulaService} from 'ng2-dragula';
import {Subscription} from 'rxjs';
import {
  ContextMenuItem,
  ContextMenuService,
  EditService, EditSettingsModel,
  ExcelExportService, GridComponent,
  PageService,
  PdfExportService,
  ResizeService,
  SortService
} from '@syncfusion/ej2-angular-grids';

const ALIAS = 'delayDragLift';
declare var $: any;

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  providers: [SortService, ResizeService, PageService, EditService, ExcelExportService, PdfExportService, ContextMenuService],
  encapsulation: ViewEncapsulation.None
})
export class TasksComponent implements OnInit {
  public contextMenuItems: ContextMenuItem[];
  public editing: EditSettingsModel;
  public toolbar: string[];
  @ViewChild('grid', {static: true})
  public grid: GridComponent;
  rowObj: any;

  constructor(private dragulaService: DragulaService) {

  }

  public ngOnInit(): void {
    this.contextMenuItems = ['AutoFit', 'AutoFitAll', 'SortAscending', 'SortDescending',
      'Copy', 'Edit', 'Delete', 'Save', 'Cancel',
      'PdfExport', 'ExcelExport', 'CsvExport', 'FirstPage', 'PrevPage',
      'LastPage', 'NextPage'];
    this.editing = {allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog', newRowPosition: 'Bottom'};
    this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];


  }

}

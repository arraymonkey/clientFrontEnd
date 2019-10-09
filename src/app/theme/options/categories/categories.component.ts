import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {
  ContextMenuItem,
  DataSourceChangedEventArgs,
  DataStateChangeEventArgs,
  DialogEditEventArgs,
  EditSettingsModel
} from '@syncfusion/ej2-grids';
import {Observable} from 'rxjs';
import {
  ContextMenuService,
  EditService,
  ExcelExportService,
  PageService,
  PdfExportService,
  ResizeService,
  SortService
} from '@syncfusion/ej2-angular-grids';
import {CategoriesService} from './categories.service';
import {IPointRenderEventArgs} from '@syncfusion/ej2-charts';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  providers: [SortService, ResizeService, PageService, EditService, ExcelExportService, PdfExportService, ContextMenuService],
  encapsulation: ViewEncapsulation.None
})
export class CategoriesComponent implements OnInit {
  public editing: EditSettingsModel;
  public toolbar: string[];
  parentData: Observable<DataStateChangeEventArgs>;
  public state: DataStateChangeEventArgs;
  public contextMenuItems: ContextMenuItem[];

  constructor(private service: CategoriesService) {
    this.parentData = service;
  }

  ngOnInit() {
    this.service.execute(this.state);
    this.contextMenuItems = ['AutoFit', 'AutoFitAll', 'SortAscending', 'SortDescending',
      'Copy', 'Edit', 'Delete', 'Save', 'Cancel',
      'PdfExport', 'ExcelExport', 'CsvExport', 'FirstPage', 'PrevPage',
      'LastPage', 'NextPage'];
    this.editing = {allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog', newRowPosition: 'Bottom'};
    this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
  }

  public dataStateChange(state: DataStateChangeEventArgs): void {
    this.service.execute(state);
  }

  public dataSourceChanged(state: DataSourceChangedEventArgs): void {
    if (state.action === 'add') {
      this.service.addRecord(state).subscribe(() => state.endEdit());
    } else if (state.action === 'edit') {
      this.service.updateRecord(state).subscribe(() => state.endEdit());
    } else if (state.requestType === 'delete') {
      this.service.deleteRecord(state).subscribe(() => state.endEdit());
    }
  }

  actionComplete(args: DialogEditEventArgs) {
    if ((args.requestType === 'beginEdit' || args.requestType === 'add')) {
      let dialog = args.dialog;
      dialog.header = args.requestType === 'beginEdit' ? 'Record of ' + args.rowData['CategoryName'] : 'New Category';
    }

  }

}


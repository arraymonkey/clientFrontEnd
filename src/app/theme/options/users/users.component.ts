import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {
  ContextMenuItem,
  ContextMenuService, DataSourceChangedEventArgs, DataStateChangeEventArgs, DialogEditEventArgs,
  EditService, EditSettingsModel,
  ExcelExportService, GridComponent,
  PageService,
  PdfExportService,
  ResizeService, SaveEventArgs,
  SortService
} from '@syncfusion/ej2-angular-grids';
import {Observable} from 'rxjs';
import {ChangeEventArgs} from '@syncfusion/ej2-buttons';
import {DataManager, UrlAdaptor} from '@syncfusion/ej2-data';
import {environment} from '../../../../environments/environment';
import {UsersService} from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [SortService, ResizeService, PageService, EditService, ExcelExportService, PdfExportService, ContextMenuService],
  encapsulation: ViewEncapsulation.None
})
export class UsersComponent implements OnInit {


  public data: Observable<DataStateChangeEventArgs>;
  public contextMenuItems: ContextMenuItem[];
  public editing: EditSettingsModel;
  public toolbar: string[];
  public state: DataStateChangeEventArgs;
  @ViewChild('grid', {static: true})
  public grid: GridComponent;
  rowObj: any;

  constructor(private service: UsersService) {
    this.data = service;
  }

  ngOnInit() {
    this.contextMenuItems = ['AutoFit', 'AutoFitAll', 'SortAscending', 'SortDescending',
      'Copy', 'Edit', 'Delete', 'Save', 'Cancel',
      'PdfExport', 'ExcelExport', 'CsvExport', 'FirstPage', 'PrevPage',
      'LastPage', 'NextPage'];
    this.editing = {allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog', newRowPosition: 'Bottom'};
    this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
    this.service.execute(this.state);
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


  actionBegin(args: SaveEventArgs) {
    if ((args.requestType === 'beginEdit' || args.requestType === 'add')) {
      this.rowObj = Object.assign({}, args.rowData);
    }
    if (args.requestType === 'save') {
      args.data['Color'] = this.rowObj['Color'];
      args.data['Active'] = this.rowObj['Active'];
    }
  }

  actionComplete(args: DialogEditEventArgs) {
    if ((args.requestType === 'beginEdit' || args.requestType === 'add')) {
      let dialog = args.dialog;
      dialog.header = args.requestType === 'beginEdit' ? 'Record of ' + args.rowData['EmployeeName'] : 'New Employee';
    }

  }

  changeEvent(args: ChangeEventArgs) {
    this.rowObj['Active'] = args.checked;
  }
}

import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {
  ContextMenuItem,
  ContextMenuService, DataSourceChangedEventArgs, DataStateChangeEventArgs, DialogEditEventArgs,
  EditService, EditSettingsModel,
  ExcelExportService, IEditCell,
  PageService,
  PdfExportService,
  ResizeService, SaveEventArgs,
  SortService
} from '@syncfusion/ej2-angular-grids';
import {Observable} from 'rxjs';
import {SalonServicesService} from './services.service';
import {ChangeEventArgs} from '@syncfusion/ej2-buttons';
import {DataManager, UrlAdaptor} from '@syncfusion/ej2-data';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
  providers: [SortService, ResizeService, PageService, EditService, ExcelExportService, PdfExportService, ContextMenuService],
  encapsulation: ViewEncapsulation.None
})
export class ServicesComponent implements OnInit {
  public editing: EditSettingsModel;
  public toolbar: string[];
  public state: DataStateChangeEventArgs;
  public data: Observable<DataStateChangeEventArgs>;
  public contextMenuItems: ContextMenuItem[];
  numericParams: IEditCell;
  drParams: IEditCell;
  rowObj: any;

  constructor(private service: SalonServicesService) {
    this.data = service;
  }

  public multiSelectData: DataManager = new DataManager({
    url: environment.serverUrl + 'categories',
    adaptor: new UrlAdaptor,
    crossDomain: true
  });
  public fields: Object = {text: 'CategoryName', value: 'CategoryName'};

  ngOnInit() {
    this.service.execute(this.state);
    this.numericParams = {params: {decimals: 2, value: 5}};
    this.drParams = {params: {}};
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

  actionBegin(args: SaveEventArgs) {
    if ((args.requestType === 'beginEdit' || args.requestType === 'add')) {
      this.rowObj = Object.assign({}, args.rowData);
    }
    if (args.requestType === 'save') {
      args.data['Active'] = this.rowObj['Active'];
      args.data['CategoryName'] = this.rowObj['CategoryName'];
    }
  }

  actionComplete(args: DialogEditEventArgs) {
    if ((args.requestType === 'beginEdit' || args.requestType === 'add')) {
      let dialog = args.dialog;
      dialog.header = args.requestType === 'beginEdit' ? 'Record of ' + args.rowData['ServiceName'] : 'New Service';
    }

  }

  changeEvent(args: ChangeEventArgs) {
    this.rowObj['Active'] = args.checked;
  }

}

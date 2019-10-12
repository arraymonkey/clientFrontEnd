import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {
  ContextMenuItem,
  ContextMenuService, DataSourceChangedEventArgs, DataStateChangeEventArgs, DialogEditEventArgs,
  EditService, EditSettingsModel,
  ExcelExportService, GridComponent,
  PageService,
  PdfExportService,
  ResizeService, SaveEventArgs, SortService
} from '@syncfusion/ej2-angular-grids';
import {Observable} from 'rxjs';
import {EmployeesService} from './employees.service';
import {ChangeEventArgs} from '@syncfusion/ej2-buttons';
import {DataManager, Query, UrlAdaptor} from "@syncfusion/ej2-data";
import {environment} from "../../../../environments/environment";
import {CategoriesService} from "../categories/categories.service";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
  providers: [SortService, ResizeService, PageService, EditService, ExcelExportService, PdfExportService, ContextMenuService],
  encapsulation: ViewEncapsulation.None
})
export class EmployeesComponent implements OnInit {

  public data: Observable<DataStateChangeEventArgs>;
  public contextMenuItems: ContextMenuItem[];
  public editing: EditSettingsModel;
  public toolbar: string[];
  public state: DataStateChangeEventArgs;
  @ViewChild('grid', {static: true})
  public grid: GridComponent;
  rowObj: any;
  // public multiSelectData: DataManager = new DataManager({
  //   url: environment.serverUrl + 'categories',
  //   adaptor: new UrlAdaptor,
  //   crossDomain: true
  // });
  public multiSelectData: Observable<any>;

  public fields: Object = {value: 'Id'};

  public query: Query = new Query().select(['CategoryName', 'Id']);

  constructor(private service: EmployeesService, private catService: CategoriesService) {
    this.data = service;


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

  ngOnInit(): void {
    this.service.execute(this.state);
    this.contextMenuItems = ['AutoFit', 'AutoFitAll', 'SortAscending', 'SortDescending',
      'Copy', 'Edit', 'Delete', 'Save', 'Cancel',
      'PdfExport', 'ExcelExport', 'CsvExport', 'FirstPage', 'PrevPage',
      'LastPage', 'NextPage'];
    this.editing = {
      allowEditing: true,
      allowAdding: true,
      allowDeleting: true,
      mode: 'Dialog',
      newRowPosition: 'Bottom'
    };
    this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
    this.data.subscribe(data => {
      this.consoleLot(data)
    })

    this.multiSelectData = this.catService.getAllData().pipe(map((res: { [key: string]: any }) => {
      console.log(res.value)
      return res.value
    }))

  }

  actionBegin(args: SaveEventArgs) {
    let categoryList: any = [];
    let cat = [];
    if ((args.requestType === 'beginEdit' || args.requestType === 'add')) {
      this.rowObj = Object.assign({}, args.rowData);
    }
    if (args.requestType === 'save') {
      args.data['Color'] = this.rowObj['Color'];
      args.data['Active'] = this.rowObj['Active'];
      for (let k of this.rowObj.CategoryList) {
        cat.push({Id: k})
      }
      categoryList = [...cat];
      args.data['CategoryList'] = categoryList;
      console.log(categoryList)
    }
  }

  actionComplete(args: DialogEditEventArgs) {
    if ((args.requestType === 'beginEdit' || args.requestType === 'add')) {
      let dialog = args.dialog;
      dialog.header = args.requestType === 'beginEdit' ? 'Record of ' + args.rowData['EmployeeName'] : 'New Employee';
    }

  }

  consoleLot(data) {
    console.log(data);
  }

  changeEvent(args: ChangeEventArgs) {
    this.rowObj['Active'] = args.checked;
  }
}

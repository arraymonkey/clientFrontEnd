import {
  Component,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {dragula, DragulaService} from 'ng2-dragula';
import {Observable, Subscription} from 'rxjs';
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
import {SignInService} from "../../sign-in.service";
import {ChangeEventArgs} from "@syncfusion/ej2-buttons";

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
  public data: Observable<DataStateChangeEventArgs>;
  public toolbar: string[];
  @ViewChild('grid', {static: true})
  public grid: GridComponent;
  rowObj: any;
  public state: DataStateChangeEventArgs;

  constructor(private dragulaService: DragulaService,
              private service: SignInService
  ) {
    this.data = service;
  }

  public ngOnInit(): void {

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
    this.service.executeFromTo(this.state)

  }


  public dataStateChange(state: DataStateChangeEventArgs): void {
    this.service.executeFromTo(state);
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
      dialog.header = args.requestType === 'beginEdit' ? 'Record of ' + args.rowData[''] : 'New Employee';
    }

  }

  changeEvent(args: ChangeEventArgs) {
    this.rowObj['Active'] = args.checked;
  }

}

import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {
  AgendaService,
  DayService,
  EventSettingsModel,
  GroupModel, MonthService,
  ScheduleComponent, TimelineViewsService,
  WeekService, WorkHoursModel,
  WorkWeekService
} from '@syncfusion/ej2-angular-schedule';
import {DataManager, Query, UrlAdaptor} from '@syncfusion/ej2-data';
import {Ajax, Internationalization} from '@syncfusion/ej2-base';
import {environment} from '../../../../environments/environment';

const instance: Internationalization = new Internationalization();
(window as TemplateFunction).majorSlotTemplate = (date: Date) => {
  return instance.formatDate(date, {skeleton: 'hm'});
};
(window as TemplateFunction).minorSlotTemplate = (date: Date) => {
  return instance.formatDate(date, {skeleton: 'ms'}).replace(':00', '');
};

interface TemplateFunction extends Window {
  majorSlotTemplate?: Function;
  minorSlotTemplate?: Function;
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService],
  encapsulation: ViewEncapsulation.None
})
export class CalendarComponent implements OnInit {
  @ViewChild('scheduleObj', {static: true})
  public scheduleObj: ScheduleComponent;
  public selectedDate: Date = new Date();

  public resourceDataManager: DataManager = new DataManager({
    url: environment.serverUrl + 'employees',
    adaptor: new UrlAdaptor,
    crossDomain: true
  });
  public workHours: WorkHoursModel = {highlight: false};
  public startHour = '09:00';
  public endHour = '22:00';

  public scheduleView = 'Day';
  timeScale: any = {
    enable: true,
    interval: 60,
    slotCount: 4,
    majorSlotTemplate: '<div>${majorSlotTemplate(data.date)}</div>',
    minorSlotTemplate: '<div style="text-align: right; margin-right: 15px">${minorSlotTemplate(data.date)}</div>'
  };
  public showQuickInfo = true;
  private dataManger: DataManager = new DataManager({
    url: environment.serverUrl + 'appointments', // Here pass your REST WEB API load data
    crudUrl: environment.serverUrl + 'appointments/crud',
    adaptor: new UrlAdaptor,
    crossDomain: true
    // headers: [{ Authorization: `Bearer ${sessionStorage.getItem("sessionTokenName")}` }]
  });

  public group: GroupModel = {byDate: true, resources: ['Groups']};
  public allowMultiple: Boolean = false;
  public eventSettings: EventSettingsModel = {
    dataSource: this.dataManger,
    fields: {
      subject: {name: 'ClientName', title: 'Client\'s Name'},
      location: {name: 'ClientPhone', title: 'Client\'s Phone'},
      startTime: {name: 'StartDate', title: 'Start Time'},
      endTime: {name: 'EndDate', title: 'End Time'},
      description: {name: 'Notes', title: 'Notes'}
    }
  };


  ngOnInit(): void {

  }

  public onPopupOpen(args: any) {

  }

}

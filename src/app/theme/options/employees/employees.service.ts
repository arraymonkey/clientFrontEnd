import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {DataResult, DataSourceChangedEventArgs, DataStateChangeEventArgs} from '@syncfusion/ej2-grids';
import {environment} from '../../../../environments/environment';
import {map} from 'rxjs/operators';
import {AbstractRestService} from '../../../shared/AbstractRestService';
import {Environment} from '@angular/compiler-cli/src/ngtsc/typecheck/src/environment';
import {Category} from "../categories/categories.service";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class EmployeesService extends AbstractRestService<Employee> {
  constructor(http: HttpClient) {
    super(http, environment.serverUrl + 'employees');
  }
}

export interface Employee {
  Id: String;
  EmployeeName: string;
  Phone: string;
  Email: string;
  Color: string;
  Active: boolean;
  CategoryList: Category[];
  OffDays?: Days
  Points: number
}

export enum Days {
  SUN, MON, TUE, WEND, THURS, FRI, SAT
}

import {Observable, Subject} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Data, DataSourceChangedEventArgs, DataStateChangeEventArgs} from '@syncfusion/ej2-grids';
import {map} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

export abstract class AbstractRestService<T> extends Subject<DataStateChangeEventArgs> {


  constructor(protected http: HttpClient, protected actionUrl: string) {
    super();
  }

  public execute(state: any): void {
    this.getAllData().subscribe(x => super.next(x as DataStateChangeEventArgs));
  }

  public executeFromTo(state: any): void {
    this.getDataFromToSync().subscribe(x => super.next(x as DataStateChangeEventArgs));
  }

  getAllData(): Observable<any[]> {
    return this.http.get<T[]>(this.actionUrl)
      .pipe(
        map((response: any) => (<any>{
          result: response,
          count: response.length
        })))
      .pipe((data: any) => data);
  }

  getAll(): Observable<any[]> {
    return this.http.get<T[]>(this.actionUrl);
  }

  /** POST: add a new record  to the server */
  addRecord(state: DataSourceChangedEventArgs): Observable<T> {
    return this.http.post<T>(this.actionUrl + '/add', state.data, httpOptions);
  }

  /** DELETE: delete the record from the server */
  deleteRecord(state: any): Observable<T> {
    const id = state.data[0].Id;
    const url = `${this.actionUrl}/${id}`;

    return this.http.delete<T>(url, httpOptions);
  }

  /** PUT: update the record on the server */
  updateRecord(state: DataSourceChangedEventArgs): Observable<any> {
    return this.http.put(this.actionUrl, state.data, httpOptions);
  }

  getDataFromTo(start?: Date, end?: Date) {
    let s = new Date(new Date().setHours(0, 0, 0, 0));
    let e = new Date(new Date().setHours(24, 0, 0, 0));
    return this.http.get(`${this.actionUrl}/all/${s}/${e}`, httpOptions);
  }

  getDataById(data) {
    return this.http.get(`${this.actionUrl}/${data.Id}`)
  }

  getDataFromToSync(start?: Date, end?: Date) {
    let s = new Date(new Date().setHours(0, 0, 0, 0));
    let e = new Date(new Date().setHours(24, 0, 0, 0));
    return this.http.get(`${this.actionUrl}/all/${s}/${e}`, httpOptions).pipe(
      map((response: any) => (<any>{
        result: response,
        count: response.length
      })))
      .pipe((data: any) => data);
  }
}

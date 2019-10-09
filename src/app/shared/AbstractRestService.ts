import {Observable, Subject} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {DataSourceChangedEventArgs, DataStateChangeEventArgs} from '@syncfusion/ej2-grids';
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
  getAllData(): Observable<any[]> {
    return this.http.get<T[]>(this.actionUrl)
      .pipe(
        map((response: any) => (<any> {
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
    return this.http.post<T>(this.actionUrl  + '/add', state.data, httpOptions);
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

}

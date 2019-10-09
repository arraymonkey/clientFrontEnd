import {Client} from 'src/app/theme/client/clients.service';
import {Employee} from '../../../theme/options/employees/employees.service';
import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  baseUrl = environment.serverUrl + 'checkin';

  constructor(private http: HttpClient) {
  }

  get() {

    return this.http.get(this.baseUrl );


    // this.http.get(`${this.baseUrl}services/`).pipe(map((x: Service[]) => {
    //   x.map(data => {
    //     data.categoryName = data.category.name
    //   })
    //   return x;
    // })).subscribe(y => {
    //   this._services.next(y);
    //   console.log(JSON.stringify(y));
    // })

  }

  create(data) {
    return this.http.post(`${this.baseUrl}`, data);
  }

  update(data) {
    return this.http.put(`${this.baseUrl}/${data.id}`, data);
  }

  delete(data) {
    return this.http.delete(`${this.baseUrl}/${data.id}`)
  }
}

export interface Service {
  Id: string;
  Client?: Client;
  ServiceDate?: Date;
  SalonServices?: Service;
  Employee?: Employee;
  SubTotal?: number;
  Status?: Status;
  Adjustment?: number;
  Gratuity?: number;
  PaymentType?: PaymentType;
  Discount?: number;
  Total?: number;
}

export enum PaymentType {
  CASH, CREDIT

}

export enum Status {
  WAITING, SERVICING, COMPLETED, PAID
}

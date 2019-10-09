import {Injectable} from '@angular/core';
import {Client} from '../client/clients.service';
import {Employee} from '../options/employees/employees.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {SalonService} from '../options/services/services.service';

@Injectable({
  providedIn: 'root'
})
export class PosService {
  BASE_URL = environment.serverUrl;

  constructor(private http: HttpClient) {
  }

  getAllCustomer() {
    return this.http.get(this.BASE_URL + 'clients');
  }

  // getCustomerDiscount(id) {
  //   return this.http.post('/api/get-customer-by-discount', {id: id});
  // }

  getAllCategory() {
    return this.http.get(this.BASE_URL + 'categories');
  }

  getSubCategory(id) {
    return this.http.post(this.BASE_URL + 'services', {id: id});
  }

  // getCategoryByProduct(type, id) {
  //
  //   return this.http.post('/api/get-categoryByProduct', {cat: id, type: type});
  // }

  getProductInfo(id) {
    return this.http.get(this.BASE_URL + 'services/' + id);
  }

  createSales(data) {
    return this.http.post('/api/create-new-sales', data);
  }
}

export interface ServiceTicket {
  Id: string;
  Client: Client;
  ServiceDate: Date;
  SalonServices: SalonService;
  Employee: Employee;
  SubTotal: number;
  Status: Status;
  Adjustment: number;
  Gratuity: number;
  PaymentType: PaymentType;
  Discount: number;
  Total: number;
}

export enum PaymentType {
  CASH, CREDIT

}

export enum Status {
  WAITING, SERVICING, COMPLETED, PAID
}

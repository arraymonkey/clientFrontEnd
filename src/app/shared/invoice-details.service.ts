import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class InvoiceDetailsService {

  constructor(private http:HttpClient) { }

  getInvoiceDetails(val){
    return this.http.post('/api/get-invoice-details',{id:val});
  }
 

}
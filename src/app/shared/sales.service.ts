import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable()
export class SalesService {
  BASE_URL = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  getAllCustomer() {
    return this.http.get(this.BASE_URL +'clients');
  }

  getCustomerDiscount(id) {
    return this.http.post('/api/get-customer-by-discount', {id: id});
  }

  getAllCategory() {
    return this.http.get(this.BASE_URL +'clients');
  }

  getSubCategory(id) {
    return this.http.post('/api/get-cat-by-subCategory', {id: id});
  }

  getCategoryByProduct(type, id) {
    return this.http.get(this.BASE_URL +'services/'+id )

    // return this.http.post('/api/get-categoryByProduct', {cat: id, type: type});
  }

  getProductInfo(id) {
    return this.http.get(this.BASE_URL +'service/'+id);
  }

  createSales(data) {
    return this.http.post(this.BASE_URL +'tickets', data);
  }

}

import {Injectable} from '@angular/core';
import {AbstractRestService} from '../../../shared/AbstractRestService';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService extends AbstractRestService<Category> {

  constructor(http: HttpClient) {
    super(http, environment.serverUrl + 'categories');
  }
}

export interface Category {
  Id: number;
  CategoryName: string
}

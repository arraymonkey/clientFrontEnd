import {Injectable} from '@angular/core';
import {AbstractRestService} from '../../../shared/AbstractRestService';
import {Category} from '../categories/categories.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SalonServicesService extends AbstractRestService<SalonService> {

  constructor(http: HttpClient) {
    super(http, environment.serverUrl + 'services');
  }
}

export interface SalonService {
  Id: string;
  ServiceName: string;
  Price: number;
  Duration: number;
  Active: boolean;
  CategoryName: string
}

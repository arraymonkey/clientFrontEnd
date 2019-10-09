import {Injectable} from '@angular/core';
import {AbstractRestService} from '../../../shared/AbstractRestService';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends AbstractRestService<User> {

  constructor(http: HttpClient) {
    super(http, environment.serverUrl + 'users/')
  }
}

export interface User {
  Id: string;
  UserName: string;
  FirstName: string;
  LastName: string;
  Email: string

}

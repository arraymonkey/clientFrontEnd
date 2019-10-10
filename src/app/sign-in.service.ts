import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {AbstractRestService} from './shared/AbstractRestService';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SignInService extends AbstractRestService<WaitList> {
  _messages = new BehaviorSubject([]);
  messageArr = this._messages.asObservable();

  constructor(http: HttpClient) {
    super(http, environment.serverUrl + 'checkin');
  }

  execute() {
    return this.messageArr.pipe(map(data => data)).subscribe(data => {
      console.log(data)
      return data;
    });
  }

  callServer() {
    this.getDataFromTo().subscribe(data => {
      console.log(data)
    });
  }
}

export interface WaitList {
  Id: string;
  CheckInTime: Date;
  Client: any[];
  SalonServices: any[];
  Employee: any[];
}


export interface Message {
  [key: string]: any
}

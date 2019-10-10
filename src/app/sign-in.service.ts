import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {AbstractRestService} from './shared/AbstractRestService';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SignInService extends AbstractRestService<WaitList> {
  _messages = new Subject<WaitList[]>();
  _messageObj = this._messages.asObservable();

  messages: WaitList[] = [];

  constructor(http: HttpClient) {
    super(http, environment.serverUrl + 'checkin');

    this._messages.subscribe((data: any[]) => {
      this.messages = data;
    })
  }



  callServer() {
    this.getDataFromTo().subscribe((data: any[]) => {
      this._messages.next(data);
    })
  }

  getDataFromSubject() {
    let tempData: any[] = []
    this._messageObj.subscribe((data: any[]) => {
      tempData = data;
    });
    return tempData;
  }


}


export interface WaitList {
  Id?: string;
  CheckInTime?: Date;
  Client?: any[];
  SalonServices?: any[];
  Employee?: any[];
}


export interface Message {
  [key: string]: any
}

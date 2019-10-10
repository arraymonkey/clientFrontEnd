import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {AbstractRestService} from './shared/AbstractRestService';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotificationService extends AbstractRestService<WaitList> {
  _messages = new BehaviorSubject<Message>([]);
  messageArr = this._messages.asObservable();

  constructor(http: HttpClient) {
    super(http, 'checkin');
  }

  execute() {
    return this.messageArr.pipe(map(data => data));
  }

  callserver() {
    this.getAllData().subscribe(data => {
      this._messages.next(data);
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

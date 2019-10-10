import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  _messages = new BehaviorSubject<Message>([]);
  messageArr: any[] = [];

  constructor() {
  }

  execute() {
    this._messages.subscribe((data: any[]) => {
      this.messageArr = data;
    });
  }

  addMessage(key, value) {
    this.messageArr[key] = value;
    this._messages.next(this.messageArr);
  }
}

export interface Message {
  [key: string]: any
}

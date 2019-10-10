import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {RxStompService} from '@stomp/ng2-stompjs';
import {Message} from '@stomp/stompjs';
import {Subscription} from 'rxjs';
import {NotificationService} from './notification.service';
import {NotificationsService} from 'angular2-notifications';

const options: any = {
  position: ['bottom', 'right'],
  title: 'Check In',
  msg: 'New Client Check In'
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  title: 'Check In';
  msg: 'New Client Check In';

  public receivedMessages: any[] = [];
  private topicSubscription: Subscription;

  constructor(private router: Router,
              private messageService: NotificationService,
              private rxStompService: RxStompService,
              private servicePNotify: NotificationsService
  ) {
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });


    this.topicSubscription = this.rxStompService.watch('/topic/checkin').subscribe((message: Message) => {
      let jsondata = JSON.parse(message.body);
      let key = jsondata.Id;
      this.messageService.callserver();
      console.log(this.messageService.execute());

      this.servicePNotify.info(
        options.title ? options.title : this.title,
        options.msg ? options.msg : this.msg
      );
    });
    this.messageService._messages.subscribe((data: any[]) => {
      this.receivedMessages = data;
    });
  }
}

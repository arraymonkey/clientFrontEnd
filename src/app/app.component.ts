import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {RxStompService} from '@stomp/ng2-stompjs';
import {Message} from '@stomp/stompjs';
import {Subscription} from 'rxjs';
import {NotificationService} from './notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public receivedMessages: string[] = [];
  private topicSubscription: Subscription;

  constructor(private router: Router,
              private messageService: NotificationService,
              private rxStompService: RxStompService
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
      this.messageService.addMessage(key, jsondata);
  console.log(jsondata);
    });

  }
}

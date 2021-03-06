import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {RxStompService} from '@stomp/ng2-stompjs';
import {Message} from '@stomp/stompjs';
import {Subscription} from 'rxjs';
import {SignInService, WaitList} from './sign-in.service';
import {NotifierService} from "angular-notifier";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  public receivedMessages: any[] = [];
  private topicSubscription: Subscription;

  public constructor(private router: Router,
                     private signInService: SignInService,
                     private rxStompService: RxStompService,
                     private notifier: NotifierService
  ) {
  }

  ngOnInit() {
    this.signInService.callServer();
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });

    this.topicSubscription = this.rxStompService.watch('/topic/checkin').subscribe((message: Message) => {
      let jsondata: WaitList = JSON.parse(message.body);
      let newWaitList: any = [];
      let key = jsondata.Id;
      let clientName = jsondata.Client['ClientName']
      this.signInService.getDataById(jsondata).subscribe((data: WaitList) => {
        this.showNotification('info', `${data.Client['ClientName']} just signed in`, data.Id)
      });

    });


  }

  public showNotification(type: string, message: string, id?:string): void {
    this.notifier.notify(type, message);
  }


  //
  // options: any = {
  //   position: ['bottom', 'right'],
  // };
  //
  // position1 = 'bottom';
  // position2 = 'right';
  // timeOut = 1000;
  // showProgressBar = true;
  // pauseOnHover = true;
  // lastOnBottom = true;
  // clickToClose = true;
  // maxLength = 0;
  // maxStack = 8;
  // preventDuplicates = false;
  // preventLastDuplicates = false;
  // theClass: string;
  // rtl = false;
  // animate = 'fromRight';
  // icons: string;
  // subType = 'success';
  //
  // title: string;
  // msg: string;
  //
  //
  // addNotify(options) {
  //   this.servicePNotify.remove();
  //   this.options = {
  //     position: [
  //       ('position1' in options) ? options.position1 : this.position1,
  //       ('position2' in options) ? options.position2 : this.position2
  //     ],
  //     maxStack: ('maxStack' in options) ? options.maxStack : this.maxStack,
  //     timeOut: options.timeOut ? options.timeOut : this.timeOut,
  //     showProgressBar: ('showProgressBar' in options) ? options.showProgressBar : this.showProgressBar,
  //     pauseOnHover: ('pauseOnHover' in options) ? options.pauseOnHover : this.pauseOnHover,
  //     lastOnBottom: ('lastOnBottom' in options) ? options.lastOnBottom : this.lastOnBottom,
  //     clickToClose: ('clickToClose' in options) ? options.clickToClose : this.clickToClose,
  //     maxLength: options.maxLength ? options.maxLength : this.maxLength,
  //     preventDuplicates: ('preventDuplicates' in options) ? options.preventDuplicates : this.preventDuplicates,
  //     preventLastDuplicates: ('preventLastDuplicates' in options) ? options.preventLastDuplicates : this.preventLastDuplicates,
  //     theClass: options.theClass ? options.theClass : this.theClass,
  //     rtl: ('rtl' in options) ? options.rtl : this.rtl,
  //     animate: options.animate ? options.animate : this.animate,
  //     icons: options.icons ? options.icons : this.icons
  //   };
  //
  //   switch (options.type) {
  //     case 'success':
  //       this.servicePNotify.success(
  //         options.title ? options.title : this.title,
  //         options.msg ? options.msg : this.msg
  //       );
  //       break;
  //     case 'error':
  //       this.servicePNotify.error(
  //         options.title ? options.title : this.title,
  //         options.msg ? options.msg : this.msg
  //       );
  //       break;
  //     case 'alert':
  //       this.servicePNotify.error(
  //         options.title ? options.title : this.title,
  //         options.msg ? options.msg : this.msg
  //       );
  //       break;
  //     case 'warn':
  //       this.servicePNotify.error(
  //         options.title ? options.title : this.title,
  //         options.msg ? options.msg : this.msg
  //       );
  //       break;
  //     case 'info':
  //       this.servicePNotify.info(
  //         options.title ? options.title : this.title,
  //         options.msg ? options.msg : this.msg
  //       );
  //       break;
  //     case 'create':
  //       this.servicePNotify.create(
  //         options.title ? options.title : this.title,
  //         options.msg ? options.msg : this.msg,
  //         options.type ? options.type : this.subType
  //       );
  //       break;
  //     case 'html':
  //       this.servicePNotify.html(
  //         options.title ? options.title : this.title,
  //         options.msg ? options.msg : this.msg
  //       );
  //       break;
  //     default:
  //       this.servicePNotify.alert(
  //         options.title ? options.title : this.title,
  //         options.msg ? options.msg : this.msg
  //       );
  //       break;
  //   }
  // }
}

import { InjectableRxStompConfig } from '@stomp/ng2-stompjs';

export const myRxStompConfig: InjectableRxStompConfig = {
  brokerURL: 'ws://108.175.11.201:15674/ws',


  connectHeaders: {
    login: 'admin',
    passcode: 'Dchackers1!'
  },


  heartbeatIncoming: 0, // Typical value 0 - disabled
  heartbeatOutgoing: 20000, // Typical value 20000 - every 20 seconds


  reconnectDelay: 200,



};

import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor() {
  }
}

export interface Client {
  Id: string;
  ClientName: string;
  Phone: string;
  Email: string;
  Appointments: any[];
}

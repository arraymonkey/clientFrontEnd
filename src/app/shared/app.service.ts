import { Injectable } from '@angular/core';
// import {  Http,RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class AppService {

  constructor(private http:HttpClient) { }

  checkLogin(token){
    let bodyString = token; // Stringify payload
    // let headers      = new HttpHeaders({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    // let options       = new RequestOptions({ headers: headers }); // Create a request option

    let httpHeaders = new HttpHeaders({'Content-Type' : 'application/json'});    
    let options = { headers: httpHeaders}; 
    return  this.http.post('/api/get-user',bodyString,options);
    
  }

  profileUpdate(data)
  {
  	return this.http.post('/api/user-profileUpdate',data);
  }

  updatePassword(data)
  {
  	return this.http.post('/api/user-passwordUpdate',data);
  }

  getMenu() {
    return this.http.get('/api/get-all-menu');
  }

  checkPermission(val){
    return this.http.post('/api/check-user-permission',{menu:val});
  }
}

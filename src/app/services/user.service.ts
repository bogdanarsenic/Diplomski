import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../shared/classes/User';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  RegistrationGuest(guest:User):Observable<any>
  {
    return this.httpClient.post("https://localhost:44306/api/Account/Register",guest);
  }

  getUser(): any{
    return this.httpClient.get('https://localhost:44306/api/ApplicationUser/0', httpOptions);
  }

  putApplicationUsers(id:string,user:User):Observable<any>
  {
      let header=new HttpHeaders();
      header.append('enctype','multipart/form-data');
      let body=new FormData();
      body.append('user',JSON.stringify(user));
      
      return this.httpClient.put('https://localhost:44306/api/ApplicationUser/1', body,{'headers' : header} );
  }

  getAllUsers():any{
    return this.httpClient.get("https://localhost:44306/api/ApplicationUser");
  }

}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../shared/classes/Login';
import { PriceList } from '../shared/classes/PriceList';
import { Ticket } from '../shared/classes/Ticket';
import { User } from '../shared/classes/User';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private httpClient: HttpClient) { }

  getTheToken(loginUser : Login) : Observable<any>{
    let headers = new HttpHeaders();
    headers = headers.append('Content-type','application/x-www-form-urlencoded');

    return this.httpClient.post('http://localhost:52295/oauth/token', 'username='+loginUser.Username+'&password='+loginUser.Password+'&grant_type=password',{"headers": headers});
  
  }

  RegistrationGuest(guest:User):Observable<any>
  {
    return this.httpClient.post("http://localhost:52295/api/Account/Register",guest);
  }

  logOut() : any{
    return this.httpClient.post("http://localhost:52295/api/Account/Logout", httpOptions);
  }

  getUser(): any{
    return this.httpClient.get('http://localhost:52295/api/ApplicationUser/0', httpOptions);
  }

  getTicket(id:string): any{
    return this.httpClient.get('http://localhost:52295/api/Ticket',{params:{id}});
  }

  putApplicationUsers(id:string,user:User):Observable<any>
  {
      let header=new HttpHeaders();
      header.append('enctype','multipart/form-data');
      let body=new FormData();
      body.append('user',JSON.stringify(user));
      
      return this.httpClient.put('http://localhost:52295/api/ApplicationUser/1', body,{'headers' : header} );
  }

  getAllTickets():any{
    return this.httpClient.get("http://localhost:52295/api/Ticket");
  }

  getAllUsers():any{
    return this.httpClient.get("http://localhost:52295/api/ApplicationUser");
  }

  getAllPriceLists():any{
    return this.httpClient.get("http://localhost:52295/api/PriceList");
  }

  postTicket(t:Ticket):Observable<any>{
    return this.httpClient.post("http://localhost:52295/api/Ticket", t);
  }

  postPriceList(pricelist:PriceList){
    return this.httpClient.post("http://localhost:52295/api/PriceList", pricelist);
  }

  putPriceList(id:string,pricelist:PriceList): Observable<any>{
    return this.httpClient.put(`http://localhost:52295/api/PriceList/${id}`, pricelist );
  }
}

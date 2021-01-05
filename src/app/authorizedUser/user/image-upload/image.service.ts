import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http:HttpClient) { }

  AddingImage(fd:FormData):Observable<any>
  {
    return this.http.put("https://localhost:44306/api/Image", fd)
  }
}

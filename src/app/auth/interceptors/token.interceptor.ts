import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor{

    constructor( private router: Router ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        let jwt = localStorage.jwt;
        
        if(jwt){
            req = req.clone({
                setHeaders: {
                    "Authorization": "Bearer " + jwt
                }
            });
        }

        return next.handle(req);
    }
}
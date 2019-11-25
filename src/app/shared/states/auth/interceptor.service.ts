import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, throwError } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';

import {environment} from 'environments/environment'

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private auth: AuthService) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    if(req.url.indexOf(environment.urlBackend) != -1) {
        return this.auth.getTokenSilently$({
          scope: 'read:influxdb',
          audience: "https://api.dashboard.hdenergie.ca"
        }).pipe(
            mergeMap(token => {
              const tokenReq = req.clone({
                setHeaders: { Authorization: `Bearer ${token}` }
              });
              return next.handle(tokenReq);
            }),
            catchError(err => throwError(err))
        );
    } else {
        return next.handle(req);
    }

    
  }
}
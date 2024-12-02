import { HttpHandlerFn, HttpRequest, HttpEvent, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment.prod';

export const tokenInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const tokenizedReq = req.clone({
    setHeaders: {
      Authorization: 'Bearer ' + localStorage.getItem('access-token-l4-coach')
    }
  });

  return next(tokenizedReq).pipe(
    tap((evt) => {
      if (evt instanceof HttpResponse) {
        const sessionToken = evt.headers.get('access-token');
        if (sessionToken) {
          localStorage.setItem('access-token-l4-coach', sessionToken);
        }
      }
    })
  );
};

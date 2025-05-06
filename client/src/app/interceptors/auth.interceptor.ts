import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../services/auth/token.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);

  if(tokenService.isAuthenticated()) {
    const token = tokenService.getToken();
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req);
};

// import { Injectable } from "@angular/core";
// import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from "@angular/common/http";
// import { Observable } from "rxjs";
// import { TokenService } from "../services/auth/token.service";

// @Injectable()
// export class authInterceptor implements HttpInterceptor {

//   constructor(private tokenService: TokenService) {}

//   intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

//     if(this.tokenService.isAuthenticated()) {
//       const token = this.tokenService.getToken();
//       request = request.clone({
//         setHeaders: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//     }
//     return next.handle(request);
//   }
// }
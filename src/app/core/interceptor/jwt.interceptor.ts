import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
   const token = localStorage.getItem('item')
  const authReq = req.clone({
    setHeaders:{
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Origin, Authorization, Content-Type, Accept",
      "Accept": "application/json",
      "Authorization": "Bearer " + token
      // "tool_id": "" + this.token,
  },
  });
  return next(authReq);
};

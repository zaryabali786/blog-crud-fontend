import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

export const tokenExpirationInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router); // ✅ Inject the Router


  return next(req).pipe(
    tap({
      error: (err) => {
        if (err.status === 401) {
      localStorage.removeItem('token'); // 🔑 Remove the token (or whatever key you use)
          router.navigate(['']);            // ✅ Redirect to '' route

        }
      },
    }),
  );
};

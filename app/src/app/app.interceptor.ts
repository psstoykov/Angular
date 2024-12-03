import { HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

export const appInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  return next(req).pipe(
    catchError((err) => {
      if (err.status === 401) {
        router.navigate(['/login']);
      } else {
        router.navigate(['/error']);
      }
      return [err];
    })
  );
};

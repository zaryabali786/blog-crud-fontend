/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { environment } from '../../../envirounment/environent';

// import * as fileSaver from "file-saver";

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiURL = environment.apiUrl;
  private token = null;
  constructor(
    private http: HttpClient,
  ) {
    this.token = localStorage.getItem('token');
  }

  private getHeaderOptions() {
    return {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers':
          'Origin, Authorization, Content-Type, Accept',
        Accept: 'application/json',
        Authorization: 'Bearer ' + this.token,
      }),
    };
  }

  // GET Method
  public get(req: any, loadSpinner: boolean = false): Observable<any> {
    const url = this.apiURL + req;
    if (loadSpinner) {
      // this.showSpinner();
    }
    return this.http.get<any>(url, this.getHeaderOptions()).pipe(
      catchError((err) => {
        if (err.status === 401 || err.status === 403) {
        //   this.logout();
        } else {
          // this.showError(err);
        }
        return throwError(err);
      }),
      finalize(() => {
        if (loadSpinner) {
          // this.hideSpinner(url);
        }
      }),
    );
  }

  // POST Method
  public post(req: any, data, loadSpinner: boolean = false): Observable<any> {
    if (loadSpinner) {
      // this.showSpinner();
    }
    return this.http
      .post<any>(this.apiURL + req, data, this.getHeaderOptions())
      .pipe(
        catchError((err) => {

          return throwError(err);
        }),
        finalize(() => {
          if (loadSpinner) {
            // this.hideSpinner();
          }
        }),
      );
  }

  // PUT Method
  public put(req: any, data, loadSpinner: boolean = false): Observable<any> {
    if (loadSpinner) {
      // this.showSpinner();
    }
    return this.http
      .put<any>(this.apiURL + req, data, this.getHeaderOptions())
      .pipe(
        catchError((err) => {

          return throwError(err);
        }),
        finalize(() => {
          if (loadSpinner) {
            // this.hideSpinner();
          }
        }),
      );
  }

  // DELETE Method
  public delete(req: any): Observable<any> {
    return this.http
      .delete<any>(this.apiURL + req, this.getHeaderOptions())
      .pipe(
        catchError((err) => {
          if (err.status === 401 || err.status === 403) {
            //this.logout();
          }
          return throwError(err);
        }),
      );
  }




  

}

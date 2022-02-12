import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Data } from '../json-server/data';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private url = 'http://localhost:3000/data/';

  constructor(private http: HttpClient, private log: LoggerService) { }

  getData(id: number): Observable<Data>{
    return this.http.get<Data>(this.url + id).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      this.log.put('json-server returned an error: ' + error.error);
    } else {
      this.log.put(`json-server returned code ${error.status} with body: ` + error.error);
    }
    return throwError(() => new Error('Could not get data from json-server. See console for further details.'));
  }
}

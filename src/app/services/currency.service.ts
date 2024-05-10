import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private options: any;
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {

  }

  private headersAuthorization = (): HttpHeaders => {
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers': '*',
    };

    return new HttpHeaders(headers);
  };

  getAllCurrencies(): Observable<ApiResponse> {
    this.options = { headers: this.headersAuthorization() };
    return this.http
      .get<ApiResponse>(this.apiUrl + '/api/v1/currency', this.options)
      .pipe(
        map((response: any) => {          
          return response as ApiResponse;
        }),
        catchError((err: HttpErrorResponse) => {
          console.error('Error al obtener las monedas:', err);
          return throwError(err.message || 'Error de servidor');
        })
      );
  }
}

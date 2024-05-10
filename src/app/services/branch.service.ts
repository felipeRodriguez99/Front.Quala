import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../models/response.model';

@Injectable({
  providedIn: 'root',
})
export class BranchService {
  private options: any;
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private headersAuthorization = (): HttpHeaders => {
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers': '*',
    };

    return new HttpHeaders(headers);
  };

  getAllBranches(): Observable<ApiResponse> {
    this.options = { headers: this.headersAuthorization() };
    return this.http
      .get<ApiResponse>(this.apiUrl + '/api/v1/branch', this.options)
      .pipe(
        map((response: any) => {
          return response as ApiResponse;
        }),
        catchError((err: HttpErrorResponse) => {
          console.error('Error al obtener las sucursales:', err);
          return throwError(err.message || 'Error de servidor');
        })
      );
  }

  deleteBranch(id: number): Observable<ApiResponse> {
    this.options = { headers: this.headersAuthorization() };
    return this.http
      .delete<ApiResponse>(`${this.apiUrl}/api/v1/branch/${id}`, this.options)
      .pipe(
        map((response: any) => {
          return response as ApiResponse;
        }),
        catchError((err: HttpErrorResponse) => {
          console.error(`Error al eliminar la sucursal con ID ${id}:`, err);
          return throwError(err.message || 'Error de servidor');
        })
      );
  }

  addBranch(branchData: any): Observable<ApiResponse> {
    const options = { headers: this.headersAuthorization() };
    return this.http
      .post<ApiResponse>(
        `${this.apiUrl}/api/v1/branch`,
        JSON.stringify(branchData),
        options
      )
      .pipe(
        map((response: any) => {
          return response as ApiResponse;
        }),
        catchError((err: HttpErrorResponse) => {
          console.error('Error al agregar la sucursal:', err);
          return throwError(err.message || 'Error de servidor');
        })
      );
  }
  updateBranch(code: number, branchData: any): Observable<ApiResponse> {
    const options = { headers: this.headersAuthorization() };
    return this.http
      .put<ApiResponse>(
        `${this.apiUrl}/api/v1/branch/${code}`,
        JSON.stringify(branchData),
        options
      )
      .pipe(
        map((response: any) => {
          return response as ApiResponse;
        }),
        catchError((err: HttpErrorResponse) => {
          console.error('Error al actualizar la sucursal:', err);
          return throwError(err.message || 'Error de servidor');
        })
      );
  }

  getBranchById(code: number): Observable<ApiResponse> {
    const options = { headers: this.headersAuthorization() };
    return this.http
      .get<ApiResponse>(
        `${this.apiUrl}/api/v1/branch/${code}`)
      .pipe(
        map((response: any) => {
          return response as ApiResponse;
        }),
        catchError((err: HttpErrorResponse) => {
          console.error('Error al obtener la sucursal:', err);
          return throwError(err.message || 'Error de servidor');
        })
      );
  }
}

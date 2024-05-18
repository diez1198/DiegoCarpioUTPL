import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MostrarEliminarCuestionariosService {

  private apiUrl = 'http://localhost:3001/api/databases';

  constructor(private http: HttpClient) { }

  getDatabasesAndCollections(): Observable<any> {
    return this.http.get(this.apiUrl);
  }



  eliminarCuestionario(collectionName: string): Observable<any> {
    const url = `${this.apiUrl}/eliminar-coleccion/${encodeURIComponent(collectionName)}`;
    return this.http.delete(url).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    return throwError('Error al eliminar el cuestionario: ' + error.message);
  }


}

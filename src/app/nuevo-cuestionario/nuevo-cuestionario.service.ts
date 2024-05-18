import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs'; // Importar operadores RxJS
import { catchError, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NuevoCuestionarioService {

  private apiUrl = 'http://localhost:3001'; // URL base de tu servidor Node.js

  constructor(private http: HttpClient) { }

  // Método para crear una nueva colección y un documento dentro de ella
  crearNuevaColeccion(nombreCuestionario: string, datosDocumento: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/nueva-coleccion`, { nombre: nombreCuestionario }) //// aqui se crea  
      .pipe(
        switchMap((response: any) => {
          const nuevaColeccionId = response._id; // Suponiendo que tu servidor devuelve el _id de la nueva colección creada
          return this.http.post(`${this.apiUrl}/api/nueva-coleccion/${nuevaColeccionId}/nuevo-documento`, datosDocumento);
        }),
        catchError(error => {
          console.error('Error al crear la colección y el documento:', error);
          return throwError('Error al crear la colección y el documento');
        })
      );
  }
}

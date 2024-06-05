//nuevo-cuestionario service//
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class NuevoCuestionarioService {
  private apiUrl = 'http://localhost:3001'; // URL base de tu servidor Node.js

  constructor(private http: HttpClient) { }

  crearNuevaColeccion(nombreCuestionario: string, datosDocumento: any): Observable<any> {
    
    return this.http.post<{ nombreColeccion: string }>(`${this.apiUrl}/api/nueva-coleccion`, { nombre: nombreCuestionario })
      .pipe(
        switchMap((response) => {
          const nombreColeccion = response.nombreColeccion;
          console.log('Datos recibidos en nombre cuestionario de crear nueva coleecion :', nombreCuestionario);
          console.log('Datos recibidos en nombre coleecion de crearnuevacoleccion:', nombreColeccion);
          if (!nombreColeccion) {
            console.error('El nombre de la colección es inválido al crear nueva coleccion');
            return throwError('El nombre de la colección es inválido al crear nueva coleccion');
          }
  
          return this.http.post(`${this.apiUrl}/api/nueva-coleccion/${nombreColeccion}/nuevo-documento`, datosDocumento);
        }),
        catchError(error => {
          console.error('Error al crear la colección y el documento:', error);
          return throwError('Error al crear la colección y el documento');
        })
      );
  }

  insertarNuevaPregunta(nombreColeccion: string, datosDocumento: any): Observable<any> {
    const url = `${this.apiUrl}/api/nueva-coleccion/${nombreColeccion}/nueva-pregunta`; //AQUI CAMBIA EL NOMBRE DEL URL
    console.log('Datos recibidos en insertarNuevaPregunta:', datosDocumento);
    return this.http.post(url, datosDocumento)
      .pipe(
        catchError(error => {
          console.error('Error al insertar la nueva pregunta:', error);
          return throwError('Error al insertar la nueva pregunta');
       
  
        })
      );

  }


  agregarPregunta(nombreColeccion: string, datosDocumento: any): Observable<any> {
    const url = `${this.apiUrl}/api/nueva-coleccion/${nombreColeccion}/nueva-pregunta`; //AQUI CAMBIA EL NOMBRE DEL URL
    console.log('Datos recibidos en insertarNuevaPregunta:', datosDocumento);
    return this.http.post(url, datosDocumento)
      .pipe(
        catchError(error => {
          console.error('Error al insertar la nueva pregunta:', error);
          return throwError('Error al insertar la nueva pregunta');
       
  
        })
      );

  }



  getDocumentos(nombreColeccion: string): Observable<number> {
    const url = `${this.apiUrl}/api/databases/${nombreColeccion}/total-documentos`; // Endpoint para contar documentos
    return this.http.get<number>(url);
}






}


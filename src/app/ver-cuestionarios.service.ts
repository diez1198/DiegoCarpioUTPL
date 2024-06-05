// ver-cuestionarios.services.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class VerCuestionariosService {

  private apiUrl = 'http://localhost:3001/api/databases'; // Asegúrate de que la URL sea correcta

  constructor(private http: HttpClient) { }


  getApiUrl(): string {
    return this.apiUrl;
  }

  getColecciones(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }


  

  
  getDocumentos(nombreColeccion: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${nombreColeccion}/documentos`).pipe(
      map((documentos: any[]) => documentos.filter((pregunta: any) => this.preguntaCompleta(pregunta)))
    );
  }
  private preguntaCompleta(pregunta: any): boolean {
    return pregunta.pregunta !== null && pregunta.opcion_a !== null &&
           pregunta.opcion_b !== null && pregunta.opcion_c !== null &&
           pregunta.respuesta !== null;
  }


  editarPregunta(nombreColeccion: string, preguntaId: string, datosActualizados: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${nombreColeccion}/editar-pregunta/${preguntaId}`, datosActualizados);
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

  getNumeroDocumentos(nombreColeccion: string): Observable<number> {
    const url = `${this.apiUrl}/api/nueva-coleccion/${nombreColeccion}/nueva-pregunta/count`; // Endpoint para contar documentos
    return this.http.get<number>(url);
}

eliminarDocumento(nombreColeccion: string, id: number): Observable<any> {
  const url = `${this.apiUrl}/${nombreColeccion}/${id}/eliminar-documento`;
  return this.http.delete(url);
}



}
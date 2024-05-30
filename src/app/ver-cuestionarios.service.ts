// ver-cuestionarios.services.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VerCuestionariosService {

  private apiUrl = 'http://localhost:3001/api/databases'; // Asegúrate de que la URL sea correcta

  constructor(private http: HttpClient) { }

  getColecciones(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getDocumentos(nombreColeccion: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${nombreColeccion}`);
  }
  editarPregunta(nombreColeccion: string, preguntaId: string, datosActualizados: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${nombreColeccion}/editar-pregunta/${preguntaId}`, datosActualizados);
  }
  
}

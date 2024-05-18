// mostrar-cuestionarios.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // Esto garantiza que el servicio esté disponible en toda la aplicación
})
export class MostrarCuestionariosService {

  constructor(private http: HttpClient) { }

  // Método para obtener los cuestionarios
  getCuestionarios(): Observable<any[]> {
    return this.http.get<any[]>('/api/cuestionarios');
  }

}

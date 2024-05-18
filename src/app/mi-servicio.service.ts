import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MiServicio {

  private apiUrl = 'http://tu-servidor-backend/api/crear-coleccion'; // Reemplaza esta URL con la URL de tu servidor backend

  constructor(private http: HttpClient) { }

  crearColeccion(nombreColeccion: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { nombre: nombreColeccion });
  }
}

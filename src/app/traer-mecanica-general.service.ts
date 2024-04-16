// Servicio traer preguntas en formato json de MongoDB
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TraerMecanicaGeneralService {

  // Definición de la URL de la API de Realm
  private apiUrl = 'https://sa-east-1.aws.data.mongodb-api.com/app/cuestionariogeneral-uknuh/endpoint/general';
  
  // Constructor del servicio que recibe una instancia de HttpClient
  constructor(private http: HttpClient) {}

  // Método para obtener datos desde MongoDB Realm
  obtenerDatos(): Observable<any[]> {
    // Utiliza el método get de HttpClient para hacer una solicitud GET a la URL definida
    // Retorna un Observable que emitirá un array de cualquier tipo (any[]) como resultado
    return this.http.get<any[]>(this.apiUrl);
  }
}



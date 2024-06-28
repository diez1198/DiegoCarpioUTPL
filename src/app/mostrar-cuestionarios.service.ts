import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MostrarCuestionariosService {
  private apiUrl = 'http://localhost:3001/api/databases'; // Asegúrate de que la URL sea correcta

  constructor(private http: HttpClient) {}

  getDatabasesAndCollections(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}

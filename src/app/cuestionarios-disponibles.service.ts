import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CuestionariosDisponiblesService {

  private apiUrl = 'http://localhost:3001/api/cuestionarios';

  constructor(private http: HttpClient) { }

  getCuestionarios(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}

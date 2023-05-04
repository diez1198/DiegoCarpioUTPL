import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class DataService {
  constructor(private http: HttpClient) {}

  getCuestionarioGeneralData(): Observable<any> {
    return this.http.get<any>('./assets/json/CuestionarioMecanicaGeneralVer2.json');
  }
  

  // Agrega más métodos según tus necesidades
}

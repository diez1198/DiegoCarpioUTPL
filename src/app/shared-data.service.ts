//shared-data-service
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  pregunta: any = {};
  private nombreColeccion: string = '';


  constructor() { }

  setPreguntaData(data: any) {
    this.pregunta = data;
  }

  getPreguntaData() {
    return this.pregunta;
  }


  
  setNombreColeccion(nombre: string): void {
    this.nombreColeccion = nombre;
  }

  getNombreColeccion(): string {
    return this.nombreColeccion;
  }
}

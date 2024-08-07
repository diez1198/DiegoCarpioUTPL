// cuestioario-fuselaje component
import { Component, OnInit } from '@angular/core';
import { VerCuestionariosService } from '../ver-cuestionarios.service';

@Component({
  selector: 'app-cuestionario-fuselaje',
  templateUrl: './cuestionario-fuselaje.component.html',
  styleUrls: ['./cuestionario-fuselaje.component.css']
})
export class CuestionarioFuselajeComponent implements OnInit {
 
  documentos: any[] = [];
  mostrarRespuestas: boolean = false; 
  mostrarRespuestaCompleta: boolean = true; 
  mostrarEtiquetaRespuesta: boolean = true; 
  mostrarBotonMarcar: boolean = true;
  constructor(private verCuestionariosService: VerCuestionariosService) {}

  ngOnInit(): void {
    this.mostrarBotonMarcar = false;
    this.obtenerDocumentos('Mecanica Fuselaje');
  }
//obtener doccumentos de la base de datos
  obtenerDocumentos(nombreColeccion: string): void {
    this.verCuestionariosService.getDocumentos(nombreColeccion).subscribe(
      data => {
        this.documentos = data.map((doc: any) => ({
          ...doc,
          mostrarRespuesta: false 
        }));
      },
      error => {
        console.error('Error al obtener los documentos:', error);
      }
    );
  }
//mostrar modo Cuestionario de repaso
  onCuestionarioMecanicaGeneralRespuestaClick(): void {
    this.mostrarRespuestas = !this.mostrarRespuestas; 
    this.mostrarRespuestaCompleta = false; 
    this.mostrarEtiquetaRespuesta = false; 
    this.mostrarBotonMarcar = true;
  }
// comparara opciones de respuesta con la respuesta correcta
  encontrarOpcionCorrecta(respuesta: string, opcionA: string, opcionB: string, opcionC: string): string | null {
    if (!respuesta || typeof respuesta !== 'string') {
      return null;
    }

    const trimmedRespuesta = respuesta.trim();
    const trimOpcionA = opcionA ? opcionA.toString().trim() : '';
    const trimOpcionB = opcionB ? opcionB.toString().trim() : '';
    const trimOpcionC = opcionC ? opcionC.toString().trim() : '';

    if (trimmedRespuesta === trimOpcionA) {
      return 'A';
    } else if (trimmedRespuesta === trimOpcionB) {
      return 'B';
    } else if (trimmedRespuesta === trimOpcionC) {
      return 'C';
    } else {
      return null;
    }
  }
//mostrar modo Completo
  onCompletoMecanicaGeneralClick(): void {
    this.mostrarRespuestas = false; 
    this.mostrarRespuestaCompleta = true; 
    this.mostrarEtiquetaRespuesta = true;
    this.mostrarBotonMarcar = false;
   
  }
//Marcar en amarillo la respueta correcta
  marcarOpcionCorrecta(pregunta: any): void {
    const respuestaCorrecta = this.encontrarOpcionCorrecta(pregunta.respuesta, pregunta.opcion_a, pregunta.opcion_b, pregunta.opcion_c);
    pregunta.respuestaMarcada = respuestaCorrecta;
  }
}

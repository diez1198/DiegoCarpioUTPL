import { Component, OnInit } from '@angular/core';
import { VerCuestionariosService } from '../ver-cuestionarios.service';


@Component({
  selector: 'app-cuestionario-motores',
  templateUrl: './cuestionario-motores.component.html',
  styleUrls: ['./cuestionario-motores.component.css']
})
export class CuestionarioMotoresComponent {
  documentos: any[] = [];
  mostrarRespuestas: boolean = false; // Bandera para controlar si se muestran las respuestas marcadas
  mostrarRespuestaCompleta: boolean = true; // Variable para controlar la visibilidad de respuestas
  mostrarEtiquetaRespuesta: boolean = true; // Variable para controlar la visibilidad de la etiqueta "Respuesta:"
  mostrarBotonMarcar: boolean = true;
  


  constructor(private verCuestionariosService: VerCuestionariosService) {}

  ngOnInit(): void {
    this.mostrarBotonMarcar = false;
    this.obtenerDocumentos('Mecanica Motores');
  }

  obtenerDocumentos(nombreColeccion: string): void {
    this.verCuestionariosService.getDocumentos(nombreColeccion).subscribe(
      data => {
        this.documentos = data.map((doc: any) => ({
          ...doc,
          mostrarRespuesta: false // Agregar propiedad para controlar visibilidad de la respuesta por pregunta
        }));
      },
      error => {
        console.error('Error al obtener los documentos:', error);
      }
    );
  }

  onCuestionarioMecanicaGeneralRespuestaClick(): void {
    this.mostrarRespuestas = !this.mostrarRespuestas; // Invierte el valor de mostrarRespuestas
    this.mostrarRespuestaCompleta = false; // Oculta la respuesta completa
    this.mostrarEtiquetaRespuesta = false; // Oculta la etiqueta "Respuesta:"
    this.mostrarBotonMarcar = true;
    console.log('Mostrando respuestas marcadas...', this.mostrarRespuestas);
  }

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

  onCompletoMecanicaGeneralClick(): void {
    this.mostrarRespuestas = false; 
    this.mostrarRespuestaCompleta = true; 
    this.mostrarEtiquetaRespuesta = true;
    this.mostrarBotonMarcar = false;
    
    console.log('Restableciendo a modo normal...');
  }

  marcarOpcionCorrecta(pregunta: any): void {
    const respuestaCorrecta = this.encontrarOpcionCorrecta(pregunta.respuesta, pregunta.opcion_a, pregunta.opcion_b, pregunta.opcion_c);
    pregunta.respuestaMarcada = respuestaCorrecta;
  }

 

}





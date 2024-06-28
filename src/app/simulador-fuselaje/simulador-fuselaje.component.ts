import { Component, OnInit } from '@angular/core';
import { VerCuestionariosService } from '../ver-cuestionarios.service';


@Component({
  selector: 'app-simulador-fuselaje',
  templateUrl: './simulador-fuselaje.component.html',
  styleUrls: ['./simulador-fuselaje.component.css']
})
export class SimuladorFuselajeComponent implements OnInit {

  

  documentos: any[] = [];
  mostrarRespuestas: boolean = false;
  mostrarRespuestaCompleta: boolean = true;
  mostrarEtiquetaRespuesta: boolean = true;
  mostrarBotonMarcar: boolean = true;
  respuestasCorrectas: number = 0;
  mostrarCalificacion: boolean = false;
  preguntasRespondidas: number = 0;

  constructor(private verCuestionariosService: VerCuestionariosService) {}

  ngOnInit(): void {
    this.mostrarBotonMarcar = false;
    this.obtenerDocumentos('Mecanica Fuselaje');
  }

  obtenerDocumentos(nombreColeccion: string): void {
    this.verCuestionariosService.getDocumentos(nombreColeccion).subscribe(
      data => {
        this.documentos = data.map((doc: any) => ({
          ...doc,
          mostrarRespuesta: false,
          opciones: [
            { texto: doc.opcion_a, seleccionada: false, letra: 'A', respuestaIncorrecta: false },
            { texto: doc.opcion_b, seleccionada: false, letra: 'B', respuestaIncorrecta: false },
            { texto: doc.opcion_c, seleccionada: false, letra: 'C', respuestaIncorrecta: false }
          ]
        }));
      },
      error => {
        console.error('Error al obtener los documentos:', error);
      }
    );
  }

  onCuestionarioMecanicaGeneralRespuestaClick(): void {
    this.mostrarRespuestas = !this.mostrarRespuestas;
    this.mostrarRespuestaCompleta = false;
    this.mostrarEtiquetaRespuesta = false;
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

  onOpcionSeleccionada(pregunta: any, opcion: any): void {
    pregunta.opciones.forEach((op: any) => {
      if (op !== opcion) {
        op.seleccionada = false;
      }
    });

    const respuestaCorrecta = this.encontrarOpcionCorrecta(pregunta.respuesta, pregunta.opciones[0].texto, pregunta.opciones[1].texto, pregunta.opciones[2].texto);
    const esCorrecta = respuestaCorrecta === opcion.letra;
    console.log('Opción seleccionada:', opcion);
    console.log('¿La opción seleccionada es correcta?', esCorrecta);
  }

  calificar(): void {
    this.preguntasRespondidas = 0;
    this.respuestasCorrectas = 0;

    this.documentos.forEach((pregunta: any) => {
      const opcionSeleccionada = pregunta.opciones.find((op: any) => op.seleccionada);
      if (opcionSeleccionada) {
        this.preguntasRespondidas++;
        const respuestaCorrecta = this.encontrarOpcionCorrecta(pregunta.respuesta, pregunta.opciones[0].texto, pregunta.opciones[1].texto, pregunta.opciones[2].texto);
        if (respuestaCorrecta === opcionSeleccionada.letra) {
          this.respuestasCorrectas++;
        }
      }
    });

    // Mostrar el formulario de calificación
    this.mostrarCalificacion = true;
  }

  cerrarCalificacion(): void {
    // Cerrar el formulario de calificación
    this.mostrarCalificacion = false;
    
  }

  Reiniciar(): void {
    // Desmarcar todas las respuestas y restablecer otras variables
    this.documentos.forEach((pregunta: any) => {
      pregunta.opciones.forEach((opcion: any) => {
        opcion.seleccionada = false; // Desmarcar cada opción seleccionada
        opcion.respuestaIncorrecta = false; // Reiniciar marcado de respuesta incorrecta
      });
      pregunta.respuestaMarcada = null; // Desmarcar respuesta marcada
    });
  
    // Restablecer otros estados si es necesario
    this.mostrarCalificacion = false;
    this.mostrarRespuestas = false;
    this.mostrarRespuestaCompleta = true;
    this.mostrarEtiquetaRespuesta = true;
    
    // Volver al inicio de la página (pregunta 1)
    window.scrollTo(0, 0); // Mueve la ventana al inicio de la página
  }

  

  verRespuestasIncorrectas(): void {
    this.documentos.forEach((pregunta: any) => {
      const respuestaCorrecta = this.encontrarOpcionCorrecta(pregunta.respuesta, pregunta.opciones[0].texto, pregunta.opciones[1].texto, pregunta.opciones[2].texto);
      pregunta.opciones.forEach((opcion: any) => {
        opcion.respuestaIncorrecta = opcion.seleccionada && opcion.letra !== respuestaCorrecta;
        this.mostrarCalificacion = false;
      });
    });
  }



}










import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router'; // Importa Router también
import { VerCuestionariosService } from '../ver-cuestionarios.service';
@Component({
  selector: 'app-simuladores-admin',
  templateUrl: './simuladores-admin.component.html',
  styleUrls: ['./simuladores-admin.component.css']
})
export class SimuladoresAdminComponent implements OnInit {

  
  documentos: any[] = [];
  mostrarRespuestas: boolean = false;
  mostrarRespuestaCompleta: boolean = true;
  mostrarEtiquetaRespuesta: boolean = true;
  mostrarBotonMarcar: boolean = true;
  selectedCollection: string = ''; // O inicializa con el valor predeterminado que desees
  
  respuestasCorrectas: number = 0;
  mostrarCalificacion: boolean = false;
  preguntasRespondidas: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router, // Incluye Router en el constructor
    private verCuestionariosService: VerCuestionariosService
  ) {}

  ngOnInit(): void {
    // Leer parámetros de la URL al iniciar el componente
    this.route.queryParams.subscribe((params: Params) => {
      if (params['collection']) {
        this.selectedCollection = params['collection'];
        this.loadDocumentos(this.selectedCollection);
      }
    });
  }
  
  onSeleccionarColeccion(nombreColeccion: string): void {
    this.selectedCollection = nombreColeccion;
    this.loadDocumentos(nombreColeccion);
  }

  loadDocumentos(collectionName: string): void {
    this.verCuestionariosService.getDocumentos(collectionName).subscribe(
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
  onCuestionarioMecanicaGeneralRespuestaClick(): void {
    this.mostrarRespuestas = !this.mostrarRespuestas;
    this.mostrarRespuestaCompleta = false;
    this.mostrarEtiquetaRespuesta = false;
    this.mostrarBotonMarcar = true;
  }

  onCompletoMecanicaGeneralClick(): void {
    this.mostrarRespuestas = false;
    this.mostrarRespuestaCompleta = true;
    this.mostrarEtiquetaRespuesta = true;
    this.mostrarBotonMarcar = false;
  }

  verSimuladores(collection: string) {
    this.router.navigate(['/simuladores-admin'], { queryParams: { collection: collection } });
  }


  marcarOpcionCorrecta(pregunta: any): void {
    // Aquí podrías implementar la lógica para marcar la opción correcta si lo necesitas
    // Por ejemplo:
    // const respuestaCorrecta = this.encontrarOpcionCorrecta(pregunta.respuesta, pregunta.opcion_a, pregunta.opcion_b, pregunta.opcion_c);
    // pregunta.respuestaMarcada = respuestaCorrecta;
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

  verRespuestasIncorrectas(): void {
    this.documentos.forEach((pregunta: any) => {
      const respuestaCorrecta = this.encontrarOpcionCorrecta(pregunta.respuesta, pregunta.opciones[0].texto, pregunta.opciones[1].texto, pregunta.opciones[2].texto);
      pregunta.opciones.forEach((opcion: any) => {
        opcion.respuestaIncorrecta = opcion.seleccionada && opcion.letra !== respuestaCorrecta;
        this.mostrarCalificacion = false;
      });
    });
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
  }

  onOpcionSeleccionada(pregunta: any, opcion: any): void {
    pregunta.opciones.forEach((op: any) => {
      if (op !== opcion) {
        op.seleccionada = false;
      }
    });
  }
}

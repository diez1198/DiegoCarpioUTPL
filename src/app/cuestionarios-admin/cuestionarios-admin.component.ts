import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { VerCuestionariosService } from '../ver-cuestionarios.service';

@Component({
  selector: 'app-cuestionarios-admin',
  templateUrl: './cuestionarios-admin.component.html',
  styleUrls: ['./cuestionarios-admin.component.css']
})
export class CuestionariosAdminComponent implements OnInit {
  documentos: any[] = [];
  mostrarRespuestas: boolean = false;
  mostrarRespuestaCompleta: boolean = true;
  mostrarEtiquetaRespuesta: boolean = true;
  mostrarBotonMarcar: boolean = true;
  selectedCollection: string = ''; // O inicializa con el valor predeterminado que desees

  constructor(
    private route: ActivatedRoute,
    private verCuestionariosService: VerCuestionariosService
  ) {}


  ngOnInit(): void {
    // Leer parámetros de la URL al iniciar el componente
    this.route.queryParams.subscribe((params: Params) => {
      if (params['collection']) { // Accede a 'collection' usando notación de corchetes
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

  marcarOpcionCorrecta(pregunta: any): void {
    // Aquí podrías implementar la lógica para marcar la opción correcta si lo necesitas
    // Por ejemplo:
    // const respuestaCorrecta = this.encontrarOpcionCorrecta(pregunta.respuesta, pregunta.opcion_a, pregunta.opcion_b, pregunta.opcion_c);
    // pregunta.respuestaMarcada = respuestaCorrecta;
  }

  // Método para encontrar la opción correcta (si es necesario)
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
}

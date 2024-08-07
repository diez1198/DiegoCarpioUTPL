// cuestionarios-admin component
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params,Router } from '@angular/router';
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
  selectedCollection: string = '';
  
  constructor(
    private route: ActivatedRoute,
    private verCuestionariosService: VerCuestionariosService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['collection']) { // Acceder a  las colecciones
        this.selectedCollection = params['collection'];
        this.loadDocumentos(this.selectedCollection);
        this.mostrarRespuestaCompleta = true;
        this.mostrarEtiquetaRespuesta = true;
        this.mostrarBotonMarcar = false;
      }
    });
  }
  // seleccionar coleccion y documentos
  onSeleccionarColeccion(nombreColeccion: string): void {
    this.selectedCollection = nombreColeccion;
    this.loadDocumentos(nombreColeccion);
  }
//obtener documentos de la base de datos
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
//mostrar modo Cuestionario de repaso
  onCuestionarioMecanicaGeneralRespuestaClick(): void {
    this.mostrarRespuestas = !this.mostrarRespuestas;
    this.mostrarRespuestaCompleta = false;
    this.mostrarEtiquetaRespuesta = false;
    this.mostrarBotonMarcar = true;
  }
//mostrar modo cuestionario Completo
  onCompletoMecanicaGeneralClick(): void {
    this.router.navigate(['/cuestionarios-admin/completo'], { queryParams: { collection: this.selectedCollection } });
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
  // encontrar la opción correcta 
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

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VerCuestionariosService } from '../ver-cuestionarios.service';
import { SharedDataService } from '../shared-data.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NuevoCuestionarioService } from '../nuevo-cuestionario/nuevo-cuestionario.service';

@Component({
  selector: 'app-ver-cuestionarios',
  templateUrl: './ver-cuestionarios.component.html',
  styleUrls: ['./ver-cuestionarios.component.css']
})
export class VerCuestionariosComponent implements OnInit {
  documentos: any[] = [];
  nombreColeccion: string | null = '';
  nombreCuestionario: string = '';
  preguntaEditada: any = null; // Cambiado a 'any' para que coincida con el tipo de 'pregunta'

  constructor(
    private route: ActivatedRoute,
    private verCuestionariosService: VerCuestionariosService,
    private nuevoCuestionarioService: NuevoCuestionarioService,
    private sharedDataService: SharedDataService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.nombreColeccion = params.get('nombreColeccion');
      if (this.nombreColeccion) {
        this.verCuestionariosService.getDocumentos(this.nombreColeccion).subscribe(
          data => {
            this.documentos = data;
          },
          error => {
            console.error('Error al obtener los documentos:', error);
          }
        );
      }
    });
  }

  editarPregunta(pregunta: any) {
    this.preguntaEditada = { ...pregunta }; // Crear una copia de la pregunta para editar
    console.log('Nombre de la colección:', this.nombreColeccion);
    console.log('ID de la preguntas:', pregunta.id);
  }

  guardarEdicion() {
    if (this.nombreColeccion && this.preguntaEditada && this.preguntaEditada.id) {
      this.verCuestionariosService.editarPregunta(this.nombreColeccion, this.preguntaEditada.id, this.preguntaEditada)
        .subscribe(
          response => {
            console.log('Pregunta editada exitosamente:', response);
          },
          error => {
            console.error('Error al editar la pregunta:', error);
          }
        );
    }
  }

}
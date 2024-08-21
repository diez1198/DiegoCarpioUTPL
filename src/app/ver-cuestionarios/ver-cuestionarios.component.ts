import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VerCuestionariosService } from '../ver-cuestionarios.service';
import { SharedDataService } from '../shared-data.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NuevoCuestionarioService } from '../nuevo-cuestionario/nuevo-cuestionario.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-ver-cuestionarios',
  templateUrl: './ver-cuestionarios.component.html',
  styleUrls: ['./ver-cuestionarios.component.css']
})
export class VerCuestionariosComponent implements OnInit {
  selectedCollection: string = '';
  mostrarConfiguraciones: boolean = false;
  activeMenuItem: string = '';
  documentos: any[] = [];
  nombreColeccion: string | null = '';
  preguntaEditada: any = null; 
  modoEdicion: boolean = false;
  mostrarNuevoFormulario: boolean = false;
  nuevaPregunta: any = {}; 
  selectedFile: File | null = null;
  pregunta: any; 
  nuevoId: number = 0;  
  isModalOpen: boolean = false;
  horas: number = 0;
  minutos: number = 0;
  numPreguntas: number = 0; 
  showConfirmationPopup: boolean = false; 
  tiempoInicialEnSegundos: number = 0; 
  tiempoRestanteEnSegundos: number = this.tiempoInicialEnSegundos;

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
        this.obtenerDocumentos();
        this.obtenerUltimoID();
      }
    });
  }

  obtenerUltimoID(): void {
    if (this.nombreColeccion) {
      this.verCuestionariosService.obtenerUltimoID(this.nombreColeccion).subscribe(
        id => {
          console.log('El ID más alto es:', id);
          this.nuevoId = id ? id + 1 : 1; 
        },
        error => {
          console.error('Error al obtener el último ID:', error);
        }
      );
    }
  }

  isMecanicaCollection(): boolean {
    const nombreColeccion = this.nombreColeccion || '';
    return ['Mecanica General', 'Mecanica Fuselaje', 'Mecanica Motores'].includes(nombreColeccion);
  }
  
  onImageSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }
  
  editarPregunta(pregunta: any) {
    this.preguntaEditada = { ...pregunta }; 
  }

  quitarImagen(pregunta: any) {
    if (pregunta.imagen) {
      pregunta.imagen = ''; 
      pregunta.mostrarImagen = false; 
      this.guardarPreguntaEditada(pregunta); 
    }
  }

  guardarEdicion() {
    if (this.nombreColeccion && this.preguntaEditada && this.preguntaEditada.id) {
      if (!this.preguntaEditada.pregunta ||
          !this.preguntaEditada.opcion_a ||
          !this.preguntaEditada.opcion_b ||
          !this.preguntaEditada.opcion_c ||
          !this.preguntaEditada.respuesta ||
          ![this.preguntaEditada.opcion_a, this.preguntaEditada.opcion_b, this.preguntaEditada.opcion_c].includes(this.preguntaEditada.respuesta)) {
        alert('Por favor completa todos los campos antes de guardar y asegúrate de seleccionar una respuesta válida.');
        return;
      }
      const preguntaEditadaCopia = { ...this.preguntaEditada };
      if (this.selectedFile) {
        this.uploadImageToCloudinary(this.selectedFile).subscribe(
          response => {
            preguntaEditadaCopia.imagen = response.secure_url;
            this.guardarPreguntaEditada(preguntaEditadaCopia);
          },
          error => {
            console.error('Error al subir la nueva imagen:', error);
            alert('Error al subir la nueva imagen. Por favor, intenta de nuevo.');
          }
        );
      } else {
        this.guardarPreguntaEditada(preguntaEditadaCopia);
      }
    }
  }

  guardarPreguntaEditada(preguntaEditada: any) {
    if (this.nombreColeccion) {
      this.verCuestionariosService.editarPregunta(this.nombreColeccion, preguntaEditada.id, preguntaEditada)
        .subscribe(
          response => {
            console.log('Pregunta editada exitosamente:', response);
            this.obtenerDocumentos(); 
            this.preguntaEditada = null; 
          },
          error => {
            console.error('Error al editar la pregunta:', error);
          }
        );
    } else {
      console.error('Nombre de la colección no puede ser nulo.');
    }
  }
  
  obtenerDocumentos() {
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
  }

  updatePregunta(event: Event, pregunta: any, field: string): void {
    const target = event.target as HTMLSpanElement;
    if (pregunta) {
      pregunta[field] = target.innerText;
    }
  }

  cancelarEdicion() {
    this.preguntaEditada = null;
  }

  

  uploadImageToCloudinary(file: File): Observable<any> {
    const url = `https://api.cloudinary.com/v1_1/djtizllrs/image/upload`;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'unsigned_preset');

    return this.http.post(url, formData);
  }
  agregarNuevaPregunta() {
    if (
      !this.nuevaPregunta.pregunta ||
      !this.nuevaPregunta.opcion_a ||
      !this.nuevaPregunta.opcion_b ||
      !this.nuevaPregunta.opcion_c ||
      !this.nuevaPregunta.respuesta
    ) {
      alert('Por favor completa todos los campos antes de guardar.');
      return;
    }
  
    // Asigna el nuevo ID a la nueva pregunta
    this.nuevaPregunta.id = this.nuevoId;
  
    if (this.selectedFile) {
      this.uploadImageToCloudinary(this.selectedFile).subscribe(
        response => {
          this.nuevaPregunta.imagen = response.secure_url;
          this.savePregunta();
        },
        error => {
          console.error('Error al subir la imagen:', error);
          alert('Error al subir la imagen. Por favor, intenta de nuevo.');
        }
      );
    } else {
      this.savePregunta();
    }
  }
  
  savePregunta() {
    if (this.nombreColeccion) {
      this.nuevoCuestionarioService.agregarPregunta(this.nombreColeccion, this.nuevaPregunta)
        .subscribe(
          response => {
            console.log('Pregunta agregada exitosamente:', response);
            this.obtenerDocumentos(); 
            this.obtenerUltimoID(); 
            this.nuevaPregunta = {
              id: null,
              pregunta: '',
              opcion_a: '',
              opcion_b: '',
              opcion_c: '',
              respuesta: '',
              imagen: ''
            };
            this.selectedFile = null; 
          },
          error => {
            console.error('Error al agregar la pregunta:', error);
          }
        );
    }
  }
  
  doNothing() {}
  mostrarFormulario(): void {
    this.mostrarNuevoFormulario = true;
  }

  eliminarDocumento(nombreColeccion: string | null, id: number | null | undefined): void {
    if (nombreColeccion && id !== null && id !== undefined) {
      const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar la pregunta número ' + id + '?');
      if (confirmacion) {
        this.verCuestionariosService.eliminarDocumento(nombreColeccion, id).subscribe(() => {
          this.documentos = this.documentos.filter(doc => doc.id !== id);
          // Actualiza el ID para la próxima pregunta
          this.obtenerUltimoID(); 
          this.obtenerDocumentos();  
        }, error => {
          console.error('Error al eliminar el documento:', error);
        });
      }
    } else {
      console.error('Nombre de colección o ID no pueden ser nulos o indefinidos.');
    }
  }
  
  cancelarPregunta() {}

convertirIdANumero() {
  if (this.nuevaPregunta.id !== null && this.nuevaPregunta.id !== undefined) {
    this.nuevaPregunta.id = parseInt(this.nuevaPregunta.id);
  }
}

redireccionarASuperAdministrador(): void {
  this.router.navigate(['/super-administrador/inicio']);
}

cerrarFormulario(): void {
  this.mostrarNuevoFormulario = false;
}

seteo(): void {
  this.isModalOpen = true; 
}

loadFromLocalStorage(): void {
  const collectionName = localStorage.getItem('collectionName');
  console.log('Nombre de la colección recuperado de localStorage:', collectionName);
  if (collectionName) {
    const numQuestions = localStorage.getItem(`${collectionName}_numPreguntas`);
    const horas = localStorage.getItem(`${collectionName}_horas`);
    const minutos = localStorage.getItem(`${collectionName}_minutos`);
    if (numQuestions !== null && horas !== null && minutos !== null) {
      this.selectedCollection = collectionName;
      this.numPreguntas = parseInt(numQuestions, 10);
      this.tiempoInicialEnSegundos = parseInt(horas, 10) * 3600 + parseInt(minutos, 10) * 60;

    } else {
      console.log('No se encontro');
    }
  } else {
    console.log('No se encontro');
  }
}

closeModal(): void {
  this.isModalOpen = false;
  
}
  // ocultar ventana emergente de confirmación
  hideConfirmationPopup(): void {
    this.showConfirmationPopup = false;
  }
//  cancelar finalización del cuestionario
cancelFinish(): void {
  this.hideConfirmationPopup(); 
 
}

applySettings(): void {
  // parametors localStorage
  localStorage.setItem(`${this.nombreColeccion}_numPreguntas`, this.numPreguntas.toString());
  localStorage.setItem(`${this.nombreColeccion}_horas`, this.horas.toString());
  localStorage.setItem(`${this.nombreColeccion}_minutos`, this.minutos.toString());

  // Cerrar el modal
  this.closeModal();
}
//  guardar datos localmente
saveToLocalStorage(collectionName: string, numQuestions: number, timer: number): void {
console.log('Guardando en localStorage:', { collectionName, numQuestions, timer });
localStorage.setItem('collectionName', collectionName);
localStorage.setItem('numQuestions', numQuestions.toString());
localStorage.setItem('timer', timer.toString());

// Verificar que los datos se guardaron 
console.log('Datos guardados en localStorage:', {
  collectionName: localStorage.getItem('collectionName'),
  numQuestions: localStorage.getItem('numQuestions'),
  timer: localStorage.getItem('timer')
});
}
}
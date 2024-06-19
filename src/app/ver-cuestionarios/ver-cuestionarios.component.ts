//ver-cuestionarios component//
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VerCuestionariosService } from '../ver-cuestionarios.service';
import { SharedDataService } from '../shared-data.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NuevoCuestionarioService } from '../nuevo-cuestionario/nuevo-cuestionario.service';
import { NuevaPreguntaComponent } from '../nueva-pregunta/nueva-pregunta.component'
import { Observable } from 'rxjs';
import { Cloudinary } from 'cloudinary-core'; // Importa el SDK de Cloudinary



@Component({
  selector: 'app-ver-cuestionarios',
  templateUrl: './ver-cuestionarios.component.html',
  styleUrls: ['./ver-cuestionarios.component.css']
})
export class VerCuestionariosComponent implements OnInit {
  activeMenuItem: string = '';
  documentos: any[] = [];
  nombreColeccion: string | null = '';
  nombreCuestionario: string = '';
  preguntaEditada: any = null; // Cambiado a 'any' para que coincida con el tipo de 'pregunta'
  modoEdicion: boolean = false;
  mostrarNuevoFormulario: boolean = false;
  nuevaPregunta: any = {}; // Declara la propiedad nuevaPregunta aquí
  selectedFile: File | null = null;
  pregunta: any; // Definición de la propiedad pregunta




  constructor(
    private route: ActivatedRoute,
    private verCuestionariosService: VerCuestionariosService,
    private nuevoCuestionarioService: NuevoCuestionarioService,
    private sharedDataService: SharedDataService,
    private router: Router,
    private http: HttpClient,
    
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

  onImageSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }
  

  editarPregunta(pregunta: any) {
    this.preguntaEditada = { ...pregunta }; // Crear una copia de la pregunta para editar
    console.log('Nombre de la colección:', this.nombreColeccion);
    console.log('ID de la preguntas:', pregunta.id);
     
  }





  guardarEdicion(pregunta: any) {
    if (this.nombreColeccion && pregunta && pregunta.id) {
      if (
        !this.preguntaEditada.pregunta ||
        !this.preguntaEditada.opcion_a ||
        !this.preguntaEditada.opcion_b ||
        !this.preguntaEditada.opcion_c ||
        !this.preguntaEditada.respuesta
      ) {
        alert('Por favor completa todos los campos antes de guardar.');
        return; // Detener el proceso de guardado
      }
  
      // Creamos una copia de la pregunta editada
      const preguntaEditadaCopia = { ...this.preguntaEditada };
  
      // Verificamos si hay una imagen seleccionada para editar
      if (this.selectedFile) {
        this.uploadImageToCloudinary(this.selectedFile).subscribe(
          response => {
            // Actualizamos la URL de la imagen en la pregunta editada
            preguntaEditadaCopia.imagen = response.secure_url;
            // Guardamos la pregunta editada con la nueva imagen
            this.guardarPreguntaEditada(preguntaEditadaCopia, pregunta);
          },
          error => {
            console.error('Error al subir la nueva imagen:', error);
            alert('Error al subir la nueva imagen. Por favor, intenta de nuevo.');
          }
        );
      } else {
        // Si no hay imagen seleccionada, simplemente guardamos la pregunta editada
        this.guardarPreguntaEditada(preguntaEditadaCopia, pregunta);
      }
    }
  }
  
  guardarPreguntaEditada(preguntaEditada: any, preguntaOriginal: any) {
    if (this.nombreColeccion) {
      this.verCuestionariosService.editarPregunta(this.nombreColeccion, preguntaOriginal.id, preguntaEditada)
        .subscribe(
          response => {
            console.log('Pregunta editada exitosamente:', response);
            this.obtenerDocumentos(); // Volver a obtener los documentos del servicio
            this.preguntaEditada = null; // Finaliza la edición
          },
          error => {
            console.error('Error al editar la pregunta:', error);
          }
        );
    } else {
      console.error('Nombre de la colección no puede ser nulo.');
    }
  }
  
  quitarImagen(pregunta: any) {
    if (pregunta.imagen) {
      pregunta.imagen = ''; // Elimina la URL de la imagen
      pregunta.mostrarImagen = false; // Asegúrate de que la imagen no se muestre
      // Verifica que nombreColeccion no sea null
      if (this.nombreColeccion !== null) {
        // Llama a tu servicio para guardar la pregunta actualizada en tu base de datos
        this.verCuestionariosService.editarPregunta(this.nombreColeccion, pregunta.id, pregunta)
          .subscribe(
            response => {
              console.log('Imagen de la pregunta eliminada:', response);
              // Recargar la página
              location.reload();
              // Ejecutar la función guardarEdicion(preguntaEditada)
             
            },
            error => {
              console.error('Error al eliminar la imagen de la pregunta:', error);
            }
          );
      } else {
        console.error('El nombre de la colección es null');
      }
    }
  }
  








  

  // Nueva función para obtener documentos
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

// Método para mostrar el formulario de nueva pregunta
mostrarFormulario(): void {
  this.mostrarNuevoFormulario = true;
}


obtenerUltimoID(nombreColeccion: string): Observable<number> {
  const apiUrl = this.verCuestionariosService.getApiUrl();
  const endpoint = `${apiUrl}/${nombreColeccion}/ultimo-id`; // Supongamos que el endpoint para obtener el último ID es '/ultimo-id'
  return this.http.get<number>(endpoint);
}



  // Nueva función para subir imagen a Cloudinary
  uploadImageToCloudinary(file: File): Observable<any> {
    const url = `https://api.cloudinary.com/v1_1/djtizllrs/image/upload`;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'unsigned_preset');

    return this.http.post(url, formData);
  }

  mostrarImagen: boolean = false;

  toggleImagen(pregunta: any): void {
    pregunta.mostrarImagen = !pregunta.mostrarImagen;
  }


  doNothing() {}
  


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
            this.mostrarNuevoFormulario = false;
            this.nuevaPregunta = {
              id: null,
              pregunta: '',
              opcion_a: '',
              opcion_b: '',
              opcion_c: '',
              respuesta: '',
              imagen: ''
            };
            this.selectedFile = null; // Limpia el archivo seleccionado
          },
          error => {
            console.error('Error al agregar la pregunta:', error);
          }
        );
    }
  }








eliminarDocumento(nombreColeccion: string | null, id: number | null | undefined): void {
  if (nombreColeccion && id !== null && id !== undefined) {
    const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar la pregunta número ' + id + '?');
    if (confirmacion) {
      this.verCuestionariosService.eliminarDocumento(nombreColeccion, id).subscribe(() => {
        this.documentos = this.documentos.filter(doc => doc.id !== id);
      }, error => {
        console.error('Error al eliminar el documento:', error);
      });
    }
  } else {
    console.error('Nombre de colección o ID no pueden ser nulos o indefinidos.');
  }
}






cancelarPregunta(){}





convertirIdANumero() {
  // Verifica que nuevaPregunta.id no sea null o undefined
  if (this.nuevaPregunta.id !== null && this.nuevaPregunta.id !== undefined) {
    // Convierte id a un número entero usando parseInt()
    this.nuevaPregunta.id = parseInt(this.nuevaPregunta.id);
  }
}


redireccionarASuperAdministrador(): void {
 
 
  this.router.navigate(['/super-administrador/inicio']);
  
}





}
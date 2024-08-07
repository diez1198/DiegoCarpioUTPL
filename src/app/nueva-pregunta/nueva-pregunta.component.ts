// nueva-pregunta component
import { Component, Input } from '@angular/core';
import { NuevoCuestionarioService } from '../nuevo-cuestionario/nuevo-cuestionario.service';
import { SharedDataService } from '../shared-data.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nueva-pregunta',
  templateUrl: './nueva-pregunta.component.html',
  styleUrls: ['./nueva-pregunta.component.css']
})
export class NuevaPreguntaComponent {
  @Input() nombreColeccion: string = ''; // nombre coleecion
  pregunta: string = '';
  opcion_a: string = '';
  opcion_b: string = '';
  opcion_c: string = '';
  respuesta: string = '';
  nombreCuestionario: string = '';
  contador: number = 1; // Contador para las preguntas
  emptyFieldsMessage : string = '';
  showEmptyFields: boolean = false;
  isModalOpen: boolean = false; 
  horas: number = 0;
  minutos: number = 0;
  numPreguntas: number = 0; 
  showConfirmationPopup: boolean = false;
  item: number | null = null; 
  selectedFile: File | null = null; 
  constructor(
    private nuevoCuestionarioService: NuevoCuestionarioService,
    private sharedDataService: SharedDataService,
    private router: Router,
    private http: HttpClient 
  ) {}

  ngOnInit(): void {
    this.nombreColeccion = this.sharedDataService.getNombreColeccion();
  }

  onImageSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  submitForm(): void {
    // Verificar datos
    console.log('Datos del formulario', {
      pregunta: this.pregunta,
      opcion_a: this.opcion_a,
      opcion_b: this.opcion_b,
      opcion_c: this.opcion_c,
      respuesta: this.respuesta
    });
  
    // Verificar campos  llenos
    if (!this.pregunta || !this.opcion_a || !this.opcion_b || !this.opcion_c || !this.respuesta) {
      console.error('Todos los campos del formulario deben estar llenos.');
      this.showEmptyFieldsMessage('Todos los campos del formulario deben estar llenos');
      return; // Detener si campo está vacío
    }
    this.nuevoCuestionarioService.getDocumentos(this.nombreColeccion).subscribe(
      (numeroDocumentos) => {
        const item = numeroDocumentos + 1;
        // Construir datosDocumento
        const datosDocumento = {
          id: this.contador, // contador
          item: item, // Número  pregunta
          pregunta: this.pregunta,
          opcion_a: this.opcion_a,
          opcion_b: this.opcion_b,
          opcion_c: this.opcion_c,
          respuesta: this.respuesta,
          imagen: '' //  vacío
        };

        if (this.selectedFile) {
          this.uploadImageToCloudinary(this.selectedFile).subscribe(
            response => {
              datosDocumento.imagen = response.secure_url;
              this.savePregunta(datosDocumento);
            },
            error => {
              console.error('Error al subir imagen:', error);
              alert('Error al subir la imagen. Por favor, intenta de nuevo.');
            }
          );
        } else {
          this.savePregunta(datosDocumento);
        }
      }
    );
  }

  savePregunta(datosDocumento: any): void {
    this.nuevoCuestionarioService.insertarNuevaPregunta(this.nombreColeccion, datosDocumento).subscribe(
      response => {
        console.log('Nuevo Documento Creado exitosamente:', response);
        this.contador++; // Incrementar contador
        console.log('Contador actualizado:', this.contador); // actualizado contador
        // Limpiar formulario
        this.pregunta = '';
        this.opcion_a = '';
        this.opcion_b = '';
        this.opcion_c = '';
        this.respuesta = '';
        this.selectedFile = null; 
      },
      error => {
        console.error('Error al crear la pregunta:', error);
      }
    );
  }
// subir imagen a clodinary para hacer link url
  uploadImageToCloudinary(file: File): Observable<any> {
    const url = `https://api.cloudinary.com/v1_1/djtizllrs/image/upload`;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'unsigned_preset');
    return this.http.post(url, formData);
  }

  regresaraCrearCuestionario(): void {
    this.router.navigate(['/super-administrador/inicio']);
  }

  // mostrar el mensaje de campos vacíos
  showEmptyFieldsMessage(message: string): void {
    this.emptyFieldsMessage = message;
    this.showEmptyFields = true;
  }

  // ocultar el mensaje de campos vacíos
  hideEmptyFieldsMessage(): void {
    this.showEmptyFields = false;
  }

  // mostrar la ventana emergente de confirmación
  showConfirmationExit(): void {
    // Verificar  todos campos vacíos
    const allFieldsEmpty = !this.pregunta && !this.opcion_a && !this.opcion_b && !this.opcion_c && !this.respuesta;
    // Verificar  campos llenos
    const allFieldsFilled = this.pregunta && this.opcion_a && this.opcion_b && this.opcion_c && this.respuesta;
    if (allFieldsEmpty || allFieldsFilled) {
      this.showConfirmationPopup = true;
    } else {
      console.error('Todos los campos del formulario deben estar llenos o todos vacíos.');
      this.showEmptyFieldsMessage('Para guardar el cuestionario, llene todos los campos de la pregunta o deje vacíos todos los campos. Recuerde que las preguntas solo se guardan si todos los campos están completos.');
    }
  }
  
  // ocultar la ventana emergente de confirmación
  hideConfirmationPopup(): void {
    this.showConfirmationPopup = false;
  }

  finishQuestionnaire(): void {
    // Verificar campos vacíos
    const allFieldsEmpty = !this.pregunta && !this.opcion_a && !this.opcion_b && !this.opcion_c && !this.respuesta;
  
    // Verificar  campos llenos
    const allFieldsFilled = this.pregunta && this.opcion_a && this.opcion_b && this.opcion_c && this.respuesta;
    if (allFieldsEmpty) {
      this.router.navigate(['/super-administrador/inicio']);
      return;
    }
    if (allFieldsEmpty || allFieldsFilled) {
      console.log('Datos del formulario de la nueva pregunta component:', {
        pregunta: this.pregunta,
        opcion_a: this.opcion_a,
        opcion_b: this.opcion_b,
        opcion_c: this.opcion_c,
        respuesta: this.respuesta
      });
      this.nuevoCuestionarioService.getDocumentos(this.nombreColeccion).subscribe(
        (numeroDocumentos) => {
          const item = numeroDocumentos + 1;
          const datosDocumento = {
            id: this.contador,
            item: item,
            pregunta: this.pregunta,
            opcion_a: this.opcion_a,
            opcion_b: this.opcion_b,
            opcion_c: this.opcion_c,
            respuesta: this.respuesta,
            imagen: '' //  vacío
          };
          if (this.selectedFile) {
            this.uploadImageToCloudinary(this.selectedFile).subscribe(
              response => {
                datosDocumento.imagen = response.secure_url;
                this.savePregunta(datosDocumento);
              },
              error => {
                console.error('Error al subir la imagen:', error);
                alert('Error al subir la imagen. Por favor, intenta de nuevo.');
              }
            );
          } else {
            this.savePregunta(datosDocumento);
            this.router.navigate(['/super-administrador/inicio']);
            this.showConfirmationPopup = false;
          }
        }
      );
    } else {
      console.error('Todos los campos del formulario deben estar llenos o todos vacíos.');
      this.showEmptyFieldsMessage('Todos los campos del formulario deben estar llenos o todos vacíos.');
    }
  }
  
  seteo(): void {
    this.isModalOpen = true; // Abre el modal
  }

  closeModal(): void {
    this.isModalOpen = false; // Cierra el modal
  }

  // cancelar la finalización del cuestionario
  cancelFinish(): void {
    this.hideConfirmationPopup(); // Oculta la ventana emergente
  }

  applySettings(): void {
    // Guardar configuraciones 
    localStorage.setItem(`${this.nombreColeccion}_numPreguntas`, this.numPreguntas.toString());
    localStorage.setItem(`${this.nombreColeccion}_horas`, this.horas.toString());
    localStorage.setItem(`${this.nombreColeccion}_minutos`, this.minutos.toString());
  
    // Cerrar modal
    this.closeModal();
  }
// Función para guardar los datos localmente 
saveToLocalStorage(collectionName: string, numQuestions: number, timer: number): void {
  console.log('Guardando en localStorage:', { collectionName, numQuestions, timer });
  localStorage.setItem('collectionName', collectionName);
  localStorage.setItem('numQuestions', numQuestions.toString());
  localStorage.setItem('timer', timer.toString());

  // Verificar  datos guardados
  console.log('Datos guardados en localStorage:', {
    collectionName: localStorage.getItem('collectionName'),
    numQuestions: localStorage.getItem('numQuestions'),
    timer: localStorage.getItem('timer')
  });
}
}
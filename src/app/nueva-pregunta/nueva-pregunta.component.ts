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
  @Input() nombreColeccion: string = ''; // INPUT NOMBRE COLECCION 
  
  pregunta: string = '';
  opcion_a: string = '';
  opcion_b: string = '';
  opcion_c: string = '';
  respuesta: string = '';
  nombreCuestionario: string = '';
  contador: number = 1; // Contador para las preguntas creadas
  emptyFieldsMessage : string = '';
  showEmptyFields: boolean = false;
  showConfirmationPopup: boolean = false; // Para controlar la visibilidad de la ventana emergente
  item: number | null = null; // Número de la pregunta
  selectedFile: File | null = null; // Para el archivo de imagen seleccionado

  constructor(
    private nuevoCuestionarioService: NuevoCuestionarioService,
    private sharedDataService: SharedDataService,
    private router: Router,
    private http: HttpClient // Agrega el HttpClient aquí
    
  ) {}

  ngOnInit(): void {
    this.nombreColeccion = this.sharedDataService.getNombreColeccion();
  }

  onImageSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  submitForm(): void {
    // Verificar si los datos están siendo capturados correctamente
    console.log('Datos del formulario de la nueva pregunta component:', {
      pregunta: this.pregunta,
      opcion_a: this.opcion_a,
      opcion_b: this.opcion_b,
      opcion_c: this.opcion_c,
      respuesta: this.respuesta
    });
  
    // Verificar si todos los campos del formulario están llenos
    if (!this.pregunta || !this.opcion_a || !this.opcion_b || !this.opcion_c || !this.respuesta) {
      console.error('Todos los campos del formulario deben estar llenos.');
      this.showEmptyFieldsMessage('Todos los campos del formulario deben estar llenos');
      return; // Detener el proceso si algún campo está vacío
    }
  
    this.nuevoCuestionarioService.getDocumentos(this.nombreColeccion).subscribe(
      (numeroDocumentos) => {
        const item = numeroDocumentos + 1;
        // Construir el objeto datosDocumento
        const datosDocumento = {
          id: this.contador, // contador
          item: item, // Número de la pregunta
          pregunta: this.pregunta,
          opcion_a: this.opcion_a,
          opcion_b: this.opcion_b,
          opcion_c: this.opcion_c,
          respuesta: this.respuesta,
          imagen: '' // Inicialmente vacío, se actualizará después de la carga
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
        }
      }
    );
  }

  savePregunta(datosDocumento: any): void {
    this.nuevoCuestionarioService.insertarNuevaPregunta(this.nombreColeccion, datosDocumento).subscribe(
      response => {
        console.log('Nuevo Documento Creado exitosamente:', response);
        this.contador++; // Incrementa el contador cuando se crea una nueva pregunta exitosamente
        console.log('Contador actualizado:', this.contador); // Imprime el valor actualizado del contador

        // Limpiar los campos del formulario
        this.pregunta = '';
        this.opcion_a = '';
        this.opcion_b = '';
        this.opcion_c = '';
        this.respuesta = '';
        this.selectedFile = null; // Limpia el archivo seleccionado
      },
      error => {
        console.error('Error al crear la pregunta:', error);
        // Maneja el error de acuerdo a tus necesidades
      }
    );
  }

  uploadImageToCloudinary(file: File): Observable<any> {
    const url = `https://api.cloudinary.com/v1_1/djtizllrs/image/upload`;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'unsigned_preset');

    return this.http.post(url, formData);
  }

  nextQuestion(): void {
    // Implementa la lógica para avanzar a la siguiente pregunta aquí
  }

  prevQuestion(): void {
    // Implementa la lógica para retroceder a la pregunta anterior aquí
  }

  regresaraCrearCuestionario(): void {
    this.router.navigate(['/super-administrador/inicio']);
  }

  // Método para mostrar el mensaje de campos vacíos
  showEmptyFieldsMessage(message: string): void {
    this.emptyFieldsMessage = message;
    this.showEmptyFields = true;
  }

  // Método para ocultar el mensaje de campos vacíos
  hideEmptyFieldsMessage(): void {
    this.showEmptyFields = false;
  }

  // Método para mostrar la ventana emergente de confirmación
  showConfirmationExit(): void {
    // Verificar si todos los campos están vacíos
    const allFieldsEmpty = !this.pregunta && !this.opcion_a && !this.opcion_b && !this.opcion_c && !this.respuesta;
  
    // Verificar si todos los campos están llenos
    const allFieldsFilled = this.pregunta && this.opcion_a && this.opcion_b && this.opcion_c && this.respuesta;
  
    // Si todos los campos están vacíos o todos están llenos, permitir mostrar la ventana de confirmación
    if (allFieldsEmpty || allFieldsFilled) {
      this.showConfirmationPopup = true;
    } else {
      // Mostrar mensaje de advertencia si algunos campos están llenos y otros vacíos
      console.error('Todos los campos del formulario deben estar llenos o todos vacíos.');
      this.showEmptyFieldsMessage('Para guardar el cuestionario, llene todos los campos de la pregunta o deje vacíos todos los campos. Recuerde que las preguntas solo se guardan si todos los campos están completos.');
    }
  }
  

  // Método para ocultar la ventana emergente de confirmación
  hideConfirmationPopup(): void {
    this.showConfirmationPopup = false;
  }

  // Método para finalizar el cuestionario después de confirmación
 

  finishQuestionnaire(): void {
    // Verificar si todos los campos están vacíos
    const allFieldsEmpty = !this.pregunta && !this.opcion_a && !this.opcion_b && !this.opcion_c && !this.respuesta;
  
    // Verificar si todos los campos están llenos
    const allFieldsFilled = this.pregunta && this.opcion_a && this.opcion_b && this.opcion_c && this.respuesta;
  
    // Verificar si es la última pregunta (esto depende de cómo determines si es la última pregunta)
    // Aquí asumo que hay un método para determinar esto, reemplázalo con la lógica adecuada
   
  
    // Si todos los campos están vacíos y es la última pregunta, solo navegar
    if (allFieldsEmpty) {
      this.router.navigate(['/super-administrador/inicio']);
      return;
    }
  
    // Si todos los campos están vacíos o todos están llenos, proceder a guardar
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
            imagen: '' // Inicialmente vacío, se actualizará después de la carga
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
            console.log('Nuevo Documento Creado exitosamente:');
            this.showConfirmationPopup = false;
          }
        }
      );
    } else {
      // Mostrar mensaje de advertencia si algunos campos están llenos y otros vacíos
      console.error('Todos los campos del formulario deben estar llenos o todos vacíos.');
      this.showEmptyFieldsMessage('Todos los campos del formulario deben estar llenos o todos vacíos.');
    }
  }
  





  

  // Método para cancelar la finalización del cuestionario
  cancelFinish(): void {
    this.hideConfirmationPopup(); // Oculta la ventana emergente
    // Otras acciones necesarias al cancelar la finalización del cuestionario
  }
}
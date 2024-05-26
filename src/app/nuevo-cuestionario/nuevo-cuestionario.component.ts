//nuevo-cuestionario-component
import { Component, Input } from '@angular/core';
import { NuevoCuestionarioService } from './nuevo-cuestionario.service';
import { SharedDataService } from '../shared-data.service';

@Component({
  selector: 'app-nuevo-cuestionario',
  templateUrl: './nuevo-cuestionario.component.html',
  styleUrls: ['./nuevo-cuestionario.component.css'],
  providers: [NuevoCuestionarioService], // Se proporciona el servicio aquí
})
export class NuevoCuestionarioComponent {

  nombreCuestionario: string = '';
  datosDocumento: any = {};
  nombre: string = ''; // Variable para almacenar el nombre de la colección
  nombreColeccion: string = ''; // Variable para almacenar el nombre de la colección
  errorMessage: string = '';
  showModal: boolean = false;
  showSuccessMessage: boolean = false;
  showNewQuestionForm: boolean = false;
  showNewCuestionarioForm: boolean = true;
  successMessage: string = '';
  pregunta: any = {};

  constructor(
    private nuevoCuestionarioService: NuevoCuestionarioService,
    private sharedDataService: SharedDataService
  ) {}

  // Método para enviar el formulario
  submitForm(): void {
    if (!this.nombre.trim()) {
      this.errorMessage = 'Debes ingresar un nombre para el nuevo cuestionario';
      this.showModal = true;
      return;
    }

    // Construir datosDocumento utilizando los valores del formulario
    const datosDocumento = {
      // esto no qutia el null y no afecta en nada
      //titulo: this.pregunta.pregunta, // Utilizar la pregunta como título del documento
      pregunta: this.pregunta.pregunta,
      opcion_a: this.pregunta.opcion_a,
      opcion_b: this.pregunta.opcion_b,
      opcion_c: this.pregunta.opcion_c,
      respuesta: this.pregunta.respuesta,
     // preguntas: [/* aquí puedes agregar las preguntas adicionales */]


   

    };

    // Llamar a la función del servicio para crear la colección y el documento
    this.nuevoCuestionarioService.crearNuevaColeccion(this.nombre, datosDocumento)
      .subscribe(
        () => {
          console.log('El nuevo cuestionario se ha creado exitosamente');
          this.sharedDataService.setNombreColeccion(this.nombre); // Set nombreColeccion
          this.showSuccess('Su nuevo cuestionario se ha creado satisfactoriamente. A continuación, ingrese sus preguntas');
        },
        (error) => {
          console.error('Error al crear el cuestionario:', error);
          // Manejar el error aquí, por ejemplo, mostrar un mensaje de error
        }
      );

    // Limpiar los datos de la pregunta después de enviar el formulario
    this.pregunta = {};
  }

  // Método para ir a la siguiente página (opcional)
  siguiente(): void {
    // Implementar la lógica para ir a la siguiente página
  }

  closeModal(): void {
    this.showModal = false;
  }

  // Método para mostrar el mensaje de éxito
  showSuccess(message: string): void {
    this.successMessage = message;
    this.showSuccessMessage = true;
  }

  // Método para cerrar el mensaje de éxito
  closeSuccessMessage(): void {
    this.showSuccessMessage = false;
  }

  // Agregar el método closeSuccessModal para cerrar el modal de éxito
  closeSuccessModal(): void {
    this.showSuccessMessage = false;
  }

  showNewQuestionForms(): void {
    this.showSuccessMessage = false;
    this.showNewCuestionarioForm = false;
    this.showNewQuestionForm = true;
    this.showNuevoCuestionarioTitulo = true;
    
    
  }

  regresar(): void {
    this.showNewQuestionForm = false;
    this.showNewCuestionarioForm = true;
    this.showNuevoCuestionarioTitulo = true;
  }

  

 




  menuItemSeleccionado: string = ''; // Esta es la línea que necesitas agregar


  showNuevoCuestionarioTitulo: boolean = true;


}

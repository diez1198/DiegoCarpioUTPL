//nueva-pregunta-component


import { Component, Input } from '@angular/core';
import { NuevoCuestionarioService } from '../nuevo-cuestionario/nuevo-cuestionario.service';
import { SharedDataService } from '../shared-data.service';
import { Router } from '@angular/router';

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


  constructor(
    private nuevoCuestionarioService: NuevoCuestionarioService,
    private sharedDataService: SharedDataService,
    private router: Router, // Agrega el Router aquí
    
  ) {}


  ngOnInit(): void {
    this.nombreColeccion = this.sharedDataService.getNombreColeccion();
  }

  submitForm(): void {
    // Verificar si los datos están siendo capturados correctamente
    // no quita los null
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


    
  
    // Construir el objeto datosDocumento, aqui se coloco el ID y funciono bien no hay q colocar en nungun otro lado
    const datosDocumento = {
      id: this.contador, // contador
      pregunta: this.pregunta,
      opcion_a: this.opcion_a,
      opcion_b: this.opcion_b,
      opcion_c: this.opcion_c,
      respuesta: this.respuesta
    };


//new 


console.log('Nombre de la colección antes de llamar al servicio aqui debe salir ya siiii ?:', this.nombreColeccion);
console.log('Nombre de la colección antes de llamar al servicio aqui debe salir ya:', this.nombreColeccion);
console.log('Nombre de la colección antes de llamar al servicio aqui debe salir ya:', this.nombreColeccion);


    this.nuevoCuestionarioService.insertarNuevaPregunta(this.nombreColeccion, datosDocumento)
    .subscribe(
      (response) => {
        console.log('Nuevo Documento Creado exitosamente:', response);
        this.contador++; // Incrementa el contador cuando se crea una nueva pregunta exitosamente
        console.log('Contador actualizado:', this.contador); // Imprime el valor actualizado del contador
        
        // Limpiar los campos del formulario
        this.pregunta = '';
        this.opcion_a = '';
        this.opcion_b = '';
        this.opcion_c = '';
        this.respuesta = '';



      },
      (error) => {
        console.error('Error al crear la pregunta:', error);
        // Maneja el error de acuerdo a tus necesidades

      }
    );
    this.sharedDataService.setPreguntaData(datosDocumento);
  




    // guarda los datos de la pregunta en SharedDataService
    this.sharedDataService.setPreguntaData({
      pregunta: this.pregunta,
      opcion_a: this.opcion_a,
      opcion_b: this.opcion_b,
      opcion_c: this.opcion_c,
      respuesta: this.respuesta
    });
  }



  nextQuestion(): void {
    // Implementa la lógica para avanzar a la siguiente pregunta aquí
  }

  prevQuestion(): void {
    // Implementa la lógica para retroceder a la pregunta anterior aquí
  }

  regresaraCrearCuestionario(): void {
    // Implementa la lógica para regresar al formulario de creación de cuestionario aquí
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
  this.showConfirmationPopup = true;
}

// Método para ocultar la ventana emergente de confirmación
hideConfirmationPopup(): void {
  this.showConfirmationPopup = false;
}

// Método para finalizar el cuestionario después de confirmación
finishQuestionnaire(): void {
  this.router.navigate(['/super-administrador']);
  console.log('Nuevo Documento Creado exitosamente:');
  this.showConfirmationPopup = false;
  location.reload();
}

// Método para cancelar la finalización del cuestionario
cancelFinish(): void {
  this.hideConfirmationPopup(); // Oculta la ventana emergente
  

  // Otras acciones necesarias al cancelar la finalización del cuestionario
}








}

//nueva-pregunta-component


import { Component, Input } from '@angular/core';
import { NuevoCuestionarioService } from '../nuevo-cuestionario/nuevo-cuestionario.service';
import { SharedDataService } from '../shared-data.service';

@Component({
  selector: 'app-nueva-pregunta',
  templateUrl: './nueva-pregunta.component.html',
  styleUrls: ['./nueva-pregunta.component.css']
})
export class NuevaPreguntaComponent {
  @Input() nombreColeccion: string = ''; // Recibe el nombre de la colección como input
  pregunta: string = '';
  respuesta: string = '';
  opcion_a: string = '';
  opcion_b: string = '';
  opcion_c: string = '';
 
  nombreCuestionario: string = '';

  constructor(
    private nuevoCuestionarioService: NuevoCuestionarioService,
    private sharedDataService: SharedDataService
  ) {}


  ngOnInit(): void {
    this.nombreColeccion = this.sharedDataService.getNombreColeccion();
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


    
  
    // Construir el objeto datosDocumento utilizando las propiedades del componente
    const datosDocumento = {
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
        console.log('Pregunta creada exitosamente:', response);
        // Realiza acciones adicionales aquí si es necesario
      },
      (error) => {
        console.error('Error al crear la pregunta:', error);
        // Maneja el error de acuerdo a tus necesidades

      }
    );
    this.sharedDataService.setPreguntaData(datosDocumento);
  




    // Luego, guarda los datos de la pregunta en SharedDataService
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
}

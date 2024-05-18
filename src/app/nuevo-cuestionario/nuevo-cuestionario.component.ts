import { Component } from '@angular/core';
import { NuevoCuestionarioService } from './nuevo-cuestionario.service';

@Component({
  selector: 'app-nuevo-cuestionario',
  templateUrl: './nuevo-cuestionario.component.html',
  styleUrls: ['./nuevo-cuestionario.component.css'],
  providers: [NuevoCuestionarioService], // Se proporciona el servicio aquí
})
export class NuevoCuestionarioComponent {

  nombre: string = ''; // Variable para almacenar el nombre de la colección

  constructor(private nuevoCuestionarioService: NuevoCuestionarioService) { }

  // Método para enviar el formulario
  submitForm(): void {
    // Validar que se haya ingresado un nombre para la colección
    if (!this.nombre) {
      console.error('Debes ingresar un nombre para la colección');
      return; // Salir del método si no se ha ingresado un nombre
    }

    // Crear un objeto de datos para el documento (ajusta esto según tus necesidades)
    const datosDocumento = {
      titulo: 'Título del documento',
      descripcion: 'Descripción del documento',
      // Agrega más campos y valores según sea necesario
    };

    // Llamar a la función del servicio para crear la colección y el documento
    this.nuevoCuestionarioService.crearNuevaColeccion(this.nombre, datosDocumento)
      .subscribe(
        () => {
          console.log('Nueva colección y documento creados exitosamente');
          // Puedes realizar acciones adicionales aquí, como redirigir al usuario a otra página
        },
        error => {
          console.error('Error al crear la nueva colección y el documento:', error);
          // Puedes mostrar un mensaje de error al usuario
        }
      );
  }

  // Método para regresar a otra página (opcional)
  regresar(): void {
    // Implementar la lógica para regresar a otra página
  }

  // Método para ir a la siguiente página (opcional)
  siguiente(): void {
    // Implementar la lógica para ir a la siguiente página
  }
}

//nuevo-cuestionario-component
import { Component} from '@angular/core';
import { NuevoCuestionarioService } from './nuevo-cuestionario.service';
import { SharedDataService } from '../shared-data.service';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-nuevo-cuestionario',
  templateUrl: './nuevo-cuestionario.component.html',
  styleUrls: ['./nuevo-cuestionario.component.css'],
  providers: [NuevoCuestionarioService], 
})
export class NuevoCuestionarioComponent implements OnInit {
  menuItemSeleccionado: string = ''; 
  showNuevoCuestionarioTitulo: boolean = true;
  nombreCuestionario: string = '';
  datosDocumento: any = {};
  nombre: string = ''; 
  nombreColeccion: string = ''; 
  errorMessage: string = '';
  showModal: boolean = false;
  mostrarFormularioCrearCuestionario: boolean = false;
  showSuccessMessage: boolean = false;
  showNewQuestionForm: boolean = false;
  mostrarFormularioAEliminar: boolean = false;
  showNewCuestionarioForm: boolean = true;
  successMessage: string = '';
  activeMenuItem: string = '';
  pregunta: any = {};
  mostrarBotonesCuestionario: boolean = true;
  showInicioTitulo: boolean = true;
  cuestionarioNombre: string = '';
  isLoggedIn: boolean = false;
  isAdmin: boolean = false; 

  constructor(
    private nuevoCuestionarioService: NuevoCuestionarioService,
    private sharedDataService: SharedDataService,
    private router : Router,
    private authService: AuthService 
  ) {}
   //formulario nuevo cuestionario
   MostrarCuestionariosService(): void {
    this.mostrarFormularioCrearCuestionario = true;
    this.mostrarBotonesCuestionario = false;
    this.router.navigate(['/super-administrador', 'nuevo-cuestionario']); //  nueva ruta
    this.showInicioTitulo = false;
  }
  
  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      this.isAdmin = this.authService.isAdmin; // estado de autenticación
    });
  }

  // enviar el formulario
  submitForm(): void {
    if (!this.nombre.trim()) {
      this.errorMessage = 'Debes ingresar un nombre para el nuevo cuestionario';
      this.showModal = true;
      return;
    }
    // Construir datosDocumento utilizando los valores del formulario
    const datosDocumento = {
      pregunta: this.pregunta.pregunta,
      opcion_a: this.pregunta.opcion_a,
      opcion_b: this.pregunta.opcion_b,
      opcion_c: this.pregunta.opcion_c,
      respuesta: this.pregunta.respuesta,
    };

    // función del servicio para crear la colección y el documento
    this.nuevoCuestionarioService.crearNuevaColeccion(this.nombre, datosDocumento)
      .subscribe(
        () => {
          this.sharedDataService.setNombreColeccion(this.nombre); // Set nombreColeccion
          this.showSuccess('Su nuevo cuestionario se ha creado satisfactoriamente. A continuación, ingrese sus preguntas');
        },
        (error) => {
          console.error('Error al crear el cuestionario:', error);
        }
      );
    // Limpiardatos de la pregunta
    this.pregunta = {};
  }

  closeModal(): void {
    this.showModal = false;
  }

  // mostrar el mensaje de éxito
  showSuccess(message: string): void {
    this.successMessage = message;
    this.showSuccessMessage = true;
  }
  // Método para cerrar el mensaje de éxito
  closeSuccessMessage(): void {
    this.showSuccessMessage = false;
  }

  // cerrar el modal de éxito
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


  redireccionarASuperAdministrador(): void {
    this.mostrarFormularioCrearCuestionario = false;
    this.mostrarBotonesCuestionario = true;
    this.router.navigate(['/super-administrador/inicio']);
    
  }
  regresarInicio() {
    this.router.navigate(['/super-administrador/inicio']);  //página de inicio
  }

  mostrarFormulario(): void {
    this.mostrarFormularioCrearCuestionario = true;
    this.mostrarBotonesCuestionario = false;
    this.router.navigate(['/super-administrador/nuevo']); // nuevo
    this.showInicioTitulo = false;
  }

  mostrarEliminar(): void {
    this.mostrarFormularioCrearCuestionario = false;
    this.mostrarBotonesCuestionario = true;
    this.router.navigate(['/super-administrador/eliminar-cuestionario']); // eliminar
    
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/inicio']); // Redirigir a inicio después del logout
  }

  doNothing() {}

}

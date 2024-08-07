//  crear-administrador.component
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-administrador',
  templateUrl: './crear-administrador.component.html',
  styleUrls: ['./crear-administrador.component.css']
})
export class CrearAdministradorComponent {
  username: string = '';
  password: string = '';
  admins: any[] = [];
  errorMessage: string = '';
  successMessage: string = '';
  activeMenuItem: string = '';
  isAdmin: boolean = false; 
  mostrarFormularioCrearCuestionario: boolean = false;
  databases: any[] = [];
  mostrarBotonesCuestionario: boolean = true;
  collections: string[] = [];
  cuestionarioId: string | null = null;
  cuestionarioAEliminar: any;
  mostrarFormularioAEliminar: boolean = false;
  cuestionarios: any[] = [];
  showInicioTitulo: boolean = true;
  showNuevoCuestionarioTitulo: boolean = true;
  isLoggedIn: boolean = false;

  constructor(
    private authService: AuthService,
      private router: Router,
  ) {
    this.admins = this.authService.getAdmins();
    }
// Crear nuevo Administrador
  addAdmin() {
    if (this.authService.addAdmin(this.username, this.password)) {
      this.successMessage = 'Administrador creado exitosamente.';
      this.errorMessage = '';
      this.admins = this.authService.getAdmins();
      this.username = '';
      this.password = '';
    } else {
      this.errorMessage = 'El nombre de usuario ya existe.';
      this.successMessage = '';
    }
  }
  // Eliminar Administrador
  removeAdmin(username: string) {
    if (this.authService.removeAdmin(username)) {
      this.successMessage = 'Administrador eliminado exitosamente.';
      this.errorMessage = '';
      this.admins = this.authService.getAdmins();
    } else {
      this.errorMessage = 'Error al eliminar el administrador.';
      this.successMessage = '';
    }
  }

// item de menu inicio - redireccionar pagina inicio
  redireccionarASuperAdministrador(): void {
    this.mostrarFormularioCrearCuestionario = false;
    this.mostrarBotonesCuestionario = true;
    this.router.navigate(['/super-administrador/inicio']);
  }
// item de menu nuevo - redirecciona a funcion crear nuevo cuestionario
  mostrarFormulario(): void {
    this.mostrarFormularioCrearCuestionario = true;
    this.mostrarBotonesCuestionario = false;
    this.router.navigate(['/super-administrador/nuevo']);
    this.showInicioTitulo = false;
  }
// item de menu  eliminar -redireccionar funcion eliminar cuetioanrios
  mostrarEliminar(): void {
    this.mostrarFormularioCrearCuestionario = false;
    this.mostrarBotonesCuestionario = true;
    this.router.navigate(['/super-administrador/eliminar-cuestionario']);
  }
// para salir del modo administrador
  onLogout() {
    this.authService.logout();
    this.router.navigate(['/principal']); // Redirigir a inicio después del logout
  }

// do nothing
  doNothing() {}

}

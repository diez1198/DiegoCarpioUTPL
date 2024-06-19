import { Component, OnInit } from '@angular/core';
import { MostrarCuestionariosService } from './mostrar-cuestionarios.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-super-administrador',
  templateUrl: './super-administrador.component.html',
  styleUrls: ['./super-administrador.component.css'],
})
export class SuperAdministradorComponent implements OnInit {
  activeMenuItem: string = '';
  nombreCuestionario: string = '';
  databases: any[] = [];
  cuestionarios: any[] = [];
  mostrarFormularioCrearCuestionario: boolean = false;
  nombreColeccion: string = ''; 
  mostrarBotonesCuestionario: boolean = true; 
  collections: string[] = [];
  cuestionarioId: string | null = null;
  documentos: any[] = [];
  showInicioTitulo: boolean = true;
  showNuevoCuestionarioTitulo: boolean = true;
  menuItemSeleccionado: string = '';
  isLoggedIn: boolean = false;
  isAdmin: boolean = false; // Agregar propiedad isAdmin para mostrar/ocultar elementos específicos para super administradores

  constructor(
    private mostrarCuestionariosService: MostrarCuestionariosService,
    private router: Router,
    private authService: AuthService 
  ) {}

  ngOnInit(): void {
    this.mostrarCuestionariosService.getDatabasesAndCollections().subscribe(
      data => {
        this.databases = data.map((database: { name: string, collections: string[] }) => {
          database.collections = database.collections.filter((collection: string) => collection !== 'oplog.rs');
          return database;
        });
        this.databases.forEach(database => {
          this.collections = this.collections.concat(database.collections);
        });
      },
      error => {
        console.error('Error al obtener las bases de datos y colecciones:', error);
      }
    );

    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      this.isAdmin = this.authService.isAdmin; // Actualiza el valor de isAdmin cuando cambia el estado de autenticación
    });
  }

  verCuestionarios(collectionName: string): void {
    this.router.navigate(['super-administrador/ver-cuestionarios', collectionName]);
    console.log('Ver cuestionario:', collectionName);
    this.mostrarCuestionariosService.getDocumentos(collectionName).subscribe(
      data => {
        this.documentos = data;
        console.log('Documentos:', this.documentos);
      },
      error => {
        console.error('Error al obtener los documentos:', error);
      }
    );
  }

  navigateToNuevoCuestionario(): void {
    this.router.navigate(['/nuevo']);
  }

  redireccionarAEliminarCuestionario(): void {
    this.router.navigate(['/eliminar-cuestionario']);
  }

  mostrarFormulario(): void {
    this.mostrarFormularioCrearCuestionario = true;
    this.mostrarBotonesCuestionario = false;
    this.router.navigate(['/super-administrador/nuevo']);
    this.showInicioTitulo = false;
  }

  redireccionarASuperAdministrador(): void {
    this.mostrarFormularioCrearCuestionario = false;
    this.mostrarBotonesCuestionario = true;
    this.router.navigate(['/super-administrador/inicio']);
    this.showInicioTitulo = true;
  }

  mostrarEliminar(): void {
    this.mostrarFormularioCrearCuestionario = true;
    this.mostrarBotonesCuestionario = true;
    this.router.navigate(['/super-administrador/eliminar-cuestionario']);
  }

  doNothing() {}

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/inicio']); // Redirigir a inicio después del logout
  }
}

import { Component, OnInit } from '@angular/core';
import { MostrarCuestionariosService } from './mostrar-cuestionarios.service';
import { Router } from '@angular/router';


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

 
  mostrarBotonesCuestionario: boolean = true; // Inicialmente se muestran los botones
  collections: string[] = [];  // Inicializa el array
  cuestionarioId: string | null = null; // Inicializamos la propiedad como null

  constructor(
    private mostrarCuestionariosService: MostrarCuestionariosService,
    
    
    
    private router: Router, // Agrega el Router aquí
    
  ) 
  {

  }


  ngOnInit(): void {
    this.mostrarCuestionariosService.getDatabasesAndCollections().subscribe(
      data => {
        this.databases = data.map((database: { name: string, collections: string[] }) => {
          database.collections = database.collections.filter((collection: string) => collection !== 'oplog.rs');
          return database;
        });

        // Inicializa el array collections
        this.databases.forEach(database => {
          this.collections = this.collections.concat(database.collections);
        });
      },
      error => {
        console.error('Error al obtener las bases de datos y colecciones:', error);
      }
    );
  }
  
  verCuestionario(cuestionarioId: string): void {
    console.log('Ver cuestionario:', cuestionarioId);
    // Implementa la lógica para mostrar el cuestionario completo
  }

  doNothing() {}

  navigateToNuevoCuestionario(): void {
    this.router.navigate(['/nuevo']);
  }

  redireccionarAEliminarCuestionario(): void {
    this.router.navigate(['/eliminar-cuestionario']); // Navega a la ruta de EliminarCuestionarioComponent
  }

  

  

 



// FORMULARIO DEL NUEVO CUESTIONARIO
  mostrarFormulario(): void {
  this.mostrarFormularioCrearCuestionario = true;
  this.mostrarBotonesCuestionario = false;
  this.router.navigate(['/super-administrador', 'nuevo-cuestionario']); // Actualiza la navegación con la nueva ruta
}
redireccionarASuperAdministrador(): void {
  this.mostrarFormularioCrearCuestionario = false;
  this.mostrarBotonesCuestionario = true; // Mostrar los botones de los cuestionarios
  this.router.navigate(['/super-administrador']);
}

mostrarEliminar(): void {
  this.mostrarFormularioCrearCuestionario = true;
  this.mostrarBotonesCuestionario = true;
  this.router.navigate(['/super-administrador', 'eliminar-cuestionario']); // Actualiza la navegación con la nueva ruta
}





}

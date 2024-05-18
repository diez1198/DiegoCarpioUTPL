import { Component, OnInit } from '@angular/core';
import { MostrarEliminarCuestionariosService } from './eliminar-cuestionario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-eliminar-cuestionario',
  templateUrl: './eliminar-cuestionario.component.html',
  styleUrls: ['./eliminar-cuestionario.component.css'],
  providers: [MostrarEliminarCuestionariosService]
})
export class EliminarCuestionarioComponent implements OnInit {

  activeMenuItem: string = '';
  mostrarFormularioCrearCuestionario: boolean = false;
  databases: any[] = [];
  mostrarBotonesCuestionario: boolean = true;
  collections: string[] = [];
  cuestionarioId: string | null = null;
  cuestionarioAEliminar: any;
  mostrarFormularioAEliminar: boolean = false;
  cuestionarios: any[] = [];

  constructor(
    private router: Router,
    private mostrarEliminarCuestionariosService: MostrarEliminarCuestionariosService
  ) {}

  ngOnInit(): void {
    this.mostrarEliminarCuestionariosService.getDatabasesAndCollections().subscribe(
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
  }

  verCuestionario(collection: string): void {
    console.log('Ver cuestionario:', collection);
  }

  verCuestionarioCollections(collection: string): void {
    const index = this.collections.indexOf(collection);
    const cuestionario = this.cuestionarios[index];
    //////
    console.log('Ver cuestionario:', this.cuestionarioId);
    console.log('Ver cuestionario:', this.cuestionarioId);
    
  }

  actualizarListaCuestionarios(): void {}

  MostrarCuestionariosService(): void {}

  doNothing() {}

  mostrarEliminar(): void {
    this.mostrarFormularioCrearCuestionario = false;
    this.mostrarBotonesCuestionario = true;
    this.router.navigate(['/super-administrador', 'eliminar cuestionario']);
  }

  redireccionarASuperAdministrador(): void {
    this.mostrarFormularioCrearCuestionario = false;
    this.mostrarBotonesCuestionario = true;
    this.router.navigate(['/super-administrador']);
  }

  confirmarEliminar(collection: string): void {
    this.cuestionarioAEliminar = { nombre: collection }; // Actualiza esto según sea necesario
    this.mostrarFormularioAEliminar = true;
  }

  cancelarEliminar(): void {
    this.mostrarFormularioAEliminar = false;
    this.cuestionarioAEliminar = null;
  }

  eliminarCuestionario(collection: string): void {
    // Lógica para eliminar la colección

     // Imprime el valor de collectionName en la consola
     console.log('Nombre de la colección a eliminar:', collection);
     console.log('Nombre de la colección a eliminar:', collection);
     console.log('Nombre de la colección a eliminar:', collection);
    this.mostrarEliminarCuestionariosService.eliminarCuestionario(collection).subscribe(
        response => {
            console.log('Cuestionario eliminado:', response);
            // Actualizar la lista de colecciones después de la eliminación
            this.actualizarListaCuestionarios();
        },
        error => {
            console.error('Error al eliminar el cuestionario:', error);
        }
    );
}












  
}


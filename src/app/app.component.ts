import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Subscription } from 'rxjs';
import { MostrarCuestionariosService } from './mostrar-cuestionarios.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  jsonContent: string = '';
  preguntas: any;
  title = 'Mi Aplicación';
  activeMenuItem: string = '';
  data: any;
  mostrarPreguntas: boolean = false;
  showText = false;
  showFuselaje = false;
  isLoggedIn: boolean = false;
  private authSubscription: Subscription;
  collections: string[] = [];
  filteredCollections: string[] = [];

  constructor(
    private router: Router,
    private http: HttpClient,
    public authService: AuthService,
    private mostrarCuestionariosService: MostrarCuestionariosService
  ) {
    this.authSubscription = this.authService.isLoggedIn$.subscribe(
      isLoggedIn => {
        this.isLoggedIn = isLoggedIn;
      }
    );
  }

  ngOnInit() {
    this.loadJSONData();
    this.loadCollections();
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  loadJSONData() {
    this.http.get('./assets/json/CuestionarioMecanicaGeneralVer2.json').subscribe(response => {
      this.preguntas = response;
      this.mostrarPreguntas = true;
    });
  }

  loadCollections() {
    this.mostrarCuestionariosService.getDatabasesAndCollections().subscribe(
      data => {
        this.collections = data.flatMap((database: { name: string, collections: string[] }) =>
          database.collections.filter((collection: string) => collection !== 'oplog.rs')
        );
        this.filterCollections();
      },
      error => {
        console.error('Error al obtener las colecciones:', error);
      }
    );
  }

  selectCollection(collection: string) {
    // Implementa la lógica para manejar la selección de la colección aquí
    console.log('Colección seleccionada:', collection);
    // Puedes agregar lógica adicional, como navegar a una ruta con la colección seleccionada
    // this.router.navigate(['ruta', collection]);
  }



  filterCollections() {
    const excludeCollections = ['Mecanica Fuselaje', 'Mecanica General', 'Mecanica Motores'];
    this.filteredCollections = this.collections.filter(collection => !excludeCollections.includes(collection));
  }

  verCuestionarios(collectionName: string) {
    this.activeMenuItem = collectionName;
    this.router.navigate(['super-administrador/ver-cuestionarios', collectionName]);
  }
  verSimuladores(collectionName: string) {
    this.activeMenuItem = collectionName;
    this.router.navigate(['/simuladores-admin/completo'], { queryParams: { collection: collectionName } });
  }
  
  


  setActiveMenuItem(menuItem: string) {
    this.activeMenuItem = menuItem;
  }

  showMessage(menuItem: string) {
    alert(`¡${menuItem} está funcionando!`);
  }

  redirectToRDAC65() {
    window.open('https://www.aviacioncivil.gob.ec/wp-content/uploads/downloads/2020/02/12-NE-RDAC-Parte-065-28-Enero-20.pdf');
  }

  showCuestionarioGeneral() {
    this.showText = true;
    this.showFuselaje = false;
  }

  showCuestionarioFuselaje() {
    this.showFuselaje = true;
    this.showText = false;
  }

  hideCuestionario() {
    this.showFuselaje = false;
    this.showText = false;
  }

  doNothing() {}

  isPaginaInicio(): boolean {
    return this.router.url === '/principal';
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service'; // Importa el servicio
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css' ]
})
export class AppComponent implements OnInit, OnDestroy {
  jsonContent: string = ''; // Variable to store the JSON content
  preguntas: any;
  title = 'Mi Aplicación';
  activeMenuItem: string = '';
  data: any;
  mostrarPreguntas: boolean = false;
  showText = false;
  showFuselaje = false; // Cambiar el nombre de la variable
  isLoggedIn: boolean = false; // Variable para determinar si el usuario está autenticado
  private authSubscription: Subscription;

  constructor(private router: Router, private http: HttpClient, public authService: AuthService) {
    // Suscribirse a los cambios de isLoggedIn
    this.authSubscription = this.authService.isLoggedIn$.subscribe(
      isLoggedIn => {
        this.isLoggedIn = isLoggedIn;
      }
    );
  }

  ngOnDestroy() {
    // Desuscribirse para evitar posibles fugas de memoria
    this.authSubscription.unsubscribe();
  }

  showMessage(menuItem: string) {
    alert(`¡${menuItem} está funcionando!`);
  }

  redirectToRDAC65() {
    window.open('https://www.aviacioncivil.gob.ec/wp-content/uploads/downloads/2020/02/12-NE-RDAC-Parte-065-28-Enero-20.pdf');
  }

  setActiveMenuItem(menuItem: string) {
    this.activeMenuItem = menuItem;
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

  loadJSONData() {
    this.http.get('./assets/json/CuestionarioMecanicaGeneralVer2.json').subscribe(response => {
      this.preguntas = response;
      this.mostrarPreguntas = true; // Actualizar la propiedad mostrarPreguntas a true para mostrar las preguntas
    });
  }

  ngOnInit() {
    this.loadJSONData(); // Llamar a la función loadJSONData al inicializar el componente
  }

  doNothing() {}

  isPaginaInicio(): boolean {
    return this.router.url === '/inicioTest';
  }
}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '../app.component';


@Component({
  selector: 'app-cuestionario-general',
  templateUrl: './cuestionario-general.component.html',
  styleUrls: ['./cuestionario-general.component.css']
})
export class CuestionarioGeneralComponent implements OnInit {
  preguntas: any; // Variable para almacenar los datos del archivo JSON
  mostrarPreguntas: boolean = false; // Variable para controlar la visualización de las preguntas
  
  constructor(private http: HttpClient, private appComponent: AppComponent) { }

  ngOnInit() {
    this.loadJSONData(); // Cargar los datos del archivo JSON al inicializar el componente
  }

  loadJSONData() {
    // Hacer una solicitud HTTP para cargar el archivo JSON
    this.http.get('./assets/CuestionarioMecanicaGeneralVer2.json').subscribe(response => {
      this.preguntas = response; // Asignar los datos del archivo JSON a la variable 'preguntas'
    });
  }

  showPreguntas() {
    // Cambiar el valor de la propiedad 'mostrarPreguntas' para mostrar u ocultar las preguntas
    this.mostrarPreguntas = !this.mostrarPreguntas;
  }

  showCuestionarioGeneral() {
    // Llama a la función showCuestionarioText del componente AppComponent
    this.appComponent.showCuestionarioGeneral();
  }

}




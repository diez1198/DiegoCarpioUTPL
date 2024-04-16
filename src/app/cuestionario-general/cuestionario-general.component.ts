// cuestionario-general.component.ts
import { Component, OnInit } from '@angular/core';
import { TraerMecanicaGeneralService } from 'src/app/traer-mecanica-general.service';
import { ChangeDetectorRef } from '@angular/core';




@Component({
  selector: 'app-cuestionario-general',
  templateUrl: './cuestionario-general.component.html',
  styleUrls: ['./cuestionario-general.component.css'],
})
export class CuestionarioGeneralComponent implements OnInit {
  datos: any[] = [];

  constructor(private traerMecanicaService: TraerMecanicaGeneralService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.traerMecanicaService.obtenerDatos().subscribe((datos: any[]) => {
      this.datos = datos;
      console.log(this.datos);
      console.log(this.datos[0].data);  // Agrega esta línea para verificar los datos
    });


  }

  


  onCompletoMecanicaGeneralClick() {
    const preguntasContainer = document.getElementById("preguntas-container");
    const optionsContainer = document.getElementById("opciones-container");
    const todoContainer = document.getElementById("todo-container");

    if (!preguntasContainer || !optionsContainer || !todoContainer) {
      console.error("Alguno de los elementos no existe en el DOM");
      return;
    }

    preguntasContainer.innerHTML = '';
    optionsContainer.innerHTML = '';
    todoContainer.innerHTML = '';

    
  }


  onCuestionarioMecanicaGeneralRespuestaClick() {
    const preguntasContainer = document.getElementById("preguntas-container");
    const optionsContainer = document.getElementById("opciones-container");
    const todoContainer = document.getElementById("todo-container");
  
    if (!preguntasContainer || !optionsContainer || !todoContainer) {
      console.error("Alguno de los elementos no existe en el DOM");
      return;
    }
  
    preguntasContainer.innerHTML = '';
    optionsContainer.innerHTML = '';
    todoContainer.innerHTML = '';
      
    
  }
  

  onCuestionarioMecanicaGeneralSoloRespuestaClick() {
    const preguntasContainer = document.getElementById("preguntas-container");
    const optionsContainer = document.getElementById("opciones-container");
    const todoContainer = document.getElementById("todo-container");
  
    if (!preguntasContainer || !optionsContainer || !todoContainer) {
      console.error("Alguno de los elementos no existe en el DOM");
      return;
    }
  
    preguntasContainer.innerHTML = '';
    optionsContainer.innerHTML = '';
    todoContainer.innerHTML = '';
      
    
  }






}




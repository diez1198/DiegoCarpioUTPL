import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-cuestionario-fuselaje',
  templateUrl: './cuestionario-fuselaje.component.html',
  styleUrls: ['./cuestionario-fuselaje.component.css']
})
export class CuestionarioFuselajeComponent implements OnInit {
 
  jsonContent: string = '';// Variable to store the JSON content
 

  constructor(private http: HttpClient, private appComponent: AppComponent) { }

  ngOnInit() {}


  
  onMenuItemClick() {
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

    this.http.get<any>('assets/json/CuestionarioMecanicaGeneralVer12.json').subscribe(data => {
      for (const item of data.data) {
        if (item.pregunta) {
          item.pregunta = '<strong>' + item.pregunta + '</strong>';
          preguntasContainer.innerHTML += `<div>${item.pregunta}</div><br>`;
        }
      }

      this.jsonContent = JSON.stringify(data.data, null, 70);
    });
  }


  onShowOptionsClick() {
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
  
    this.http.get<any>('assets/json/CuestionarioMecanicaGeneralVer12.json').subscribe(data => {
      for (const item of data.data) {
        if (item.pregunta && item.opcion && item.respuesta) {
          preguntasContainer.innerHTML += `<div><strong>${item.pregunta}</strong></div>`;
  
          const opcionesPregunta = document.createElement("div");
          opcionesPregunta.classList.add("opciones-pregunta");
  
          for (let i = 0; i < item.opcion.length; i++) {
            item.opcion[i] = item.opcion[i].replace(/[]+. /, "");
            opcionesPregunta.innerHTML += `<p>${item.opcion[i]}</p>`;
          }
  
          preguntasContainer.appendChild(opcionesPregunta);
          preguntasContainer.innerHTML += `<div><em>Respuesta: ${item.respuesta}</em></div><br>`;
        }
      }
      this.jsonContent = JSON.stringify(data.data, null, 4);
    });
  }
 










  
 


  onTodoClick() {
    const preguntasContainer = document.getElementById("preguntas-container");
    const opcionesContainer = document.getElementById("opciones-container");
    const todoContainer = document.getElementById("todo-container");
  
    if (!preguntasContainer || !opcionesContainer || !todoContainer) {
      console.error("Alguno de los elementos no existe en el DOM");
      return;
    }
  
    preguntasContainer.innerHTML = "";
    opcionesContainer.innerHTML = "";
    todoContainer.innerHTML = "";
  
    this.http.get<any>("assets/json/CuestionarioMecanicaGeneralVer12.json").subscribe((data) => {
      for (const item of data.data) {
        if (item.pregunta) {
          item.pregunta = "<strong>" + item.pregunta + "</strong>";
          const preguntaContainer = document.createElement("div");
          preguntaContainer.id = `pregunta-${item.id}`;
          preguntaContainer.innerHTML = `${item.pregunta} <br><button id="responder-${item.id}" data-id="${item.id}" class="boton-pregunta">Responder Pregunta ${item.id}</button>`;
          const boton = preguntaContainer.querySelector(`#responder-${item.id}`);
          if (boton) {
           boton.classList.add("mi-boton-estilo");
           boton.setAttribute("style", "background-color: blue; color: white; border: 1px solid black;");// para poder dar estilo al boton en css

          }// verificacion de nulidad por que sin el ? salia b
          
          todoContainer.appendChild(preguntaContainer);
  
          // Agregar opciones de la pregunta
          if (item.opcion) {
            const opcionesPregunta = document.createElement("div");
            opcionesPregunta.classList.add("opciones-pregunta");
            for (let i = 0; i < item.opcion.length; i++) {
              item.opcion[i] = item.opcion[i].replace(/[]+\. /, "");
              const opcion = document.createElement("p");
              opcion.textContent = item.opcion[i];
              if (item.opcion[i] === item.respuesta) {
                opcion.classList.add("respuesta-correcta");
                //para marcar respuestas correctas solo poner aqui  opcion.style.backgroundColor = "yellow";
                
              }
              opcionesPregunta.appendChild(opcion);
            }
            preguntaContainer.appendChild(opcionesPregunta);
          }
  
          // Agregar evento click al botón "Responder Pregunta"
          const botonesResponder = document.querySelectorAll("button[id^='responder-']");
          botonesResponder.forEach((boton) => {
            boton.addEventListener("click", () => {
              const preguntaId = boton.getAttribute("data-id");
            if (preguntaId) {
              const opcionesPregunta = document.querySelector(`#pregunta-${preguntaId} .opciones-pregunta`);
              if (opcionesPregunta) {
                opcionesPregunta.querySelectorAll("p").forEach((opcion) => {
                  if (opcion.classList.contains("respuesta-correcta")) {
                    opcion.style.backgroundColor = "yellow";
                  } else {
                    opcion.style.backgroundColor = "transparent";
                  }
                });
              } else {
                console.error("No se pudo encontrar el contenedor de opciones de la pregunta");
              }
            } else {
              console.error("El atributo data-id no existe en el botón");
            }

          

          });
        
        
      
      });


    }
    
  }
  
    });
    
  
  }
  





















  on3opciones() {
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

    this.http.get<any>('assets/json/CuestionarioMecanicaGeneralVer12.json').subscribe(data => {
      for (const item of data.data) {
        if (item.pregunta) {
          item.pregunta = '<strong>' + item.pregunta + '</strong>';
          todoContainer.innerHTML += `<div>${item.pregunta}</div>`;
            
        }

        if (item.opcion) {
          const opcionesPregunta = document.createElement("div");
          opcionesPregunta.classList.add("opciones-pregunta");
          for (let i = 0; i < item.opcion.length; i++) {
            item.opcion[i] = item.opcion[i].replace(/[]+. /, "");
            opcionesPregunta.innerHTML += `<p>${item.opcion[i]}</p>`;
          }
          todoContainer.appendChild(opcionesPregunta);
        }



      }
      this.jsonContent = JSON.stringify(data.data, null, 20);


      


    });
  }






}
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-simulador-mecanica-general',
  templateUrl: './simulador-mecanica-general.component.html',
  styleUrls: ['./simulador-mecanica-general.component.css']
})
export class SimuladorMecanicaGeneralComponent implements OnInit {
  jsonContent: string = '';
  preguntas: any;
  title = 'Mi Aplicación';
  activeMenuItem: string = '';
  data: any;
  mostrarPreguntas: boolean = false;
  showText = false;
  showFuselaje = false;
  todoContainer: HTMLElement | null = null;
  respuestaCorrectaCount: number = 0;
  cantidadPreguntasGeneradas: number = 0;
  respuestasIncorrectas: { [id: string]: boolean } = {};
  respuestasCorrectas: { [id: string]: string } = {};
  mostrandoSimuladorExamen: boolean = false;
  mostrandoCuestionarioCompleto: boolean = false;
  mostrandoCuestionarioCustomizado: boolean = false;
  cantidadPreguntasDeseada: number = 0 ;
  constructor(private router: Router, private http: HttpClient) {}


  ngOnInit() {
    
  }

  mostrarCuestionario() {
    if (this.mostrandoSimuladorExamen || this.mostrandoCuestionarioCustomizado) {
      const confirmacion = confirm("¿Estás seguro de cambiar al Cuestionario completo? Sus respuestas se perderán.");
  
      if (confirmacion) {
        this.cuestionarioCompleto();
        this.mostrandoSimuladorExamen = false;
        this.mostrandoCuestionarioCustomizado = false;
        this.mostrandoCuestionarioCompleto = true;
        
      }
    } else {
      this.cuestionarioCompleto();
      this.mostrandoCuestionarioCompleto = true;
      
    }
  }
  
  simuladorExamen() {
    if (this.mostrandoCuestionarioCompleto || this.mostrandoCuestionarioCustomizado) {
      const confirmacion = confirm("¿Estás seguro de cambiar al Simulador Examen Mecánica General? Sus respuestas se perderán.");
      if (confirmacion) {
        this.CienPreguntas();
        this.mostrandoCuestionarioCompleto = false;
        this.mostrandoCuestionarioCustomizado = false;
        this.mostrandoSimuladorExamen = true;
      }
    } else {
      this.CienPreguntas();
      this.mostrandoSimuladorExamen = true;
    }
  }
  
  elegirNumPreguntasConfirmacion() {
    if (this.mostrandoSimuladorExamen || this.mostrandoCuestionarioCompleto) {
      const confirmacion = confirm("¿Estás seguro de cambiar al Cuestionario Customizado? Sus respuestas se perderán.");
      if (confirmacion) {
        this.obtenerNumeroPreguntas();
    this.elegirNumPreguntas();
        this.mostrandoSimuladorExamen = false;
        this.mostrandoCuestionarioCompleto = false;
        this.mostrandoCuestionarioCustomizado = true;
      }
    } else {
      this.elegirNumPreguntas();
      this.mostrandoCuestionarioCustomizado = true;
    }
  }
  
    cuestionarioCompleto() {
       // Reiniciar el contador
    this.respuestaCorrectaCount = 0;
    const preguntasContainer = document.getElementById("preguntas-container");
    const optionsContainer = document.getElementById("opciones-container");
    this.todoContainer = document.getElementById("todo-container");
    if (!preguntasContainer || !optionsContainer || !this.todoContainer) {
      console.error("Alguno de los elementos no existe en el DOM");
      return;
    }
    preguntasContainer.innerHTML = '';
    optionsContainer.innerHTML = '';
    this.todoContainer.innerHTML = '';
    this.http.get<any>('assets/json/CuestionarioMecanicaGeneralVer12.json').subscribe((data: any) => {
      const respuestasCorrectas: { [id: string]: string } = {};
      let preguntaContainer: HTMLElement | null = null
      for (const item of data.data) {
        if (item.pregunta) {
          if (preguntaContainer) {
            if (this.todoContainer) {
              this.todoContainer.appendChild(preguntaContainer);
            }
          }
          preguntaContainer = document.createElement("div");
          preguntaContainer.classList.add("pregunta-container");
          const preguntaElement = document.createElement("div");
          preguntaElement.innerHTML = `<strong>${item.pregunta}</strong>`;
          preguntaContainer.appendChild(preguntaElement);
          this.cantidadPreguntasGeneradas = data.data.length;
        }

        if (item.opcion && preguntaContainer) {
          const opcionesPregunta = document.createElement("div");
          opcionesPregunta.classList.add("opciones-pregunta");

          for (let i = 0; i < item.opcion.length; i++) {
            const opcion = item.opcion[i].replace(/^[0-9]+\. /, "");
            const radio = document.createElement("input");
            radio.type = "radio";
            radio.name = "pregunta" + item.id; 
            radio.value = opcion;
            const label = document.createElement("label");
            label.innerText = opcion;

            const opcionContainer = document.createElement("div");
            opcionContainer.classList.add("opcion-container");
            opcionContainer.appendChild(radio);
            opcionContainer.appendChild(label);
    if (opcion === item.respuesta) {
    respuestasCorrectas[item.id] = opcion; 
    radio.addEventListener("change", () => {
    if (radio.checked) {
      this.respuestaCorrectaCount++; 
    } else {
      this.respuestaCorrectaCount--; 
    }
  });
} else {
  opcionContainer.style.backgroundColor = "white";

  radio.addEventListener("change", () => {
    if (radio.checked && !this.respuestasIncorrectas[item.id]) {
      this.respuestasIncorrectas[item.id] = true; 
      this.respuestaCorrectaCount--; 
    } else if (!radio.checked && respuestasCorrectas[item.id] === opcion) {
      if (this.respuestasIncorrectas[item.id]) {
        this.respuestasIncorrectas[item.id] = false; 
        this.respuestaCorrectaCount++; 
        }
      }
    });
  }
  
              opcionesPregunta.appendChild(opcionContainer);
            }
  
            preguntaContainer.appendChild(opcionesPregunta);
          }
        }
        if (preguntaContainer && this.todoContainer) {
          this.todoContainer.appendChild(preguntaContainer);
        }
        this.mostrarPreguntas = true;
      });
    }

    obtenerPreguntasAzar(preguntas: any[], cantidadPreguntas: number) {
      const preguntasCopia = [...preguntas];
      for (let i = preguntasCopia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [preguntasCopia[i], preguntasCopia[j]] = [preguntasCopia[j], preguntasCopia[i]];
      }
      const preguntasAzar = preguntasCopia.slice(0, cantidadPreguntas);
      preguntasAzar.sort((a, b) => a.id - b.id);
      this.cantidadPreguntasGeneradas = preguntasAzar.length;
      return preguntasAzar;
    }

    CienPreguntas() {
      
       this.respuestaCorrectaCount = 0;
      const preguntasContainer = document.getElementById("preguntas-container");
      const optionsContainer = document.getElementById("opciones-container");
      this.todoContainer = document.getElementById("todo-container");
      if (!preguntasContainer || !optionsContainer || !this.todoContainer) {
        console.error("Alguno de los elementos no existe en el DOM");
        return;
      }
      preguntasContainer.innerHTML = '';
      optionsContainer.innerHTML = '';
      this.todoContainer.innerHTML = '';
      this.http.get<any>('assets/json/CuestionarioMecanicaGeneralVer12.json').subscribe((data: any) => {
        const preguntas = data.data;
        const preguntasAzar = this.obtenerPreguntasAzar(preguntas, 100);
        const respuestasCorrectas: { [id: string]: string } = {};
        let preguntaContainer: HTMLElement | null = null;
        for (const item of preguntasAzar) {
          if (item.pregunta) {
            if (preguntaContainer) {

              if (this.todoContainer) {
                this.todoContainer.appendChild(preguntaContainer);
              }
            }
            preguntaContainer = document.createElement("div");
            preguntaContainer.classList.add("pregunta-container");
            const preguntaElement = document.createElement("div");
            preguntaElement.innerHTML = `<strong>${item.pregunta}</strong>`;
            preguntaContainer.appendChild(preguntaElement);
          }
  
          if (item.opcion && preguntaContainer) {
            const opcionesPregunta = document.createElement("div");
            opcionesPregunta.classList.add("opciones-pregunta");
            for (let i = 0; i < item.opcion.length; i++) {
              const opcion = item.opcion[i].replace(/^[0-9]+\. /, "");
              const radio = document.createElement("input");
              radio.type = "radio";
              radio.name = "pregunta" + item.id; 
              radio.value = opcion;
              const label = document.createElement("label");
              label.innerText = opcion;
              const opcionContainer = document.createElement("div");
              opcionContainer.classList.add("opcion-container");
              opcionContainer.appendChild(radio);
              opcionContainer.appendChild(label);
  if (opcion === item.respuesta) {
    respuestasCorrectas[item.id] = opcion; 
    radio.addEventListener("change", () => {
      if (radio.checked) {
        this.respuestaCorrectaCount++; 
      } else {
        this.respuestaCorrectaCount--; 
      }
    });
  } else {
    opcionContainer.style.backgroundColor = "white";
    radio.addEventListener("change", () => {
      if (radio.checked && !this.respuestasIncorrectas[item.id]) {
        this.respuestasIncorrectas[item.id] = true; 
        this.respuestaCorrectaCount--; 
      } else if (!radio.checked && respuestasCorrectas[item.id] === opcion) {
        if (this.respuestasIncorrectas[item.id]) {
          this.respuestasIncorrectas[item.id] = false; 
          this.respuestaCorrectaCount++; 
                      }
                    }
                  });
                }
                opcionesPregunta.appendChild(opcionContainer);
              }
              preguntaContainer.appendChild(opcionesPregunta);
            }
          }
          if (preguntaContainer && this.todoContainer) {
            this.todoContainer.appendChild(preguntaContainer);
          }
          this.mostrarPreguntas = true;
        });
    }

    obtenerNumeroPreguntas() {
      const numeroPreguntasElement = document.getElementById('numeroPreguntas') as HTMLInputElement;
      this.cantidadPreguntasDeseada = parseInt(numeroPreguntasElement.value);
      this.Customizado();
      const dialogElement = document.getElementById('dialog');
      if (dialogElement) {
        dialogElement.style.display = 'none';
      }
    }
    
    elegirNumPreguntas() {
      const dialogElement = document.getElementById('dialog');
      if (dialogElement) {
        dialogElement.style.display = 'block'; 
      }
    }
  
    IngresarPreguntasAzar(preguntas: any[], cantidadPreguntas: number) {
      const preguntasCopia = [...preguntas];
      for (let i = preguntasCopia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [preguntasCopia[i], preguntasCopia[j]] = [preguntasCopia[j], preguntasCopia[i]];
      }
      const preguntasElegidas = preguntasCopia.slice(0, this.cantidadPreguntasDeseada);
      preguntasElegidas.sort((a, b) => a.id - b.id);
      this.cantidadPreguntasGeneradas = preguntasElegidas.length;
      return preguntasElegidas;
    }
 
    calificar() {
      const respuestasCorrectas = this.respuestaCorrectaCount;
      const calificacion = respuestasCorrectas + " respuestas correctas";
      alert(calificacion); 
      const opciones = document.querySelectorAll('input[type="radio"]:checked');
      opciones.forEach((opcion) => {
        (opcion as HTMLInputElement).checked = false;
        this.respuestaCorrectaCount = 0; 
      });
    }
    
    Customizado() {
      this.respuestaCorrectaCount = 0;
      let miRespuesta: string | undefined; 
      const preguntasContainer = document.getElementById("preguntas-container");
      const optionsContainer = document.getElementById("opciones-container");
      this.todoContainer = document.getElementById("todo-container");
      if (!preguntasContainer || !optionsContainer || !this.todoContainer) {
        console.error("Alguno de los elementos no existe en el DOM");
        return;
      }
      preguntasContainer.innerHTML = '';
      optionsContainer.innerHTML = '';
      this.todoContainer.innerHTML = '';
      this.http.get<any>('assets/json/CuestionarioMecanicaGeneralVer12.json').subscribe((data: any) => {
        const preguntas = data.data;
        const preguntasElegidas = this.IngresarPreguntasAzar(preguntas, this.cantidadPreguntasDeseada);
        const respuestasCorrectas: { [id: string]: string } = {};
        let preguntaContainer: HTMLElement | null = null;
        for (const item of preguntasElegidas) {
          if (item.pregunta) {
            if (preguntaContainer) {
              if (this.todoContainer) {
                this.todoContainer.appendChild(preguntaContainer);
              }
            }
            preguntaContainer = document.createElement("div");
            preguntaContainer.classList.add("pregunta-container");
            const preguntaElement = document.createElement("div");
            preguntaElement.innerHTML = `<strong>${item.pregunta}</strong>`;
            preguntaContainer.appendChild(preguntaElement);
          }
          if (item.opcion && preguntaContainer) {
            const opcionesPregunta = document.createElement("div");
            opcionesPregunta.classList.add("opciones-pregunta");
            for (let i = 0; i < item.opcion.length; i++) {
              const opcion = item.opcion[i].replace(/^[0-9]+\. /, "");
              const radio = document.createElement("input");
              radio.type = "radio";
              radio.name = "pregunta" + item.id; 
              radio.value = opcion;
              const label = document.createElement("label");
              label.innerText = opcion;
              const opcionContainer = document.createElement("div");
              opcionContainer.classList.add("opcion-container");
              opcionContainer.appendChild(radio);
              opcionContainer.appendChild(label);
              if (opcion === item.respuesta) {
                respuestasCorrectas[item.id] = opcion; 
                radio.addEventListener("change", () => {
                  if (radio.checked) {
                    this.respuestaCorrectaCount++;
                  }
              
            });
          } 
          opcionesPregunta.appendChild(opcionContainer);
        }
        preguntaContainer.appendChild(opcionesPregunta);
      }
    }
    if (preguntaContainer && this.todoContainer) {
      this.todoContainer.appendChild(preguntaContainer);
    }
    const preguntasRespondidas = document.querySelectorAll('input[type="radio"]:checked').length;
    this.mostrarPreguntas = true;
  });
}
}
  
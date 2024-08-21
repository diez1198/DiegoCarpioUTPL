import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Params, Router, NavigationEnd } from '@angular/router';
import { VerCuestionariosService } from '../ver-cuestionarios.service';
import { ChangeDetectorRef } from '@angular/core';
import { filter } from 'rxjs/operators';



@Component({
  selector: 'app-simuladores-admin',
  templateUrl: './simuladores-admin.component.html',
  styleUrls: ['./simuladores-admin.component.css']
})
export class SimuladoresAdminComponent implements OnInit, AfterViewInit {

  todosDocumentos: any[] = []; //Almacenar documentos
  activeMenuItem: string = ''; 
  selectedCollection: string = '';
  documentos: any[] = [];
  documentosOriginales: any[] = [];
  mostrarRespuestas: boolean = false;
  mostrarRespuestaCompleta: boolean = true;
  mostrarEtiquetaRespuesta: boolean = true;
  mostrarBotonMarcar: boolean = true;
  respuestasCorrectas: number = 0;
  mostrarCalificacion: boolean = false;
  preguntasRespondidas: number = 0;
  examenIniciado: boolean = false; 
  tiempoInicialEnSegundos: number = 0; 
  tiempoRestanteEnSegundos: number = this.tiempoInicialEnSegundos;
  intervaloContador: any;
  botonTexto: string = 'Simulador examen'; 
  examenEnCurso: boolean = false;
  feedbackCadaXPreguntas: number = 10; 
  feedbackListo: boolean = false; 
  porcentajeIdeal: number = 70; 
  feedbackMensaje: string = ''; 
  mostrarFeedback: boolean = false; 
  enRevision: boolean = false;  
  preguntasIncorrectas: any[] = []; 
  preguntasRespondidasSet: Set<number> = new Set<number>();
  mostrarModal = false;
  numPreguntas: number = 0; 
  tiempoContador: string = ''; 
  numPreguntasAleatorias: number  = 1000;
  mostrarBotonSetear: boolean = false; 
  isModalOpen: boolean = false; 
  horas: number = 0;
  minutos: number = 0;
  cantidadPreguntasDisponibles: number = 0;
  preguntasSeleccionadas: any[] = [];
  collectionName: string = ''; 
  botonEmpezarVisible = false; 
  textoBoton: string = 'Simulador examen'; 
  mostrarBotonEmpezar: boolean = false; 
  preguntas: any[] = [];
  cantidadPreguntasSeleccionadas: number = 0;

  constructor(
    private route: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    private verCuestionariosService: VerCuestionariosService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.mostrarBotonMarcar = false;
    this.route.queryParams.subscribe((params: Params) => {
      if (params['collection']) {
        this.selectedCollection = params['collection'];
        this.loadDocumentos(this.selectedCollection);
        console.log('Collection Name:', this.selectedCollection);
  
        // Recuperar parametros almacenados 
        const numPreguntas = localStorage.getItem(`${this.selectedCollection}_numPreguntas`);
        const horas = localStorage.getItem(`${this.selectedCollection}_horas`);
        const minutos = localStorage.getItem(`${this.selectedCollection}_minutos`);
        const tiempoInicial = localStorage.getItem(`${this.selectedCollection}_tiempoInicialEnSegundos`);
        if (numPreguntas) this.numPreguntas = parseInt(numPreguntas, 10);
        if (horas) this.horas = parseInt(horas, 10);
        if (minutos) this.minutos = parseInt(minutos, 10);
        if (tiempoInicial) this.tiempoInicialEnSegundos = parseInt(tiempoInicial, 10);
      }
    });
  }

  ngAfterViewInit(): void {
    this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
        //  parámetros de consulta 
        this.activatedRoute.queryParams.subscribe(params => {
            const collection = params['collection'];
            if (this.router.url.includes('/simuladores-admin/simulador') && collection === this.selectedCollection) {
                this.botonEmpezarVisible = true;
                this.iniciarExamen();
                this.mostrarBotonEmpezar = true;
            }
        });
    });
}

  onSeleccionarColeccion(nombreColeccion: string): void {
    this.selectedCollection = nombreColeccion;
    this.loadDocumentos(nombreColeccion);
  }

  loadDocumentos(collectionName: string): void {
    this.verCuestionariosService.getDocumentos(collectionName).subscribe(
        data => {
            this.todosDocumentos = data.map((doc: any) => ({
                ...doc,
                mostrarRespuesta: false,
                opciones: [
                    { texto: doc.opcion_a, seleccionada: false, letra: 'A', respuestaIncorrecta: false },
                    { texto: doc.opcion_b, seleccionada: false, letra: 'B', respuestaIncorrecta: false },
                    { texto: doc.opcion_c, seleccionada: false, letra: 'C', respuestaIncorrecta: false }
                ]
            }));
            this.documentos = [...this.todosDocumentos];
            this.activatedRoute.queryParams.subscribe(params => {
                const collection = params['collection'];
                this.examenEnCurso = true;
                if (this.router.url.includes('/simuladores-admin/simulador') && collection === this.selectedCollection) {
                    this.iniciarExamen();
                    this.examenIniciado = false; 
                    this.mostrarBotonEmpezar = true;
                }
            });
        }
    );
}

  onCompletoMecanicaGeneralClick(): void {
    this.mostrarRespuestas = false;
    this.router.navigate(['/simuladores-admin/completo'], { queryParams: { collection: this.selectedCollection } });
    this.mostrarRespuestaCompleta = false;
    this.mostrarEtiquetaRespuesta = false;
    this.mostrarBotonMarcar = false;
    this.mostrarBotonSetear = false;
    this.documentos = this.todosDocumentos.sort((a, b) => a.id - b.id);
    this.examenEnCurso = true
  }

  onCuestionarioMecanicaGeneralRespuestaClick(): void {
      //ruta 
      this.router.navigate(['/simuladores-admin/simulador'], { queryParams: { collection: this.selectedCollection } });
      this.mostrarBotonEmpezar = true;
      this.examenEnCurso = false;
      // estado botón Empezar examen
      this.textoBoton = 'Empezar examen';
     this.examenIniciado = false; 
     this.examenEnCurso = false
    this.examenIniciado = false; 
    }

  getRandomSubset(array: any[], size: number): any[] {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, size);
  }

  encontrarOpcionCorrecta(respuesta: string, opcionA: string, opcionB: string, opcionC: string): string | null {
    if (!respuesta || typeof respuesta !== 'string') {
      return null;
    }
    const trimmedRespuesta = respuesta.trim();
    const trimOpcionA = opcionA ? opcionA.toString().trim() : '';
    const trimOpcionB = opcionB ? opcionB.toString().trim() : '';
    const trimOpcionC = opcionC ? opcionC.toString().trim() : '';
    if (trimmedRespuesta === trimOpcionA) {
      return 'A';
    } else if (trimmedRespuesta === trimOpcionB) {
      return 'B';
    } else if (trimmedRespuesta === trimOpcionC) {
      return 'C';
    } else {
      return null;
    }
  }

  iniciarExamen(): void {
    this.mostrarRespuestas = true;
    this.mostrarRespuestaCompleta = false;
    this.mostrarEtiquetaRespuesta = false;
    this.mostrarBotonMarcar = true;
    this.examenIniciado = false; 
    this.examenEnCurso = false; 
    const numeroDePreguntas = Math.min(this.numPreguntas, this.documentos.length); 
    this.documentos = this.getRandomSubset(this.documentos, numeroDePreguntas);
    this.documentos.sort((a, b) => a.id - b.id);
  }

  empezar(): void {
    this.mostrarRespuestas = true;
    this.mostrarRespuestaCompleta = false;
    this.mostrarEtiquetaRespuesta = false;
    this.mostrarBotonMarcar = true;
    this.examenIniciado = true; 
    this.examenEnCurso = true; 
    const numeroDePreguntas = Math.min(this.numPreguntas, this.documentos.length);
    this.iniciarContador(); 
    this.documentos = this.getRandomSubset(this.documentos, numeroDePreguntas);
    this.documentos.sort((a, b) => a.id - b.id);
  }

  marcarOpcionCorrecta(pregunta: any): void {
    const respuestaCorrecta = this.encontrarOpcionCorrecta(pregunta.respuesta, pregunta.opcion_a, pregunta.opcion_b, pregunta.opcion_c);
    pregunta.respuestaMarcada = respuestaCorrecta;
  }

  onOpcionSeleccionada(pregunta: any, opcion: any): void {
    pregunta.opciones.forEach((op: any) => {
      if (op !== opcion) {
        op.seleccionada = false;
      }
    });
    const respuestaCorrecta = this.encontrarOpcionCorrecta(pregunta.respuesta, pregunta.opciones[0].texto, pregunta.opciones[1].texto, pregunta.opciones[2].texto);
    const esCorrecta = respuestaCorrecta === opcion.letra;
    if (!pregunta.respondida) {
      if (esCorrecta) {
        this.respuestasCorrectas++;
      }
      this.preguntasRespondidas++;
      this.preguntasRespondidasSet.add(pregunta.id);
      pregunta.respondida = true;
    }
    this.mostrarFeedbackCadaXPreguntas();
  }

  calificar(): void {
    this.preguntasRespondidas = 0;
    this.respuestasCorrectas = 0;
    this.documentos.forEach((pregunta: any) => {
      const opcionSeleccionada = pregunta.opciones.find((op: any) => op.seleccionada);
      if (opcionSeleccionada) {
        this.preguntasRespondidas++;
        const respuestaCorrecta = this.encontrarOpcionCorrecta(pregunta.respuesta, pregunta.opciones[0].texto, pregunta.opciones[1].texto, pregunta.opciones[2].texto);
        if (respuestaCorrecta === opcionSeleccionada.letra) {
          this.respuestasCorrectas++;
        }
      }
    });
    this.mostrarFeedbackCadaXPreguntas();
    this.mostrarCalificacion = true;
  }

  revisar(): void {
    this.preguntasRespondidas = 0;
    this.respuestasCorrectas = 0;

    this.documentos.forEach((pregunta: any) => {
      const opcionSeleccionada = pregunta.opciones.find((op: any) => op.seleccionada);
      if (opcionSeleccionada) {
        this.preguntasRespondidas++;
        const respuestaCorrecta = this.encontrarOpcionCorrecta(pregunta.respuesta, pregunta.opciones[0].texto, pregunta.opciones[1].texto, pregunta.opciones[2].texto);
        if (respuestaCorrecta === opcionSeleccionada.letra) {
          this.respuestasCorrectas++;
        }
      }
    });

    //  formulario de calificación
    this.mostrarFeedbackCadaXPreguntas();
    this.mostrarCalificacion = true;
  }
  iniciarContador(): void {
    if (this.tiempoInicialEnSegundos === 0) {
      const horasEnSegundos = this.horas * 3600;
      const minutosEnSegundos = this.minutos * 60;
      this.tiempoInicialEnSegundos = horasEnSegundos + minutosEnSegundos;
    }
    this.tiempoRestanteEnSegundos = this.tiempoInicialEnSegundos;
    
    // formato horas:minutos
    const tiempoInicial = this.convertirSegundosAHorasMinutos(this.tiempoInicialEnSegundos);
    this.intervaloContador = setInterval(() => {
      if (this.tiempoRestanteEnSegundos > 0) {
        this.tiempoRestanteEnSegundos--;
      } else {
        this.detenerContador();
      }
    }, 1000);
  }

  convertirSegundosAHorasMinutos(segundos: number): { horas: number, minutos: number } {
    const horas = Math.floor(segundos / 3600);
    const minutos = Math.floor((segundos % 3600) / 60);
    return { horas, minutos };
  }
detenerContador(): void {
  clearInterval(this.intervaloContador);
}

  finalizarExamen(): void {
    clearInterval(this.intervaloContador);
    this.examenEnCurso = false;
    this.enRevision = true;
  }

  mostrarFeedbackCadaXPreguntas(): void {
    if (this.preguntasRespondidas > 0 && this.preguntasRespondidas % this.feedbackCadaXPreguntas === 0 && !this.feedbackListo) {
      const porcentajeRespuestasCorrectas = (this.respuestasCorrectas / this.preguntasRespondidas) * 100;
      this.feedbackMensaje = `Has respondido correctamente ${porcentajeRespuestasCorrectas.toFixed(2)}% de las preguntas.`;
      if (porcentajeRespuestasCorrectas >= this.porcentajeIdeal) {
        this.feedbackMensaje += ' ¡Buen trabajo! Estás por encima del margen ideal del 70%.';
      } else {
        this.feedbackMensaje += ' Sigue practicando para alcanzar el margen ideal del 70%.';
      }
      this.mostrarFeedback = true;
      this.feedbackListo = true;
      setTimeout(() => {
        this.mostrarFeedback = false;
        this.feedbackListo = false;
      }, 5000);
    }
  }

  getTiempoRestanteFormato(): string {
    const horas = Math.floor(this.tiempoRestanteEnSegundos / 3600);
    const minutos = Math.floor((this.tiempoRestanteEnSegundos % 3600) / 60);
    const segundos = this.tiempoRestanteEnSegundos % 60;
    return `${this.formatearTiempo(horas)}:${this.formatearTiempo(minutos)}:${this.formatearTiempo(segundos)}`;
  }

  formatearTiempo(valor: number): string {
    return valor < 10 ? `0${valor}` : valor.toString();
  }
  

  resetExam(): void {
    this.tiempoRestanteEnSegundos = this.tiempoInicialEnSegundos;
    clearInterval(this.intervaloContador);
    this.examenEnCurso = false;
    this.examenIniciado = false;

    this.documentos.forEach((doc: any) => {
      doc.opciones.forEach((opcion: any) => {
        opcion.seleccionada = false;
        opcion.respuestaIncorrecta = false;
      });
      doc.respondida = false;
    });

    this.preguntasRespondidasSet.clear();
    this.preguntasRespondidas = 0;
    this.respuestasCorrectas = 0;
    this.mostrarFeedback = false;
  }


// Cerrar el formulario de calificación
  cerrarCalificacion(): void {
    this.mostrarCalificacion = false;
    this.enRevision = false;
  }
 // Desmarcar todas las respuestas 
  Reiniciar(): void {
    this.documentos.forEach((pregunta: any) => {
      pregunta.opciones.forEach((opcion: any) => {
        opcion.seleccionada = false; // Desmarcar cada opción seleccionada
        opcion.respuestaIncorrecta = false; // Reiniciar marcado de respuesta incorrecta
      });
      pregunta.respuestaMarcada = null; // Desmarcar respuesta marcada
    });
    this.mostrarCalificacion = false;
    this.mostrarRespuestas = false;
    this.mostrarRespuestaCompleta = true;
    this.mostrarEtiquetaRespuesta = true;

    // Volver al inicio de la página (pregunta 1)
    window.scrollTo(0, 0);
  }

  verRespuestasIncorrectas(): void {
    this.enRevision = true;
    this.preguntasIncorrectas = []; // Resetear la lista de preguntas 
    this.documentos.forEach((pregunta: any) => {
      if (pregunta.respondida) {
        const respuestaCorrecta = this.encontrarOpcionCorrecta(pregunta.respuesta, pregunta.opciones[0].texto, pregunta.opciones[1].texto, pregunta.opciones[2].texto);
        pregunta.opciones.forEach((opcion: any) => {
          if (opcion.seleccionada && opcion.letra !== respuestaCorrecta) {
            pregunta.opciones.forEach((op: any) => {
              if (op.letra === respuestaCorrecta) {
                op.esCorrecta = true;
              } else if (op === opcion) {
                op.esIncorrecta = true;
              }
            });
            this.preguntasIncorrectas.push(pregunta);
          }
        });
      }
    });

    if (this.preguntasIncorrectas.length > 0) {
      this.scrollToPreguntaIncorrecta(0);
    }
  }

  scrollToPreguntaIncorrecta(index: number): void {
    setTimeout(() => {
      const element = document.getElementById(`pregunta-${index}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 0);
  }

  formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(secs)}`;
  }
  
  pad(num: number): string {
    return (num < 10 ? '0' : '') + num;
  }

  getCurrentUrl(): string {
    return this.router.url;
  }

    loadFromLocalStorage(): void {
      // Obtener el nombre 
      const collectionName = localStorage.getItem('collectionName');
      if (collectionName) {
        // Recuperar datos específicos para la colección seleccionada
        const numQuestions = localStorage.getItem(`${collectionName}_numPreguntas`);
        const horas = localStorage.getItem(`${collectionName}_horas`);
        const minutos = localStorage.getItem(`${collectionName}_minutos`);
        if (numQuestions !== null && horas !== null && minutos !== null) {
          // parametros
          this.selectedCollection = collectionName;
          this.numPreguntas = parseInt(numQuestions, 10);
          this.tiempoInicialEnSegundos = parseInt(horas, 10) * 3600 + parseInt(minutos, 10) * 60;
          // Cargar documentos 
          this.loadDocumentos(this.selectedCollection);
        } else {
          console.log('no datos');
        }
      } else {
        console.log('no datos');
      }
    }




  }




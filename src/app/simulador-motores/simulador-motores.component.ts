// simulador-motores component
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { VerCuestionariosService } from '../ver-cuestionarios.service';

@Component({
  selector: 'app-simulador-motores',
  templateUrl: './simulador-motores.component.html',
  styleUrls: ['./simulador-motores.component.css']
})
export class SimuladorMotoresComponent implements OnInit {
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
  tiempoInicialEnSegundos: number = 2 * 60 * 60; 
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
  preguntasRespondidasSet = new Set<number>();
  constructor(
    private verCuestionariosService: VerCuestionariosService,
    private router: Router, 
    private route: ActivatedRoute,
  ) {}
  
  ngOnInit(): void {
    this.mostrarBotonMarcar = false; 
    this.mostrarRespuestaCompleta = false;
    this.mostrarEtiquetaRespuesta = false;
    this.obtenerDocumentos('Mecanica Motores');
  }
 
  ngAfterViewInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/simuladorMotores/iniciar') {
          this.iniciarExamenAleatorio();
        }
      }
    });
  }
 
  obtenerDocumentos(nombreColeccion: string): void {
    this.verCuestionariosService.getDocumentos(nombreColeccion).subscribe(
      data => {
        this.documentosOriginales = data.map((doc: any) => ({
          ...doc,
          mostrarRespuesta: false,
          opciones: [
            { texto: doc.opcion_a, seleccionada: false, letra: 'A', respuestaIncorrecta: false },
            { texto: doc.opcion_b, seleccionada: false, letra: 'B', respuestaIncorrecta: false },
            { texto: doc.opcion_c, seleccionada: false, letra: 'C', respuestaIncorrecta: false }
          ]
        }));
        this.documentos = this.documentosOriginales;
        if (this.router.url === '/simuladorMotores/iniciar') {
          this.iniciarExamenAleatorio();
          this.botonTexto = 'Empezar examen'; // texto del botón 
        }
      },
      error => {
        console.error('Error al obtener los documentos:', error);
      }
    );
  }
  onCuestionarioMecanicaGeneralRespuestaClick(): void {
    if (this.botonTexto === 'Simulador examen') {
      this.router.navigateByUrl('/simuladorMotores/iniciar');
      this.botonTexto = 'Empezar examen';
      this.examenIniciado = false; 
    } else if (this.botonTexto === 'Empezar examen') {
      this.iniciarExamen(); 
    }
  }
  
  iniciarExamenAleatorio(): void {
    this.mostrarRespuestas = true;
    this.mostrarRespuestaCompleta = false;
    this.mostrarEtiquetaRespuesta = false;
    this.mostrarBotonMarcar = true;
    this.examenIniciado = true;
    // 100 preguntas aleatorias
    this.documentos = this.getRandomSubset(this.documentosOriginales, 100);
    this.mostrarBotonMarcar = true;
    // Ordenar  ascendente por 'id'
    this.documentos.sort((a, b) => a.id - b.id);
    console.log('Mostrando 100 preguntas aleatorias...');
  }
//aleatorio 
getRandomSubset(array: any[], size: number): any[] {
  const shuffled = array.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, size);
}

  onCompletoMecanicaGeneralClick(): void {
    this.mostrarRespuestas = false;
    this.mostrarRespuestaCompleta = false;
    this.mostrarEtiquetaRespuesta = false;
    this.mostrarBotonMarcar = false;
    this.router.navigateByUrl('/simuladorMotores/completo');
    this.documentos = this.documentosOriginales.sort((a, b) => a.id - b.id); // Ordenar preguntas  ascendente
    console.log('Restableciendo a modo normal...');
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

  marcarOpcionCorrecta(pregunta: any): void {
    const respuestaCorrecta = this.encontrarOpcionCorrecta(pregunta.respuesta, pregunta.opcion_a, pregunta.opcion_b, pregunta.opcion_c);
    pregunta.respuestaMarcada = respuestaCorrecta;
  }
 // Desmarcar  opcion cuando se selecciona una nueva opción
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
    // formulario de calificación
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
    //formulario de calificación
    this.mostrarFeedbackCadaXPreguntas();
    this.mostrarCalificacion = true;
  }

 // Cerrar el formulario de calificación
  cerrarCalificacion(): void {
    this.mostrarCalificacion = false;
    this.enRevision = false;
  }

   // reiniciar
  Reiniciar(): void {
    this.documentos.forEach((pregunta: any) => {
      pregunta.opciones.forEach((opcion: any) => {
        opcion.seleccionada = false; 
        opcion.respuestaIncorrecta = false; 
      });
      pregunta.respuestaMarcada = null; 
    });
    this.mostrarCalificacion = false;
    this.mostrarRespuestas = false;
    this.mostrarRespuestaCompleta = true;
    this.mostrarEtiquetaRespuesta = true;
    window.scrollTo(0, 0); // ventana al inicio de la página
  }
  verRespuestasIncorrectas(): void {
    this.enRevision = true;
    this.preguntasIncorrectas = []; 
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

  iniciarExamen(): void {
    this.examenEnCurso = true; 
    this.iniciarContador();
    console.log('Examen iniciado, puedes seleccionar respuestas.');
  }
   // iniciar el contador
 iniciarContador(): void {
  this.intervaloContador = setInterval(() => {
    this.tiempoRestanteEnSegundos--;
    if (this.tiempoRestanteEnSegundos <= 0) {
      this.detenerContador();
    }
  }, 1000); 
}
// detener el contador
detenerContador(): void {
  clearInterval(this.intervaloContador);
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


  mostrarFeedbackCadaXPreguntas(): void {
    const preguntasRespondidasReales = this.preguntasRespondidasSet.size;
  
    if (preguntasRespondidasReales % this.feedbackCadaXPreguntas === 0 && preguntasRespondidasReales > 0) {
      const porcentaje = (this.respuestasCorrectas / preguntasRespondidasReales) * 100;
      this.feedbackMensaje = `Llevas ${preguntasRespondidasReales} preguntas respondidas. Tu porcentaje actual es ${porcentaje.toFixed(2)}%.`;
  
      if (porcentaje >= this.porcentajeIdeal) {
        this.feedbackMensaje += ' ¡Vas bien!';
      } else {
        this.feedbackMensaje += ' Deberías mejorar para alcanzar el 70% de respuestas correctas.';
  
        // Verificar si ya no es posible alcanzar el 70%
        const preguntasRestantes = this.documentos.length - preguntasRespondidasReales;
        const respuestasNecesarias = Math.ceil(this.documentos.length * (this.porcentajeIdeal / 100)) - this.respuestasCorrectas;
        if (respuestasNecesarias > preguntasRestantes) {
          this.feedbackMensaje += ' Es matemáticamente imposible alcanzar el 70% de respuestas correctas.';
          this.feedbackMensaje += ' Te recomendamos reintentar el examen.';
        }
      }
      this.mostrarFeedback = true; // Mostrar  mensaje de feedback
    } else {
      this.mostrarFeedback = false; // Ocultar mensaje de feedback 
    }
  }
  // reiniciar el feedback
  reiniciarFeedback(): void {
    this.feedbackMensaje = '';
    this.mostrarFeedback = false;
  }
}

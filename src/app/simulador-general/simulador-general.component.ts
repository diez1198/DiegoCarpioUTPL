import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { VerCuestionariosService } from '../ver-cuestionarios.service';

@Component({
  selector: 'app-simulador-general',
  templateUrl: './simulador-general.component.html',
  styleUrls: ['./simulador-general.component.css']
})
export class SimuladorGeneralComponent implements OnInit {
  documentos: any[] = [];
  documentosOriginales: any[] = [];
  mostrarRespuestas: boolean = false;
  mostrarRespuestaCompleta: boolean = true;
  mostrarEtiquetaRespuesta: boolean = true;
  mostrarBotonMarcar: boolean = true;
  respuestasCorrectas: number = 0;
  mostrarCalificacion: boolean = false;
  preguntasRespondidas: number = 0;
  examenIniciado: boolean = false; // Bandera para controlar el inicio del examen aleatorio
  tiempoInicialEnSegundos: number = 2 * 60 * 60; // 2 horas en segundos
  tiempoRestanteEnSegundos: number = this.tiempoInicialEnSegundos;
  intervaloContador: any;
  botonTexto: string = 'Simulador examen'; // Variable para controlar el texto del botón
  examenEnCurso: boolean = false;
  feedbackCadaXPreguntas: number = 10; // Cantidad de preguntas para dar feedback
  feedbackListo: boolean = false; // Bandera para controlar cuándo mostrar el feedback
  porcentajeIdeal: number = 70; // Porcentaje ideal de respuestas correctas
  feedbackMensaje: string = ''; // Mensaje de feedback a mostrar
  mostrarFeedback: boolean = false; // Bandera para controlar la visibilidad del feedback
  enRevision: boolean = false;  // Nueva propiedad
  preguntasIncorrectas: any[] = []; // Preguntas respondidas incorrectamente
  preguntasRespondidasSet = new Set<number>();
  constructor(
    private verCuestionariosService: VerCuestionariosService,
    private router: Router, 
    private route: ActivatedRoute,
  ) {}

  
  
  
  ngOnInit(): void {
    
    this.mostrarBotonMarcar = false; // Asegúrate de que esta inicialización es correcta
    this.mostrarRespuestaCompleta = false;
    this.mostrarEtiquetaRespuesta = false;
    this.obtenerDocumentos('Mecanica General');
  }










  ngAfterViewInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/simuladorGeneral/iniciar') {
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
        if (this.router.url === '/simuladorGeneral/iniciar') {
          this.iniciarExamenAleatorio();
          this.botonTexto = 'Empezar examen'; // Cambiar el texto del botón al cargar la página
        }
      },
      error => {
        console.error('Error al obtener los documentos:', error);
      }
    );
  }














  onCuestionarioMecanicaGeneralRespuestaClick(): void {
    if (this.botonTexto === 'Simulador examen') {
      this.router.navigateByUrl('/simuladorGeneral/iniciar');
      this.botonTexto = 'Empezar examen';
      this.examenIniciado = false; // Asegúrate de restablecer el estado de examenIniciado
    } else if (this.botonTexto === 'Empezar examen') {
      this.iniciarExamen(); // Iniciar el examen sin cambiar las preguntas
    }
  }

 



  
  iniciarExamenAleatorio(): void {
    this.mostrarRespuestas = true;
    this.mostrarRespuestaCompleta = false;
    this.mostrarEtiquetaRespuesta = false;
    this.mostrarBotonMarcar = true;
    this.examenIniciado = true;

    // Seleccionar 100 preguntas aleatorias
    this.documentos = this.getRandomSubset(this.documentosOriginales, 100);
    this.mostrarBotonMarcar = true;
    // Ordenar las preguntas en orden ascendente por el campo 'id'
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
    this.router.navigateByUrl('/simuladorGeneral/completo');
    this.documentos = this.documentosOriginales.sort((a, b) => a.id - b.id); // Ordenar todas las preguntas en forma ascendente
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



  onOpcionSeleccionada(pregunta: any, opcion: any): void {
    // Desmarcar las otras opciones cuando se selecciona una nueva opción
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

    console.log('Opción seleccionada:', opcion);
    console.log('¿La opción seleccionada es correcta?', esCorrecta);

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
    // Mostrar el formulario de calificación
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
    // Mostrar el formulario de calificación
    this.mostrarFeedbackCadaXPreguntas();
    this.mostrarCalificacion = true;
  }













  cerrarCalificacion(): void {
    // Cerrar el formulario de calificación
    this.mostrarCalificacion = false;
    this.enRevision = false;
  }










  Reiniciar(): void {
    // Desmarcar todas las respuestas y restablecer otras variables
    this.documentos.forEach((pregunta: any) => {
      pregunta.opciones.forEach((opcion: any) => {
        opcion.seleccionada = false; // Desmarcar cada opción seleccionada
        opcion.respuestaIncorrecta = false; // Reiniciar marcado de respuesta incorrecta
      });
      pregunta.respuestaMarcada = null; // Desmarcar respuesta marcada
    });

    // Restablecer otros estados si es necesario
    this.mostrarCalificacion = false;
    this.mostrarRespuestas = false;
    this.mostrarRespuestaCompleta = true;
    this.mostrarEtiquetaRespuesta = true;

    // Volver al inicio de la página (pregunta 1)
    window.scrollTo(0, 0); // Mueve la ventana al inicio de la página
  }













  verRespuestasIncorrectas(): void {
    this.enRevision = true;
    this.preguntasIncorrectas = []; // Reseteamos la lista de preguntas incorrectas
    
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
    this.examenEnCurso = true; // Permitir seleccionar respuestas
    this.iniciarContador(); // Iniciar el contador al empezar el examen
    console.log('Examen iniciado, puedes seleccionar respuestas.');
  }










 // Método para iniciar el contador
 iniciarContador(): void {
  this.intervaloContador = setInterval(() => {
    this.tiempoRestanteEnSegundos--;
    if (this.tiempoRestanteEnSegundos <= 0) {
      this.detenerContador();
    }
  }, 1000); // Actualiza el contador cada segundo (1000 ms)
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
      this.mostrarFeedback = true; // Mostrar el mensaje de feedback
    } else {
      this.mostrarFeedback = false; // Ocultar el mensaje de feedback si no se debe mostrar
    }
  }



  // para reiniciar el feedback
  reiniciarFeedback(): void {
    this.feedbackMensaje = '';
    this.mostrarFeedback = false;
  }
  


}

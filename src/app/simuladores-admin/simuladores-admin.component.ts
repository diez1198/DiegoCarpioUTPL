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

  todosDocumentos: any[] = []; //Almacenar todos los documentos
  
  activeMenuItem: string = ''; // Agrega esta línea
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
  examenIniciado: boolean = false; // controlar el inicio del examen aleatorio
  tiempoInicialEnSegundos: number = 0; // Inicializar como 0 o un valor por defecto
  tiempoRestanteEnSegundos: number = this.tiempoInicialEnSegundos;
  intervaloContador: any;
  botonTexto: string = 'Simulador examen'; // controlar el texto del botón
  examenEnCurso: boolean = false;
  feedbackCadaXPreguntas: number = 10; // Cantidad de preguntas para dar feedback
  feedbackListo: boolean = false; // controlar cuándo mostrar el feedback
  porcentajeIdeal: number = 70; // Porcentaje respuestas correctas
  feedbackMensaje: string = ''; // Mensaje de feedback a mostrar
  mostrarFeedback: boolean = false; // visibilidad del feedback
  enRevision: boolean = false;  
  preguntasIncorrectas: any[] = []; // Preguntas respondidas incorrectamente
  preguntasRespondidasSet: Set<number> = new Set<number>();
  mostrarModal = false;
  numPreguntas: number = 0; // Inicializado con un valor predeterminado
  tiempoContador: string = ''; // Inicializado con un valor predeterminado
  numPreguntasAleatorias: number  = 1000;// Valor predeterminado
  mostrarBotonSetear: boolean = false; // Inicialmente el botón de setear está visible
  isModalOpen: boolean = false; // Estado del modal
  horas: number = 0;
  minutos: number = 0;
  cantidadPreguntasDisponibles: number = 0;
  preguntasSeleccionadas: any[] = [];
  collectionName: string = ''; 
  botonEmpezarVisible = false; //  "Empezar" está oculto
  textoBoton: string = 'Simulador examen'; // O cualquier valor inicial predeterminado
  mostrarBotonEmpezar: boolean = false; // Estado del botón
 
 

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
  
        // Recuperar valores almacenados para la colección seleccionada
        const numPreguntas = localStorage.getItem(`${this.selectedCollection}_numPreguntas`);
        const horas = localStorage.getItem(`${this.selectedCollection}_horas`);
        const minutos = localStorage.getItem(`${this.selectedCollection}_minutos`);
        const tiempoInicial = localStorage.getItem(`${this.selectedCollection}_tiempoInicialEnSegundos`);
  
        console.log('numPreguntas:', numPreguntas);
        console.log('horas:', horas);
        console.log('minutos:', minutos);
        console.log('tiempoInicial:', tiempoInicial);
  
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
        // Obtén los parámetros de consulta de la ruta actual
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

            // Verificar la URL actual y los parámetros de consulta
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
    
    console.log('Selected Collection before navigation:', this.selectedCollection); // Verifica el valor
  
    // Usa this.selectedCollection para actualizar la URL
    this.router.navigate(['/simuladores-admin/completo'], { queryParams: { collection: this.selectedCollection } });
    
    this.mostrarRespuestaCompleta = false;
    this.mostrarEtiquetaRespuesta = false;
    this.mostrarBotonMarcar = false;
    this.mostrarBotonSetear = false;
    
    this.documentos = this.todosDocumentos.sort((a, b) => a.id - b.id);
    console.log('Restableciendo a modo normal...');
    this.examenEnCurso = true
  }







  onCuestionarioMecanicaGeneralRespuestaClick(): void {
  
      // Navega a la ruta especificada con los parámetros de consulta
      this.router.navigate(['/simuladores-admin/simulador'], { queryParams: { collection: this.selectedCollection } });
      this.mostrarBotonEmpezar = true;
      this.examenEnCurso = false;
      // Actualiza el estado para mostrar el botón "Empezar examen"
      this.textoBoton = 'Empezar examen';
     this.examenIniciado = false; 
    
     this.examenEnCurso = false
   
      // Llama al método para iniciar el examen
      
  
      // Asegúrate de que el botón de empezar siga visible si es necesario
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
    this.examenIniciado = false; // Cambiado a true para reflejar que el examen ha comenzado
    this.examenEnCurso = false; // Cambiado a true para reflejar que el examen está en curso
    
    // Asegúrate de que el número de preguntas no exceda el tamaño de la lista
    const numeroDePreguntas = Math.min(this.numPreguntas, this.documentos.length);
 
    // Usar el número de preguntas ingresado por el usuario
    this.documentos = this.getRandomSubset(this.documentos, numeroDePreguntas);
    this.documentos.sort((a, b) => a.id - b.id);
    console.log(`Mostrando ${numeroDePreguntas} preguntas aleatorias...`);
  
    // Iniciar el contador
    

   


  }

  empezar(): void {
    this.mostrarRespuestas = true;
    this.mostrarRespuestaCompleta = false;
    this.mostrarEtiquetaRespuesta = false;
    this.mostrarBotonMarcar = true;
    this.examenIniciado = true; // Cambiado a true para reflejar que el examen ha comenzado
    this.examenEnCurso = true; // Cambiado a true para reflejar que el examen está en curso
    
    // Asegúrate de que el número de preguntas no exceda el tamaño de la lista
    const numeroDePreguntas = Math.min(this.numPreguntas, this.documentos.length);
    this.iniciarContador(); 
    // Usar el número de preguntas ingresado por el usuario
    this.documentos = this.getRandomSubset(this.documentos, numeroDePreguntas);
    this.documentos.sort((a, b) => a.id - b.id);
    console.log(`Mostrando ${numeroDePreguntas} preguntas aleatorias...`);
  
    // Iniciar el contador
    
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
  iniciarContador(): void {
    // Convertir horas y minutos a segundos si no hay valor almacenado
    if (this.tiempoInicialEnSegundos === 0) {
      const horasEnSegundos = this.horas * 3600;
      const minutosEnSegundos = this.minutos * 60;
      this.tiempoInicialEnSegundos = horasEnSegundos + minutosEnSegundos;
    }
  
    this.tiempoRestanteEnSegundos = this.tiempoInicialEnSegundos;
    
    // Convertir tiempo inicial a formato horas:minutos
    const tiempoInicial = this.convertirSegundosAHorasMinutos(this.tiempoInicialEnSegundos);
    console.log(`Tiempo inicial del contador: ${tiempoInicial.horas} horas y ${tiempoInicial.minutos} minutos`);
  
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
    this.preguntasIncorrectas = []; // Resetear la lista de preguntas incorrectas
    
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
      // Obtener el nombre de la colección desde localStorage
      const collectionName = localStorage.getItem('collectionName');
      console.log('Nombre de la colección recuperado de localStorage:', collectionName);
    
      if (collectionName) {
        // Recuperar datos específicos para la colección seleccionada
        const numQuestions = localStorage.getItem(`${collectionName}_numPreguntas`);
        const horas = localStorage.getItem(`${collectionName}_horas`);
        const minutos = localStorage.getItem(`${collectionName}_minutos`);
    
        console.log('Recuperando datos de localStorage para la colección:', collectionName);
        console.log('Número de preguntas:', numQuestions);
        console.log('Horas:', horas);
        console.log('Minutos:', minutos);
    
        if (numQuestions !== null && horas !== null && minutos !== null) {
          // Procesar los datos recuperados y configurar la aplicación
          this.selectedCollection = collectionName;
          this.numPreguntas = parseInt(numQuestions, 10);
          this.tiempoInicialEnSegundos = parseInt(horas, 10) * 3600 + parseInt(minutos, 10) * 60;
    
          console.log('Datos recuperados y configurados:');
          console.log('selectedCollection:', this.selectedCollection);
          console.log('numPreguntas:', this.numPreguntas);
          console.log('tiempoInicialEnSegundos:', this.tiempoInicialEnSegundos);
          console.log('horas:', Math.floor(this.tiempoInicialEnSegundos / 3600));
          console.log('minutos:', Math.floor((this.tiempoInicialEnSegundos % 3600) / 60));
    
          // Cargar documentos basados en la colección seleccionada
          this.loadDocumentos(this.selectedCollection);
        } else {
          console.log('No se encontraron datos específicos para la colección en localStorage');
        }
      } else {
        console.log('No se encontró el nombre de la colección en localStorage');
      }
    }




  }




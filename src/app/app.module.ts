import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router'; 
import { AppComponent } from './app.component';
import { CuestionarioGeneralComponent } from './cuestionario-general/cuestionario-general.component';
import { CuestionarioFuselajeComponent } from './cuestionario-fuselaje/cuestionario-fuselaje.component';
import { CuestionarioMotoresComponent } from './cuestionario-motores/cuestionario-motores.component';
import { Rdac65Component } from './rdac65/rdac65.component';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { HttpClientModule } from '@angular/common/http';
import { SimuladorGeneralComponent } from './simulador-general/simulador-general.component';
import { SimuladorMecanicaGeneralComponent } from './simulador-mecanica-general/simulador-mecanica-general.component';
import { TraerMecanicaGeneralService } from './traer-mecanica-general.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { SuperAdministradorComponent } from './super-administrador/super-administrador.component';
import { LoginAdministradorComponent } from './login-administrador/login-administrador.component';
import { CuestionariosDisponiblesService } from './cuestionarios-disponibles.service';
import { EliminarCuestionarioComponent } from './eliminar-cuestionario/eliminar-cuestionario.component';
import { NuevoCuestionarioComponent } from './nuevo-cuestionario/nuevo-cuestionario.component';
import { MostrarEliminarCuestionariosService } from './eliminar-cuestionario/eliminar-cuestionario.service';
import { NuevaPreguntaComponent } from './nueva-pregunta/nueva-pregunta.component';
import { VerCuestionariosComponent } from './ver-cuestionarios/ver-cuestionarios.component';






@NgModule({
  declarations: [
    AppComponent,
    CuestionarioGeneralComponent, // Agrega CuestionarioGeneralComponent aquí
    CuestionarioFuselajeComponent,
    CuestionarioMotoresComponent,
    Rdac65Component,
    SimuladorGeneralComponent,
    SimuladorMecanicaGeneralComponent,
    SuperAdministradorComponent,
    LoginAdministradorComponent,
    NuevoCuestionarioComponent,
    EliminarCuestionarioComponent,
    NuevaPreguntaComponent,
    VerCuestionariosComponent,
  
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, // Agrega FormsModule al arreglo de imports
    HttpClientModule, 
    BrowserAnimationsModule, // Agrega HttpClientModule al arreglo de imports
    BsDropdownModule.forRoot(),
    RouterModule,
    
  ],
  providers: [
    TraerMecanicaGeneralService,
    CuestionariosDisponiblesService,
    MostrarEliminarCuestionariosService
   

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

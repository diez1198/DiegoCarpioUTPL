import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router'; 
import { AppComponent } from './app.component';
import { CuestionarioGeneralComponent } from './cuestionario-general/cuestionario-general.component';
import { CuestionarioFuselajeComponent } from './cuestionario-fuselaje/cuestionario-fuselaje.component';
import { CuestionarioMotoresComponent } from './cuestionario-motores/cuestionario-motores.component';
import { FormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';
import { SimuladorGeneralComponent } from './simulador-general/simulador-general.component';
import { SimuladorMecanicaGeneralComponent } from './simulador-mecanica-general/simulador-mecanica-general.component';
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
import { NuevoCuestionarioService } from './nuevo-cuestionario/nuevo-cuestionario.service';
import { VerCuestionariosService } from './ver-cuestionarios.service';
import { InicioComponent } from './inicio/inicio.component';
import { AuthService } from './auth.service';
import { CrearAdministradorComponent } from './crear-administrador/crear-administrador.component';
import { SimuladorFuselajeComponent } from './simulador-fuselaje/simulador-fuselaje.component';
import { SimuladorMotoresComponent } from './simulador-motores/simulador-motores.component';
import { CuestionariosAdminComponent } from './cuestionarios-admin/cuestionarios-admin.component';
import { SimuladoresAdminComponent } from './simuladores-admin/simuladores-admin.component';






@NgModule({
  declarations: [
    AppComponent,
    CuestionarioGeneralComponent,
    CuestionarioFuselajeComponent,
    CuestionarioMotoresComponent,
    SimuladorGeneralComponent,
    SimuladorMecanicaGeneralComponent,
    SuperAdministradorComponent,
    LoginAdministradorComponent,
    NuevoCuestionarioComponent,
    EliminarCuestionarioComponent,
    NuevaPreguntaComponent,
    VerCuestionariosComponent,
    NuevaPreguntaComponent,
    InicioComponent,
    CrearAdministradorComponent,
    SimuladorFuselajeComponent,
    SimuladorMotoresComponent,
    CuestionariosAdminComponent,
    SimuladoresAdminComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    HttpClientModule, 
    BrowserAnimationsModule, 
    BsDropdownModule.forRoot(),
    RouterModule,
    
  ],
  providers: [
    
    CuestionariosDisponiblesService,
    MostrarEliminarCuestionariosService,
    NuevoCuestionarioService,
    VerCuestionariosService,
    AuthService,
   

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

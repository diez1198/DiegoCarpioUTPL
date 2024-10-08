import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CuestionarioGeneralComponent } from './cuestionario-general/cuestionario-general.component';
import { CuestionarioFuselajeComponent } from './cuestionario-fuselaje/cuestionario-fuselaje.component';
import { CuestionarioMotoresComponent } from './cuestionario-motores/cuestionario-motores.component';
import { SimuladorGeneralComponent } from './simulador-general/simulador-general.component';
import { SimuladorMecanicaGeneralComponent } from './simulador-mecanica-general/simulador-mecanica-general.component';
import { LoginAdministradorComponent } from './login-administrador/login-administrador.component';
import { SuperAdministradorComponent } from './super-administrador/super-administrador.component';
import { NuevoCuestionarioComponent } from './nuevo-cuestionario/nuevo-cuestionario.component';
import { EliminarCuestionarioComponent } from './eliminar-cuestionario/eliminar-cuestionario.component';
import { VerCuestionariosComponent } from './ver-cuestionarios/ver-cuestionarios.component';
import { InicioComponent } from './inicio/inicio.component';
import { CrearAdministradorComponent } from './crear-administrador/crear-administrador.component';
import { SimuladorFuselajeComponent } from './simulador-fuselaje/simulador-fuselaje.component';
import { SimuladorMotoresComponent } from './simulador-motores/simulador-motores.component';
import { CuestionariosAdminComponent } from './cuestionarios-admin/cuestionarios-admin.component';
import { SimuladoresAdminComponent } from './simuladores-admin/simuladores-admin.component';

const routes: Routes = [
  { path: 'principal', component: InicioComponent },
  { path: 'inicio', component: InicioComponent }, // Ruta de inicio
  { path: 'cuestionarioGeneral', component: CuestionarioGeneralComponent },
  { path: 'cuestionarioFuselaje', component: CuestionarioFuselajeComponent },
  { path: 'cuestionarioMotores', component: CuestionarioMotoresComponent },
  { path: 'CuetionarioGeneralData', component: CuestionarioGeneralComponent },
  { path: 'simuladorGeneral', component: SimuladorGeneralComponent },
  
  { path: 'simuladorGeneral/completo', component: SimuladorGeneralComponent },
  { path: 'simuladorGeneral/iniciar', component: SimuladorGeneralComponent },
  { path: 'simuladorFuselaje', component: SimuladorFuselajeComponent },
  { path: 'simuladorFuselaje/completo', component: SimuladorFuselajeComponent },
  { path: 'simuladorFuselaje/iniciar', component: SimuladorFuselajeComponent },
  { path: 'simuladorFuselaje/completo', component: SimuladorFuselajeComponent },
  { path: 'simuladorFuselaje/revisar', component: SimuladorFuselajeComponent },
  { path: 'simuladorMotores', component: SimuladorMotoresComponent },
  { path: 'simuladorMotores/completo', component: SimuladorMotoresComponent },
  { path: 'simuladorMotores/iniciar', component: SimuladorMotoresComponent },
  { path: 'simuladorMecanicaGeneral', component: SimuladorMecanicaGeneralComponent },
  { path: 'administrador', component: LoginAdministradorComponent },
  { path: 'super-administrador/nuevo', component: NuevoCuestionarioComponent },
  { path: 'super-administrador/eliminar-cuestionario', component: EliminarCuestionarioComponent },
  { path: 'super-administrador/inicio', component: SuperAdministradorComponent },
  { path: 'super-administrador/ver-cuestionarios/:nombreColeccion', component: VerCuestionariosComponent },
  { path: 'super-administrador/crearadmin', component: CrearAdministradorComponent },
  { path: 'cuestionarios-admin', component: CuestionariosAdminComponent },
  { path: 'simuladores-admin', component: SimuladoresAdminComponent },
  { path: 'simuladores-admin/completo', component: SimuladoresAdminComponent },
  { path: 'simuladores-admin/completo/:nombreColeccion', component: SimuladoresAdminComponent },
  { path: 'simuladores-admin/simulador', component: SimuladoresAdminComponent },
  { path: 'simuladores-admin/simulador/:nombreColeccion', component: SimuladoresAdminComponent },
  { path: 'cuestionarios-admin/repaso', component: CuestionariosAdminComponent },
  { path: 'cuestionarios-admin/completo', component: CuestionariosAdminComponent },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' }, 
  { path: '**', redirectTo: '/cuestionarioGeneral', pathMatch: 'full' }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

//app-routing-module
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Router } from '@angular/router';
import { AppComponent } from './app.component';
import { CuestionarioGeneralComponent } from './cuestionario-general/cuestionario-general.component';
import { CuestionarioFuselajeComponent } from './cuestionario-fuselaje/cuestionario-fuselaje.component';
import { CuestionarioMotoresComponent } from './cuestionario-motores/cuestionario-motores.component';
import { Rdac65Component } from './rdac65/rdac65.component';
import { SimuladorGeneralComponent } from './simulador-general/simulador-general.component';
import { SimuladorMecanicaGeneralComponent } from './simulador-mecanica-general/simulador-mecanica-general.component';
import { LoginAdministradorComponent } from './login-administrador/login-administrador.component';
import { SuperAdministradorComponent } from './super-administrador/super-administrador.component';
import { NuevoCuestionarioComponent } from './nuevo-cuestionario/nuevo-cuestionario.component';
import { EliminarCuestionarioComponent } from './eliminar-cuestionario/eliminar-cuestionario.component';
import { VerCuestionariosComponent } from './ver-cuestionarios/ver-cuestionarios.component';


const routes: Routes = [
  { path: 'inicio', component: CuestionarioGeneralComponent },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' }, // Ruta de inicio
  { path: 'inicioTest', component: AppComponent }, // Ruta para el componente AppComponent
  { path: 'rdac65', component: Rdac65Component }, // Ruta para el componente Rdac65Component
  { path: 'cuestionarioGeneral', component: CuestionarioGeneralComponent }, // Ruta para el componente CuestionarioGeneralComponent
  { path: 'cuestionarioFuselaje', component: CuestionarioFuselajeComponent }, // Ruta para el componente CuestionarioFuselajeComponent
  { path: 'cuestionarioMotores', component: CuestionarioMotoresComponent }, // Ruta para el componente CuestionarioMotoresComponent
  { path: 'CuetionarioGeneralData', component: CuestionarioGeneralComponent }, // Ruta para el componente CuestionarioGeneralComponent con la URL segmentada 'CuestionarioGeneralData'
  { path: 'simuladorGeneral', component: SimuladorGeneralComponent},
  { path: 'simuladorMecanicaGeneral', component: SimuladorMecanicaGeneralComponent},
  { path: 'administrador', component: LoginAdministradorComponent },
  { path: 'nuevo-cuestionario', component: NuevoCuestionarioComponent },
  {
    path: 'super-administrador',
    component: SuperAdministradorComponent,
    children: [
      { path: 'nuevo-cuestionario', component: NuevoCuestionarioComponent },
    ]
  },
  {
    path: 'super-administrador/eliminar-cuestionario',
    component: EliminarCuestionarioComponent
  },
  { path: 'eliminar-cuestionario', component: EliminarCuestionarioComponent }, // Ruta para el componente EliminarCuestionarioComponent

  { path: 'super-administrador', component: SuperAdministradorComponent },
  { path: 'ver-cuestionarios/:nombreColeccion', component: VerCuestionariosComponent },
  { path: '', redirectTo: '/super-administrador', pathMatch: 'full' }

];






@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
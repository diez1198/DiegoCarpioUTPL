import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CuestionarioGeneralComponent } from './cuestionario-general/cuestionario-general.component';
import { CuestionarioFuselajeComponent } from './cuestionario-fuselaje/cuestionario-fuselaje.component';
import { CuestionarioMotoresComponent } from './cuestionario-motores/cuestionario-motores.component';
import { Rdac65Component } from './rdac65/rdac65.component';

const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' }, // Ruta de inicio
  { path: 'inicio', component: AppComponent }, // Ruta para el componente AppComponent
  { path: 'rdac65', component: Rdac65Component }, // Ruta para el componente Rdac65Component
  { path: 'cuestionarioGeneral', component: CuestionarioGeneralComponent }, // Ruta para el componente CuestionarioGeneralComponent
  { path: 'cuestionarioFuselaje', component: CuestionarioFuselajeComponent }, // Ruta para el componente CuestionarioFuselajeComponent
  { path: 'cuestionarioMotores', component: CuestionarioMotoresComponent }, // Ruta para el componente CuestionarioMotoresComponent
  { path: 'CuetionarioGeneralData', component: CuestionarioGeneralComponent }, // Ruta para el componente CuestionarioGeneralComponent con la URL segmentada 'CuestionarioGeneralData'
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

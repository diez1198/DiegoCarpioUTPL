import { Component } from '@angular/core';

@Component({
  selector: 'app-simulador-general',
  templateUrl: './simulador-general.component.html',
  styleUrls: ['./simulador-general.component.css']
})
export class SimuladorGeneralComponent {
  simuladorMecanicaGeneralUrl = "/simuladorMecanicaGeneral"; 

  openSimulador(url: string) {
    window.open(url, '_blank');
  }
}

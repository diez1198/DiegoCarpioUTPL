import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  activeMenuItem: string = 'principal';
  isLoggedIn: boolean = false;

  constructor(private router: Router, private http: HttpClient, public authService: AuthService) {
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
  }

  redirectToRDAC65() {
    window.open('https://www.aviacioncivil.gob.ec/wp-content/uploads/downloads/2020/02/12-NE-RDAC-Parte-065-28-Enero-20.pdf');
  }

  doNothing() {}

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/principal']); // Redirigir a inicio después del logout
  }
}

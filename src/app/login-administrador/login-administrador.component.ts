import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-administrador',
  templateUrl: './login-administrador.component.html',
  styleUrls: ['./login-administrador.component.css']
})
export class LoginAdministradorComponent implements OnInit {

  user = {
    username: '',
    password: ''
  };

  errorMessage: string = '';

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        if (this.authService.isAdmin) {
          this.router.navigate(['/super-administrador/inicio']);
        } else {
          this.router.navigate(['/super-administrador/inicio']);
        }
      }
    });
  }

  onSubmit() {
    // Validación de credenciales
    if (this.user.username === 'superadmin' && this.user.password === 'superadmin') {
      this.authService.login('superadmin', 'superadmin');
    } else if (this.user.username === 'admin' && this.user.password === 'admin') {
      this.authService.login('admin', 'admin');
    } else {
      this.errorMessage = 'Credenciales incorrectas. Por favor, intenta de nuevo.';
    }
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/inicio']); // Redirigir a inicio después del logout
  }
}

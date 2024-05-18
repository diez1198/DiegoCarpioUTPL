import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service'; // Asegúrate de que la ruta sea correcta

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

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.router.navigate(['/super-administrador']);
      }
    });
  }

  onSubmit() {
    // Aquí puedes agregar la lógica para autenticar al usuario
    // Por ejemplo, puedes verificar si el usuario y la contraseña son válidos
    // Si son válidos, llamas al método login del AuthService
    if (this.user.username === 'admin' && this.user.password === 'admin') {
      this.authService.login(); // Llama al método login del AuthService
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  }

  onLogout() {
    // Aquí puedes agregar la lógica para cerrar sesión
    this.authService.logout(); // Llama al método logout del AuthService
  }
}

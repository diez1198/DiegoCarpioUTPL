import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedIn.asObservable();
  isAdmin: boolean = false;

  constructor() {
    this.loggedIn.next(this.isAuthenticated());
  }

  login(username: string, password: string) {
    // Aquí deberías implementar la lógica para validar las credenciales y establecer el estado de autenticación
    if (username === 'superadmin' && password === 'superadmin') {
      this.loggedIn.next(true);
      this.isAdmin = true; // Establecer isAdmin a true si las credenciales corresponden a un super administrador
    } else if (username === 'admin' && password === 'admin') {
      this.loggedIn.next(true);
      this.isAdmin = false; // Establecer isAdmin a false si las credenciales corresponden a un administrador normal
    } else {
      this.loggedIn.next(false);
      this.isAdmin = false; // Si las credenciales no coinciden con ninguna, isAdmin será false
    }
  }

  logout() {
    this.loggedIn.next(false);
    this.isAdmin = false; // Al hacer logout, resetear isAdmin a false
  }

  isAuthenticated(): boolean {
    return this.loggedIn.value;
  }
}

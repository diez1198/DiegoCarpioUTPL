import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn.asObservable();

  // ... (El resto de tus métodos)

  login() {
    // Aquí colocarías la lógica para iniciar sesión
    this._isLoggedIn.next(true);
  }

  logout() {
    // Aquí colocarías la lógica para cerrar sesión
    this._isLoggedIn.next(false);
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.isAuthenticated());
  isLoggedIn$ = this.loggedIn.asObservable();
  isAdmin: boolean = JSON.parse(localStorage.getItem('isAdmin') || 'false');

  constructor() {
    if (!localStorage.getItem('admins')) {
      localStorage.setItem('admins', JSON.stringify([{ username: 'admin', password: 'admin' }]));
    }
  }

  login(username: string, password: string) {
    const admins = JSON.parse(localStorage.getItem('admins') || '[]');

    const superAdmin = username === 'superadmin' && password === 'superadmin';
    const admin = admins.some((admin: any) => admin.username === username && admin.password === password);

    if (superAdmin) {
      this.loggedIn.next(true);
      this.isAdmin = true;
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('isAdmin', 'true');
    } else if (admin) {
      this.loggedIn.next(true);
      this.isAdmin = false;
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('isAdmin', 'false');
    } else {
      this.loggedIn.next(false);
      this.isAdmin = false;
      localStorage.setItem('isLoggedIn', 'false');
      localStorage.setItem('isAdmin', 'false');
    }
  }

  logout() {
    this.loggedIn.next(false);
    this.isAdmin = false;
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('isAdmin');
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  addAdmin(username: string, password: string): boolean {
    const admins = JSON.parse(localStorage.getItem('admins') || '[]');

    if (admins.some((admin: any) => admin.username === username)) {
      return false;
    }

    admins.push({ username, password });
    localStorage.setItem('admins', JSON.stringify(admins));
    return true;
  }

  removeAdmin(username: string): boolean {
    let admins = JSON.parse(localStorage.getItem('admins') || '[]');
    const initialLength = admins.length;

    admins = admins.filter((admin: any) => admin.username !== username);
    localStorage.setItem('admins', JSON.stringify(admins));

    return admins.length < initialLength;
  }

  getAdmins(): any[] {
    return JSON.parse(localStorage.getItem('admins') || '[]');
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://localhost:7136'; // URL do API

  constructor(private http: HttpClient, private router: Router) { }

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  logout(): void {
    localStorage.removeItem('jwt');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('id');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('jwt');
  }

  getPracownicy(): Observable<any> {
    const token = localStorage.getItem('jwt');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.apiUrl}/admin/pracownicy`, { headers });
  }
  deletePracownik(id: string): Observable<any> {
    const token = localStorage.getItem('jwt');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<any>(`${this.apiUrl}/admin/pracownicy/usun/${id}`, {}, { headers });
  }

  getUrlopy(): Observable<any[]> {
    const token = localStorage.getItem('jwt');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any[]>(`${this.apiUrl}/admin/historiaurlopow`, { headers });
  }

  getWnioski(): Observable<any> {
    const token = localStorage.getItem('jwt');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.apiUrl}/admin/wnioskiourlop`, { headers });
  }
  deleteWniosek(id: string): Observable<any> {
    const token = localStorage.getItem('jwt');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<any>(`${this.apiUrl}/admin/urlopy/akceptuj/${id}`, {}, { headers });
  }

  getTwojeUrlopy(): Observable<any[]> {
    const token = localStorage.getItem('jwt');
    const id = localStorage.getItem('id');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any[]>(`${this.apiUrl}/user/twojahistoria/${id}`, { headers });
  }

  getTwojeDni(): Observable<any> {
    const token = localStorage.getItem('jwt');
    const id = localStorage.getItem('id');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(`${this.apiUrl}/user/wezurlop/${id}`, { headers });
  }
  addUrlop(pracownikId: string, nowyUrlop: any): Observable<any> {
    const token = localStorage.getItem('jwt');
    const id = localStorage.getItem('id');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post(`${this.apiUrl}/user/wezurlop/${pracownikId}`, nowyUrlop, { headers });
  }

  getTwojeDane(): Observable<any> {
    const token = localStorage.getItem('jwt');
    const id = localStorage.getItem('id');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.apiUrl}/user/twojedane/${id}`, { headers });
  }

  addPracownika(nowyPracownik: any): Observable<any> {
    const token = localStorage.getItem('jwt');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post(`${this.apiUrl}/admin/dodajpracownika`, nowyPracownik, { headers });
  }
}

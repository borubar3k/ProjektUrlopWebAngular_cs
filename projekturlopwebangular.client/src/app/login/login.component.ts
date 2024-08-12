import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

interface LoginDTO {
  Email: string;
  Haslo: string;
}

interface LoginResponse {
  token: string;
  isAdmin: string;
  id: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData: LoginDTO = { Email: '', Haslo: '' };

  constructor(private http: HttpClient, private router: Router, private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('Logowanie');
  }

  onSubmit() {
    console.log('Form submitted', this.loginData);
    this.http.post<LoginResponse>('https://localhost:7136/login', this.loginData, {
      headers: { 'Content-Type': 'application/json' }
    }).subscribe(
      response => {
        console.log('Login successful', response);
        const token = response.token;
        const isAdmin = response.isAdmin;
        const id = response.id;
        localStorage.setItem('jwt', token);
        localStorage.setItem('isAdmin', isAdmin);
        localStorage.setItem('id', id);
        this.router.navigate([`user/wezurlop/${id}`]); // Przekierowanie po udanym logowaniu
      },
      error => {
        console.error('Login failed', error.message);
        console.error('Error Details:', error.error);  // Wyświetl szczegóły błędu
      }
    );
  }


}

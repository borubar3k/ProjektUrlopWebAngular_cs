import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dodajpracownika',
  templateUrl: './dodajpracownika.component.html',
  styleUrls: ['./dodajpracownika.component.css']
})
export class DodajPracownikaComponent implements OnInit {
  nowyPracownik = {
    Imie: '',
    Nazwisko: '',
    Email: '',
    Haslo: '',
    IsAdmin: false,
    DataZatr: '',
    DniUrlopu: 0
  };

  constructor(private api: ApiService, private router: Router, private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('Dodawanie pracowników');
  }

  onDodajPracownika(): void {
    this.api.addPracownika(this.nowyPracownik).pipe(
      tap((response) => {
        console.log('Pracownik dodany pomyślnie:', response);
        this.router.navigate(['/admin/listapracownikow']);
      }),
      catchError((error) => {
        console.error('Błąd przy dodawaniu pracownika:', error);
        if (error.error.errors) {
          console.error('Szczegóły błędów:', error.error.errors);
        }
        return of(null);
      })
    ).subscribe();
  }
}

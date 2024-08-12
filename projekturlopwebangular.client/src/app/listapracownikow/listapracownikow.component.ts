import { Component, OnInit, inject } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-lista-pracownikow',
  templateUrl: './listapracownikow.component.html',
  styleUrls: ['./listapracownikow.component.css']
})
export class ListaPracownikowComponent implements OnInit {
  pracownicy: any[] = [];
  wybranyPracownik: any = null;

  constructor(private api: ApiService, private router: Router, private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('Lista pracowników');
    this.loadPracownicy();
  }

  loadPracownicy(): void {
    this.api.getPracownicy().subscribe(
      res => this.pracownicy = res,
      err => console.error('Błąd przy pobieraniu pracowników', err)
    );
  }

  selectPracownik(pracownik: any): void {
    this.wybranyPracownik = pracownik;
  }

  confirmDelete(pracownik: any): void {
    this.wybranyPracownik = pracownik;
  }

  deletePracownik(): void {
    if (this.wybranyPracownik) {
      const id = this.wybranyPracownik.id;
      this.api.deletePracownik(id).subscribe(
        () => {
          this.router.navigate([`/admin/pracownicy/usun/${id}`]); // Przekierowuje na stronę usunięcia
          this.loadPracownicy(); // Odświeża listę pracowników
          this.wybranyPracownik = null; // Ukrywa potwierdzenie
        },
        err => {
          console.error('Błąd przy archiwizacji pracownika', err);
        }
      );
    }
  }

  cancelDelete(): void {
    this.wybranyPracownik = null; // Ukrywa wiadomość o potwierdzeniu
  }

  navigateToAddPracownik(): void {
    this.router.navigate(['/admin/dodajpracownika']);
  }
}

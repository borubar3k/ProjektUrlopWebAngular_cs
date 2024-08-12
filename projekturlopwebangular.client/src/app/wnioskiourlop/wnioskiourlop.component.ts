import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-wnioskiourlop',
  templateUrl: './wnioskiourlop.component.html',
  styleUrls: ['./wnioskiourlop.component.css']
})
export class WnioskiOUrlopComponent implements OnInit {
  wnioski: any[] = [];
  wybranyWniosek: any = null;

  constructor(private api: ApiService, private router: Router, private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('Wnioski o urlop');
    this.loadWnioski();
  }

  loadWnioski(): void {
    this.api.getWnioski().subscribe(
      res => this.wnioski = res,
      err => console.error('Błąd przy pobieraniu wniosków', err)
    );
  }

  selectWniosek(wniosek: any): void {
    this.wybranyWniosek = wniosek;
  }

  confirmDelete(wniosek: any): void {
    this.wybranyWniosek = wniosek;
  }

  deleteWniosek(): void {
    if (this.wybranyWniosek) {
      const id = this.wybranyWniosek.id;
      this.api.deleteWniosek(id).subscribe(
        () => {
          this.router.navigate([`/admin/urlopy/akceptuj/${id}`]); // Przekierowuje na stronę usunięcia
          this.loadWnioski(); // Odświeża listę pracowników
          this.wybranyWniosek = null; // Ukrywa potwierdzenie
        },
        err => {
          console.error('Błąd przy potwierdzaniu wniosku', err);
        }
      );
    }
  }

  cancelDelete(): void {
    this.wybranyWniosek = null; // Ukrywa wiadomość o potwierdzeniu
  }

  isSelected(urlop: any): boolean {
    return this.wybranyWniosek === urlop;
  }
}

import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-wezurlop',
  templateUrl: './wezurlop.component.html',
  styleUrls: ['./wezurlop.component.css']
})
export class WezUrlopComponent implements OnInit {
  dniWolne: any = null;
  nowyUrlop = {
    DataRozp: '',
    DataZak: '',
    Rodzaj: ''
  };

  constructor(private api: ApiService, private router: Router, private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('Weź urlop');
    const userId = localStorage.getItem('id');
    if (userId) {
      this.router.navigate([`/user/wezurlop/${userId}`]);
    } else {
      console.error('User ID not found in localStorage.');
    }
    this.getDniWolne();
  }

  getDniWolne(): void {
    const pracownikId = localStorage.getItem('id');
    if (!pracownikId) {
      console.error('Brak ID pracownika w localStorage');
      return;
    }

    this.api.getTwojeDni().subscribe(
      (dni) => {
        this.dniWolne = dni;
        console.log('Dostępne dni urlopu:', this.dniWolne);
      },
      (error) => {
        console.error('Błąd przy pobieraniu dni urlopu:', error);
      }
    );
  }

  // Metoda wywoływana po kliknięciu przycisku
  onDodajUrlopClick(): void {
    const pracownikId = localStorage.getItem('id');
    if (!pracownikId) {
      console.error('Brak ID pracownika w localStorage');
      return;
    }

    this.api.addUrlop(pracownikId, this.nowyUrlop).subscribe(
      (response) => {
        console.log('Urlop dodany pomyślnie:', response);
        const userId = localStorage.getItem('id');
        this.router.navigate([`/user/twojahistoria/${userId}`]);
      },
      (error) => {
        console.error('Błąd przy dodawaniu urlopu:', error);
      }
    );
  }
}

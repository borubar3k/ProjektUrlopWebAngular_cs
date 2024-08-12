import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-historiaurlopow',
  templateUrl: './historiaurlopow.component.html',
  styleUrls: ['./historiaurlopow.component.css']
})
export class HistoriaUrlopowComponent implements OnInit {
  urlopy: any[] = [];

  constructor(private api: ApiService, private router: Router, private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('Historia urlopów');
    this.loadUrlopy();
  }

  loadUrlopy(): void {
    this.api.getUrlopy().subscribe({
      next: (res) => {
        this.urlopy = res;
        console.log(res); // Upewnij się, że dane są prawidłowo wyświetlane
      },
      error: (err) => console.error('Błąd przy historii urlopów', err)
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-twojahistoria',
  templateUrl: './twojahistoria.component.html',
  styleUrls: ['./twojahistoria.component.css']
})
export class TwojaHistoriaComponent implements OnInit {
  urlopy: any[] = [];

  constructor(private api: ApiService, private router: Router, private titleService: Title) { }

  ngOnInit(): void {
    const userId = localStorage.getItem('id');
    this.titleService.setTitle('Twoja historia');

    if (userId) {
      this.router.navigate([`/user/twojahistoria/${userId}`]);
    } else {
      console.error('User ID not found in localStorage.');
    }
    this.loadTwojeUrlopy();
  }

  loadTwojeUrlopy(): void {
    this.api.getTwojeUrlopy().subscribe({
      next: (res) => {
        this.urlopy = res;
        console.log(res); // Upewnij się, że dane są prawidłowo wyświetlane
      },
      error: (err) => console.error('Błąd przy historii urlopów', err)
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-twojedane',
  templateUrl: './twojedane.component.html',
  styleUrls: ['./twojedane.component.css']
})
export class TwojeDaneComponent implements OnInit {
  twojeDane: any;

  constructor(private api: ApiService, private router: Router, private titleService: Title) { }

  ngOnInit(): void {
    const userId = localStorage.getItem('id');
    this.titleService.setTitle('Twoje dane');

    if (userId) {
      this.router.navigate([`/user/twojedane/${userId}`]);
    } else {
      console.error('User ID not found in localStorage.');
    }
    this.loadTwojeDane();
  }
  loadTwojeDane(): void {
    this.api.getTwojeDane().subscribe({
      next: (res) => {
        this.twojeDane = res;
        console.log(res);
      },
      error: (err) => console.error('Błąd przy historii urlopów', err)
    });
  }

}

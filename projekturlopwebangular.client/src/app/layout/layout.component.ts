import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit{
  isAdmin: boolean = false;
  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    const role = localStorage.getItem('isAdmin');
    this.isAdmin = role === 'true'; // Sprawdź rolę
  }

  navigateTo(route: string) {
      this.router.navigate([`/${route}`]);
      console.log([`/${route}`]);
  }

  logout() {
    this.apiService.logout();
  }
}

import { Component, OnInit, inject } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pracownicy-usun',
  templateUrl: './pracownicy-usun.component.html',
  styleUrls: ['./pracownicy-usun.component.css']
})
export class PracownicyUsunComponent {
  pracownik: any = null;

  constructor(private route: ActivatedRoute, private api: ApiService, private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('Usuwanie pracownika');
  }

}

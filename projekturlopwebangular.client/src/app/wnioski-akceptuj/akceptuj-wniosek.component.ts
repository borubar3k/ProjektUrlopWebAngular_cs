import { Component, OnInit, inject } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-akceptuj-wniosek',
  templateUrl: './akceptuj-wniosek.component.html',
  styleUrls: ['./akceptuj-wniosek.component.css']
})
export class AkceptujWniosekComponent implements OnInit {
  wniosek: any = null;

  constructor(private route: ActivatedRoute, private api: ApiService, private titleService: Title) { }
  ngOnInit(): void {
    this.titleService.setTitle('Nowy Tytuł Zakładki');
  }
}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { WezUrlopComponent } from './wezurlop/wezurlop.component';
import { TwojaHistoriaComponent } from './twojahistoria/twojahistoria.component';
import { ListaPracownikowComponent } from './listapracownikow/listapracownikow.component';
import { WnioskiOUrlopComponent } from './wnioskiourlop/wnioskiourlop.component';
import { AuthGuard } from './auth.guard';
import { HistoriaUrlopowComponent } from './historiaurlopow/historiaurlopow.component';
import { TwojeDaneComponent } from './twojedane/twojedane.component';
import { DodajPracownikaComponent } from './dodajpracownika/dodajpracownika.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent,
    WezUrlopComponent,
    TwojaHistoriaComponent,
    ListaPracownikowComponent,
    WnioskiOUrlopComponent,
    HistoriaUrlopowComponent,
    TwojeDaneComponent,
    DodajPracownikaComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { WezUrlopComponent } from './wezurlop/wezurlop.component';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from './auth.guard';
import { TwojaHistoriaComponent } from './twojahistoria/twojahistoria.component';
import { ListaPracownikowComponent } from './listapracownikow/listapracownikow.component';
import { WnioskiOUrlopComponent } from './wnioskiourlop/wnioskiourlop.component';
import { HistoriaUrlopowComponent } from './historiaurlopow/historiaurlopow.component';
import { PracownicyUsunComponent } from './pracownicy-usun/pracownicy-usun.component';
import { AkceptujWniosekComponent } from './wnioski-akceptuj/akceptuj-wniosek.component';
import { TwojeDaneComponent } from './twojedane/twojedane.component';
import { DodajPracownikaComponent } from './dodajpracownika/dodajpracownika.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'user/wezurlop', component: WezUrlopComponent },
      { path: 'user/wezurlop/:id', component: WezUrlopComponent },
      { path: 'user/twojedane', component: TwojeDaneComponent },
      { path: 'user/twojedane/:id', component: TwojeDaneComponent },
      { path: 'admin/pracownicy', component: ListaPracownikowComponent },
      { path: 'user/twojahistoria', component: TwojaHistoriaComponent },
      { path: 'user/twojahistoria/:id', component: TwojaHistoriaComponent },
      { path: 'admin/wnioskiourlop', component: WnioskiOUrlopComponent },
      { path: 'admin/historiaurlopow', component: HistoriaUrlopowComponent },
      { path: 'admin/pracownicy/usun/:id', component: PracownicyUsunComponent },
      { path: 'admin/urlopy/akceptuj/:id', component: AkceptujWniosekComponent },
      { path: 'admin/dodajpracownika', component: DodajPracownikaComponent }
    ]
  },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

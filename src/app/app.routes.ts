import { Routes } from '@angular/router';
import { AccueilComponent } from './ecrans/accueil/accueil.component';
import { ConnexionComponent } from './ecrans/connexion/connexion.component';
import { Page404Component } from './ecrans/page404/page404.component';

export const routes: Routes = [
  { path: 'accueil', component: AccueilComponent },
  { path: 'connexion', component: ConnexionComponent },
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  { path: '**', component: Page404Component},
];

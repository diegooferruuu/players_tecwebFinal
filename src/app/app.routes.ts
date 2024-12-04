import { Routes } from '@angular/router';
import { PruebaComponent } from './paginas/prueba/prueba.component';
import { PlayersComponent } from './paginas/players/players.component';

export const routes: Routes = [
    {path:'prueba', component:PruebaComponent},
    {path:'players', component:PlayersComponent}
];

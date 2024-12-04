import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from './models/player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  constructor(  private http: HttpClient) { }

  private url = 'http://localhost:3000/player'

  obtenerPlayers(): Observable<any>{
    return this.http.get("http://localhost:3000/player")
  }

  deletePlayerByID(id: string): Observable<Player>{
    return this.http.delete<Player>(this.url +"/"+ id);
  }

  updatePlayerByID(id: string, updates: Partial<any>): Observable<any> {
    return this.http.patch<Player>(this.url +"/"+ id, updates);
  }

  createPlayer(player: Partial<Player>): Observable<Player> {
    return this.http.post<Player>('http://localhost:3000/player', player);
  }
  
  
}

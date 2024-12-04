import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../player.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Player } from '../../models/player';

@Component({
  selector: 'app-players',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {
  players: any[] = [];
  
  constructor(private playerService: PlayerService) {}

  trackByPlayerName(index: number, player: any): string {
    return player.name; // O usa una propiedad única como un ID si es posible.
  }
  

  ngOnInit(): void {
    this.playerService.obtenerPlayers().subscribe({
      next: (data: any[]) => {
        this.players = data;
      },
      error: (err) => console.error('Error fetching players:', err),
    });
  }

  deletePlayer(id: string): void {
    this.playerService.deletePlayerByID(id).subscribe({
      next: () => {
        // Filtrar la lista de jugadores para eliminar el jugador borrado
        this.players = this.players.filter(player => player._id !== id);
      },
      error: (err) => console.error(`Error deleting player with ID ${id}:`, err),
    });
  }
  
}

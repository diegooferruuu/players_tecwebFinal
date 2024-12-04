import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../player.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Player } from '../../models/player';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-players',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {
  players: any[] = [];
  isEditing: boolean = false;
  playerToEdit: any = null;
  
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
  
  editPlayer(player: any): void {
    console.log('Editando jugador', player);
    this.isEditing = true;
    this.playerToEdit = { ...player };
  }

  saveChanges(): void {
    if (this.playerToEdit && this.playerToEdit._id) {
      // Detectar solo los cambios
      const updates = {
        name: this.playerToEdit.name,
        age: this.playerToEdit.age,
        nationality: this.playerToEdit.nationality,
        positions: this.playerToEdit.positions,
        value_euro: this.playerToEdit.value_euro,
        image: this.playerToEdit.image,
      };
  
      this.playerService.updatePlayerByID(this.playerToEdit._id, updates).subscribe({
        next: (updatedPlayer: any) => {
          const index = this.players.findIndex(p => p._id === updatedPlayer._id);
          if (index !== -1) {
            this.players[index] = { ...this.players[index], ...updatedPlayer };
          }
          this.cancelEdit();
        },
        error: (err) =>
          console.error(`Error updating player with ID ${this.playerToEdit._id}:`, err),
      });
    }
  }
  

  cancelEdit(): void {
    this.isEditing = false;
    this.playerToEdit = null;
  }

}

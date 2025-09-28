import { Component, OnInit } from '@angular/core';
import { NotesService } from '../notes-service';
import { Note } from '../note.model';
declare var $: any;

@Component({
  selector: 'app-notes-view',
  standalone: true,
  imports: [],
  templateUrl: './notes-view.html',
  styleUrl: './notes-view.css'
})
export class NotesView implements OnInit {
  notes: Note[] = [];

  constructor(private notesService: NotesService) {}

  ngOnInit(): void {
    this.notesService.notes$.subscribe(notes => this.notes = notes);
  }

  deleteNote(id: string): void {
    this.notesService.deleteNote(id);
  }

  openCreateModal(): void {
    $('#noteModal').modal('show');
  }
}

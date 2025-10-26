import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotesService } from '../notes-service';
import { Note } from '../note.model';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import {RouterLink} from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-notes-view',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './notes-view.html',
  styleUrl: './notes-view.css'
})
export class NotesView implements OnInit, OnDestroy {
  notes: Note[] = [];
  loading: boolean = true;
  private notesSubscription: Subscription | null = null;
  private externalChangeSubscription: Subscription | null = null;

  constructor(private notesService: NotesService) {}

  ngOnInit(): void {
    this.notesSubscription = this.notesService.notes$.subscribe(notes => {
      this.notes = notes;
      this.loading = false;
    });

    this.externalChangeSubscription = this.notesService.onExternalChange.subscribe(() => {
      this.refreshNotes();
    });
  }

  ngOnDestroy(): void {
    if (this.notesSubscription) {
      this.notesSubscription.unsubscribe();
    }
    if (this.externalChangeSubscription) {
      this.externalChangeSubscription.unsubscribe();
    }
  }

  refreshNotes(): void {
    this.loading = true;
    this.notesService.loadNotes().subscribe({

    });
  }

  deleteNote(id: string): void {
    this.notesService.deleteNote(id).subscribe({
    });
  }
}

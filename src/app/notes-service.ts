import { Injectable } from '@angular/core';
import { Note } from './note.model';
import { v4 as uuidv4 } from 'uuid';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private storageKey = 'notes';
  private notesSubject = new BehaviorSubject<Note[]>(this.getNotes());

  notes$ = this.notesSubject.asObservable();

  constructor() {}

  getNotes(): Note[] {
    const notesJson = localStorage.getItem(this.storageKey);
    return notesJson ? JSON.parse(notesJson) : [];
  }

  private saveNotes(notes: Note[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(notes));
    this.notesSubject.next(notes);
  }

  addNote(title: string, content: string): void {
    const notes = this.getNotes();
    const newNote: Note = { id: uuidv4(), title, content };
    notes.push(newNote);
    this.saveNotes(notes);
  }

  deleteNote(id: string): void {
    const notes = this.getNotes().filter(note => note.id !== id);
    this.saveNotes(notes);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Note } from './note.model';
import { BehaviorSubject, Observable, map, tap, of } from 'rxjs';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private notesSubject = new BehaviorSubject<Note[]>([]);
  private apiURL = "https://gricius-paskaitos-default-rtdb.europe-west1.firebasedatabase.app/";
  private isLoading = false;
  private initialLoadDone = false;

  public onExternalChange = new EventEmitter();
  notes$ = this.notesSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadNotes().subscribe();
  }

  loadNotes(): Observable<Note[]> {
    if (this.isLoading) {
      return of(this.notesSubject.getValue());
    }

    this.isLoading = true;

    return this.http.get<{[key: string]: Note}>(`${this.apiURL}/notes.json`)
      .pipe(
        map(response => {
          const notes: Note[] = [];
          if (response) {
            for (const key in response) {
              if (response.hasOwnProperty(key)) {
                notes.push({
                  ...response[key],
                  id: key
                });
              }
            }
          }
          this.notesSubject.next(notes);
          this.initialLoadDone = true;
          this.isLoading = false;
          return notes;
        }),
        tap({
          error: () => {
            this.isLoading = false;
          }
        })
      );
  }

  getNote(id: string): Observable<Note> {
    return this.http.get<Note>(`${this.apiURL}/notes/${id}.json`);
  }

  addNote(title: string, content: string): Observable<any> {
    const newNote = { title, content };
    return this.http.post(`${this.apiURL}/notes.json`, newNote)
      .pipe(
        tap(response => {
          const currentNotes = this.notesSubject.getValue();
          const noteWithId: Note = {
            id: (response as {name: string}).name,
            title,
            content
          };
          this.notesSubject.next([...currentNotes, noteWithId]);
        })
      );
  }

  deleteNote(id: string): Observable<any> {
    return this.http.delete(`${this.apiURL}/notes/${id}.json`)
      .pipe(
        tap(() => {
          const currentNotes = this.notesSubject.getValue();
          const updatedNotes = currentNotes.filter(note => note.id !== id);
          this.notesSubject.next(updatedNotes);
        })
      );
  }

  updateNote(id: string, updatedData: Partial<Note>): Observable<any> {
    return this.http.patch(`${this.apiURL}/notes/${id}.json`, updatedData).pipe(
      tap(() => {
        const currentNotes = this.notesSubject.getValue();
        const updatedNotes = currentNotes.map(note =>
          note.id === id ? { ...note, ...updatedData } : note
        );
        this.notesSubject.next(updatedNotes);
      })
    );
  }
}



import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NotesView} from './notes-view/notes-view';
import {NotesCreate} from './notes-create/notes-create';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NotesView, NotesCreate],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('uzrasine-gricius');
}

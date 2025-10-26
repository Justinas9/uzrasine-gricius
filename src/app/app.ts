import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { NotesView } from './notes-view/notes-view';
import { NotesCreate } from './notes-create/notes-create';
import { Header } from './header/header';
import { ModalService } from './shared/modal.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, NotesView, NotesCreate, Header],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('uzrasine-gricius');

  constructor(private modalService: ModalService) {}
}

import { Routes } from '@angular/router';
import { NotesView } from './notes-view/notes-view';
import { NotesEditComponent } from './notes-edit/notes-edit';


export const routes: Routes = [
  { path: '', component: NotesView },
  { path: 'edit/:id', component: NotesEditComponent },
  { path: '**', redirectTo: '' }
];

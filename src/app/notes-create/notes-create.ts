import { Component, OnInit } from '@angular/core';
import { NotesService } from '../notes-service';
import { FormsModule } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-notes-create',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './notes-create.html',
  styleUrl: './notes-create.css'
})
export class NotesCreate implements OnInit {
  title: string = '';
  content: string = '';

  constructor(private notesService: NotesService) {}

  ngOnInit(): void {
    $('#noteModal').on('shown.bs.modal', () => {
      this.title = '';
      this.content = '';
    });
  }

  saveNote(): void {
    if (!this.title.trim() && !this.content.trim()) return;

    this.notesService.addNote(this.title, this.content);
    $('#noteModal').modal('hide');
  }
}

import { Component, OnInit } from '@angular/core';
import { NotesService } from '../notes-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
declare var $: any;

@Component({
  selector: 'app-notes-create',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './notes-create.html',
  styleUrl: './notes-create.css'
})
export class NotesCreate implements OnInit {
  title: string = '';
  content: string = '';
  saving: boolean = false;

  constructor(private notesService: NotesService) {}

  ngOnInit(): void {
    $('#noteModal').on('shown.bs.modal', () => {
      this.resetForm();
    });
  }

  resetForm(): void {
    this.title = '';
    this.content = '';
    this.saving = false;
  }

  saveNote(): void {
    if (!this.title.trim() && !this.content.trim()) return;

    this.saving = true;

    this.notesService.addNote(this.title, this.content).subscribe({
      next: () => {
        this.saving = false;
        $('#noteModal').modal('hide');
        this.resetForm();
      }
    });
  }
}

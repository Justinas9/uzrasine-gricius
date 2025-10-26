import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotesService } from '../notes-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModalService } from '../shared/modal.service';
import { Subscription } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-notes-create',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './notes-create.html',
  styleUrl: './notes-create.css'
})
export class NotesCreate implements OnInit, OnDestroy {
  title: string = '';
  content: string = '';
  saving: boolean = false;
  private modalSubscription: Subscription | null = null;

  constructor(
    private notesService: NotesService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    $('#noteModal').on('shown.bs.modal', () => {
      this.resetForm();
    });

    this.modalSubscription = this.modalService.openCreateModal$.subscribe(() => {
      $('#noteModal').modal('show');
    });
  }

  ngOnDestroy(): void {
    if (this.modalSubscription) {
      this.modalSubscription.unsubscribe();
    }
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

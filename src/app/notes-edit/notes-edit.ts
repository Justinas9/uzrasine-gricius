import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {NotesService} from '../notes-service';

@Component({
  selector: 'app-notes-edit',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './notes-edit.html',
  styleUrl: './notes-edit.css'
})
export class NotesEditComponent implements OnInit {
  noteId!: string;
  noteForm!: FormGroup;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private notesService: NotesService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.noteId = this.route.snapshot.paramMap.get('id')!;

    this.noteForm = this.fb.group({
      title: [''],
      content: ['']
    });

    this.notesService.getNote(this.noteId).subscribe(note => {
      this.noteForm.patchValue({
        title: note.title,
        content: note.content
      });
      this.loading = false;
    });
  }

  onSubmit(): void {
    if (this.noteForm.valid) {
      const updatedData = this.noteForm.value;
      this.notesService.updateNote(this.noteId, updatedData).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}

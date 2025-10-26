import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesEditComponent } from './notes-edit';

describe('NotesEdit', () => {
  let component: NotesEditComponent;
  let fixture: ComponentFixture<NotesEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotesEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

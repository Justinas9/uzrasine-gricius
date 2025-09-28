import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesCreate } from './notes-create';

describe('NotesCreate', () => {
  let component: NotesCreate;
  let fixture: ComponentFixture<NotesCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotesCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotesCreate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

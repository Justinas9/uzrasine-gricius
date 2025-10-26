import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ModalService } from '../shared/modal.service';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
  standalone: true
})
export class Header {
  constructor(private modalService: ModalService) {}

  openCreateModal(): void {
    this.modalService.openCreateModal();
  }
}

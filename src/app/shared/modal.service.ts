import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private openCreateModalSource = new Subject<void>();

  openCreateModal$ = this.openCreateModalSource.asObservable();

  openCreateModal() {
    this.openCreateModalSource.next();
  }
}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AnimalListComponent } from './animal-list/animal-list.component';
import { AnimalDetailComponent } from './animal-detail/animal-detail.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatToolbarModule,
    AnimalListComponent,
    AnimalDetailComponent
  ],
  template: `
    <mat-toolbar color="primary">
      <span>Animal Diversity</span>
    </mat-toolbar>
    <div class="content">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      height: 100vh;
    }
    .content {
      padding: 20px;
      height: calc(100vh - 64px);
      overflow-y: auto;
      max-width: 1200px;
      margin: 0 auto;
    }
  `]
})
export class App {}

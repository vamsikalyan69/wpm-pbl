import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  template: `
    <mat-toolbar color="primary">
      <a mat-button routerLink="/" class="title-link">
        <span class="title">🦁 Animal Diversity</span>
      </a>
      <span class="spacer"></span>
      <a mat-button routerLink="/animals">
        <mat-icon>pets</mat-icon>
        <span>Explore</span>
      </a>
    </mat-toolbar>
    <div class="content">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .title-link {
      text-decoration: none;
      color: white;
    }
    .title {
      font-size: 20px;
      font-weight: 500;
    }
    .spacer {
      flex: 1 1 auto;
    }
    .content {
      padding: 20px;
      height: calc(100vh - 64px);
      overflow-y: auto;
      background-color: #fafafa;
    }
    mat-icon {
      margin-right: 8px;
    }
  `],
  standalone: true,
  imports: [RouterOutlet, RouterLink, MatToolbarModule, MatIconModule, MatButtonModule]
})
export class AppComponent {
  title = 'Animal Diversity';
}

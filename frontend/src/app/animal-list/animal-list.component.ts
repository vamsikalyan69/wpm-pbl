import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AnimalService } from '../services/animal.service';
import { Animal } from '../services/animal.service';

@Component({
  selector: 'app-animal-list',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink, 
    FormsModule,
    MatCardModule, 
    MatButtonModule, 
    MatProgressSpinnerModule, 
    MatIconModule,
    MatFormFieldModule,
    MatInputModule
  ],
  template: `
    <div class="container">
      <div class="content">
        <header class="page-header">
          <h1>Discover Amazing Animals</h1>
          <p class="subtitle">Explore the incredible diversity of Earth's wildlife</p>
        </header>

        <div class="list-actions" style="display:flex;justify-content:flex-end;margin:12px 0;">
          <button mat-raised-button color="primary" (click)="goAdd()">
            <mat-icon>add</mat-icon>
            Add Animal
          </button>
        </div>

        <div class="search-container">
          <mat-form-field appearance="outline" class="search-field">
            <mat-label>Search Animals</mat-label>
            <input matInput [(ngModel)]="searchTerm" (ngModelChange)="onSearch()" placeholder="Enter animal name...">
            <mat-icon matSuffix>search</mat-icon>
          </mat-form-field>
        </div>
        
        <div *ngIf="loading" class="loading-container">
          <mat-spinner diameter="48"></mat-spinner>
        </div>

        <ng-container *ngIf="!loading && filteredAnimals.length > 0">
          <div class="grid-container">
            <mat-card class="animal-card" *ngFor="let animal of filteredAnimals">
              <div class="image-container">
                <img [src]="animal.images?.[0]?.url || 'assets/placeholder.jpg'" 
                     [alt]="animal.commonName"
                     (error)="onImageError($event)">
                <div class="image-overlay" *ngIf="animal.images.length > 1">
                  <mat-icon>collections</mat-icon>
                  <span>{{animal.images.length}} images</span>
                </div>
              </div>
              <div class="card-content">
                <mat-card-header>
                  <mat-card-title>{{animal.commonName}}</mat-card-title>
                  <mat-card-subtitle>{{animal.scientificName}}</mat-card-subtitle>
                </mat-card-header>
                <mat-card-content>
                  <p>{{truncateText(animal.description, 120)}}</p>
                </mat-card-content>
                <mat-card-actions>
                  <button mat-button color="primary" [routerLink]="['/animals', animal._id]">
                    <mat-icon>info</mat-icon>
                    Learn More
                  </button>
                  <button mat-button color="accent" [routerLink]="['/animals', animal._id, 'edit']">
                    <mat-icon>edit</mat-icon>
                    Edit
                  </button>
                  <button mat-button color="warn" (click)="delete(animal._id); $event.stopPropagation();">
                    <mat-icon>delete</mat-icon>
                    Delete
                  </button>
                </mat-card-actions>
              </div>
            </mat-card>
          </div>
        </ng-container>
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding: 24px;
      background-color: #fafafa;
      min-height: calc(100vh - 64px);
    }
    .content {
      max-width: 1400px;
      margin: 0 auto;
    }
    .page-header {
      text-align: center;
      margin-bottom: 40px;
    }
    .page-header h1 {
      font-size: 36px;
      font-weight: 500;
      color: #1a237e;
      margin: 0 0 8px;
    }
    .subtitle {
      font-size: 18px;
      color: #666;
      margin: 0;
    }
    .loading-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 400px;
    }
    .grid-container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 24px;
      padding: 8px;
    }
    .animal-card {
      height: 100%;
      transition: transform 0.2s, box-shadow 0.2s;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    .animal-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 6px 12px rgba(0,0,0,0.15);
    }
    .image-container {
      position: relative;
      padding-top: 66.67%; /* 3:2 aspect ratio */
      overflow: hidden;
      background-color: #f0f0f0;
    }
    .image-container img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
    .animal-card:hover .image-container img {
      transform: scale(1.05);
    }
    .card-content {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      padding: 16px;
    }
    mat-card-header {
      margin-bottom: 8px;
    }
    mat-card-title {
      font-size: 20px;
      color: #1a237e;
      margin-bottom: 4px !important;
    }
    mat-card-subtitle {
      font-style: italic;
      color: #666;
    }
    mat-card-content {
      flex-grow: 1;
    }
    mat-card-content p {
      color: #555;
      line-height: 1.5;
      margin: 0;
    }
    mat-card-actions {
      padding: 8px 0 0;
      margin: 0;
    }
    mat-icon {
      margin-right: 4px;
      font-size: 18px;
    }
    button {
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
  `]
})
export class AnimalListComponent implements OnInit {
  animals: Animal[] = [];
  filteredAnimals: Animal[] = [];
  loading = true;
  searchTerm = '';

  constructor(private animalService: AnimalService, private router: Router) {}

  ngOnInit(): void {
    this.loadAnimals();

    // reload list when navigating back to /animals (so add/edit redirect shows updated data)
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe((e: any) => {
      const url = e.urlAfterRedirects || e.url;
      if (url === '/animals' || url === '/') {
        this.loadAnimals();
      }
    });
  }

  loadAnimals(): void {
    this.loading = true;
    this.animalService.getAnimals().subscribe(
      animals => {
        this.animals = animals;
        this.filteredAnimals = animals;
        this.loading = false;
      },
      error => {
        console.error('Error fetching animals:', error);
        this.loading = false;
      }
    );
  }

  onSearch(): void {
    if (!this.searchTerm.trim()) {
      this.filteredAnimals = this.animals;
      return;
    }

    const searchTermLower = this.searchTerm.toLowerCase();
    this.filteredAnimals = this.animals.filter(animal => 
      animal.commonName.toLowerCase().includes(searchTermLower) ||
      animal.scientificName.toLowerCase().includes(searchTermLower) ||
      animal.description.toLowerCase().includes(searchTermLower)
    );
  }

  truncateText(text: string, limit: number): string {
    return text.length > limit ? `${text.substring(0, limit)}...` : text;
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/placeholder.jpg';
  }

  delete(id: string | undefined): void {
    if (!id) return;
    if (!confirm('Are you sure you want to delete this animal?')) return;
    this.animalService.deleteAnimal(id).subscribe(() => {
      this.animals = this.animals.filter(a => a._id !== id);
      this.filteredAnimals = this.filteredAnimals.filter(a => a._id !== id);
    }, err => console.error('Delete failed', err));
  }

  goAdd(): void {
    this.router.navigate(['/animals/new']);
  }
}

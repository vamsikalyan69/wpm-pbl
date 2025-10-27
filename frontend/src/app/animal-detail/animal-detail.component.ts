import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AnimalService } from '../services/animal.service';
import { Animal } from '../services/animal.service';

@Component({
  selector: 'app-animal-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule],
  template: `
    <div class="container" *ngIf="animal">
      <div class="content">
        <mat-card class="detail-card">
          <mat-card-header>
            <mat-card-title>{{animal.commonName}}</mat-card-title>
            <mat-card-subtitle>{{animal.scientificName}}</mat-card-subtitle>
          </mat-card-header>
          <div class="image-gallery">
            <div class="main-image">
              <img [src]="animal.images[selectedImageIndex]?.url || 'assets/placeholder.jpg'" 
                  [alt]="animal.images[selectedImageIndex]?.caption || animal.commonName">
              <p class="caption" *ngIf="animal.images[selectedImageIndex]?.caption">
                {{animal.images[selectedImageIndex].caption}}
              </p>
            </div>
            <div class="thumbnail-strip" *ngIf="animal.images.length > 1">
              <div class="thumbnail"
                  *ngFor="let image of animal.images; let i = index"
                  [class.active]="i === selectedImageIndex"
                  (click)="selectedImageIndex = i">
                <img [src]="image.url" [alt]="image.caption || animal.commonName">
              </div>
            </div>
          </div>
          <mat-card-content>
            <p>{{animal.description}}</p>
            <h3>Habitat</h3>
            <p>{{animal.habitat}}</p>
            <h3>Diet</h3>
            <p>{{animal.diet}}</p>
            <ng-container *ngIf="animal.conservation">
              <h3>Conservation Status</h3>
              <p>{{animal.conservation.status}}</p>
              <h4>Threats</h4>
              <ul>
                <li *ngFor="let threat of animal.conservation.threats">{{threat}}</li>
              </ul>
              <h4>Conservation Measures</h4>
              <ul>
                <li *ngFor="let measure of animal.conservation.measures">{{measure}}</li>
              </ul>
            </ng-container>
          </mat-card-content>
          <mat-card-actions>
            <button mat-button routerLink="/animals">BACK TO LIST</button>
          </mat-card-actions>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
    }
    .content {
      max-width: 800px;
      margin: 0 auto;
    }
    .detail-card {
      margin: 16px;
    }
    .image-gallery {
      margin: 20px 0;
    }
    .main-image {
      width: 100%;
      height: 400px;
      position: relative;
      overflow: hidden;
      border-radius: 4px;
      background: #f5f5f5;
    }
    .main-image img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    .caption {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(0,0,0,0.7);
      color: white;
      padding: 8px;
      margin: 0;
    }
    .thumbnail-strip {
      display: flex;
      gap: 8px;
      margin-top: 8px;
      overflow-x: auto;
      padding: 4px;
    }
    .thumbnail {
      width: 80px;
      height: 80px;
      flex-shrink: 0;
      cursor: pointer;
      border: 2px solid transparent;
      border-radius: 4px;
      overflow: hidden;
    }
    .thumbnail.active {
      border-color: #1a237e;
    }
    .thumbnail img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    mat-card-content {
      margin-top: 20px;
    }
    h3 {
      margin-top: 20px;
      color: #666;
    }
  `]
})
export class AnimalDetailComponent implements OnInit {
  animal: Animal | null = null;
  selectedImageIndex = 0;

  constructor(
    private route: ActivatedRoute,
    private animalService: AnimalService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.animalService.getAnimal(params['id']).subscribe(
        data => this.animal = data
      );
    });
  }
}

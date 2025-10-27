import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AnimalService } from './services/animal.service';

@Component({
  selector: 'app-animal-list',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatGridListModule, MatButtonModule, MatToolbarModule],
  template: `
    <div class="container">
      <mat-toolbar color="primary">Animal Diversity</mat-toolbar>
      <div class="content">
        <h2>Explore Species</h2>
        <mat-grid-list cols="3" rowHeight="1:1" gutterSize="16px">
          <mat-grid-tile *ngFor="let a of animals">
            <mat-card class="animal-card">
              <img mat-card-image [src]="a.images?.[0]?.url || 'assets/placeholder.jpg'" alt="{{a.commonName}}">
              <mat-card-header>
                <mat-card-title>{{a.commonName}}</mat-card-title>
                <mat-card-subtitle>{{a.scientificName}}</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <p>{{a.description | slice:0:120}}...</p>
              </mat-card-content>
              <mat-card-actions>
                <button mat-button color="primary" [routerLink]="['/animals', a._id]">Learn more</button>
              </mat-card-actions>
            </mat-card>
          </mat-grid-tile>
        </mat-grid-list>
      </div>
    </div>
  `
})
export class AnimalListComponent implements OnInit {
  animals: any[] | null = null;
  constructor(private svc: AnimalService) {}
  ngOnInit() {
    this.svc.getAnimals().subscribe((res: any) => this.animals = res.animals || res);
  }
}

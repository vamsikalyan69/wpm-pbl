import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AnimalService } from './services/animal.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-animal-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <div class="detail-container" *ngIf="animal">
      <mat-card>
        <mat-card-header>
          <mat-card-title>{{animal.commonName}}</mat-card-title>
          <mat-card-subtitle>{{animal.scientificName}}</mat-card-subtitle>
        </mat-card-header>
        <img mat-card-image *ngIf="animal.images?.length" [src]="animal.images[0].url" alt="{{animal.commonName}}">
        <mat-card-content>
          <h3>Description</h3>
          <p>{{animal.description}}</p>
          <h3>Classification</h3>
          <pre>{{animal.classification | json}}</pre>
          <h3>Conservation</h3>
          <pre>{{animal.conservation | json}}</pre>
        </mat-card-content>
      </mat-card>
    </div>
  `
})
export class AnimalDetailComponent implements OnInit {
  animal: any;
  constructor(private route: ActivatedRoute, private svc: AnimalService) {}
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.svc.getAnimal(id).subscribe(a => this.animal = a);
  }
}

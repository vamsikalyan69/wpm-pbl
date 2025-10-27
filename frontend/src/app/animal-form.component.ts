import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AnimalService, Animal } from './services/animal.service';

@Component({
  selector: 'app-animal-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule],
  template: `
    <div class="container">
      <div class="content">
        <mat-card>
          <mat-card-title>{{ isEdit ? 'Edit Animal' : 'Add New Animal' }}</mat-card-title>
          <mat-card-content>
            <form #f="ngForm" (ngSubmit)="save()">
              <mat-form-field appearance="outline" class="full">
                <mat-label>Common Name</mat-label>
                <input matInput name="commonName" [(ngModel)]="model.commonName" required>
              </mat-form-field>

              <mat-form-field appearance="outline" class="full">
                <mat-label>Scientific Name</mat-label>
                <input matInput name="scientificName" [(ngModel)]="model.scientificName">
              </mat-form-field>

              <mat-form-field appearance="outline" class="full">
                <mat-label>Description</mat-label>
                <textarea matInput name="description" [(ngModel)]="model.description" rows="4"></textarea>
              </mat-form-field>

              <mat-form-field appearance="outline" class="full">
                <mat-label>Habitat (comma separated)</mat-label>
                <input matInput name="habitat" [(ngModel)]="habitatText">
              </mat-form-field>

              <mat-form-field appearance="outline" class="full">
                <mat-label>Diet</mat-label>
                <input matInput name="diet" [(ngModel)]="model.diet">
              </mat-form-field>

              <mat-form-field appearance="outline" class="full">
                <mat-label>Image URL (first image)</mat-label>
                <input matInput name="imageUrl" [(ngModel)]="imageUrl">
              </mat-form-field>

              <div class="actions">
                <button mat-button color="primary" type="submit">Save</button>
                <button mat-button type="button" routerLink="/animals">Cancel</button>
              </div>
            </form>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`.container { padding: 16px } .full { width: 100%; } .actions { margin-top: 12px; }`]
})
export class AnimalFormComponent {
  model: Partial<Animal> = { commonName: '', scientificName: '', description: '', habitat: [], diet: '', images: [] };
  habitatText = '';
  imageUrl = '';
  isEdit = false;
  id: string | null = null;

  constructor(private animalService: AnimalService, private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      const paramId = params['id'] as string | undefined;
      if (paramId) {
        this.isEdit = true;
        this.id = paramId;
        this.animalService.getAnimal(paramId).subscribe(a => {
          this.model = a;
          this.habitatText = (a.habitat || []).join(', ');
          this.imageUrl = a.images?.[0]?.url || '';
        });
      }
    });
  }

  save() {
    this.model.habitat = this.habitatText.split(',').map(s => s.trim()).filter(Boolean);
    if (this.imageUrl) {
      this.model.images = [{ url: this.imageUrl }];
    }

    if (this.isEdit && this.id) {
      this.animalService.updateAnimal(this.id, this.model).subscribe(() => this.router.navigate(['/animals']));
    } else {
      this.animalService.createAnimal(this.model).subscribe(() => this.router.navigate(['/animals']));
    }
  }
}

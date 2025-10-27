import { Routes } from '@angular/router';
import { AnimalListComponent } from './animal-list/animal-list.component';
import { AnimalDetailComponent } from './animal-detail/animal-detail.component';

export const routes: Routes = [
  { path: '', component: AnimalListComponent },
  { path: 'animals', component: AnimalListComponent },
  { path: 'animals/new', loadComponent: () => import('./animal-form.component').then(m => m.AnimalFormComponent) },
  { path: 'animals/:id', component: AnimalDetailComponent },
  { path: 'animals/:id/edit', loadComponent: () => import('./animal-form.component').then(m => m.AnimalFormComponent) },
  { path: '**', redirectTo: '' }
];

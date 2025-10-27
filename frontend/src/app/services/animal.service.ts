import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Animal {
  _id?: string;
  commonName: string;
  scientificName: string;
  description: string;
  habitat: string[];
  diet: string;
  images: Array<{ url: string, caption?: string }>;
  conservation?: {
    status: string;
    threats: string[];
    measures: string[];
  };
  classification?: {
    kingdom: string;
    phylum: string;
    class: string;
    order: string;
    family: string;
    genus: string;
    species: string;
  };
  articles?: Array<{
    title: string;
    content: string;
    author: string;
    date: Date;
  }>;
}

@Injectable({
  providedIn: 'root'
})
export class AnimalService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  getAnimals(): Observable<Animal[]> {
    return this.http.get<Animal[]>(`${this.apiUrl}/animals`);
  }

  getAnimal(id: string): Observable<Animal> {
    return this.http.get<Animal>(`${this.apiUrl}/animals/${id}`);
  }

  createAnimal(animal: Partial<Animal>): Observable<Animal> {
    return this.http.post<Animal>(`${this.apiUrl}/animals`, animal);
  }

  updateAnimal(id: string, animal: Partial<Animal>): Observable<Animal> {
    return this.http.patch<Animal>(`${this.apiUrl}/animals/${id}`, animal);
  }

  deleteAnimal(id: string): Observable<{ message?: string }> {
    return this.http.delete<{ message?: string }>(`${this.apiUrl}/animals/${id}`);
  }
}

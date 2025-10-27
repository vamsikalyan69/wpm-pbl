import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  exports: [MatToolbarModule, MatCardModule, MatGridListModule, MatButtonModule]
})
export class MaterialModule {}

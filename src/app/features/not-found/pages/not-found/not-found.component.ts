import { Component, inject } from '@angular/core';
import { Location } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-not-found',
  styleUrl: './not-found.component.css',
  templateUrl: './not-found.component.html',
})
export class NotFoundComponent {
  private readonly location = inject(Location);

  protected goBack(): void {
    this.location.back();
  }
}

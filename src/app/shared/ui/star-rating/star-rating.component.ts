import { Component, computed, input } from '@angular/core';

/** 5 stars, filled up to the rounded rating. `<app-star-rating [rating]="4.1" />` */
@Component({
  selector: 'app-star-rating',
  styleUrl: './star-rating.component.css',
  templateUrl: './star-rating.component.html',
})
export class StarRatingComponent {
  readonly rating = input.required<number>();

  protected readonly stars = computed<readonly boolean[]>(() => {
    const filled = Math.round(this.rating());
    return [1, 2, 3, 4, 5].map((position) => position <= filled);
  });
}

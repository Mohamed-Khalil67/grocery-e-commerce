import { Component, input, linkedSignal } from '@angular/core';

/** Big image + clickable thumbnails. The selected image goes back to the first one when the product changes. */
@Component({
  imports: [],
  selector: 'app-product-gallery',
  styleUrl: './product-gallery.component.css',
  templateUrl: './product-gallery.component.html',
})
export class ProductGalleryComponent {
  readonly images = input.required<readonly string[]>();

  // A linkedSignal is a signal you can .set() (click a thumbnail) that also recomputes when `images` changes.
  protected readonly selected = linkedSignal(() => this.images()[0]);
}

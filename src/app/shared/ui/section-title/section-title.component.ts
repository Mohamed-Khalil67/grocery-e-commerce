import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * Home-page section heading: green bar + "Shop By Category" (last word green) + optional "View all" link.
 *   <app-section-title plain="Shop By" accent="Category" linkLabel="View All Categories" link="/categories" />
 */
@Component({
  imports: [RouterLink],
  selector: 'app-section-title',
  styleUrl: './section-title.component.css',
  templateUrl: './section-title.component.html',
})
export class SectionTitleComponent {
  readonly plain = input.required<string>();
  readonly accent = input.required<string>();
  readonly link = input<string>('');
  readonly linkLabel = input<string>('');
}

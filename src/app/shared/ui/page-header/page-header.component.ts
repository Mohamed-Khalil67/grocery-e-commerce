import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

export type HeaderTheme = 'green' | 'violet' | 'orange' | 'blue';

export interface Crumb {
  readonly label: string;
  /** Omit for the current page (last crumb). */
  readonly link?: string;
}

/** Full-width gradient banner used by Products (green), Categories (green), Brands (violet)… */
@Component({
  imports: [RouterLink],
  selector: 'app-page-header',
  styleUrl: './page-header.component.css',
  templateUrl: './page-header.component.html',
})
export class PageHeaderComponent {
  readonly title = input.required<string>();
  readonly subtitle = input<string>('');
  /** Font Awesome icon name without the "fa-" prefix, e.g. "tags". */
  readonly icon = input<string>('box');
  readonly theme = input<HeaderTheme>('green');
  readonly crumbs = input<readonly Crumb[]>([]);

  // full class names so Tailwind can see them
  protected readonly gradients: Record<HeaderTheme, string> = {
    green: 'from-green-600 via-green-500 to-green-400',
    violet: 'from-violet-600 via-violet-500 to-purple-400',
    orange: 'from-orange-600 via-orange-500 to-amber-400',
    blue: 'from-blue-600 via-blue-500 to-sky-400',
  };
}

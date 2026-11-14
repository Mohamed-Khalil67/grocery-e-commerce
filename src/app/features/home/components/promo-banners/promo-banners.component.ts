import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface PromoBanner {
  readonly emoji: string;
  readonly badge: string;
  readonly title: string;
  readonly description: string;
  readonly discount: string;
  readonly code: string;
  readonly buttonLabel: string;
  /** Full Tailwind class names (Tailwind only keeps classes it can read as whole words in the source). */
  readonly gradient: string;
  readonly buttonColor: string;
}

/** The two promo banners under the categories. The texts and promo codes are fixed (no API for them). */
@Component({
  imports: [RouterLink],
  selector: 'app-promo-banners',
  styleUrl: './promo-banners.component.css',
  templateUrl: './promo-banners.component.html',
})
export class PromoBannersComponent {
  protected readonly banners: readonly PromoBanner[] = [
    {
      emoji: '🔥',
      badge: 'Deal of the Day',
      title: 'Fresh Organic Fruits',
      description: 'Get up to 40% off on selected organic fruits',
      discount: '40% OFF',
      code: 'ORGANIC40',
      buttonLabel: 'Shop Now',
      gradient: 'from-emerald-500 to-emerald-700',
      buttonColor: 'text-emerald-600',
    },
    {
      emoji: '✨',
      badge: 'New Arrivals',
      title: 'Exotic Vegetables',
      description: 'Discover our latest collection of premium vegetables',
      discount: '25% OFF',
      code: 'FRESH25',
      buttonLabel: 'Explore Now',
      gradient: 'from-orange-400 to-rose-500',
      buttonColor: 'text-orange-500',
    },
  ];
}

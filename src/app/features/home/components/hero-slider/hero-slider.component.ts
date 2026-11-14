import { Component, DestroyRef, ElementRef, ViewEncapsulation, afterNextRender, inject, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import Swiper from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules';

interface HeroSlide {
  readonly title: string;
  readonly subtitle: string;
  readonly primary: { readonly label: string; readonly link: string };
  readonly secondary: { readonly label: string; readonly link: string };
}

/**
 * Home hero: 3 slides that slide by themselves (Swiper.js), with arrows and dots. Texts are the demo's.
 * Your photo goes in public/images/hero/home-slider.png (the green gradient shows until the file exists).
 */
@Component({
  imports: [RouterLink],
  // Swiper creates the dots itself at runtime, so Angular's scoped styles would not reach them
  encapsulation: ViewEncapsulation.None,
  selector: 'app-hero-slider',
  styleUrl: './hero-slider.component.css',
  templateUrl: './hero-slider.component.html',
})
export class HeroSliderComponent {
  protected readonly slides: readonly HeroSlide[] = [
    {
      title: 'Fresh Products Delivered to your Door',
      subtitle: 'Get 20% off your first order',
      primary: { label: 'Shop Now', link: '/products' },
      secondary: { label: 'View Deals', link: '/products' },
    },
    {
      title: 'Premium Quality Guaranteed',
      subtitle: 'Fresh from farm to your table',
      primary: { label: 'Shop Now', link: '/products' },
      secondary: { label: 'Learn More', link: '/brands' },
    },
    {
      title: 'Fast & Free Delivery',
      subtitle: 'Same day delivery available',
      primary: { label: 'Order Now', link: '/products' },
      secondary: { label: 'Delivery Info', link: '/categories' },
    },
  ];

  // The elements Swiper needs, found in the template by their #names.
  private readonly slider = viewChild.required<ElementRef<HTMLElement>>('slider');
  private readonly prev = viewChild.required<ElementRef<HTMLElement>>('prev');
  private readonly next = viewChild.required<ElementRef<HTMLElement>>('next');
  private readonly dots = viewChild.required<ElementRef<HTMLElement>>('dots');

  constructor() {
    const destroyRef = inject(DestroyRef);

    // Swiper needs the real DOM, so start it only in the browser, after the first render.
    afterNextRender(() => {
      const swiper = new Swiper(this.slider().nativeElement, {
        modules: [Autoplay, Pagination],
        loop: true,
        autoplay: { delay: 5000, pauseOnMouseEnter: true, disableOnInteraction: false },
        pagination: { el: this.dots().nativeElement, clickable: true },
        on: {
          init: (s) => console.log('[hero] Swiper ready. slides:', s.slides.length),
          slideChange: (s) => console.log('[hero] now showing slide index:', s.realIndex),
        },
      });

      // our own round buttons call Swiper's methods
      this.prev().nativeElement.addEventListener('click', () => swiper.slidePrev());
      this.next().nativeElement.addEventListener('click', () => swiper.slideNext());

      destroyRef.onDestroy(() => swiper.destroy());
    });
  }
}

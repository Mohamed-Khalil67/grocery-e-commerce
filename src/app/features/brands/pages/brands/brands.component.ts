import { Component, inject, input, numberAttribute } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { PageHeaderComponent } from '../../../../shared/ui/page-header/page-header.component';
import { PaginationComponent } from '../../../../shared/ui/pagination/pagination.component';
import { BrandCardComponent } from '../../components/brand-card/brand-card.component';
import { BrandService } from '../../services/brand.service';
import {RouterLink} from '@angular/router';

/**
 * 🎯 TODO(brands) — Brands
 *
 * Objective
 *   A grid of all brands.
 *
 * What the demo (https://freshcart-route.vercel.app) looks like
 *   - VIOLET <app-page-header theme="violet"> "Top Brands" / "Shop from your favorite brands".
 *   - 6 columns of <app-brand-card>.
 *
 * Done when
 *   - 54 brands → paginate or "load more".
 *   - A card opens /brands/:id.
 *
 * Endpoints
 *   - GET /brands?page=&limit=
 *
 * Concepts you'll practice
 *   - @for + track
 *   - Reusing <app-pagination>
 *
 * Do first: TODO(brands-1)
 *
 * Stuck? ask "hint for TODO(brands)" · done? ask "review TODO(brands)".
 */
@Component({
  imports: [PageHeaderComponent, PaginationComponent, BrandCardComponent, RouterLink],
  selector: 'app-brands',
  styleUrl: './brands.component.css',
  templateUrl: './brands.component.html',
})
export class BrandsComponent {
  private readonly brandService = inject(BrandService);

  readonly page = input<string>();   // raw text from the URL, or undefined

  protected readonly brands = rxResource({
    params: () => Number(this.page() ?? 1),   // "2" → 2, undefined → 1
    stream: ({ params }) => this.brandService.getBrands(params),
  });
}

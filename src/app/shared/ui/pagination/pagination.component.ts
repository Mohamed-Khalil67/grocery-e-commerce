import {Component, computed, input, output} from '@angular/core';
import {RouterLink} from '@angular/router';

/**
 * 🎯 TODO(pagination) — Pagination
 *
 * Prev / page numbers / Next. input(currentPage), input(numberOfPages), output(pageChange). Used by products, brands, reviews.
 *
 * Where: shared/ui/pagination
 * Stuck? ask "hint for TODO(pagination)" · done? ask "review TODO(pagination)".
 */
@Component({
  imports: [
    RouterLink
  ],
  selector: 'app-pagination',
  styleUrl: './pagination.component.css',
  templateUrl: './pagination.component.html',
})
export class PaginationComponent {
  currentPage = input.required<number>()
  numberOfPages = input.required<number>()

  pages = computed(() => {
    const pages: number[] = [];                                   // start with an empty list
    for (let page = this.firstShown(); page <= this.lastShown(); page++) {    // count from 1 up to the last page
      pages.push(page);                                           // add each number to the list
    }
    return pages;                                                 // [1, 2, ...]
  })

  firstShown = computed(()=> {
    const pages = this.currentPage() - 2;
    if(pages < 1){
      return 1;
    }
    return pages;
  })

  lastShown = computed(()=> {
    const pages = this.currentPage() + 2;
    if(pages > this.numberOfPages()){
      return this.numberOfPages();
    }
    return pages;
  })

}

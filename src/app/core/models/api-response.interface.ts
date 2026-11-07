/** Pagination info returned by every list endpoint (verified against GET /products?limit=1). */
export interface PaginationMetadata {
  readonly currentPage: number;
  readonly numberOfPages: number;
  readonly limit: number;
  readonly nextPage?: number;
  readonly prevPage?: number;
}

/** Shape of list endpoints: GET /products, /brands, /categories, /subcategories ... */
export interface ApiListResponse<T> {
  readonly results: number;
  readonly metadata: PaginationMetadata;
  readonly data: readonly T[];
}

/** Shape of single-item endpoints: GET /products/:id, /brands/:id, /categories/:id ... */
export interface ApiItemResponse<T> {
  readonly data: T;
}

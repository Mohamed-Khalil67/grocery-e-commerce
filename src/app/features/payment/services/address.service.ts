import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/**
 * Saved addresses (bonus — "use a saved address" at checkout).
 *
 *   GET/POST /addresses · GET/DELETE /addresses/:id
 */
@Service()
export class AddressService {
  private readonly http = inject(HttpClient);

  // TODO(address-1): getAddresses(), addAddress(address), removeAddress(id)
}

import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddressListResponse, NewAddress } from '../models/address.interface';

/**
 * Saved addresses (bonus: "use a saved address" at checkout). All calls need the login token
 * (the auth interceptor adds it). Reply shapes are from the docs, not verified with a login yet.
 *
 *   GET /addresses · POST /addresses · DELETE /addresses/:id
 */
@Service()
export class AddressService {
  private readonly http = inject(HttpClient);

  getAddresses(): Observable<AddressListResponse> {
    return this.http.get<AddressListResponse>('/addresses');
  }

  /** The reply is the updated list of addresses. */
  addAddress(address: NewAddress): Observable<AddressListResponse> {
    return this.http.post<AddressListResponse>('/addresses', address);
  }

  /** The reply is the updated list of addresses. */
  removeAddress(id: string): Observable<AddressListResponse> {
    return this.http.delete<AddressListResponse>(`/addresses/${id}`);
  }
}

/**
 * A saved address (bonus). Shape from the Route API docs, NOT verified with a login yet:
 * after you log in, open DevTools > Network > /addresses and compare.
 *
 *   GET    /addresses      → { status, results, data: Address[] }
 *   POST   /addresses      body { name, details, phone, city } → { status, message, data: Address[] }
 *   DELETE /addresses/:id  → { status, message, data: Address[] }
 */
export interface Address {
  readonly _id: string;
  readonly name: string;
  readonly details: string;
  readonly phone: string;
  readonly city: string;
}

/** What you send to POST /addresses. */
export interface NewAddress {
  readonly name: string;
  readonly details: string;
  readonly phone: string;
  readonly city: string;
}

/** The reply of the three /addresses calls: always the (new) list of addresses. */
export interface AddressListResponse {
  readonly status: string;
  readonly message?: string;
  readonly data: readonly Address[];
}

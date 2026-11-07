/*
 * TODO(address-models): saved addresses (optional, but the task says use as many endpoints as you can).
 *
 *   GET    /addresses      → { status, results, data: Address[] }
 *   POST   /addresses      body { name, details, phone, city } → { status, message, data: Address[] }
 *   GET    /addresses/:id  → { status, data: Address }
 *   DELETE /addresses/:id  → { status, message, data: Address[] }
 *
 *   Address: { _id, name, details, phone, city }
 */
export {};

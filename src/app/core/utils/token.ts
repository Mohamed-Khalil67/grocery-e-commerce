/** Everything the Route API puts inside a login token. */
export interface TokenPayload {
  readonly id: string;
  readonly name: string;
  readonly role: string;
  /** When the token was created and when it expires (seconds since 1970). 0 if missing. */
  readonly iat: number;
  readonly exp: number;
}

/**
 * Reads everything out of a login token.
 * A token (JWT) is 3 parts joined by dots: header.payload.signature.
 * The payload is base64-encoded JSON like { id, name, role, iat, exp }.
 * This only READS the token; it does not check that the token is real (only the server can).
 */
export function decodeToken(token: string): TokenPayload {
  const payloadPart = token.split('.')[1] ?? '';
  const data: unknown = JSON.parse(atob(payloadPart.replace(/-/g, '+').replace(/_/g, '/')));

  if (!isRecord(data)) {
    return { id: '', name: '', role: '', iat: 0, exp: 0 };
  }

  const text = (key: string): string => {
    const value = data[key];
    return typeof value === 'string' ? value : '';
  };
  const number = (key: string): number => {
    const value = data[key];
    return typeof value === 'number' ? value : 0;
  };

  return { id: text('id'), name: text('name'), role: text('role'), iat: number('iat'), exp: number('exp') };
}

/** "Is this a plain object?" Lets TypeScript read keys from it without `any` or `as`. */
function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

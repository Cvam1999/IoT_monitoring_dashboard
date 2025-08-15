import {jwtDecode} from 'jwt-decode';

export type User = { id: string; email: string; role: 'Admin'|'User' }
export type AuthState = { token: string|null; user: User|null }

function save(state: AuthState) {
  localStorage.setItem('auth', JSON.stringify(state));
}
function load(): AuthState {
  try { return JSON.parse(localStorage.getItem('auth')||'{}'); } catch { return { token:null, user: null } as any }
}
export const auth = {
  state: load() as AuthState,
  set(token: string|null, user: User|null) { this.state = { token, user }; save(this.state); },
  clear() { this.set(null, null); }
};

export function parseUserFromToken(token: string): User|undefined {
  try {
    const decoded: any = jwtDecode(token);
    return { id: decoded.sub, email: decoded.email, role: decoded.role };
  } catch { return undefined; }
}

import { AuthService } from '../src/auth/auth.service.js';

describe('AuthService skeleton', () => {
  it('instantiates', () => {
    const svc = new AuthService({} as any, { signAsync: async () => 'token' } as any);
    expect(svc).toBeDefined();
  });
});

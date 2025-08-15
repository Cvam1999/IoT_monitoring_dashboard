import { Resolver, Mutation, Args, ObjectType, Field } from '@nestjs/graphql';
import { AuthService } from './auth.service.js';
import { Public } from '../common/public.decorator.js';

@ObjectType()
class LoginPayload {
  @Field() access_token!: string;
}

@Resolver()
export class AuthResolver {
  constructor(private readonly auth: AuthService) {}

  @Public()
  @Mutation(() => LoginPayload)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<LoginPayload> {
    const res = await this.auth.login(email, password);
    return { access_token: res.access_token };
  }
}

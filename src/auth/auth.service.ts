import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-http-bearer';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService extends PassportStrategy(Strategy) {
    constructor() {
        super();
    }
    tokens:string[] = ['test-token', 'test-token-yulian'];
    async validate(token: string): Promise<any> {

        const isValid = await this.validateToken(token);
        if (!isValid) {
            throw new UnauthorizedException();
        }
        return { token };
    }

    async validateToken(token: string): Promise<boolean> {
        return this.tokens.includes(token);
    }
}

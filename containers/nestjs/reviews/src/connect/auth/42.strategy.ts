import { Strategy } from 'passport-42';
import { PassportStrategy } from '@nestjs/passport';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

import { ConfigService } from '@nestjs/config';

@Injectable()
export class FortyTwoStrategy extends PassportStrategy(Strategy, '42') {
  constructor(config: ConfigService) {
    super({
      clientID:
        'u-s4t2ud-ee30a5db96f14e2d9fb7fdd78060fe407784d7ad7764cd025526a1820b01534f',
      clientSecret:
        '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',
      callbackURL: 'http://localhost:8000/42/oauth',
    });
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    done: Function,
  ): Promise<any> {
    try {
      accessToken;
      refreshToken;
      const user = {
        email: profile.emails[0].value,
        avatar: profile._json.image.link,
        username: profile.username,
      };
      if (user == undefined || user == null) {
        throw new BadRequestException();
      }
      done(null, user);
    } catch (error) {
      throw new BadRequestException({
        statusCode: 403,
        message: 'error login Or sign up try again',
      });
    }
  }
}

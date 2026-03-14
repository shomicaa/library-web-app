import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './modules/database/database.module';
import { AuthorModule } from './modules/authors/author.module';
import { BookModule } from './modules/books/book.module';
import {ThrottlerModule, ThrottlerGuard} from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { RatingModule } from './modules/ratings/rating.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/users/user.module';

// Here we implemented a ThrottlerGuard to limit the amount of requests that can be made to the API.
// We also added the ThrottlerModule.forRoot() method to configure the ThrottlerGuard with two different settings.

@Module({
  imports: [DatabaseModule, AuthorModule, BookModule, RatingModule, AuthModule, UserModule, ThrottlerModule.forRoot([{
    name: 'short',
    ttl: 1000,
    limit: 60,
    },{
    name: 'long',
    ttl: 60000,
    limit: 1000,
    }])
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: ThrottlerGuard,
  }],
})

export class AppModule {}

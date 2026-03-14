import { AuthorController } from './author.controller';
import { AuthorRepository } from './author.repository';
import { AuthorService } from './author.service';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorEntity } from '../database/entities/author.entity';
import { BookModule } from '../books/book.module';

@Module({
  // We need to use a forwardRef() function to avoid a circular dependency
  imports: [
    TypeOrmModule.forFeature([AuthorEntity]),
    forwardRef(() => BookModule),
  ],
  controllers: [AuthorController],
  providers: [AuthorRepository, AuthorService],
  exports: [AuthorService],
})
export class AuthorModule {}

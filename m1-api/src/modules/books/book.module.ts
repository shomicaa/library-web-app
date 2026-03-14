import { forwardRef, Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookRepository } from './book.repository';
import { BookService } from './book.service';
import { AuthorModule } from '../authors/author.module';

@Module({
  // We need to use a forwardRef() function to avoid a circular dependency
  imports: [forwardRef(() => AuthorModule)],
  controllers: [BookController],
  providers: [BookRepository, BookService],
  exports: [BookRepository],
})
export class BookModule {}

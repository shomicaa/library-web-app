import { Body, Controller, Get, Post, Patch, Delete, NotFoundException, Param, Query, UseGuards } from '@nestjs/common';
import { AuthorModel } from './author.model';
import { AuthorService } from './author.service';
import { CreateAuthorDto, UpdateAuthorDto } from './author.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

// We create the endpoints for the user to acces the data or edit it.

@Controller('authors')
@UseGuards(JwtAuthGuard)
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get() // /api/authors
  public async getAuthors(
    @Query('search') search?: string,
    @Query('sortBy') sortBy?: string,
    @Query('sortOrder') sortOrder: 'ASC' | 'DESC' = 'ASC',
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
  ): Promise<AuthorModel[]> {
    return this.authorService.getAuthors(
      search,
      sortBy,
      sortOrder,
      limit,
      offset,
    );
  }

  @Get(':id') // /api/authors/:id
  public async getAuthorById(@Param('id') id: string): Promise<AuthorModel> {
    return this.authorService.getAuthorById(id);
  }

  @Post() // /api/authors
  public async createAuthor(
    @Body() input: CreateAuthorDto,
  ): Promise<AuthorModel> {
    return this.authorService.createAuthor(input);
  }

  @Patch(':id') // /api/authors/:id
  public async updateAuthor(
    @Param('id') id: string,
    @Body() input: UpdateAuthorDto,
  ): Promise<AuthorModel> {
    return this.authorService.updateAuthor(id, input);
  }

  @Delete(':id') // /api/authors/:id
  public async deleteAuthor(@Param('id') id: string): Promise<void> {
    return this.authorService.deleteAuthor(id);
  }
}

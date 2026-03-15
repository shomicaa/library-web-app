import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AuthorEntity, AuthorId } from '../database/entities/author.entity';
import { AuthorModel, CreateAuthorModel, UpdateAuthorModel } from './author.model';


@Injectable()
export class AuthorRepository {
  private readonly authorRepository =
    this.dataSource.getRepository(AuthorEntity);

  constructor(private readonly dataSource: DataSource) {}

  public async getAuthors(
    search?: string,
    sortBy?: string,
    sortOrder: 'ASC' | 'DESC' = 'ASC',
    limit?: number,
    offset?: number,
  ): Promise<AuthorModel[]> {
    // Same thing as for the book repository
    const query = this.authorRepository.createQueryBuilder('author');
  
    if (search) {
      query.where('author.name LIKE :search', { search: `%${search}%` });
    }
    if (sortBy) {
      query.orderBy(`author.${sortBy}`, sortOrder);
    }
    if (limit !== undefined && offset !== undefined) {
      query.skip(offset).take(limit);
    }
    return query.getMany();
  }

  public async getAuthorById(id: string): Promise<AuthorModel> {
    return this.authorRepository.findOne({ where: { id: id as AuthorId } });
  }

  public async createAuthor(input: CreateAuthorModel): Promise<AuthorModel> {
    return this.authorRepository.save(this.authorRepository.create(input));
  }

  public async updateAuthor(id: string, input: UpdateAuthorModel): Promise<AuthorModel> {
    await this.authorRepository.update(id, input);
    return this.authorRepository.findOne({ where: { id: id as AuthorId } });
  }

  public async deleteAuthor(id: string): Promise<boolean> {
    const result = await this.authorRepository.delete(id);
    return result.affected > 0;
  }
}

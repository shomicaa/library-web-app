import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

export type AuthorId = string & { __brand: 'Author' };

@Entity('authors')
export class AuthorEntity {
  @PrimaryGeneratedColumn('uuid')
  id: AuthorId;

  @Column({ name: 'name', type: 'varchar' })
  name: string;

  @Column({ name: 'biography', type: 'text', default: '' })
  biography: string;

  @Column({ name: 'numberOfBooksWritten', type: 'int', default: 0 })
  numberOfBooksWritten: number;

  @Column({ name: 'averageRating', type: 'float', default: 0})
  averageRating: number;

  @Column({ name: 'photoURL', type: 'varchar', default: '' })
  photoURL: string;
}

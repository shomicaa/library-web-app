import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BookEntity, BookId } from './books.entity';

export type RatingId = string & { __brand: 'Rating' };

@Entity('ratings')
export class RatingEntity {
  @PrimaryGeneratedColumn('uuid')
  id: RatingId;

  @Column({ name: 'stars', type: 'int' })
  stars: number; // 1 to 5

  @Column({ name: 'comment', type: 'text', nullable: true, default: null })
  comment: string;

  @Column({
    name: 'createdAt',
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({ name: 'bookId', type: 'uuid' })
  bookId: BookId;

  @ManyToOne(() => BookEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'bookId' })
  book: BookEntity;
}
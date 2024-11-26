import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Token {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 1000 })
  token: string;

  @Column({ type: 'datetime', name: 'creation_date' })
  creation_date: Date;
}

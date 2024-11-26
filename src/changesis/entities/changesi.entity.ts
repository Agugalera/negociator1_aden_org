import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Changesis {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  author: string;

  @Column({ type: 'datetime', name: 'creation_date' })
  creation_date: Date;

  @Column()
  stage: number;
}

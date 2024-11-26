import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Block {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  id_session: number;

  @Column({ length: 20 })
  state: string;

  @Column({ length: 20 })
  stage: string;
}

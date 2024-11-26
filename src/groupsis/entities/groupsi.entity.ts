import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Groupsis {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'id_block' })
  id_block: number;

  @Column({ name: 'id_company' })
  id_company: number;

  @Column({ type: 'tinyint' })
  state: number;
}

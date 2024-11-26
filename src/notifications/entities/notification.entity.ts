import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'id_author' })
  id_author: number;

  @Column({ type: 'timestamp', name: 'creation_date' })
  @CreateDateColumn()
  creation_date: Date;

  @Column({ name: 'target_id' })
  target_id: number;

  @Column({ length: 20, name: 'target_type' })
  target_type: string;

  @Column({ type: 'text' })
  body: string;

  @Column({ length: 20 })
  type: string;

  @Column({ length: 20 })
  refresh: string;

  @Column({ type: 'tinyint' })
  state: number;
}

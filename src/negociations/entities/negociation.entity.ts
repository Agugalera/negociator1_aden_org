import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Negociation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'id_block' })
  id_block: number;

  @Column({ name: 'id_group_author' })
  id_group_author: number;

  @Column({ name: 'id_user_author' })
  id_user_author: number;

  @Column({ type: 'datetime', name: 'creation_date' })
  creation_date: Date;

  @Column({ type: 'mediumtext' })
  message: string;

  @Column({ type: 'longtext', name: 'teacher_return' })
  teacher_return: string;

  @Column({ type: 'datetime', name: 'return_date' })
  return_date: Date;

  @Column({ type: 'tinyint' })
  readed: number;

  @Column({ length: '15' })
  phase: string;

  @Column({ type: 'tinyint' })
  state: number;
}

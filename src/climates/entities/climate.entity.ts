import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Climate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'smallint', name: 'id_group' })
  id_group: number;

  @Column({ type: 'longtext' })
  value: string;

  @Column({ length: 20 })
  type: string;

  @Column({ length: 100 })
  author: string;

  @Column({ type: 'datetime', name: 'creation_date' })
  creation_date: Date;

  @Column({ type: 'longtext', name: 'teacher_return' })
  teacher_return: string;

  @Column({ type: 'datetime', name: 'return_date' })
  return_date: Date;

  @Column({ type: 'tinyint' })
  state: number;
}

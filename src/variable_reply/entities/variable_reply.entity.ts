import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class VariableReply {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'smallint', name: 'id_group' })
  id_group: number;

  @Column({ type: 'tinyint', name: 'id_variable' })
  id_variable: number;

  @Column({ type: 'mediumtext' })
  value: string;

  @Column({ length: 20 })
  color: string;

  @Column({ type: 'datetime', name: 'creation_date' })
  creation_date: Date;

  @Column({ length: 100 })
  author: string;

  @Column({ length: 500, name: 'teacher_return' })
  teacher_return: string;

  @Column({ type: 'datetime', name: 'return_date' })
  return_date: Date;

  @Column({ type: 'tinyint' })
  shared: number;
}

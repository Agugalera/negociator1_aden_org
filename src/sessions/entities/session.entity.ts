import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Session {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: '100' })
  name: string;

  @Column({ type: 'date' })
  date: Date;

  @Column({ name: 'id_teacher' })
  id_teacher: number;

  @Column({ name: 'id_subject' })
  id_subject: number;

  @Column({ type: 'tinyint' })
  state: number;
}

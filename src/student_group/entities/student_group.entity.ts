import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class StudentGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'id_student' })
  id_student: number;

  @Column({ name: 'id_group' })
  id_group: number;
}

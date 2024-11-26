import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  firstname: string;

  @Column({ length: 100 })
  lastname: string;

  @Column({ length: 100 })
  email: string;

  @Column({ name: 'id_profile' })
  id_profile: number;

  @Column()
  sisid: number;

  @Column({ type: 'tinyint' })
  state: number;

  @Column({ nullable: true, length: 100})
  @Exclude()
  public password?: string;
}

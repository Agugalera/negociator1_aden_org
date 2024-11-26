import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: '100' })
  name: string;

  @Column({ type: 'tinyint' })
  state: number;
}

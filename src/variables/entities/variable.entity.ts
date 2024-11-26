import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Variable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 250 })
  value: string;

  @Column({ length: 100 })
  slug: string;

  @Column({ length: 20 })
  type: string;

  @Column()
  min: number;

  @Column()
  max: number;

  @Column({ name: 'color_a', length: 20 })
  color_a: string;

  @Column({ name: 'okvalue_a', length: 20 })
  okvalue_a: string;

  @Column({ type: 'mediumtext', name: 'reply_a' })
  reply_a: string;

  @Column({ name: 'color_b', length: 20 })
  color_b: string;

  @Column({ name: 'okvalue_b', length: 20 })
  okvalue_b: string;

  @Column({ type: 'mediumtext', name: 'reply_b' })
  reply_b: string;

  @Column({ length: 20 })
  section: string;

  @Column({ length: 100 })
  unit: string;

  @Column({ type: 'tinyint' })
  state: number;

  @Column({ type: 'tinyint' })
  required: number;
}

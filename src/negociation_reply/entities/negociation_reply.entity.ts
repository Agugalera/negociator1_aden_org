import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class NegociationReply {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'id_negociation' })
  id_negociation: number;

  @Column({ name: 'id_variable' })
  id_variable: number;

  @Column({ type: 'mediumtext' })
  value: string;

  @Column({ length: '20' })
  color: string;
}

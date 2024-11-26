import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class NotificationUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int'})
  id_notification: number;

  @Column({ type: 'int'})
  id_user: number;

  @Column({ type: 'tinyint' })
  readed: number;

  @Column({ type: 'timestamp', name: 'readed_date' })
  readed_date: Date;
}

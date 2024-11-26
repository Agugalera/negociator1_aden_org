import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: '250' })
  name: string;

  @Column({ length: '300' })
  logo: string;

  @Column({ type: 'longtext' })
  welcome: string;

  @Column({ type: 'longtext' })
  aboutOther: string;

  @Column({ type: 'longtext' })
  market: string;

  @Column({ type: 'longtext' })
  aboutMe: string;

  @Column({ type: 'longtext' })
  robots: string;

  @Column({ type: 'longtext' })
  negotiation: string;
}

import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Drive from './drive.entity';

@ObjectType()
@Entity({ name: 'departamentos' })
export default class Departamento {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Associations
  @OneToMany(() => Drive, (drive) => drive.departamentoConnection)
  driveConnection: Promise<Drive[]>;
}

import { Field, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import Departamento from './departamento.entity';

@ObjectType()
@Entity({ name: 'drives' })
export default class Drive {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ name: 'user_id' })
  userId: number;

  @Field()
  @Column()
  funcionario: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  value: number;

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Field(() => Departamento)
  departamento: Departamento;

  // Associations
  @ManyToOne(
    () => Departamento,
    (departamento) => departamento.driveConnection,
    { primary: true },
  )
  @JoinColumn({ name: 'user_id' })
  departamentoConnection: Promise<Departamento>;
}

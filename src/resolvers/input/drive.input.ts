import { Field, InputType } from '@nestjs/graphql';
// import DepartamentoInput from './departamento.input';

@InputType()
export default class DriveInput {
  @Field()
  readonly funcionario: string;

  @Field()
  readonly description: string;

  @Field()
  readonly value: number;

  @Field()
  readonly userId: number;
}

@InputType()
export class DeleteDriveInput {
  @Field()
  readonly id: number;

  @Field()
  readonly userId: number;
}

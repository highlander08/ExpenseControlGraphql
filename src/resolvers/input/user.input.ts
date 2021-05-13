import { Field, InputType } from '@nestjs/graphql';

@InputType()
export default class UserInput {
  @Field()
  readonly funcionario: string;

  readonly departamento: string;
}

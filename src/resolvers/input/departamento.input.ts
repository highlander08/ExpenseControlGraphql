import { Field, InputType } from '@nestjs/graphql';

@InputType()
export default class DepartamentoInput {
  @Field()
  readonly name: string;
}

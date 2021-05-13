import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import RepoService from '../repo.service';
import Departamento from '../db/models/departamento.entity';
import DepartamentoInput from './input/departamento.input';

@Resolver(() => Departamento)
export default class DepartamentoResolver {
  constructor(private readonly repoService: RepoService) {}

  @Query(() => [Departamento])
  public async getDepartamentos(): Promise<Departamento[]> {
    return this.repoService.departamentoRepo.find();
  }

  @Query(() => Departamento, { nullable: true })
  public async getDepartamento(@Args('id') id: number): Promise<Departamento> {
    return this.repoService.departamentoRepo.findOne(id);
  }

  @Mutation(() => Departamento)
  public async createOrLoginUser(
    @Args('data') input: DepartamentoInput,
  ): Promise<Departamento> {
    let departamento = await this.repoService.departamentoRepo.findOne({
      where: { name: input.name.toLowerCase().trim() },
    });

    if (!departamento) {
      departamento = this.repoService.departamentoRepo.create({
        name: input.name.toLowerCase().trim(),
      });

      await this.repoService.departamentoRepo.save(departamento);
    }

    return departamento;
  }
}

import {
  Args,
  Mutation,
  Query,
  Resolver,
  Parent,
  ResolveField,
  Subscription,
  Context,
} from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import RepoService from '../repo.service';
import Drive from '../db/models/drive.entity';
import DriveInput, { DeleteDriveInput } from './input/drive.input';
import Departamento from '../db/models/departamento.entity';
import { context } from 'src/db/loaders';

export const pubSub = new PubSub();

@Resolver(() => Drive)
export default class DriveResolver {
  constructor(private readonly repoService: RepoService) {}

  @Query(() => [Drive])
  public async getDrives(): Promise<Drive[]> {
    return this.repoService.driveRepo.find();
  }

  @Query(() => [Drive])
  public async getDrivesFromUser(
    @Args('userId') userId: number,
  ): Promise<Drive[]> {
    return this.repoService.driveRepo.find({
      where: { userId },
    });
  }

  @Query(() => Drive, { nullable: true })
  public async getDrive(@Args('id') id: number): Promise<Drive> {
    return this.repoService.driveRepo.findOne(id);
  }

  @Mutation(() => Drive)
  public async createDrive(@Args('data') input: DriveInput): Promise<Drive> {
    const drive = this.repoService.driveRepo.create({
      funcionario: input.funcionario,
      description: input.description,
      value: input.value,
    });

    const response = await this.repoService.driveRepo.save(drive);

    pubSub.publish('driveAdded', { driveAdded: drive });

    return response;
  }

  @Mutation(() => Drive)
  public async deleteDrive(
    @Args('data') input: DeleteDriveInput,
  ): Promise<Drive> {
    const drive = await this.repoService.driveRepo.findOne(input.id);

    if (!drive || drive.userId !== input.userId)
      throw new Error('Drive does not exists or you are not the Drive');

    const copy = { ...drive };

    await this.repoService.driveRepo.remove(drive);

    return copy;
  }

  @Subscription(() => Drive)
  driveAdded() {
    return pubSub.asyncIterator('driveAdded');
  }

  @ResolveField(() => Departamento, { name: 'departamento' })
  public async getDepartamento(
    @Parent() parent: Drive,
    @Context() { UserLoader }: typeof context,
  ): Promise<Departamento> {
    return UserLoader.load(parent.userId); // With DataLoader
    // return this.repoService.userRepo.findOne(parent.userId); // Without DataLoader
  }
}

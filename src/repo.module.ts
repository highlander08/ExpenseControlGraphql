import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import RepoService from './repo.service';
import Departamento from './db/models/departamento.entity';
import Drive from './db/models/drive.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Departamento, Drive])],
  providers: [RepoService],
  exports: [RepoService],
})
class RepoModule {}
export default RepoModule;

import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import Departamento from './db/models/departamento.entity';
import Drive from './db/models/drive.entity';

@Injectable()
class RepoService {
  public constructor(
    @InjectRepository(Departamento)
    public readonly departamentoRepo: Repository<Departamento>,
    @InjectRepository(Drive) public readonly driveRepo: Repository<Drive>,
  ) {}
}

export default RepoService;

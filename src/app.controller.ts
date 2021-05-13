import { Controller, Get } from '@nestjs/common';
import RepoService from './repo.service';

@Controller()
export class AppController {
  constructor(private readonly repoService: RepoService) {}

  @Get()
  async getHello(): Promise<string> {
    //query ao database
    return ` there are ${await this.repoService.driveRepo.count()} drives existen`;
  }
}

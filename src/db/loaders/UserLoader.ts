import * as DataLoader from 'dataloader';
import { getRepository } from 'typeorm';

import Departamento from '../models/departamento.entity';

const batchUsers = async (departamentoIds: number[]) => {
  const departamentos = await getRepository(Departamento).findByIds(
    departamentoIds,
  );

  const userIdMap: { [departamentoId: number]: Departamento } = {};

  departamentos.forEach((departamento) => {
    userIdMap[departamento.id] = departamento;
  });

  return departamentoIds.map((departamentoId) => userIdMap[departamentoId]);
};

export default () => new DataLoader(batchUsers);

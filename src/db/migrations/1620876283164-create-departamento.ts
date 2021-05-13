import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createDepartamento1585025619325 implements MigrationInterface {
  private table = new Table({
    name: 'departamento',
    columns: [
      {
        name: 'id',
        type: 'integer',
        isPrimary: true,
        isGenerated: true, // Auto-increment
        generationStrategy: 'increment',
      },
      {
        name: 'name',
        type: 'varchar',
        length: '255',
        isUnique: true,
        isNullable: false,
      },
      {
        name: 'created_at',
        type: 'timestamptz',
        isNullable: false,
        default: 'now()',
      },
      {
        name: 'updated_at',
        type: 'timestamptz',
        isNullable: false,
        default: 'now()',
      },
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(this.table);
  }
  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable(this.table);
  }
}

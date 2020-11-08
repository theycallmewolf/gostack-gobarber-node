import {
  MigrationInterface,
  QueryRunner,
  Table
} from "typeorm";

export class CreateAppointments1604664727822 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'appointments',
        columns: [{
          name: 'id',
          type: 'varchar', // normally an integer but in this case is an varchar, since we are using uuid that returns a string
          isPrimary: true,
          generationStrategy: 'uuid',
          default: 'uuid_generate_v4()',
        },
        {
          name: 'provider',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'date',
          type: 'timestamp with time zone', // 'timestamp with time zone' apenas existe no postgres guardando o horário e fuso-horário, se usarmos outra db temos de colocar apenas 'timestamp'
          isNullable: false,
        },
        {
          name: 'created_at',
          type: 'timestamp',
          default: 'now()'
        },
        {
          name: 'updated_at',
          type: 'timestamp',
          default: 'now()'
        }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('appointments')
  }

}

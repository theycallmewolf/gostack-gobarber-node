import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export default class DeleteDateColumnOnUsers1604957443511
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("users", "date");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "users",
      new TableColumn({
        name: "date",
        type: "timestamp with time zone",
        isNullable: false,
      })
    );
  }
}

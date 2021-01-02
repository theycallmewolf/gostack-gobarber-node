import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export default class AddUserIdToAppointments1609609735558 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "appointments",
            new TableColumn({
                name: "user_id",
                type: "uuid",
                isNullable: true, // case user removes his account
            })
        );

        await queryRunner.createForeignKey(
            "appointments",
            new TableForeignKey({
                name: "appointment_user",
                columnNames: ["user_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "users",
                onDelete: "SET NULL",
                onUpdate: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("appointments", "appointment_user");
        await queryRunner.dropColumn("appointments", "user_id");
    }

}

import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateDatabase1604066584651 implements MigrationInterface {
    name = 'CreateDatabase1604066584651'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipeImages" DROP CONSTRAINT "FK_c8611032f4d23ef71606faed17a"`);
        await queryRunner.query(`ALTER TABLE "recipeImages" DROP CONSTRAINT "FK_bef10ae60c1038d1bc62ea8b67b"`);
        await queryRunner.query(`ALTER TABLE "recipeImages" DROP COLUMN "recipe_id"`);
        await queryRunner.query(`ALTER TABLE "recipeImages" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "recipeImages" ADD "user_id" integer`);
        await queryRunner.query(`ALTER TABLE "recipeImages" ADD "recipe_id" integer`);
        await queryRunner.query(`ALTER TABLE "recipeImages" ADD CONSTRAINT "FK_bef10ae60c1038d1bc62ea8b67b" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipeImages" ADD CONSTRAINT "FK_c8611032f4d23ef71606faed17a" FOREIGN KEY ("recipe_id") REFERENCES "Recipes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipeImages" DROP CONSTRAINT "FK_c8611032f4d23ef71606faed17a"`);
        await queryRunner.query(`ALTER TABLE "recipeImages" DROP CONSTRAINT "FK_bef10ae60c1038d1bc62ea8b67b"`);
        await queryRunner.query(`ALTER TABLE "recipeImages" DROP COLUMN "recipe_id"`);
        await queryRunner.query(`ALTER TABLE "recipeImages" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "recipeImages" ADD "user_id" integer`);
        await queryRunner.query(`ALTER TABLE "recipeImages" ADD "recipe_id" integer`);
        await queryRunner.query(`ALTER TABLE "recipeImages" ADD CONSTRAINT "FK_bef10ae60c1038d1bc62ea8b67b" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipeImages" ADD CONSTRAINT "FK_c8611032f4d23ef71606faed17a" FOREIGN KEY ("recipe_id") REFERENCES "Recipes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

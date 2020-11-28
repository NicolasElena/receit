import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateDatabase1606586735620 implements MigrationInterface {
    name = 'CreateDatabase1606586735620'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Categories" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_537b5c00afe7427c4fc9434cd59" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "userImages" ("id" SERIAL NOT NULL, "path" character varying NOT NULL, CONSTRAINT "PK_e72ec48eedf35f4ea8f58b213c3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Users" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "imageId" integer, CONSTRAINT "REL_ddaf19d700bdab5dfb5624c9fc" UNIQUE ("imageId"), CONSTRAINT "PK_16d4f7d636df336db11d87413e3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "RecipeIngredient" ("RecipeIngredientId" SERIAL NOT NULL, "ingredient" character varying NOT NULL, "amount" integer NOT NULL, "measure" character varying NOT NULL, "recipeId" integer, CONSTRAINT "PK_22d102c41e4dd0c1cfe736548aa" PRIMARY KEY ("RecipeIngredientId"))`);
        await queryRunner.query(`CREATE TABLE "RecipeImages" ("id" SERIAL NOT NULL, "path" character varying NOT NULL, "recipe_id" integer, CONSTRAINT "PK_7283d95d3dad41c03b098ec78e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Recipes" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "prepare_method" character varying NOT NULL, "public_flag" boolean NOT NULL, "userId" integer, CONSTRAINT "PK_9d7c2ba1cdf75f24e4976cab724" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "recipes_categories__categories" ("recipesId" integer NOT NULL, "categoriesId" integer NOT NULL, CONSTRAINT "PK_26309ec0b287da84806e28bd603" PRIMARY KEY ("recipesId", "categoriesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e4e451a281ecd72200ca935841" ON "recipes_categories__categories" ("recipesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_52d8c28dafbfd157d803508de2" ON "recipes_categories__categories" ("categoriesId") `);
        await queryRunner.query(`ALTER TABLE "Users" ADD CONSTRAINT "FK_ddaf19d700bdab5dfb5624c9fc7" FOREIGN KEY ("imageId") REFERENCES "userImages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "RecipeIngredient" ADD CONSTRAINT "FK_72a25a30a5263524c5ae07a12a9" FOREIGN KEY ("recipeId") REFERENCES "Recipes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "RecipeImages" ADD CONSTRAINT "FK_5fe68edbb598d4d156e24938ce1" FOREIGN KEY ("recipe_id") REFERENCES "Recipes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Recipes" ADD CONSTRAINT "FK_84e00a18d1e0903c8df6f345bd7" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipes_categories__categories" ADD CONSTRAINT "FK_e4e451a281ecd72200ca9358416" FOREIGN KEY ("recipesId") REFERENCES "Recipes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipes_categories__categories" ADD CONSTRAINT "FK_52d8c28dafbfd157d803508de28" FOREIGN KEY ("categoriesId") REFERENCES "Categories"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipes_categories__categories" DROP CONSTRAINT "FK_52d8c28dafbfd157d803508de28"`);
        await queryRunner.query(`ALTER TABLE "recipes_categories__categories" DROP CONSTRAINT "FK_e4e451a281ecd72200ca9358416"`);
        await queryRunner.query(`ALTER TABLE "Recipes" DROP CONSTRAINT "FK_84e00a18d1e0903c8df6f345bd7"`);
        await queryRunner.query(`ALTER TABLE "RecipeImages" DROP CONSTRAINT "FK_5fe68edbb598d4d156e24938ce1"`);
        await queryRunner.query(`ALTER TABLE "RecipeIngredient" DROP CONSTRAINT "FK_72a25a30a5263524c5ae07a12a9"`);
        await queryRunner.query(`ALTER TABLE "Users" DROP CONSTRAINT "FK_ddaf19d700bdab5dfb5624c9fc7"`);
        await queryRunner.query(`DROP INDEX "IDX_52d8c28dafbfd157d803508de2"`);
        await queryRunner.query(`DROP INDEX "IDX_e4e451a281ecd72200ca935841"`);
        await queryRunner.query(`DROP TABLE "recipes_categories__categories"`);
        await queryRunner.query(`DROP TABLE "Recipes"`);
        await queryRunner.query(`DROP TABLE "RecipeImages"`);
        await queryRunner.query(`DROP TABLE "RecipeIngredient"`);
        await queryRunner.query(`DROP TABLE "Users"`);
        await queryRunner.query(`DROP TABLE "userImages"`);
        await queryRunner.query(`DROP TABLE "Categories"`);
    }

}

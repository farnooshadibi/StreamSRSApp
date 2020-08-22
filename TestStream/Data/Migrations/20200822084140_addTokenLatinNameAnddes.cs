using Microsoft.EntityFrameworkCore.Migrations;

namespace TestStream.Data.Migrations
{
    public partial class addTokenLatinNameAnddes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "customers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LatinName",
                table: "customers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Token",
                table: "customers",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "customers");

            migrationBuilder.DropColumn(
                name: "LatinName",
                table: "customers");

            migrationBuilder.DropColumn(
                name: "Token",
                table: "customers");
        }
    }
}

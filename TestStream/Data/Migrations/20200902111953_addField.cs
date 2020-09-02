using Microsoft.EntityFrameworkCore.Migrations;

namespace TestStream.Data.Migrations
{
    public partial class addField : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Approve",
                table: "festivals",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "FestivalFileTypeId",
                table: "festivals",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "FileType",
                table: "festivals",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Like",
                table: "festivals",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "festivalFileType",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_festivalFileType", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "festivalFileType");

            migrationBuilder.DropColumn(
                name: "Approve",
                table: "festivals");

            migrationBuilder.DropColumn(
                name: "FestivalFileTypeId",
                table: "festivals");

            migrationBuilder.DropColumn(
                name: "FileType",
                table: "festivals");

            migrationBuilder.DropColumn(
                name: "Like",
                table: "festivals");
        }
    }
}

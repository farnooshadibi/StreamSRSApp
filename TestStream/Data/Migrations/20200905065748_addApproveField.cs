using Microsoft.EntityFrameworkCore.Migrations;

namespace TestStream.Data.Migrations
{
    public partial class addApproveField : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FileType",
                table: "festivals");

            migrationBuilder.AddColumn<bool>(
                name: "Approve",
                table: "festivalFiles",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Approve",
                table: "festivalFiles");

            migrationBuilder.AddColumn<string>(
                name: "FileType",
                table: "festivals",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}

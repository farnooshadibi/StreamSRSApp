using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace TestStream.Data.Migrations
{
    public partial class addDateTimeToComments : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "SubmitDate",
                table: "comments",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SubmitDate",
                table: "comments");
        }
    }
}

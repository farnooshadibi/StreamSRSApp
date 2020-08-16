using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace TestStream.Data.Migrations
{
    public partial class EditGuidkey : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.DropColumn(
                name: "StreamKey",
                table: "customers");

            migrationBuilder.AddColumn<Guid>(
                name: "KeyStream",
                table: "customers",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "KeyStream",
                table: "customers");


            migrationBuilder.AddColumn<int>(
                name: "StreamKey",
                table: "customers",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}

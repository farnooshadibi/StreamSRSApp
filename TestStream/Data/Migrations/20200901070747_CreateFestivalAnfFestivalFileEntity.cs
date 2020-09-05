using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace TestStream.Data.Migrations
{
    public partial class CreateFestivalAnfFestivalFileEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "festivals",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(nullable: true),
                    LastName = table.Column<string>(nullable: true),
                    Mobile = table.Column<string>(nullable: true),
                    Phone = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    SubmitDate = table.Column<DateTime>(nullable: false),
                    Processed = table.Column<bool>(nullable: false),
                    Result = table.Column<string>(nullable: true),
                    TrackingCode = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_festivals", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "festivalFiles",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FileURL = table.Column<string>(nullable: true),
                    FestivalId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_festivalFiles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_festivalFiles_festivals_FestivalId",
                        column: x => x.FestivalId,
                        principalTable: "festivals",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_festivalFiles_FestivalId",
                table: "festivalFiles",
                column: "FestivalId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "festivalFiles");

            migrationBuilder.DropTable(
                name: "festivals");
        }
    }
}

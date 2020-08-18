using Microsoft.EntityFrameworkCore.Migrations;
using System;

namespace TestStream.Data.Migrations
{
    public partial class CreatePlayListEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "playLists",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    StartTime = table.Column<DateTime>(nullable: false),
                    EndTime = table.Column<System.DateTime>(nullable: false),
                    Duration = table.Column<DateTime>(nullable: false),
                    Description = table.Column<string>(nullable: true),
                    Image = table.Column<string>(nullable: true),
                    PerformerName = table.Column<string>(nullable: true),
                    Lamenter = table.Column<string>(nullable: true),
                    EventPlace = table.Column<string>(nullable: true),
                    IsActive = table.Column<bool>(nullable: false),
                    CustomerId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_playLists", x => x.Id);
                    table.ForeignKey(
                        name: "FK_playLists_customers_CustomerId",
                        column: x => x.CustomerId,
                        principalTable: "customers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_playLists_CustomerId",
                table: "playLists",
                column: "CustomerId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "playLists");

        }
    }
}

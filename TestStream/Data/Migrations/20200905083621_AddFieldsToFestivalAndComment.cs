using Microsoft.EntityFrameworkCore.Migrations;

namespace TestStream.Data.Migrations
{
    public partial class AddFieldsToFestivalAndComment : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "WorkName",
                table: "festivals",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "comments",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    Text = table.Column<string>(nullable: true),
                    FestivalId = table.Column<int>(nullable: false),
                    Approve = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_comments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_comments_festivals_FestivalId",
                        column: x => x.FestivalId,
                        principalTable: "festivals",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_comments_FestivalId",
                table: "comments",
                column: "FestivalId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "comments");

            migrationBuilder.DropColumn(
                name: "WorkName",
                table: "festivals");
        }
    }
}

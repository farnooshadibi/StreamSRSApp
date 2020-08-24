using Microsoft.EntityFrameworkCore.Migrations;

namespace TestStream.Data.Migrations
{
    public partial class addFieldToRequester : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "requesters",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "eventCity",
                table: "requesters",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "requesters");

            migrationBuilder.DropColumn(
                name: "eventCity",
                table: "requesters");
        }
    }
}

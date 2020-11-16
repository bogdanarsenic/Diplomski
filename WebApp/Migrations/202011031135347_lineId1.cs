namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class lineId1 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Stations", "LineId", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Stations", "LineId");
        }
    }
}

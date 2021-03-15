namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class rpb : DbMigration
    {
        public override void Up()
        {
            DropPrimaryKey("dbo.Lines");
            DropPrimaryKey("dbo.StationLines");
            DropPrimaryKey("dbo.Stations");
            AlterColumn("dbo.Lines", "Id", c => c.Int(nullable: false));
            AlterColumn("dbo.StationLines", "Id", c => c.Int(nullable: false));
            AlterColumn("dbo.Stations", "Id", c => c.Int(nullable: false));
            AddPrimaryKey("dbo.Lines", "Id");
            AddPrimaryKey("dbo.StationLines", "Id");
            AddPrimaryKey("dbo.Stations", "Id");
        }
        
        public override void Down()
        {
            DropPrimaryKey("dbo.Stations");
            DropPrimaryKey("dbo.StationLines");
            DropPrimaryKey("dbo.Lines");
            AlterColumn("dbo.Stations", "Id", c => c.Int(nullable: false, identity: true));
            AlterColumn("dbo.StationLines", "Id", c => c.Int(nullable: false, identity: true));
            AlterColumn("dbo.Lines", "Id", c => c.Int(nullable: false, identity: true));
            AddPrimaryKey("dbo.Stations", "Id");
            AddPrimaryKey("dbo.StationLines", "Id");
            AddPrimaryKey("dbo.Lines", "Id");
        }
    }
}

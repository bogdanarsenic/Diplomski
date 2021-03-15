namespace WebApp.Migrations
{
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;
    using WebApp.Models;

    internal sealed class Configuration : DbMigrationsConfiguration<WebApp.Persistence.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(WebApp.Persistence.ApplicationDbContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data.

            if (!context.Roles.Any(r => r.Name == "Admin"))
            {
                var store = new RoleStore<IdentityRole>(context);
                var manager = new RoleManager<IdentityRole>(store);
                var role = new IdentityRole { Name = "Admin" };

                manager.Create(role);
            }

            if (!context.Roles.Any(r => r.Name == "Controller"))
            {
                var store = new RoleStore<IdentityRole>(context);
                var manager = new RoleManager<IdentityRole>(store);
                var role = new IdentityRole { Name = "Controller" };

                manager.Create(role);
            }

            if (!context.Roles.Any(r => r.Name == "AppUser"))
            {
                var store = new RoleStore<IdentityRole>(context);
                var manager = new RoleManager<IdentityRole>(store);
                var role = new IdentityRole { Name = "AppUser" };

                manager.Create(role);
            }

            var userStore = new UserStore<ApplicationUser>(context);
            var userManager = new UserManager<ApplicationUser>(userStore);

            if (!context.Users.Any(u => u.UserName == "admin@yahoo.com"))
            {
				var user = new ApplicationUser() { Id = "admin", UserName = "admin@yahoo.com", Email = "admin@yahoo.com", PasswordHash = ApplicationUser.HashPassword("Admin123!"), EmailConfirmed = true };
                userManager.Create(user);
                userManager.AddToRole(user.Id, "Admin");
            }

            if (!context.Users.Any(u => u.UserName == "appu@yahoo.com"))
            {
                var user = new ApplicationUser() { Id = "appu", UserName = "appu@yahoo.com", Email = "appu@yahoo.com", PasswordHash = ApplicationUser.HashPassword("Appu123!"), Type="Regular", EmailConfirmed = true, PhoneNumber = "111111",PhoneNumberConfirmed=true, Status="Approved", Active=true };
                userManager.Create(user);
                userManager.AddToRole(user.Id, "AppUser");
            }

            if (!context.Users.Any(u => u.UserName == "controller@yahoo.com"))
            {
                var user = new ApplicationUser() { Id = "contr", UserName = "controller@yahoo.com", Email = "controller@yahoo.com", PasswordHash = ApplicationUser.HashPassword("Controller123!"), EmailConfirmed = true };
                userManager.Create(user);
                userManager.AddToRole(user.Id, "Controller");
            }

			if (!context.PriceLists.Any(u => u.Id == "Temporal"))
			{
				var pricelist = new PriceList() { Id = "Temporal", Price = 70 };
				context.PriceLists.Add(pricelist);
			}
			if (!context.PriceLists.Any(u => u.Id == "Day"))
			{
				var pricelist = new PriceList() { Id = "Day", Price = 200 };
				context.PriceLists.Add(pricelist);
			}

			if (!context.PriceLists.Any(u => u.Id == "Month"))
			{
				var pricelist = new PriceList() { Id = "Month", Price = 1500 };
				context.PriceLists.Add(pricelist);
			}

			if (!context.PriceLists.Any(u => u.Id == "Year"))
			{
				var pricelist = new PriceList() { Id = "Year", Price = 10000 };
				context.PriceLists.Add(pricelist);
			}

			if (context.Lines.Count()==0)
			{
				var line = new Line() { Id = 5, Name = "5" };
				var line2 = new Line() { Id = 35, Name = "35" };

				context.Lines.Add(line);
				context.Lines.Add(line2);

				var station1 = new Station() { Id = 1, Name = "5A", Address = "Житни трг 11, Нови Сад, Србија", CoordinateX = 45.258872917776692, CoordinateY = 19.83649953183367, LineId = "5" };
				var station2 = new Station() { Id = 2, Name = "5B", Address = "Богдана Гарабантина 7, Нови Сад 21000, Србија", CoordinateX = 45.257350399443482, CoordinateY = 19.825753529243503, LineId = "5" };
				var station3 = new Station() { Id = 3, Name = "5C", Address = "Хајдук Вељкова 8, Нови Сад 21000, Србија", CoordinateX = 45.2503897918017, CoordinateY = 19.824792225139664, LineId = "5" };
				var station4 = new Station() { Id = 4, Name = "5D", Address = "Булевар цара Лазара 122, Нови Сад 21000, Србија", CoordinateX = 45.240164852074031, CoordinateY = 19.826062518936215, LineId = "5" };
				var station5 = new Station() { Id = 5, Name = "5E", Address = "Булевар цара Лазара 25BB, Нови Сад 21000, Србија", CoordinateX = 45.242993212430456, CoordinateY = 19.83849080223472, LineId = "5" };

				var station21 = new Station() { Id = 6, Name = "35A", Address = "Булевар краља Петра I 21, Нови Сад 21000, Србија", CoordinateX = 45.259839575597304, CoordinateY = 19.830319721608522, LineId = "35" };
				var station22 = new Station() { Id = 7, Name = "35B", Address = "Карађорђева 4, Нови Сад, Србија", CoordinateX = 45.26266695635961, CoordinateY = 19.840173083597893, LineId = "35" };
				var station23 = new Station() { Id = 8, Name = "35C", Address = "Ђорђа Радујкова 3, Нови Сад, Србија", CoordinateX = 45.267427270041978, CoordinateY = 19.80693943997203, LineId = "35" };
				var station24= new Station() { Id = 9, Name = "35D", Address = "Булевар војводе Степе 49, Нови Сад, Србија", CoordinateX = 45.255755337504681, CoordinateY = 19.797566727742652, LineId = "35" };


				context.Stations.Add(station1);
				context.Stations.Add(station2);
				context.Stations.Add(station3);
				context.Stations.Add(station4);
				context.Stations.Add(station5);

				context.Stations.Add(station21);
				context.Stations.Add(station22);
				context.Stations.Add(station23);
				context.Stations.Add(station24);

				var stationLine1 = new StationLine() { Id = 1, StationId = 1, LineId = 5 };
				var stationLine2 = new StationLine() { Id = 2, StationId = 2, LineId = 5 };
				var stationLine3 = new StationLine() { Id = 3, StationId = 3, LineId = 5 };
				var stationLine4 = new StationLine() { Id = 4, StationId = 4, LineId = 5 };
				var stationLine5 = new StationLine() { Id = 5, StationId = 5, LineId = 5 };

				var stationLine21 = new StationLine() { Id = 6, StationId = 6, LineId = 35 };
				var stationLine22 = new StationLine() { Id = 7, StationId = 7, LineId = 35 };
				var stationLine23 = new StationLine() { Id = 8, StationId = 8, LineId = 35 };
				var stationLine24 = new StationLine() { Id = 9, StationId = 9, LineId = 35 };

				context.StationLines.Add(stationLine1);
				context.StationLines.Add(stationLine2);
				context.StationLines.Add(stationLine3);
				context.StationLines.Add(stationLine4);
				context.StationLines.Add(stationLine5);

				context.StationLines.Add(stationLine21);
				context.StationLines.Add(stationLine22);
				context.StationLines.Add(stationLine23);
				context.StationLines.Add(stationLine24);

			}
			if (context.TimeTables.Count() == 0)
			{
				var timetable = new TimeTable { Id = "247dff98-e950-4001-a124-3abc81d09426", Day = "Weekday", LineId = "5", Times = "6:20;7:25;9:45;11:45;13:25;15:20;17:50;", Type = "City" };
				context.TimeTables.Add(timetable);

			}
		}
    }
}

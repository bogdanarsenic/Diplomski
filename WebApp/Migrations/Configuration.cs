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
                var user = new ApplicationUser() { Id = "admin", UserName = "admin@yahoo.com", Email = "admin@yahoo.com", PasswordHash = ApplicationUser.HashPassword("Admin123!") };
                userManager.Create(user);
                userManager.AddToRole(user.Id, "Admin");
            }

            if (!context.Users.Any(u => u.UserName == "appu@yahoo.com"))
            {
                var user = new ApplicationUser() { Id = "appu", UserName = "appu@yahoo.com", Email = "appu@yahoo.com", PasswordHash = ApplicationUser.HashPassword("Appu123!"), Type="Regular" };
                userManager.Create(user);
                userManager.AddToRole(user.Id, "AppUser");
            }

            if (!context.Users.Any(u => u.UserName == "contoller@yahoo.com"))
            {
                var user = new ApplicationUser() { Id = "contr", UserName = "contoller@yahoo.com", Email = "contoller@yahoo.com", PasswordHash = ApplicationUser.HashPassword("Controller123!") };
                userManager.Create(user);
                userManager.AddToRole(user.Id, "Controller");
            }

			if (!context.PriceLists.Any(u => u.Id == "Temporal"))
			{
				var pricelist = new PriceList() { Id = "Temporal", Price = 0 };
				context.PriceLists.Add(pricelist);
			}
			if (!context.PriceLists.Any(u => u.Id == "Day"))
			{
				var pricelist = new PriceList() { Id = "Day", Price = 0 };
				context.PriceLists.Add(pricelist);
			}

			if (!context.PriceLists.Any(u => u.Id == "Month"))
			{
				var pricelist = new PriceList() { Id = "Month", Price = 0 };
				context.PriceLists.Add(pricelist);
			}

			if (!context.PriceLists.Any(u => u.Id == "Year"))
			{
				var pricelist = new PriceList() { Id = "Year", Price = 0 };
				context.PriceLists.Add(pricelist);
			}
		}
    }
}

using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.OAuth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using WebApp.Models;
using WebApp.Persistence;

namespace WebApp.Providers
{
    public class CustomOAuthProvider : OAuthAuthorizationServerProvider
    {
        public override Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            context.Validated();
            return Task.FromResult<object>(null);
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
			var allowedOrigin = "https://localhost:4200";

			context.OwinContext.Response.Headers.Add("Access-Control-Allow-Origin", new[] { allowedOrigin });

			ApplicationUserManager userManager = context.OwinContext.GetUserManager<ApplicationUserManager>();

			ApplicationUser userGoodUsername = userManager.Users.FirstOrDefault(x=>x.UserName==context.UserName);

            ApplicationUser userAuthenticated = await userManager.FindAsync(context.UserName, context.Password);

			if (userAuthenticated == null && userGoodUsername != null)
            {
				if(userGoodUsername.LockoutEnabled)
				{

					if (DateTime.Now > userGoodUsername.LockoutEndDateUtc)
					{
						userGoodUsername.LockoutEnabled = false;
						userGoodUsername.LockoutEndDateUtc = null;
						userGoodUsername.AccessFailedCount = 1;
						context.SetError("invalid_grant", "Your password is incorrect! You have " + (3 - userGoodUsername.AccessFailedCount) + " more times to try before half an hour lockdown");
						context.OwinContext.Get<ApplicationDbContext>().SaveChanges();
						return;

					}
					else
					{
						context.SetError("invalid_grant", "You can't login until " + userGoodUsername.LockoutEndDateUtc);
						return;
					}
				}

				if(userGoodUsername.AccessFailedCount==2)
				{
					userGoodUsername.LockoutEnabled = true;
					userGoodUsername.LockoutEndDateUtc = DateTime.Now.AddMinutes(30);
					context.SetError("invalid_grant", "Your password is incorrect again! You can't try again until "+ userGoodUsername.LockoutEndDateUtc);
					context.OwinContext.Get<ApplicationDbContext>().SaveChanges();
					return;
				}
				else
				{
					userGoodUsername.AccessFailedCount++;
					context.SetError("invalid_grant", "Your password is incorrect! You have " + (3 - userGoodUsername.AccessFailedCount) + " more times to try before half an hour lockdown");
					context.OwinContext.Get<ApplicationDbContext>().SaveChanges();
					return;
				}
				
            }

			if (userAuthenticated == null)
			{
				context.SetError("invalid_grant", "This username doesn't exist!");
				return;
			}

			if(userAuthenticated.LockoutEnabled)
			{	
				if(DateTime.Now > userAuthenticated.LockoutEndDateUtc)
				{
					userAuthenticated.LockoutEnabled = false;
					userAuthenticated.LockoutEndDateUtc = null;
					userAuthenticated.AccessFailedCount = 0;
					context.OwinContext.Get<ApplicationDbContext>().SaveChanges();

				}
				else
				{ 
					context.SetError("invalid_grant", "You can't login until "+ userAuthenticated.LockoutEndDateUtc);
					return;
				}
			}


            ClaimsIdentity oAuthIdentity = await userAuthenticated.GenerateUserIdentityAsync(userManager, "JWT");
          
            var ticket = new AuthenticationTicket(oAuthIdentity, null);

            context.Validated(ticket);
        }

    }
}
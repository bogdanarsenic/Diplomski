﻿using log4net;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using WebApp.Models;
using WebApp.Persistence;
using WebApp.Persistence.UnitOfWork;
using WebApp.Services;

namespace WebApp.Controllers
{
    public class ApplicationUserController : ApiController
    {

        private readonly IUnitOfWork unitOfWork;
		private static readonly ILog log = LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);


		public ApplicationUserController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

		// GET: api/AppUsers
		[Authorize]
		public IEnumerable<ApplicationUser> GetAppUsers()
        {
            ApplicationDbContext context = new ApplicationDbContext();
            var userStore = new UserStore<ApplicationUser>(context);
            var userManager = new UserManager<ApplicationUser>(userStore);

            var userstemp = userManager.Users.ToList();

            return userstemp;
        }

        [Authorize]
        [ResponseType(typeof(ApplicationUser))]
        public IHttpActionResult GetApplicationUser(int id)
        {
            string idS = id.ToString();
            ApplicationDbContext contex = new ApplicationDbContext();


            if (idS == "0")
            {
                idS = contex.Users.FirstOrDefault(u => u.UserName == User.Identity.Name).Id;
            }

            ApplicationUser appUser = contex.Users.FirstOrDefault(u => u.Id == idS);
            if (appUser == null)
            {
                return NotFound();
            }

            return Ok(appUser);
        }

		[Authorize]
		[ResponseType(typeof(ApplicationUser))]
		[Route("api/ApplicationUser/GetUserByPhoneNumber")]
		public IHttpActionResult GetUserPhoneNumber(string phoneNumber)
		{
			ApplicationDbContext contex = new ApplicationDbContext();

			var idS = contex.Users.FirstOrDefault(u => u.UserName == User.Identity.Name).Id;

			if(idS==null)
			{
				log.Error("Something is wrong while checking the user phone number " + DateTime.Now);
				return NotFound();
			}

			ApplicationUser appUser = contex.Users.FirstOrDefault(u => u.Id == idS && u.PhoneNumber==phoneNumber);

			if (appUser == null )
			{
				log.Error("User " + User.Identity.Name + " provided bad phone number at "+DateTime.Now);
				return NotFound();
			}

			return Ok(appUser);
		}


		[Authorize]
        [ResponseType(typeof(void))]
        public IHttpActionResult PutUser()
        {
            ApplicationUser appUser = new ApplicationUser();
            ApplicationDbContext contex = new ApplicationDbContext();
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                if (HttpContext.Current.Request.Form.Count > 0)
                {

                    appUser = JsonConvert.DeserializeObject<ApplicationUser>(HttpContext.Current.Request.Form[0]);
                    ApplicationUser u = new ApplicationUser();
                    u = contex.Users.Where(x => x.Id == appUser.Id).FirstOrDefault();

                  /*  if (u.Active == false && appUser.Active == true)
                    {
                        IMail smtpService = new Mail();
                        string email = u.Email;
                        string subject = "Account approvement";
                        string body = string.Format("Hello from admin team! \n Your account\n\tFullname:{0} {1}\n\tDate of Birth: {2}\n is approved!Now, You can buy tickets with {3} discount.", appUser.Name, appUser.LastName, appUser.DateOfBirth, appUser.Type);
                        smtpService.SendMail(subject, body, email);
                    }
                    */

                    if(u.Status!=appUser.Status)
                    {
                        u.Status = appUser.Status;
                        u.Active = appUser.Active;
                        contex.SaveChanges();
                        return StatusCode(HttpStatusCode.NoContent);

                    }

					if (u.ImageUrl != appUser.ImageUrl)
					{
						u.ImageUrl = appUser.ImageUrl;
						contex.SaveChanges();
						return StatusCode(HttpStatusCode.NoContent);
					}

					string pom = appUser.Name;
                    u.Name = pom.Split('|')[0];
                    u.LastName = appUser.LastName;
                    u.DateOfBirth = appUser.DateOfBirth;
                    string s = pom.Split('|')[1];
                    u.PasswordHash = ApplicationUser.HashPassword(s);
                    u.Address = appUser.Address;
                    u.Type = appUser.Type;
                    u.ImageUrl = appUser.ImageUrl;
                    u.Active = appUser.Active;
                    contex.SaveChanges();
                }
                else
                {
                    //ukoliko se form data nije popunilo
                }
            }
            catch (System.Exception e)
            {
				log.Error("Something wrong with editing user "+e);
			}

            return StatusCode(HttpStatusCode.NoContent);
        }
    }
}

using log4net;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;

namespace WebApp.Controllers
{
    public class ImageController : ApiController
    {

		private static readonly ILog log = LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

		[Authorize(Roles ="AppUser")]
		[ResponseType(typeof(void))]
		public IHttpActionResult PutImage()
		{
			string finalPath = "https://localhost:44306/";

			var httpReq = HttpContext.Current.Request;
			var file = httpReq.Files["Image"];

			if (file != null && file.ContentLength > 0)
			{

				int MaxContentLength = 1024 * 512 * 1; //Size = 512 KB  

				IList<string> AllowedFileExtensions = new List<string> { ".jpg", ".gif", ".png" };

				var ext = file.FileName.Substring(file.FileName.LastIndexOf('.'));

				var extension = ext.ToLower();
				if (!AllowedFileExtensions.Contains(extension))
				{

					log.Error("User "+User.Identity.Name+ " tried to upload image which is not in the correct format at " + DateTime.Now);
					return StatusCode(HttpStatusCode.BadRequest);
				}
				else if (file.ContentLength > MaxContentLength)
				{

					log.Error("User " + User.Identity.Name + " tried to upload image larger than 512kb at " + DateTime.Now);

					return StatusCode(HttpStatusCode.BadRequest);
				}
				else
				{

					var filePath = HttpContext.Current.Server.MapPath("~/Content/images/" + file.FileName);

					finalPath = finalPath + "Content/images/" + file.FileName;

					file.SaveAs(filePath);

					log.Info("User " + User.Identity.Name + " uploaded new image at " + DateTime.Now);
					return StatusCode(HttpStatusCode.NoContent);

				}
			}

			log.Error("Something is wrong! ");

			return StatusCode(HttpStatusCode.BadRequest);
		}
	   
	}
}

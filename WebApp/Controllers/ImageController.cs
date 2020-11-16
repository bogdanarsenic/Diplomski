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
		[ResponseType(typeof(void))]
		public IHttpActionResult PutImage()
		{
			var httpReq = HttpContext.Current.Request;
			var file = httpReq.Files["Image"];
			string content = @"C:\Users\Bogdan\Desktop\DiplomskiBack\WebApp\Content"; 
			var path = Path.Combine(content, file.FileName);
			file.SaveAs(path);
			return StatusCode(HttpStatusCode.NoContent);
		}
	   
	}
}

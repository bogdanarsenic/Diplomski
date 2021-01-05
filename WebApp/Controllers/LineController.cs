using log4net;
using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using WebApp.Models;
using WebApp.Persistence.UnitOfWork;

namespace WebApp.Controllers
{
    public class LineController : ApiController
    {
        private readonly IUnitOfWork unitOfWork;
		private static readonly ILog log = LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);


		public LineController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        // GET: api/Item
        public IEnumerable<Line> GetLines()
        {
            return unitOfWork.Lines.GetAll();
        }

		// POST: api/Line
		[Authorize(Roles ="Admin")]
		[ResponseType(typeof(Line))]
        public IHttpActionResult PostLine(Line line)
        {

            if (!ModelState.IsValid)
            {
				log.Error("Something wrong with adding new line " + ModelState);
                return BadRequest(ModelState);
            }

            unitOfWork.Lines.Add(line);
            unitOfWork.Complete();

			log.Info("New Line " + line.Name + " has been added at" +DateTime.Now);

            return CreatedAtRoute("DefaultApi", new { id = line.Id }, line);
        }

		// PUT: api/Line/5
		[Authorize(Roles = "Admin")]
		[ResponseType(typeof(void))]
        public IHttpActionResult PutLine(int id, Line line)
        {
            if (!ModelState.IsValid)
            {
				log.Error("Something wrong with changing the line"+line.Name+"!");

				return BadRequest(ModelState);
            }

            if (id != line.Id)
            {
				log.Error("Line can't be changed!");
                return BadRequest();
            }

            try
            {
                unitOfWork.Lines.Update(line);
                unitOfWork.Complete();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LineExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        private bool LineExists(int id)
        {

            bool ret = unitOfWork.Lines.Get(id) != null;

            return ret;
        }

		// DELETE: api/Line/5
		[Authorize(Roles = "Admin")]
		[ResponseType(typeof(Line))]
        public IHttpActionResult DeleteLine(int id)
        {

            Line line = unitOfWork.Lines.Get(id);
            if (line == null)
            {
				log.Error("Line with this id can't be removed!");
                return NotFound();
            }

            unitOfWork.Lines.Remove(line);
			log.Info("Line " + line.Name + " has been deleted at "+DateTime.Now);
            unitOfWork.Complete();

            return Ok(line);
        }
    }
}

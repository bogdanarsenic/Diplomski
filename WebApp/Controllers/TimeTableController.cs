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
using WebApp.Persistence;
using WebApp.Persistence.UnitOfWork;

namespace WebApp.Controllers
{
    public class TimeTableController : ApiController
    {
        private readonly IUnitOfWork unitOfWork;

		private static readonly ILog log = LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

		public TimeTableController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        // GET: api/TimeTable
        public IEnumerable<TimeTable> GetTimeTables()
        {
            return unitOfWork.TimeTables.GetAll();
        }


		[Authorize(Roles = "Admin")]
		[ResponseType(typeof(TimeTable))]
        public IHttpActionResult PostTimetable(TimeTable timetable)
        {

            timetable.Id = Convert.ToString(Guid.NewGuid());


            if (!ModelState.IsValid)
            {
				log.Error("Something is wrong while adding timetable!");
                return BadRequest(ModelState);
            }

            unitOfWork.TimeTables.Add(timetable);
            unitOfWork.Complete();

			log.Info("Timetable for line " + timetable.LineId + " and "+ timetable.Day +"has been added at "+DateTime.Now);

            return CreatedAtRoute("DefaultApi", new { id = timetable.Id }, timetable);
        }
		//DELETE: api/TimeTable

		[Authorize(Roles = "Admin")]
		[ResponseType(typeof(void))]
        public IHttpActionResult DeleteTimeTable(string id)
        {
		
            ApplicationDbContext db = new ApplicationDbContext();

            TimeTable t = db.TimeTables.FirstOrDefault(u => u.Id == id);

            if (t == null)
            {
				log.Error("Error while deleting the timetable!");
                return NotFound();
            }

            db.TimeTables.Remove(t);
            db.SaveChanges();

			log.Info("Timetable for line " + t.LineId + " and " + t.Day + "has been deleted at " + DateTime.Now);


			return Ok(t);
        }
		//Put : api/TimeTable/id
		[Authorize(Roles = "Admin")]
		[ResponseType(typeof(void))]
        public IHttpActionResult PutTimeTable(string id, TimeTable time)
        {
            if (!ModelState.IsValid)
            {
				log.Error("Error while updating the timetable!");

				return BadRequest(ModelState);
            }

            if (id != time.Id)
            {
                return BadRequest();
            }

            try
            {
                unitOfWork.TimeTables.Update(time);
                unitOfWork.Complete();
				log.Info("Timetable for line " + time.LineId + " and " + time.Day + "has been updated at " + DateTime.Now);

			}
			catch (DbUpdateConcurrencyException)
            {
                if (!TimeTableExist(Convert.ToInt32(id)))
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
        private bool TimeTableExist(int id)
        {

            bool ret = unitOfWork.TimeTables.Get(id) != null;

            return ret;
        }
    }
}

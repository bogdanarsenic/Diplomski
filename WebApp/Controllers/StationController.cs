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
    public class StationController : ApiController
    {
        private readonly IUnitOfWork unitOfWork;
		private static readonly ILog log = LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);


		public StationController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        // GET: api/Item
        public IEnumerable<Station> GetStations()
        {
            return unitOfWork.Stations.GetAll();
        }

		// POST: api/PriceLists
		[Authorize(Roles = "Admin")]
		[ResponseType(typeof(Station))]
        public IHttpActionResult PostStation(Station station)
        {

            if (!ModelState.IsValid)
            {
				log.Error("Station can't be added! ");
                return BadRequest(ModelState);
            }

            unitOfWork.Stations.Add(station);
            unitOfWork.Complete();
			log.Info("Station "+station.Name+" has been added at "+DateTime.Now);


			return CreatedAtRoute("DefaultApi", new { id = station.Id }, station);
        }

		// PUT: api/Station/5
		[Authorize(Roles = "Admin")]
		[ResponseType(typeof(void))]
        public IHttpActionResult PutStation(int id, Station station)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Where(x => x.Value.Errors.Any())
                .Select(x => new { x.Key, x.Value.Errors });
				log.Error("Something wrong with editing the station ");

				return BadRequest(ModelState);
            }

            if (id != station.Id)
            {
				log.Error("Something wrong with editing the station ");

				return BadRequest();
            }

            try
            {
                unitOfWork.Stations.Update(station);
                unitOfWork.Complete();
				log.Info("Station "+station.Name+" has been updated at "+DateTime.Now);

			}
			catch (DbUpdateConcurrencyException)
            {
                if (!StationExists(id))
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

        private bool StationExists(int id)
        {

            bool ret = unitOfWork.Stations.Get(id) != null;

            return ret;
        }

		// DELETE: api/Line/5
		[Authorize(Roles = "Admin")]
		[ResponseType(typeof(Station))]
        public IHttpActionResult DeleteStation(int id)
        {

            Station station = unitOfWork.Stations.Get(Convert.ToInt32((id)));
            if (station == null)
            {
                return NotFound();
            }

            unitOfWork.Stations.Remove(station);
            unitOfWork.Complete();

            unitOfWork.StationLines.RemoveRange(unitOfWork.StationLines.Find(x => x.StationId == id));
            unitOfWork.Complete();

			log.Info("Station named " + station.Name + " has been deleted at " + DateTime.Now);

            return Ok(station);
        }
    }
}

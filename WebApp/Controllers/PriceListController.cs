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
    public class PriceListController : ApiController
    {
        private readonly IUnitOfWork unitOfWork;
		private static readonly ILog log = LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);


		public PriceListController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }
        // GET: api/PriceLists
        public IEnumerable<PriceList> GetPriceLists()
        {
            return unitOfWork.PriceLists.GetAll();
        }

		[Authorize(Roles = "Admin")]
		[ResponseType(typeof(PriceList))]
        public IHttpActionResult PostPriceList(PriceList pricelist)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            unitOfWork.PriceLists.Add(pricelist);
            unitOfWork.Complete();

            return CreatedAtRoute("DefaultApi", new { id = pricelist.Id }, pricelist);
        }

		[Authorize(Roles = "Admin")]
		[ResponseType(typeof(void))]
        public IHttpActionResult PutPriceList(string id, PriceList pricelist)
        {
            if (!ModelState.IsValid)
            {
				log.Error("Pricelist can't be changed!");
                return BadRequest(ModelState);
            }

            if (id != pricelist.Id)
            {
				log.Error("Pricelist can't be changed!");

				return BadRequest();
            }

            try
            {
                unitOfWork.PriceLists.Update(pricelist);
				log.Info("Pricelist for "+id+" has been changed at "+DateTime.Now);

				unitOfWork.Complete();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PriceListExists(id))
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

        private bool PriceListExists(string id)
        {

            bool ret = unitOfWork.PriceLists.Get(Convert.ToInt32(id)) != null;

            return ret;
        }
    }
}

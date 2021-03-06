﻿using log4net;
using System;
using System.Collections.Generic;
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
    public class TicketController : ApiController
    {
        private readonly IUnitOfWork unitOfWork;

		private static readonly ILog log = LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);


		public TicketController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

		// GET: api/Ticket
		[Authorize]
		public IEnumerable<Ticket> GetTickets()
        {
            return unitOfWork.Tickets.GetAll();
        }

		[Authorize(Roles = "Controller")]
		[ResponseType(typeof(Ticket))]
        public IHttpActionResult GetTicket(string id)
        {
            int i = Convert.ToInt32(id);

            Ticket ticket = unitOfWork.Tickets.Get(i);

            if (ticket == null)
            {

                return NotFound();
            }
            else
            {
                DateTime now = new DateTime();
                DateTime date = new DateTime();

                now = DateTime.Now;

                switch(ticket.TicketType)
                {
                    case Models.Enum.TicketTypes.Temporal:

                        date = ticket.Date.Value.AddHours(1);

                        if (now < ticket.Date && now > date)
                        {
                            ticket.IsValid = true;
                        }
                        else
                        {
                            ticket.IsValid = false;
                        }

                        break;

                    case Models.Enum.TicketTypes.Day:

                        date = DateTime.Now;

                        if (ticket.Date.Value.Day == date.Day)
                        {
                            ticket.IsValid = true;
                        }
                        else
                        {
                            ticket.IsValid = false;
                        }
                        break;

                    case Models.Enum.TicketTypes.Month:

                        date = DateTime.Now;

                        if (ticket.Date.Value.Month == date.Month && ticket.Date.Value.Year == date.Year)
                        {
                            ticket.IsValid = true;
                        }
                        else
                        {
                            ticket.IsValid = false;
                        }
                        break;

                    case Models.Enum.TicketTypes.Year:

                        date = DateTime.Now;

                        if (ticket.Date.Value.Year == date.Year)
                        {
                            ticket.IsValid = true;
                        }
                        else
                        {
                            ticket.IsValid = false;
                        }


                        break;
                }

                unitOfWork.Tickets.Update(ticket);
                unitOfWork.Complete();
                return Ok(ticket);
            }

            
        }

		[Authorize(Roles = "AppUser")]
		[ResponseType(typeof(Ticket))]
        public IHttpActionResult PostTicket(Ticket ticket)
        {

            ticket.Date = DateTime.Now;

		
            if (!ModelState.IsValid)
            {
				log.Error("There is an error while buying a ticket! " + ModelState);
                return BadRequest(ModelState);
            }

			

            unitOfWork.Tickets.Add(ticket);
            unitOfWork.Complete();

			log.Info(ticket.UserId + " has bought a " + ticket.TicketType + " ticket at " + DateTime.Now);

            return CreatedAtRoute("DefaultApi", new { id = ticket.Id }, ticket);
        }
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class Station
    {
		[DatabaseGenerated(DatabaseGeneratedOption.None)]
		public int Id { get; set; }

        public string Name { get; set; }
        public string Address { get; set; }

        public double CoordinateX { get; set; }

        public double CoordinateY { get; set; }

		public string LineId { get; set; }
    }
}
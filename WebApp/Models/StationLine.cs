using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class StationLine
    {
		[DatabaseGenerated(DatabaseGeneratedOption.None)]
		public int Id { get; set; }
        public int StationId { get; set; }
        public int LineId { get; set; }
    }
}
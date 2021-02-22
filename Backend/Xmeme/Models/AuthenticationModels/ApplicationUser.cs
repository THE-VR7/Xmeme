using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using Microsoft.AspNetCore.Identity;

namespace Models.AuthenticationModels
{
    public class ApplicationUser : IdentityUser
    {
        [Column(TypeName = "varchar(MAX)")]
        public string ImageUrl { get; set; }
    }
}

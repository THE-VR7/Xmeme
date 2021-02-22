using System;
using System.Collections.Generic;
using System.Text;

namespace Models.DataModels
{
    public class Meme
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Caption { get; set; }
        public string Url { get; set; }
        public DateTime CreatedOn { get; set; }
    }
}

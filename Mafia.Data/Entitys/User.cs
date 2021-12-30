using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mafia.Data.Entitys
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ConnectionId { get; set; }
        public long GameId { get; set; }
        public string Role { get; set; }
        public bool IsDead { get; set; }
        public int VoteCount { get; set; }
    }
}

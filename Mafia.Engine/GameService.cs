using Mafia.Data;
using Mafia.Data.Entitys;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Mafia.Engine
{
    public interface IGameService
    {
        List<User> GetAllUsers();
        bool CheckIfUserExisit(string userName);
        int GenerateCode();
        Task<int> CreateNewUser(string userName, int gameId, string connectionId);
        List<User> GetGameUsers(int gameId);
    }

    public class GameService : IGameService
    {
        public MafiaContext _context { get; }

        public GameService(MafiaContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public List<User> GetAllUsers()
        {
            var users = _context.Users.ToList();
            return users;
        }

        public bool CheckIfUserExisit(string userName)
        {
            var users = GetAllUsers();
            foreach (var user in users)
            {
                if (userName == user.Name)
                {
                    return true;
                }
            }

            return false;
        }

        public int GenerateCode()
        {
            int _min = 1000;
            int _max = 9999;
            Random _rdm = new Random();
            return _rdm.Next(_min, _max);
        }

        public async Task<int> CreateNewUser(string userName, int gameId, string connectionId)
        {
            var user = new User() { Name = userName, ConnectionId = connectionId, GameId = gameId};

            _context.Users.Add(user);
            return await _context.SaveChangesAsync();
        }

        public List<User> GetGameUsers(int gameId)
        {
            var users = _context.Users.Where(user => user.GameId == gameId).ToList();
            return users;
        }
    }
}

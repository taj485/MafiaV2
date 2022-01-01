using Mafia.Engine;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading.Tasks;

namespace Mafia.Hubs
{
    public class MafiaHub : Hub
    {
        public GameService _gameService { get; }

        public MafiaHub(GameService gameService)
        {
            _gameService = gameService ?? throw new System.ArgumentNullException(nameof(gameService));
        }

        public async Task AskServer(string clientText)
        {
            string tempString;

            if(clientText == "hey")
            {
                tempString = "Message was 'hey'";
            }
            else
            {
                tempString = "Message was something else";
            }

            await Clients.Clients(this.Context.ConnectionId).SendAsync("AskServerResponse", tempString);
        }

        public async Task AddUserToGroup(string groupName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
        }

        public async Task InitializeGame(string userName)
        {
            if (_gameService.CheckIfUserExisit(userName))
            {
                throw new Exception("User already exists");
            }
            else
            {
                var gameId = _gameService.GenerateCode();

                await _gameService.CreateNewUser(userName, gameId, Context.ConnectionId);

                await Clients.Group("gameOwner").SendAsync("loadWaitingRoom", _gameService.GetGameUsers(gameId), gameId);
            }
        }
    }
}

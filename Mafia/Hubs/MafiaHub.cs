using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace Mafia.Hubs
{
    public class MafiaHub : Hub
    {
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
    }
}

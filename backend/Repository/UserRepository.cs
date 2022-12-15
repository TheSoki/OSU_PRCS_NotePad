using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using backend.db.context;
using Microsoft.AspNetCore.Identity;

namespace backend.Repository
{
    public class UserRepository
    {
        private readonly DataContext _context;
        public UserRepository(DataContext context)
        {
            _context = context;
        }

        public bool CreateUser(User user, int roleId)
        {
            _context.Add(user);
            return Save();
        }

        public User? GetUserByEmail(string email)
        {
            return _context.User.Where(p => p.Email == email).FirstOrDefault();
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }

        public User GetActiveUser(string token)
        {
            var handler = new JwtSecurityTokenHandler();
            var encodedToken = handler.ReadJwtToken(token);
            var email = encodedToken.Claims.Where(x => x.Type == ClaimTypes.Email).First().Value;

            return _context.User.Where(x => x.Email == email).First();
        }
    }
}

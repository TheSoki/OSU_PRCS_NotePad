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

        public bool CreateUser(User user)
        {
            _context.Add(user);
            return Save();
        }

        public User? GetUserByEmail(string email)
        {
            return _context.User.Where(p => p.Email == email).FirstOrDefault();
        }

        public ICollection<User> GetUsers()
        {
            var users = _context.User.ToList();

            foreach (var user in users)
            {
                user.Password = "";
            }

            return users;
        }

        public bool UpdateUser(RegisterDTO user)
        {
            var entryUser = _context.User.Where(p => p.Email == user.Email).FirstOrDefault();
            if (entryUser != null)
            {
                entryUser.Name = user.Name;
                entryUser.Surname = user.Surname;
                entryUser.Email = user.Email;
                entryUser.Gender = user.Gender;
                entryUser.Password = AuthContext.GenerateHash(user.Password);

                _context.Update(entryUser);
                return Save();
            }
            return false;
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }

    }
}

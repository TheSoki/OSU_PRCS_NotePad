using backend.db.context;

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
    }
}

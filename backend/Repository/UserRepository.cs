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

        public bool CreateUser(UserDTO userDto, int roleId)
        {
            var user = new User()
            {

                Username = userDto.Username,
                Email = userDto.Email,
                Password = userDto.Password,
                Role = roleId == 1 ? Role.Admin : Role.User,
            };
            _context.Add(user);
            return Save();
        }

        public User GetNoteById(int id)
        {
            return _context.User.Where(p => p.Id == id).FirstOrDefault();
        }

        public User GetUserByEmail(string email)
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

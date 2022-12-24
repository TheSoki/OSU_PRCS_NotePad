namespace backend.Controllers;
using System.IdentityModel.Tokens.Jwt;
using backend.Repository;


public class UserService
{
    private readonly UserRepository _userRepository;

    public UserService(UserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public ICollection<User> GetUsers(string userEmail)
    {
        var editingUser = _userRepository.GetUserByEmail(userEmail);

        if (editingUser.Role != Role.Admin)
        {
            throw new UnauthorizedAccessException();
        }
        return _userRepository.GetUsers();
    }

    public bool UpdateUser(RegisterDTO user, string userEmail)
    {
        var editingUser = _userRepository.GetUserByEmail(userEmail);

        if (editingUser.Role != Role.Admin)
        {
            throw new UnauthorizedAccessException();
        }

        return _userRepository.UpdateUser(user);
    }
}


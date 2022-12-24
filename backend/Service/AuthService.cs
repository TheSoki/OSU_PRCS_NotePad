namespace backend.Controllers;
using System.IdentityModel.Tokens.Jwt;
using backend.Repository;


public class AuthService
{
    private readonly UserRepository _userRepository;

    public AuthService(UserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public AuthServiceLogin? Login(LoginDTO request)
    {
        var user = _userRepository.GetUserByEmail(request.Email);
        if (user == null)
        {
            return null;
        }

        try
        {
            AuthContext.ValidateHashOrThrowError(user.Password, request.Password);
        }
        catch
        {
            return null;
        }

        var userToken = AuthContext.GenerateToken(user);
        var token = new JwtSecurityTokenHandler().WriteToken(userToken);

        var cookieOptions = new CookieOptions
        {
            HttpOnly = false,
            Expires = userToken.ValidTo,
            SameSite = SameSiteMode.None,
            Secure = true
        };

        return new AuthServiceLogin
        {
            token = token,
            cookieOptions = cookieOptions
        };
    }

    public bool Register(RegisterDTO request)
    {
        var userExists = _userRepository.GetUserByEmail(request.Email);
        if (userExists != null)
        {
            return false;
        }

        try
        {
            var user = new User
            {
                Name = request.Name,
                Surname = request.Surname,
                Password = AuthContext.GenerateHash(request.Password),
                Email = request.Email,
                Gender = request.Gender,
                Role = Role.User
            };
            _userRepository.CreateUser(user);
            return true;
        }
        catch
        {
            return false;
        }
    }

    public User? GetUser(string userEmail)
    {
        var user = _userRepository.GetUserByEmail(userEmail);
        return user;
    }
}


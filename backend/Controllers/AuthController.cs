using Microsoft.AspNetCore.Mvc;
namespace backend.Controllers;
using System.IdentityModel.Tokens.Jwt;
using backend.Repository;

[ApiController]
[Route("api/[controller]")]

public class AuthController : ControllerBase
{
    private readonly UserRepository _userRepository;

    public AuthController(UserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    [Route("login")]
    [HttpPost]
    public ActionResult<Token> Post([FromBody] LoginDTO request)
    {
        var user = _userRepository.GetUserByEmail(request.Email);
        if (user == null)
        {
            return NotFound();
        }

        var IsHashValid = AuthContext.IsHashValid(user.Password, request.Password);

        if (!AuthContext.IsHashValid(user.Password, request.Password))
        {
            return NotFound();
        }

        var userToken = AuthContext.GenerateToken(user);
        var token = new JwtSecurityTokenHandler().WriteToken(userToken);

        var cookieOptions = new CookieOptions
        {
            HttpOnly = true,
            Expires = userToken.ValidTo,
            SameSite = SameSiteMode.None,
            Secure = true
        };
        Response.Cookies.Append("token", token, cookieOptions);

        return Ok(token);
    }

    [Route("register")]
    [HttpPost]
    public ActionResult<User> Post([FromBody] RegisterDTO request)
    {
        var userExists = _userRepository.GetUserByEmail(request.Email);
        if (userExists != null)
        {
            return Conflict();
        }
        else
        {
            try
            {
                var user = new User
                {
                    Username = request.Username,
                    Email = request.Email,
                    Password = AuthContext.GenerateHash(request.Password),
                    // Role = request. == 1 ? Role.Admin : Role.User,
                };
                _userRepository.CreateUser(user, 2);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
            return Ok();
        }
    }


    [Route("isAuthenticated")]
    [HttpGet]
    public ActionResult<bool> IsAuthenticated()
    {
        var token = Request.Cookies["token"];
        if (token == null)
        {
            return Ok(false);
        }
        var isValid = AuthContext.IsTokenValid(token);
        return Ok(isValid);
    }
}

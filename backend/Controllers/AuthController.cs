using Microsoft.AspNetCore.Mvc;
namespace backend.Controllers;
using System.IdentityModel.Tokens.Jwt;

[ApiController]
[Route("api/[controller]")]

public class AuthController : ControllerBase
{
    private UserContext userContext = new UserContext();

    [Route("test")]
    [HttpGet]
    public ActionResult<Boolean> Post()
    {
        var token = Request.Cookies["token"];
        if (token == null)
        {
            return false;
        }

        return Ok(AuthContext.IsTokenValid(token));
    }

    [Route("login")]
    [HttpPost]
    public ActionResult<Token> Post([FromBody] Login request)
    {
        var user = userContext.GetUserByEmail(request.Email);
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
            Expires = userToken.ValidTo
        };
        Response.Cookies.Append("token", token, cookieOptions);

        return Ok(token);
    }

    [Route("register")]
    [HttpPost]
    public ActionResult<User> Post([FromBody] UserDTO request)
    {
        var userExists = userContext.GetUserByEmail(request.Email);
        if (userExists != null)
        {
            return Conflict();
        }
        else
        {
            try
            {
                userContext.CreateUser(request, Role.User);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
            return Ok();
        }
    }


}

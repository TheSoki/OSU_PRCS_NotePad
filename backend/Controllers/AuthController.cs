using Microsoft.AspNetCore.Mvc;
namespace backend.Controllers;
using backend.Repository;

[ApiController]
[Route("api/[controller]")]

public class AuthController : ControllerBase
{

    private readonly AuthService _authService;

    public AuthController(UserRepository userRepository)
    {
        _authService = new AuthService(userRepository);
    }

    [Route("login")]
    [HttpPost]
    public ActionResult<Token> Post([FromBody] LoginDTO request)
    {
        var repositoryLogin = _authService.Login(request);

        if (repositoryLogin == null)
        {
            return NotFound();
        }

        Response.Cookies.Append("token", repositoryLogin.token, repositoryLogin.cookieOptions);

        return Ok(repositoryLogin.token);
    }

    [Route("register")]
    [HttpPost]
    public ActionResult<User> Post([FromBody] RegisterDTO request)
    {
        var repositoryRegister = _authService.Register(request);

        if (!repositoryRegister)
        {
            return BadRequest();
        }
        else
        {
            return Ok();
        }
    }

    [HttpGet]
    public ActionResult<User> GetMe()
    {
        if (!AuthContext.IsRequestAuthorized(Request))
        {
            return Unauthorized();
        }

        var userEmail = AuthContext.GetEmailFromToken(Request);

        var user = _authService.GetUser(userEmail);

        user.Password = "";
        return Ok(user);
    }
}

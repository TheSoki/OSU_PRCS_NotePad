using Microsoft.AspNetCore.Mvc;
namespace backend.Controllers;
using backend.Repository;

[ApiController]
[Route("api/[controller]")]

public class AuthController : ControllerBase
{

    private readonly AuthService _userRepository;

    public AuthController(UserRepository userRepository)
    {
        _userRepository = new AuthService(userRepository);
    }

    [Route("login")]
    [HttpPost]
    public ActionResult<Token> Post([FromBody] LoginDTO request)
    {
        var repositoryLogin = _userRepository.Login(request);

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
        var repositoryRegister = _userRepository.Register(request);

        if (!repositoryRegister)
        {
            return BadRequest();
        }
        else
        {
            return Ok();
        }
    }
}

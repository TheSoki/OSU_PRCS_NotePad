using Microsoft.AspNetCore.Mvc;
namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]

public class AuthController : ControllerBase
{
    private UserContext userContext = new UserContext();

    [Route("login")]
    [HttpPost]
    public ActionResult<User> Post([FromBody] Login request)
    {
        var user = userContext.GetUserByEmail(request.Email);
        if (user == null)
        {
            return NotFound();
        }

        var passwordBytes = System.Text.Encoding.UTF8.GetBytes(request.Password);
        var IsHashValid = AuthContext.IsHashValid(user.Password, request.Password);

        if (!IsHashValid)
        {
            return NotFound();
        }

        return Ok(user);
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

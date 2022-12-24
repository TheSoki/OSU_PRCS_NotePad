using System.Runtime.Serialization;
using Microsoft.AspNetCore.Mvc;
namespace backend.Controllers;
using backend.Repository;

[ApiController]
[Route("api/[controller]")]

public class UserController : ControllerBase
{

    private readonly UserService _userService;

    public UserController(UserRepository userRepository)
    {
        _userService = new UserService(userRepository);
    }

    [HttpGet]
    public ActionResult<User[]> GetUsers()
    {
        if (!AuthContext.IsRequestAuthorized(Request))
        {
            return Unauthorized();
        }

        var userEmail = AuthContext.GetEmailFromToken(Request);

        var users = _userService.GetUsers(userEmail);

        return Ok(users);
    }

    [HttpPut]
    public ActionResult UpdateUser([FromBody] RegisterDTO user)
    {
        if (!AuthContext.IsRequestAuthorized(Request))
        {
            return Unauthorized();
        }

        var userEmail = AuthContext.GetEmailFromToken(Request);


        var updated = _userService.UpdateUser(user, userEmail);

        if (!updated)
        {
            return BadRequest();
        }

        return Ok();
    }

}

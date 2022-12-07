using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
[Keyless]
public class LoginDTO
{
    [Required]
    [StringLength(64, MinimumLength = 3, ErrorMessage = "Username must be between 3 and 64 characters")]
    public string Password { get; set; } = String.Empty;

    [Required]
    [EmailAddress(ErrorMessage = "Invalid Email Address")]
    [StringLength(64, MinimumLength = 3, ErrorMessage = "Email must be between 3 and 64 characters")]
    public string Email { get; set; } = String.Empty;

}
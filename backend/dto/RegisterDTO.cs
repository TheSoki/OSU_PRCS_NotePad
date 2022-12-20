using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

[Keyless]
public class RegisterDTO
{
    [Required]
    [StringLength(64, MinimumLength = 3, ErrorMessage = "Name must be between 3 and 64 characters")]
    public string Name { get; set; } = String.Empty;

    [Required]
    [StringLength(64, MinimumLength = 3, ErrorMessage = "Surname must be between 3 and 64 characters")]
    public string Surname { get; set; } = String.Empty;

    [Required]
    [StringLength(64, MinimumLength = 3, ErrorMessage = "Password must be between 3 and 64 characters")]
    public string Password { get; set; } = String.Empty;

    [Required]
    [EmailAddress(ErrorMessage = "Invalid Email Address")]
    [StringLength(64, MinimumLength = 3, ErrorMessage = "Email must be between 3 and 64 characters")]
    public string Email { get; set; } = String.Empty;

    [Required]
    public Gender Gender { get; set; }
}
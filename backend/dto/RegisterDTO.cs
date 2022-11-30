using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
[Keyless]
public class RegisterDTO
{
    [Required]
    [StringLength(100)]
    public string Username { get; set; } = String.Empty;
    [Required]
    [StringLength(100)]
    public string Password { get; set; } = String.Empty;
    [Required]
    [StringLength(100)]
    [EmailAddress(ErrorMessage = "Invalid Email Address")]
    public string Email { get; set; } = String.Empty;

    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        if (Username.Length < 3 || Username.Length > 64)
        {
            yield return new ValidationResult(
                "Username must be between 3 and 64 characters",
                new[] { nameof(Username) }
            );
        }
        if (Password.Length < 3 || Password.Length > 64)
        {
            yield return new ValidationResult(
                "Password must be between 3 and 64 characters",
                new[] { nameof(Password) }
            );
        }
        if (Email.Length < 3 || Email.Length > 64)
        {
            yield return new ValidationResult(
                "Email must be between 3 and 64 characters",
                new[] { nameof(Email) }
            );
        }
    }
}
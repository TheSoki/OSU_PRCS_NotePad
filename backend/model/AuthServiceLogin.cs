using Microsoft.EntityFrameworkCore;

[Keyless]
public class AuthServiceLogin
{
    public string token { get; set; } = String.Empty;
    public CookieOptions cookieOptions { get; set; } = new CookieOptions();
}
using System.Security.Cryptography;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;

public static class AuthContext
{
    private static string _Secret = "superSecretKey@345";

    public static string GenerateHash(string password)
    {
        byte[] salt;
        new RNGCryptoServiceProvider().GetBytes(salt = new byte[16]);

        var pbkdf2 = new Rfc2898DeriveBytes(password, salt, 100000);
        byte[] hash = pbkdf2.GetBytes(20);

        byte[] hashBytes = new byte[36];
        Array.Copy(salt, 0, hashBytes, 0, 16);
        Array.Copy(hash, 0, hashBytes, 16, 20);

        string savedPasswordHash = Convert.ToBase64String(hashBytes);
        return savedPasswordHash;
    }

    public static void ValidateHashOrThrowError(string savedPasswordHash, string password)
    {
        byte[] hashBytes = Convert.FromBase64String(savedPasswordHash);
        byte[] salt = new byte[16];
        Array.Copy(hashBytes, 0, salt, 0, 16);

        var pbkdf2 = new Rfc2898DeriveBytes(password, salt, 100000);
        byte[] hash = pbkdf2.GetBytes(20);

        for (int i = 0; i < 20; i++)
            if (hashBytes[i + 16] != hash[i])
                throw new UnauthorizedAccessException();

    }

    public static JwtSecurityToken GenerateToken(User user)
    {
        var bytesKey = System.Text.Encoding.UTF8.GetBytes(_Secret);
        var securityKey = new SymmetricSecurityKey(bytesKey);
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim(JwtRegisteredClaimNames.Sub, user.Email),
            new Claim(ClaimTypes.Role, user.Role.ToString())
        };

        var token = new JwtSecurityToken(
            issuer: "http://localhost:5000",
            audience: "http://localhost:5000",
            claims,
            expires: DateTime.Now.AddDays(30),
            signingCredentials: credentials
        );

        return token;
    }

    public static bool IsTokenValid(string token)
    {
        var bytesKey = System.Text.Encoding.UTF8.GetBytes(_Secret);
        var securityKey = new SymmetricSecurityKey(bytesKey);
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        var tokenHandler = new JwtSecurityTokenHandler();
        var validationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = credentials.Key,
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ClockSkew = TimeSpan.Zero
        };

        SecurityToken validatedToken;
        try
        {
            tokenHandler.ValidateToken(token, validationParameters, out validatedToken);
        }
        catch
        {
            return false;
        }

        return true;
    }

    public static bool IsRequestAuthorized(HttpRequest request)
    {

        if (request.Cookies.ContainsKey("token"))
        {
            var token = request.Cookies["token"];
            if (token != null)
            {
                return IsTokenValid(token.ToString());
            }
        }
        return false;
    }

    public static string? GetEmailFromToken(HttpRequest request)
    {
        if (request.Cookies.ContainsKey("token"))
        {
            var token = request.Cookies["token"];

            var tokenHandler = new JwtSecurityTokenHandler();
            var jwtToken = tokenHandler.ReadJwtToken(token);
            return jwtToken.Claims.First(claim => claim.Type == "sub").Value;
        };

        return null;
    }

}

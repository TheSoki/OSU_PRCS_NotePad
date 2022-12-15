 
public enum Role
{
    Admin,
    User
}


public class User
{
    public int Id { get; set; }
    public string Username { get; set; } = String.Empty;
    public string Password { get; set; } = String.Empty;
    public string Email { get; set; } = String.Empty;
    public Role Role { get; set; }
    public ICollection<Note> Notes {get; set;}
}
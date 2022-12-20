
public enum Role
{
    Admin,
    User
}

public enum Gender
{
    Male,
    Female,
    Other
}


public class User
{
    public int Id { get; set; }
    public string Name { get; set; } = String.Empty;
    public string Surname { get; set; } = String.Empty;
    public string Password { get; set; } = String.Empty;
    public string Email { get; set; } = String.Empty;
    public Gender Gender { get; set; }
    public Role Role { get; set; }
    public ICollection<Note> Notes { get; set; }
}
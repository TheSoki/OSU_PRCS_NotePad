class UserContext
{
    private Connection connection = new Connection();

    public User? GetUserByEmail(string email)
    {
        var command = connection.getConnection().CreateCommand();

        command.CommandText = "SELECT * FROM user WHERE email = @email";
        command.Parameters.AddWithValue("@email", email);
        var reader = command.ExecuteReader();

        if (!reader.HasRows)
        {
            return null;
        }

        User user = new User();
        while (reader.Read())
        {
            user.Id = reader.GetInt32(0);
            user.Username = reader.GetString(1);
            user.Password = reader.GetString(2);
            user.Email = reader.GetString(3);
            user.Role = reader.GetFieldValue<Role>(4);
        }

        return user;
    }

    public void CreateUser(UserDTO user, Role role)
    {
        var command = connection.getConnection().CreateCommand();

        var passwordHash = AuthContext.GenerateHash(user.Password);

        var roleString = "";
        switch (role)
        {
            case Role.User:
                roleString = "user";
                break;
            case Role.Admin:
                roleString = "admin";
                break;
            default:
                roleString = "user";
                break;
        }

        command.CommandText = "INSERT INTO user (username, password, email, role) VALUES (@username, @password, @email, @role)";
        command.Parameters.AddWithValue("@username", user.Username);
        command.Parameters.AddWithValue("@password", passwordHash);
        command.Parameters.AddWithValue("@email", user.Email);
        command.Parameters.AddWithValue("@role", roleString);
        command.ExecuteNonQuery();
    }
}
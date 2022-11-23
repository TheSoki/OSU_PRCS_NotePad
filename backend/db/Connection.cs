/*
 * using Microsoft.Data.Sqlite;

class Connection
{
    private SqliteConnection connection = new SqliteConnection(new SqliteConnectionStringBuilder { DataSource = "./db/database.db" }.ToString());

    public Connection()
    {
        connection.Open();
        SeedDb();
    }

    ~Connection()
    {
        connection.Close();
    }

    public void SeedDb()
    {
        var command = connection.CreateCommand();
        command.CommandText = "CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY, username TEXT NOT NULL, password TEXT NOT NULL, email TEXT NOT NULL, role TEXT NOT NULL);";
        command.CommandText += "CREATE TABLE IF NOT EXISTS note (id INTEGER PRIMARY KEY, title TEXT NOT NULL, content TEXT NOT NULL, user_id INTEGER NOT NULL, FOREIGN KEY (user_id) REFERENCES user(id));";
        command.ExecuteNonQuery();
    }

    public SqliteConnection getConnection()
    {
        return connection;
    }

}
*/
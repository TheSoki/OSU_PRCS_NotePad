using Microsoft.Data.Sqlite;

namespace databaseConnection
{
    class Connection
    {
        public static SqliteConnection connection = new SqliteConnection(new SqliteConnectionStringBuilder { DataSource = "./db/database.db" }.ToString());

        public Connection()
        {
            connection.Open();
        }

        ~Connection()
        {
            connection.Close();
        }

        public static void Execute()
        {
            var selectCmd = connection.CreateCommand();
            // selectCmd.CommandText = "CREATE TABLE Persons (ID int NOT NULL, Name varchar(255) NOT NULL);";
            // selectCmd.CommandText += "INSERT INTO Persons (ID, Name) VALUES (1, 'John Doe');";
            // selectCmd.CommandText += "INSERT INTO Persons (ID, Name) VALUES (2, 'Jane Doe');";
            // selectCmd.ExecuteNonQuery();

            selectCmd.CommandText = "SELECT * FROM Persons";
            using (var reader = selectCmd.ExecuteReader())
            {
                while (reader.Read())
                {
                    Console.WriteLine(reader.GetString(0) + " " + reader.GetString(1));
                }
            }
        }

    }
}
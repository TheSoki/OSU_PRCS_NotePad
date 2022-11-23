/*
using backend.model;

public class IssueContext
    {
        private Connection connection = new Connection();

        public void CreateIssue(Issue issue, StateType state)
         {
         var command = connection.getConnection().CreateCommand();

         command.CommandText = "INSERT INTO issues (title, description, state, create_date, complete_date) VALUES (@id, @title, @description, @state, @createDate, @completeDate)";

        var stateString = "";
        switch (state)
        {
            case StateType.Planned:
                stateString = "planned";
                break;
            case StateType.In_Progress:
                stateString = "in progress";
                break;
            case StateType.Done:
                stateString = "done";
                break;
            default:
                stateString = "undefined";
                break;
        }

        command.CommandText = "INSERT INTO issues (id, title, description, state, create_date, complete_date) VALUES (@id, @title, @description, @state, @createDate, @completeDate)";
        command.Parameters.AddWithValue("@id", issue.Id);
        command.Parameters.AddWithValue("@title", issue.Title);
        command.Parameters.AddWithValue("@description", issue.Description);
        command.Parameters.AddWithValue("@state", stateString); 
        command.Parameters.AddWithValue("@createDate", issue.CreationDate);
        command.Parameters.AddWithValue("@completeDate", issue.CompleteDate);

    }

    public Issue? GetIssueById(int id)
    {
        var command = connection.getConnection().CreateCommand();
        command.CommandText = "SELECT * FROM issues WHERE title = @title";
        command.Parameters.AddWithValue("@id", id);
        var reader = command.ExecuteReader();

        if (!reader.HasRows)
        {
            return null;
        }

        Issue issue = new();
        while(reader.Read())
        {
            issue.Id = reader.GetInt32(0);
            issue.Title = reader.GetString(1);
            issue.Description = reader.GetString(2);
            issue.State = (StateType)Enum.Parse(typeof (StateType),reader.GetString(3));
            issue.CreationDate = reader.GetDateTime(4);
            issue.CompleteDate = reader.GetDateTime(5);
        }

        return issue;
    }

    public void DeleteIssue(int id)
    {
        var command = connection.getConnection().CreateCommand();
        command.Parameters.AddWithValue("@id", id);
        command.CommandText = "DELETE FROM issues WHERE id = @id";

    }
}
*/
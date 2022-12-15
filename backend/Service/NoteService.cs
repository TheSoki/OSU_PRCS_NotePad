namespace backend.Controllers;

using System.Text;
using backend.Repository;

public class NoteService
{

    private readonly NoteRepository _noteRepository;

    public NoteService(NoteRepository noteRepository)
    {
        _noteRepository = noteRepository;
    }

    public ICollection<Note> GetNotes(User user)
    {
        if (user.Role == Role.Admin)
        {
            return _noteRepository.GetNotes();
        }

        return _noteRepository.GetNotes(user);
    }

    public Note? GetNoteById(int id, User user)
    {
        if (user.Role == Role.Admin)
        {
            return _noteRepository.GetNoteById(id);
        }

        return _noteRepository.GetNoteById(id, user);
    }

    public bool CreateNote(NoteDTO noteCreate, User user)
    {
        try
        {
            var newNote = _noteRepository.CreateNote(noteCreate, user);
            return newNote;
        }
        catch
        {
            return false;
        }
    }

    public bool DeleteNoteById(int id, User user)
    {
        var note = user.Role == Role.Admin ? _noteRepository.GetNoteById(id) : _noteRepository.GetNoteById(id, user);

        if (note == null)
        {
            return false;
        }

        try
        {
            var deletedNote = user.Role == Role.Admin ? _noteRepository.DeleteNoteById(id) : _noteRepository.DeleteNoteById(id, user);
            return deletedNote;
        }
        catch
        {
            return false;
        }
    }

    public bool UpdateNoteById(UpdateNoteDTO noteUpdate, User user)
    {
        var note = user.Role == Role.Admin ? _noteRepository.GetNoteById(noteUpdate.Id) : _noteRepository.GetNoteById(noteUpdate.Id, user);
        if (note == null)
        {
            return false;
        }

        note.Title = noteUpdate.Title;
        note.Description = noteUpdate.Description;
        note.State = noteUpdate.State;

        if (note.State == StateType.Done)
        {
            note.CompleteDate = DateTime.Now;
        }
        else
        {
            note.CompleteDate = null;
        }

        try
        {
            var updatedNote = user.Role == Role.Admin ? _noteRepository.UpdateNote(note) : _noteRepository.UpdateNote(note, user);
            return updatedNote;
        }
        catch
        {
            return false;
        }
    }

    public byte[] ExportIntoBytes(User user)
    {
        string[] columnNames = new string[] { "Id", "Title", "Description", "Creation Date", "Complete Date", "State" };
        var notes = user.Role == Role.Admin ? _noteRepository.GetNotes() : _noteRepository.GetNotes(user);

        //Build the txt file data as a Comma separated string.
        string txt = string.Empty;

        foreach (string columnName in columnNames)
        {
            //Add the Header row for txt file.
            txt += columnName + ',';
        }

        //Add new line.
        txt += "\r\n";

        foreach (var note in notes)
        {
            //Add the Data rows.
            txt += note.Id + ',';
            txt += ',';
            txt += note.Title.Replace(",", ";") + ',';
            txt += note.Description.Replace(",", ";") + ',';
            txt += note.CreationDate;
            txt += ',';
            txt += note.CompleteDate;
            txt += ',';
            txt += note.State + ',';

            //Add new line.
            txt += "\r\n";
        }

        //Download the txt file.
        byte[] bytes = Encoding.ASCII.GetBytes(txt);

        return bytes;


    }
}
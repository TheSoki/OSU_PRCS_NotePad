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


    public IEnumerable<Note> GetNotes()
    {
        var notes = _noteRepository.GetNotes();

        return notes;
    }

    public Note? GetNoteById(int id)
    {
        var note = _noteRepository.GetNoteById(id);
        if (note == null)
        {
            return null;
        }

        return note;
    }

    public bool CreateNote(NoteDTO noteCreate)
    {
        var note = new Note
        {
            Title = noteCreate.Title,
            Description = noteCreate.Description,

        };

        try
        {
            var newNote = _noteRepository.CreateNote(noteCreate);
            return newNote;
        }
        catch
        {
            return false;
        }
    }

    public bool DeleteNoteById(int id)
    {
        var note = _noteRepository.GetNoteById(id);
        if (note == null)
        {
            return false;
        }

        try
        {
            var deletedNote = _noteRepository.DeleteNoteById(id);
            return deletedNote;
        }
        catch
        {
            return false;
        }
    }

    public bool UpdateNoteById(UpdateNoteDTO noteUpdate)
    {
        var note = _noteRepository.GetNoteById(noteUpdate.Id);
        if (note == null)
        {
            return false;
        }

        note.Title = noteUpdate.Title;
        note.Description = noteUpdate.Description;

        try
        {
            var updatedNote = _noteRepository.UpdateNote(note);
            return updatedNote;
        }
        catch
        {
            return false;
        }
    }

    public byte[] ExportIntoBytes()
    {
        string[] columnNames = new string[] { "Id", "Title", "Description", "Creation Date", "Complete Date", "State" };
        var notes = _noteRepository.GetNotes();

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
using backend.model;

namespace backend.Interface
{
    public interface INotesInterface
    {
        ICollection<NotesDTO> GetNotes();

        bool CreateNote(NotesDTO notes);
       // bool UpdateNote(NotesDTO notes);
       // bool DeleteNote(NotesDTO notes);
       // bool ListNotes(NotesDTO notes);
        bool Save();

    }
}

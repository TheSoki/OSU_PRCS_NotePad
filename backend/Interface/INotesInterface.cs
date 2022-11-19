using backend.model;

namespace backend.Interface
{
    public interface INotesInterface
    {
        ICollection<NotesDTO> GetNotes();

        bool CreateNote(NotesDTO notes);
        bool Save();

    }
}

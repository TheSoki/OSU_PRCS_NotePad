using backend.db.context;
using backend.Interface;
using backend.model;

namespace backend.Repository
{
    public class NotesRepository : INotesInterface
    {
        private readonly DataContext _context;
        public NotesRepository(DataContext context)
        {
            _context = context;

        }

        public bool CreateNote(NotesDTO note)
        {
            _context.Add(note);
            return Save();
        }

        public ICollection<NotesDTO> GetNotes()
        {
            return _context.Notes.OrderBy(p => p.Id).ToList();
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0? true: false;
        }
    }
}

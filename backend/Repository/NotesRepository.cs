using backend.db.context;
using backend.model;

namespace backend.Repository
{
    public class NotesRepository
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

        public bool deleteNoteById(int id)
        {
            var note = _context.Notes.Where(p => p.Id == id).FirstOrDefault();
            _context.Remove(note);
            return Save();
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }
    }
}

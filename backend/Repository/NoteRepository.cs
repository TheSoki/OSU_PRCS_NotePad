using backend.db.context;
using backend.model;

namespace backend.Repository
{
    public class NoteRepository
    {
        private readonly DataContext _context;
        public NoteRepository(DataContext context)
        {
            _context = context;
        }

        public bool CreateNote(NoteDTO note)
        {
            _context.Add(note);
            return Save();
        }

        public ICollection<NoteDTO> GetNotes()
        {
            return _context.Note.OrderBy(p => p.Id).ToList();
        }

        public NoteDTO GetNoteById(int id)
        {
            return _context.Note.Where(p => p.Id == id).FirstOrDefault();
        }

        public bool deleteNoteById(int id)
        {
            var note = _context.Note.Where(p => p.Id == id).FirstOrDefault();
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

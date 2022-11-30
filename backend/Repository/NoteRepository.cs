using backend.db.context;
using backend.DTO;
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

            var newNote = new Note()
            {
                Title = note.Title,
                Description = note.Description,
                CreationDate = DateTime.Now,
                CompleteDate = null,
            };
            _context.Add(newNote);
            return Save();
        }

        public ICollection<Note> GetNotes()
        {
            return _context.Note.OrderBy(p => p.Id).ToList();
        }

        public Note? GetNoteById(int id)
        {
            return _context.Note.Where(p => p.Id == id).FirstOrDefault();
        }

        public bool deleteNoteById(int id)
        {
            var note = _context.Note.Where(p => p.Id == id).FirstOrDefault();
            if (note != null)
            {
                _context.Remove(note);
                return Save();
            }
            return false;
        }

        public bool UpdateNote(Note note)
        {
            var entryNote = GetNoteById(note.Id);
            if (entryNote != null)
            {
                _context.Entry(entryNote).CurrentValues.SetValues(note);
                return Save();
            }
            return false;

        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }
    }
}

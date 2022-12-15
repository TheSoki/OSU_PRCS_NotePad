using backend.db.context;

namespace backend.Repository
{
    public class NoteRepository
    {
        private readonly DataContext _context;
        public NoteRepository(DataContext context)
        {
            _context = context;
        }

        public bool CreateNote(NoteDTO noteCreate, User user)
        {
            var note = new Note
            {
                Title = noteCreate.Title,
                Description = noteCreate.Description,
                CreationDate = DateTime.Now,
                CompleteDate = null,
                State = StateType.Planned,
                User = user
            };
            _context.Add(note);
            return Save();
        }

        public ICollection<Note> GetNotes()
        {
            return _context.Note.ToList();
        }

        public ICollection<Note> GetNotes(User user)
        {
            return _context.Note.Where(p => p.User == user).ToList();
        }

        public Note? GetNoteById(int id)
        {
            return _context.Note.Where(p => p.Id == id).FirstOrDefault();
        }

        public Note? GetNoteById(int id, User user)
        {
            return _context.Note.Where(p => p.Id == id && p.User == user).FirstOrDefault();
        }

        public bool DeleteNoteById(int id)
        {
            var note = _context.Note.Where(p => p.Id == id).FirstOrDefault();
            if (note != null)
            {
                _context.Remove(note);
                return Save();
            }
            return false;
        }

        public bool DeleteNoteById(int id, User user)
        {
            var note = _context.Note.Where(p => p.Id == id && p.User == user).FirstOrDefault();
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

        public bool UpdateNote(Note note, User user)
        {
            var entryNote = GetNoteById(note.Id, user);
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

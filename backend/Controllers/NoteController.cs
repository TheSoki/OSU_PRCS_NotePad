using backend.Repository;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NoteController : Controller
    {
        private readonly NoteService _noteService;
        private readonly UserRepository _userRepository;

        public NoteController(NoteRepository noteRepository, UserRepository userRepository)
        {
            _noteService = new NoteService(noteRepository);
            _userRepository = userRepository;
        }


        [HttpGet]
        public ActionResult<Note[]> GetNotes()
        {
            if (!AuthContext.IsRequestAuthorized(Request))
            {
                return Unauthorized();
            }

            var role = AuthContext.GetRoleFromToken(Request);
            var userEmail = AuthContext.GetEmailFromToken(Request);
            var user = _userRepository.GetUserByEmail(userEmail);
            var notes = _noteService.GetNotes(user,role);

            return Ok(notes);
        }

        [HttpGet("{id}")]
        public ActionResult<Note> GetNoteById(int id)
        {
            if (!AuthContext.IsRequestAuthorized(Request))
            {
                return Unauthorized();
            }

            var userEmail = AuthContext.GetEmailFromToken(Request);
            var user = _userRepository.GetUserByEmail(userEmail);
            var note = _noteService.GetNoteById(id, user);

            if (note == null)
            {
                return NotFound();
            }

            return Ok(note);
        }

        [HttpPost]
        public ActionResult CreateNote([FromBody] NoteDTO noteCreate)
        {
            if (!AuthContext.IsRequestAuthorized(Request))
            {
                return Unauthorized();
            }

            var userEmail = AuthContext.GetEmailFromToken(Request);
            var user = _userRepository.GetUserByEmail(userEmail);
            var newNote = _noteService.CreateNote(noteCreate, user);

            if (!newNote)
            {
                return BadRequest("Error creating note");
            }

            return Ok();
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteNote(int id)
        {
            if (!AuthContext.IsRequestAuthorized(Request))
            {
                return Unauthorized();
            }

            var userEmail = AuthContext.GetEmailFromToken(Request);
            var user = _userRepository.GetUserByEmail(userEmail);
            var note = _noteService.DeleteNoteById(id, user);

            if (!note)
            {
                return BadRequest("Error deleting note");
            }

            return Ok();
        }

        [HttpPut]
        public ActionResult UpdateNote(UpdateNoteDTO noteUpdate)
        {
            if (!AuthContext.IsRequestAuthorized(Request))
            {
                return Unauthorized();
            }

            var userEmail = AuthContext.GetEmailFromToken(Request);
            var user = _userRepository.GetUserByEmail(userEmail);
            var note = _noteService.UpdateNoteById(noteUpdate, user);

            if (!note)
            {
                return BadRequest("Error updating note");
            }

            return Ok();
        }

        [HttpPost]
        [Route("export")]
        public ActionResult ExportToTxt()
        {
            if (!AuthContext.IsRequestAuthorized(Request))
            {
                return Unauthorized();
            }

            var userEmail = AuthContext.GetEmailFromToken(Request);
            var user = _userRepository.GetUserByEmail(userEmail);
            var bytes = _noteService.ExportIntoBytes(user);

            return File(bytes, "text/txt", "Notes.txt");
        }
    }
}
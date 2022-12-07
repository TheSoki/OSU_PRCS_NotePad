using backend.Repository;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NoteController : Controller
    {
        private readonly NoteService _noteService;

        public NoteController(NoteRepository noteRepository)
        {
            _noteService = new NoteService(noteRepository);
        }


        [HttpGet]
        public ActionResult<Note[]> GetNotes()
        {
            if (!AuthContext.IsRequestAuthorized(Request))
            {
                return Unauthorized();
            }

            var notes = _noteService.GetNotes();

            return Ok(notes);
        }

        [HttpGet("{id}")]
        public ActionResult<Note> GetNoteById(int id)
        {
            if (!AuthContext.IsRequestAuthorized(Request))
            {
                return Unauthorized();
            }

            var note = _noteService.GetNoteById(id);
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


            var newNote = _noteService.CreateNote(noteCreate);

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

            var note = _noteService.DeleteNoteById(id);

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

            var note = _noteService.UpdateNoteById(noteUpdate);

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

            var bytes = _noteService.ExportIntoBytes();

            return File(bytes, "text/txt", "Notes.txt");
        }
    }
}
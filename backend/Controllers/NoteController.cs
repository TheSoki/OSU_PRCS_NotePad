using backend.model;
using backend.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NoteController : Controller
    {
        private readonly NoteRepository _noteRepository;

        public NoteController(NoteRepository noteRepository)
        {
            _noteRepository = noteRepository;
        }


        [HttpGet]
        public ActionResult<NoteDTO[]> GetNotes()
        {
            if (!AuthContext.IsRequestAuthorized(Request))
            {
                return Unauthorized();
            }

            var notes = _noteRepository.GetNotes();

            if (ModelState.IsValid) { BadRequest(ModelState); }
            return Ok(notes);
        }

        [HttpGet("{id}")]
        public ActionResult<NoteDTO> GetNoteById(int id)
        {
            if (!AuthContext.IsRequestAuthorized(Request))
            {
                return Unauthorized();
            }

            var note = _noteRepository.GetNoteById(id);

            if (note == null) { return NotFound(); }
            return Ok(note);
        }

        [HttpPost]
        public ActionResult<NoteDTO> CreateNote([FromBody] NoteDTO noteCreate)
        {
            if (!AuthContext.IsRequestAuthorized(Request))
            {
                return Unauthorized();
            }

            if (noteCreate == null) { return BadRequest(ModelState); }

            var note = _noteRepository.GetNotes()
                  .Where(c => c.Title.Trim().ToUpper() == noteCreate.Title.TrimEnd().ToUpper())
                  .FirstOrDefault();

            if (note != null)
            {
                ModelState.AddModelError("", "Issue with this title already exists.");
                return StatusCode(422, ModelState);
            }

            if (!ModelState.IsValid) { return BadRequest(ModelState); }


            try
            {
                var newNote = _noteRepository.CreateNote(noteCreate);
                return Ok(newNote);
            }
            catch (Exception ex)
            {
                ModelState.AddModelError("", $"Something went wrong when saving the record {ex.Message}");
                return StatusCode(500, ModelState);
            }
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteIssue(int id)
        {
            if (!AuthContext.IsRequestAuthorized(Request))
            {
                return Unauthorized();
            }

            try
            {
                var issueToDelete = _noteRepository.GetNoteById(id);

                if (issueToDelete == null)
                {
                    return NotFound($"Employee with Id = {id} not found");
                }

                _noteRepository.deleteNoteById(id);
                return Ok();
            }
            catch (Exception)
            {
                return BadRequest("Error deleting data");
            }
        }
    }
}
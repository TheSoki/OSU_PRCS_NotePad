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
        [ProducesResponseType(typeof(NoteDTO[]), 200)]
        public IActionResult GetNotes()
        {
            var notes = _noteRepository.GetNotes();

            if (ModelState.IsValid) { BadRequest(ModelState); }
            return Ok(notes);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(typeof(NoteDTO), 200)]
        public IActionResult GetNoteById(int id)
        {
            var note = _noteRepository.GetNoteById(id);

            if (note == null) { return NotFound(); }
            return Ok(note);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult CreateNote([FromBody] NoteDTO noteCreate)
        {
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

            return Ok();
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteIssue(int id)
        {
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
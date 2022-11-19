using backend.Interface;
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
       // private IssueContext issueContext = new();

        private readonly INotesInterface _notesInterface;

            public NoteController(INotesInterface notesInterface)
        {
            _notesInterface = notesInterface;
        }


        [Route("get")]
        [HttpGet]
        [ProducesResponseType (typeof(NotesDTO), 200)]
        public IActionResult GetNotes()
        {
            var notes = _notesInterface.GetNotes();

           if(ModelState.IsValid) { BadRequest(ModelState); }
           return Ok(notes);   
        }

        
        [Route("create")]
        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult CreateNote([FromBody] NotesDTO noteCreate)
        {
          if(noteCreate == null) { return BadRequest(ModelState); }
          
          var note = _notesInterface.GetNotes()
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
        /*
        [Route("delete")]
        [HttpDelete]
        public ActionResult DeleteIssue(int id)
        {
            try
            {
                var issueToDelete = issueContext.GetIssueById(id);

                if (issueToDelete == null)
                {
                    return NotFound($"Employee with Id = {id} not found");
                }

                issueContext.DeleteIssue(id);
                return Ok();
            }
            catch (Exception)
            {
                return BadRequest("Error deleting data");
            }
        }*/
    }
}
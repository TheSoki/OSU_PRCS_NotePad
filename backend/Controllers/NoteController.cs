﻿using backend.model;
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

        private readonly NotesRepository _noteRepository;

        public NoteController(NotesRepository noteRepository)
        {
            _noteRepository = noteRepository;
        }


        [HttpGet]
        [ProducesResponseType(typeof(NotesDTO[]), 200)]
        public IActionResult GetNotes()
        {
            var notes = _noteRepository.GetNotes();

            if (ModelState.IsValid) { BadRequest(ModelState); }
            return Ok(notes);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult CreateNote([FromBody] NotesDTO noteCreate)
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
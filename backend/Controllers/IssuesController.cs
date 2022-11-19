using backend.model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IssuesController : ControllerBase
    {
        private IssueContext issueContext = new();

        [Route("create")]
        [HttpPost]

        public ActionResult Post([FromBody] Issue issue)
        {
            var issueExists = issueContext.GetIssueById(issue.Id);

            if (issueExists != null)
            {
                return Conflict();
            }
            else
            {
                try
                {
                  issueContext.CreateIssue(issue, StateType.Undefined);
                    return Ok();
                }
                catch (Exception ex)
                {
                    return BadRequest(ex);
                }

            }
        }

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
        }
    }
}
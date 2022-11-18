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

    }
}
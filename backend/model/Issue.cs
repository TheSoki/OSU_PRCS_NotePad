using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace backend.model
{
    [Route("api/[controller]")]
    [ApiController]
    public class Issue : ControllerBase
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        [Required]
        public DateTime CreationDate { get; set; }
        public DateTime CompleteDate { get; set; }

        [Required]
        public StateType State { get; set;}
    }
        public enum StateType
        {
            Planned, In_Progress, Done, Undefined
        }
}

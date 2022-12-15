using System.ComponentModel.DataAnnotations;

public class UpdateNoteDTO
{
    [Required]
    public int Id { get; set; }

    [Required]
    [StringLength(64, MinimumLength = 3, ErrorMessage = "Title must be between 3 and 64 characters")]
    public string Title { get; set; } = string.Empty;

    [Required]
    [StringLength(64, MinimumLength = 3, ErrorMessage = "Description must be between 3 and 64 characters")]
    public string Description { get; set; } = string.Empty;

    [Required]
    public StateType State { get; set; }

}
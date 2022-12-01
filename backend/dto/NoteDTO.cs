using System.ComponentModel.DataAnnotations;

public class NoteDTO
{
    [Required]
    [StringLength(100)]
    public string Title { get; set; } = string.Empty;
    [Required]
    [StringLength(120)]
    public string Description { get; set; } = string.Empty;

}
namespace backend.DTO
{
    public class NoteDTO
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateTime CreationDate { get; set; }
        public DateTime CompleteDate { get; set; }
        public StateType State { get; set; }
    }
    public enum StateType
    {
        Planned, In_Progress, Done, Undefined
    }
}
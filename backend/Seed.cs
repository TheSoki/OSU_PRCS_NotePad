
using backend.db.context;
using backend.model;

namespace backend
{
    public class Seed
    {
        private readonly DataContext _dataContext;
        public Seed(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public void SeedDataContext()
        {
            if (!_dataContext.Notes.Any())
            {
                var notes = new List<NotesDTO>()
                {
                    new NotesDTO()
                    {
                        Id = 1,
                        Title= "Test",
                        Description= "Test",
                        CreationDate= DateTime.Now,
                        CompleteDate= DateTime.Now,
                        State = StateType.Planned,
                    },
                     new NotesDTO()
                    {
                        Id = 2,
                        Title= "Test",
                        Description= "Test",
                        CreationDate= DateTime.Now,
                        CompleteDate= DateTime.Now,
                        State = StateType.Planned,
                    },
                      new NotesDTO()
                    {
                        Id = 3,
                        Title= "Test",
                        Description= "Test",
                        CreationDate= DateTime.Now,
                        CompleteDate= DateTime.Now,
                        State = StateType.Planned,
                    },
                };
                _dataContext.Notes.AddRange(notes);
                _dataContext.SaveChanges();
            }
        }
    }
}

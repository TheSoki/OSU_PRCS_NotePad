
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
            if (!_dataContext.Note.Any())
            {
                var notes = new List<Note>()
                {
                    new Note()
                    {
                        Id = 1,
                        Title= "Test",
                        Description= "Test",
                        CreationDate= DateTime.Now,
                        CompleteDate= DateTime.Now,
                        State = StateType.Planned,
                    },
                     new Note()
                    {
                        Id = 2,
                        Title= "Test",
                        Description= "Test",
                        CreationDate= DateTime.Now,
                        CompleteDate= DateTime.Now,
                        State = StateType.Planned,
                    },
                      new Note()
                    {
                        Id = 3,
                        Title= "Test",
                        Description= "Test",
                        CreationDate= DateTime.Now,
                        CompleteDate= DateTime.Now,
                        State = StateType.Planned,
                    },
                };
                _dataContext.Note.AddRange(notes);
                _dataContext.SaveChanges();
            }
        }
    }
}

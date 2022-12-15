using System.Text.Json.Serialization;
using backend;
using backend.db.context;
using backend.Repository;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<DataContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddScoped<NoteRepository>();
builder.Services.AddScoped<UserRepository>();
builder.Services.AddControllers().AddJsonOptions(x =>
    x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);
var app = builder.Build();

if (args.Length == 1 && args[0].ToLower() == "seed")
{
    Console.WriteLine("Seeding database...");
    var scopedFactory = app.Services.GetService<IServiceScopeFactory>();

    if (scopedFactory != null)
    {
        using (var scope = scopedFactory.CreateScope())
        {
            DataContext _dataContext = scope.ServiceProvider.GetRequiredService<DataContext>();
            _dataContext.User.Add(new User()
            {
                Id = 1,
                Username = "admin",
                Email = "admin@admin.com",
                Password = AuthContext.GenerateHash("password"),
                Role = Role.Admin,
            });
            _dataContext.SaveChanges();
            Console.WriteLine("Database seeded.");
        }
    }
    else
    {
        Console.WriteLine("Error: scopedFactory is null");
    }
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

builder.Services.AddCors();
app.UseCors(options => options.WithOrigins("http://localhost:3000").AllowAnyMethod().AllowAnyHeader().AllowCredentials());

app.Run();

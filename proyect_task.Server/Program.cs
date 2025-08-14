using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication;
using proyect_task.Server.Context;

var builder = WebApplication.CreateBuilder(args);
var connectionString = builder.Configuration.GetConnectionString("bd_conn");
// Add services to the container.

builder.Services.AddCors(options =>
{
    options.AddPolicy("PermitirFrontend", policy =>
    {
        policy.WithOrigins("https://midominio.com", "https://localhost:61838") // Angular local y producción
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<TareaContext>(options =>
    options.UseSqlServer(connectionString));

builder.Services.AddControllers();
var app = builder.Build();

app.UseCors("PermitirFrontend");
app.MapControllers();

//app.UseDefaultFiles();
//app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();

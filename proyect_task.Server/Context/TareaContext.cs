using Microsoft.AspNetCore.Authentication;
using Microsoft.EntityFrameworkCore;
using proyect_task.Server.Models;

namespace proyect_task.Server.Context
{
    public class TareaContext : DbContext
    {
        public TareaContext(DbContextOptions<TareaContext> options) : base(options)
        {
        }

        public DbSet<Tarea> Tarea { get; set; }
    }
}

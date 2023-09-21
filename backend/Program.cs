using Contexts;
using Microsoft.EntityFrameworkCore;
using Services;
using Services.Abstract;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<SensorContext>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("SensorContext")));
builder.Services.AddScoped<ISensorService, SensorService>();
builder.Services.AddScoped<IMeasurementService, MeasurementService>();
builder.Services.AddCors(p => p.AddPolicy("corsapp", builder => builder.WithOrigins("*").AllowAnyMethod().AllowAnyHeader()));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("corsapp");
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();

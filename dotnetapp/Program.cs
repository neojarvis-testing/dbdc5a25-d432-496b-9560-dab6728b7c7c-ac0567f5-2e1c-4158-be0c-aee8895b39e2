using System;
using dotnetapp.Services;
<<<<<<< HEAD
using dotnetapp.Data;
using dotnetapp.Models;
using Microsoft.EntityFrameworkCore;

=======
using Microsoft.EntityFrameworkCore;
using dotnetapp.Data;
>>>>>>> 1c926f4e37b05315998f867f6f84f66a59fa2718
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<ApplicationDbContext>(db=>{
    db.UseSqlServer(builder.Configuration.GetConnectionString("conn"));
});
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});
builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("conn")));

// Register AnnouncementService
builder.Services.AddScoped<AnnouncementService>();
builder.Services.AddScoped<BlogPostService>();
builder.Services.AddScoped<FeedbackService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

builder.Services.AddScoped<BlogPostService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

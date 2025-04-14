using dotnetapp.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using System.Linq;
using dotnetapp.Data;
 
namespace dotnetapp.Services
{
public class AuthService:IAuthService
{

private readonly IConfiguration _configuration;
private readonly ApplicationDbContext _context;
 
public AuthService(IConfiguration configuration,
ApplicationDbContext context)
{

_configuration = configuration;
_context = context;
}
 
public async Task<(int, string)> Registration(User model, string role)
{
var userExists = _context.Users.FirstOrDefault(u => u.Email == model.Email);
if (userExists != null)
{
return (0, "User already exists");
}
 
_context.Users.Add(model);
_context.SaveChanges();
 
return (1, "User Created successfully!");
}

public async Task<(int, string)> Login(LoginModel model)
{
var user =  _context.Users.FirstOrDefault(u => u.Email == model.Email);
if (user == null)
{
return (0, "Invalid email");
}
var result = _context.Users.FirstOrDefault(u => u.Email == model.Email && u.Password==model.Password);
if (result == null)
{
return (0, "Invalid password");
}
 
 
    string token = await GenerateToken(user);
    return (1, token);
 
 
}
 

 
public async Task<string> GenerateToken(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.UserRole)
            };
           
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Key"]));
            var credentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            var tokenDesc = new SecurityTokenDescriptor
            {
                Issuer = _configuration["JWT:Issuer"],
                Audience = _configuration["JWT:Audience"],
                Expires = DateTime.Now.AddMinutes(30),
                SigningCredentials = credentials,
                Subject = new ClaimsIdentity(claims)
            };
            var handler = new JwtSecurityTokenHandler();
            var token = handler.CreateToken(tokenDesc);
            return handler.WriteToken(token);
        }
 
}
}

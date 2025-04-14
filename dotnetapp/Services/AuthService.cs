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
            // Find user by email
            var user = _context.Users.FirstOrDefault(u => u.Email == model.Email);
            if (user == null)
            {
                return (0, "Invalid email");
            }

            // Check if password is correct
            if (user.Password != model.Password) // Consider using a secure hashing algorithm
            {
                return (0, "Invalid password");
            }

            // Generate JWT token
            var claims = new List<Claim>
            {
                new Claim("emailaddress", user.Email),
                new Claim("Roles", user.UserRole),
                new Claim("exp", new DateTimeOffset(DateTime.UtcNow.AddHours(1)).ToUnixTimeSeconds().ToString()),
            };

            string token = GenerateToken(claims);
            return (1, token);
        }

        private string GenerateToken(IEnumerable<Claim> claims)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("YourSuperSecretKeyHere")); // Replace with secure key
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: "yourdomain.com",
                audience: "yourdomain.com",
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

    
    }
}

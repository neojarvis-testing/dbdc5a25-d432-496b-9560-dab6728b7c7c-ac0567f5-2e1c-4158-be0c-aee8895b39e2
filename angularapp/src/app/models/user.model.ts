public class User
{
    [Key]
    public int UserId { get; set; }

    public string Email { get; set; }
    public string Password { get; set; }
    public string Username { get; set; }
    public string MobileNumber { get; set; }
    public string UserRole { get; set; }
    public string ProfileImageUrl { get; set; } // New
}
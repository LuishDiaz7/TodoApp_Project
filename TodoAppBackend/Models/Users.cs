using System.ComponentModel.DataAnnotations;
using TodoAppBackend.enums;

namespace TodoAppBackend.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required]
        public string Username { get; set; }

        [Required]
        public string PasswordHash { get; set; }

        public UserRole Role { get; set; } = UserRole.User;


        public List<Assignment> Assignments { get; set; }
    }
}
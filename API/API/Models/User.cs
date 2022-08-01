namespace API.Models
{
    public class User
    {
        public int ID { get; set; }
        public string UserName { get; set; } 
        public string Email { get; set; }
        public string Password { get; set; }
        public int Type { get; set; }

        public bool IsPasswordValid(string password)
        {
            return SecurePasswordHasher.Verify(password,Password);
        }
    }
}

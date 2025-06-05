using System;
using BCrypt.Net;

public class Program
{
    public static void Main(string[] args)
    {
        string plainPassword = "password";
        $2a$11$/ j2TA69skvMmJNmE5qgTGeSohPYpWz71Nhy20vvpSF7kXMLONvva6
        string hashedPasswordFromDb = "$2a$11$/j2TA69skvMmJNmE5qgTGeSohPYpWz71Nhy20vvpSF7kXMLONvva6";

        bool verified = BCrypt.Net.BCrypt.Verify(plainPassword, hashedPasswordFromDb);
        Console.WriteLine($"Plain Password: {plainPassword}");
        Console.WriteLine($"Hashed Password from DB: {hashedPasswordFromDb}");
        Console.WriteLine($"Verification Result: {verified}");

        Console.WriteLine("\nPress any key to exit.");
        Console.ReadKey();
    }
}

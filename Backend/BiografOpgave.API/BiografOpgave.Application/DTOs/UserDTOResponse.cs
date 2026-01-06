namespace BiografOpgave.Application.DTOs;

public class UserDTOResponse
{
    public int Id { get; set; }
    public required string Email { get; set; }
    public required string FullName { get; set; }
    public UserRole Role { get; set; }
    public DateTime CreatedAt { get; set; }
}

namespace BiografOpgave.Domain.Models;

public enum BookingStatus
{
    Pending,
    Confirmed,
    Cancelled,
    Failed
}

public enum UserRole
{
    User,
    Admin,
    Staff
}

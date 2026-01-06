namespace BiografOpgave.Domain.Interfaces;

public interface IBookingRepository
{
    Task<IEnumerable<Booking>> GetAll();
    Task<Booking?> GetById(int id);
    Task<Booking?> GetDetailed(int id);
    Task<Booking> Create(Booking booking);
    Task<Booking?> Update(Booking booking);
    Task<bool> Delete(int id);
}

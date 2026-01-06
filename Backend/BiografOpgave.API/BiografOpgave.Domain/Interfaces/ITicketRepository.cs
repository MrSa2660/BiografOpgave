namespace BiografOpgave.Domain.Interfaces;

public interface ITicketRepository
{
    Task<IEnumerable<Ticket>> GetForBooking(int bookingId);
    Task<Ticket?> GetById(int id);
    Task<Ticket> Create(Ticket ticket);
    Task<bool> Delete(int id);
}

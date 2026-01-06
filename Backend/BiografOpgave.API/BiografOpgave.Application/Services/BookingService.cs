namespace BiografOpgave.Application.Services;

public class BookingService : IBookingService
{
    private readonly IBookingRepository _bookings;

    public BookingService(IBookingRepository bookings)
    {
        _bookings = bookings;
    }

    public async Task<IEnumerable<BookingDTOResponse>> GetAll()
        => (await _bookings.GetAll()).Select(ToDto);

    public async Task<BookingDTOResponse?> GetById(int id)
        => (await _bookings.GetDetailed(id)) is { } booking ? ToDto(booking) : null;

    public async Task<BookingDTOResponse?> Create(BookingDTORequest request)
    {
        if (!request.Seats.Any()) return null;

        var entity = new Booking
        {
            UserId = request.UserId,
            ShowtimeId = request.ShowtimeId,
            Seats = request.Seats.Select(s => new BookingSeat
            {
                Row = s.Row,
                Number = s.Number,
                Price = s.Price
            }).ToList()
        };
        entity.TotalPrice = entity.Seats.Sum(s => s.Price);

        var created = await _bookings.Create(entity);
        return ToDto(created);
    }

    public async Task<BookingDTOResponse?> UpdateStatus(int id, BookingStatus status)
    {
        var existing = await _bookings.GetById(id);
        if (existing == null) return null;
        existing.Status = status;
        var updated = await _bookings.Update(existing);
        return updated == null ? null : ToDto(updated);
    }

    public Task<bool> Delete(int id) => _bookings.Delete(id);

    private static BookingDTOResponse ToDto(Booking booking) => new()
    {
        Id = booking.Id,
        UserId = booking.UserId,
        ShowtimeId = booking.ShowtimeId,
        TotalPrice = booking.TotalPrice,
        Status = booking.Status,
        CreatedAt = booking.CreatedAt,
        Seats = booking.Seats.Select(s => new BookingSeatDTO
        {
            Row = s.Row,
            Number = s.Number,
            Price = s.Price
        }).ToList()
    };
}

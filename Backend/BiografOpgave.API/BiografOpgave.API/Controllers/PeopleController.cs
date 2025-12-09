using BiografOpgave.Application.DTOs;

[ApiController]
[Route("api/[controller]")]
public class PeopleController : ControllerBase
{
    private readonly IPersonService _service;

    public PeopleController(IPersonService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<PersonDTOResponse>>> GetAll()
        => Ok(await _service.GetAll());

    [HttpGet("{id:int}")]
    public async Task<ActionResult<PersonDTOResponse>> Get(int id)
    {
        var person = await _service.GetById(id);
        if (person == null) return NotFound();
        return Ok(person);
    }

    [HttpPost]
    public async Task<ActionResult<PersonDTOResponse>> Create(PersonDTORequest dto)
    {
        var created = await _service.Create(dto);
        return CreatedAtAction(nameof(Get), new { id = created.Id }, created);
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<PersonDTOResponse>> Update(int id, PersonDTORequest dto)
    {
        if (id != dto.Id) return BadRequest();
        var updated = await _service.Update(dto);
        if (updated == null) return NotFound();
        return Ok(updated);
    }

}

using BiografOpgave.API.Controllers;
using BiografOpgave.Application.DTOs;
using BiografOpgave.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace BiografOpgave.Test;

public class PeopleControllerTests
{
    private static PeopleController CreateController(Mock<IPersonService> serviceMock)
        => new(serviceMock.Object);

    [Fact]
    public async Task GetAll_ReturnsOkWithPeople()
    {
        var people = new List<PersonDTOResponse>
        {
            new() { Id = 1, Name = "John", Mail = "john@example.com" },
            new() { Id = 2, Name = "Jane", Mail = "jane@example.com" }
        };
        var serviceMock = new Mock<IPersonService>();
        serviceMock.Setup(s => s.GetAll()).ReturnsAsync(people);

        var controller = CreateController(serviceMock);

        var result = await controller.GetAll();

        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        Assert.Same(people, okResult.Value);
    }

    [Fact]
    public async Task Get_WhenNotFound_ReturnsNotFound()
    {
        var serviceMock = new Mock<IPersonService>();
        serviceMock.Setup(s => s.GetById(42)).ReturnsAsync((PersonDTOResponse?)null);
        var controller = CreateController(serviceMock);

        var result = await controller.Get(42);

        Assert.IsType<NotFoundResult>(result.Result);
    }

    [Fact]
    public async Task Get_WhenFound_ReturnsOkWithPerson()
    {
        var expected = new PersonDTOResponse { Id = 5, Name = "Alice", Mail = "alice@example.com" };
        var serviceMock = new Mock<IPersonService>();
        serviceMock.Setup(s => s.GetById(expected.Id)).ReturnsAsync(expected);
        var controller = CreateController(serviceMock);

        var result = await controller.Get(expected.Id);

        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var person = Assert.IsType<PersonDTOResponse>(okResult.Value);
        Assert.Equal(expected.Id, person.Id);
        Assert.Equal(expected.Name, person.Name);
        Assert.Equal(expected.Mail, person.Mail);
    }

    [Fact]
    public async Task Create_ReturnsCreatedAtAction()
    {
        var request = new PersonDTORequest { Name = "Bob", Lastname = "Smith", Mail = "bob@example.com", Id = 0 };
        var created = new PersonDTOResponse { Id = 10, Name = request.Name!, Mail = request.Mail! };
        var serviceMock = new Mock<IPersonService>();
        serviceMock.Setup(s => s.Create(request)).ReturnsAsync(created);
        var controller = CreateController(serviceMock);

        var result = await controller.Create(request);

        var createdResult = Assert.IsType<CreatedAtActionResult>(result.Result);
        Assert.Equal(nameof(PeopleController.Get), createdResult.ActionName);
        Assert.Equal(created.Id, createdResult.RouteValues?["id"]);
        Assert.Same(created, createdResult.Value);
    }

    [Fact]
    public async Task Update_WhenIdMismatch_ReturnsBadRequestAndSkipsService()
    {
        var dto = new PersonDTORequest { Id = 1, Name = "Mismatch" };
        var serviceMock = new Mock<IPersonService>();
        var controller = CreateController(serviceMock);

        var result = await controller.Update(2, dto);

        Assert.IsType<BadRequestResult>(result.Result);
        serviceMock.Verify(s => s.Update(It.IsAny<PersonDTORequest>()), Times.Never);
    }

    [Fact]
    public async Task Update_WhenServiceReturnsNull_ReturnsNotFound()
    {
        var dto = new PersonDTORequest { Id = 3, Name = "Ghost" };
        var serviceMock = new Mock<IPersonService>();
        serviceMock.Setup(s => s.Update(dto)).ReturnsAsync((PersonDTOResponse?)null);
        var controller = CreateController(serviceMock);

        var result = await controller.Update(dto.Id, dto);

        Assert.IsType<NotFoundResult>(result.Result);
    }

    [Fact]
    public async Task Update_WhenSuccessful_ReturnsOkWithPerson()
    {
        var dto = new PersonDTORequest { Id = 4, Name = "Updated", Lastname = "User", Mail = "updated@example.com" };
        var updated = new PersonDTOResponse { Id = dto.Id, Name = dto.Name!, Mail = dto.Mail! };
        var serviceMock = new Mock<IPersonService>();
        serviceMock.Setup(s => s.Update(dto)).ReturnsAsync(updated);
        var controller = CreateController(serviceMock);

        var result = await controller.Update(dto.Id, dto);

        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var person = Assert.IsType<PersonDTOResponse>(okResult.Value);
        Assert.Equal(updated.Id, person.Id);
        Assert.Equal(updated.Name, person.Name);
        Assert.Equal(updated.Mail, person.Mail);
    }
}

using Contexts;
using Microsoft.AspNetCore.Mvc;
using Models;
using Services.Abstract;

namespace Api;

[ApiController]
[Route("api/[controller]")]
public class MeasurementController : ControllerBase
{
    private readonly SensorContext _sensorContext;
    private readonly IMeasurementService _measurementService;

    public MeasurementController(SensorContext sensorContext, IMeasurementService measurementService) 
    {
        _sensorContext = sensorContext;
        _measurementService = measurementService;
    }

    [HttpGet]
    [Route("GetMeasurements")]
    public List<Measurement> GetMeasurements() 
    {
        return _measurementService.GetMeasurements();
    }

    [HttpPost]
    [Route("AddMeasurement")]
    public async Task<IActionResult> AddMeasurement([FromBody]Measurement measurement) 
    {
        var success = await _measurementService.AddMeasurement(measurement);
        return success ? Ok() : NotFound();
    }
}

using Microsoft.AspNetCore.Mvc;
using Models;
using Services.Abstract;

namespace Api;

[ApiController]
[Route("api/[controller]")]
public class SensorController : ControllerBase
{
    private readonly ISensorService _sensorService;

    public SensorController(ISensorService sensorService) 
    {
        _sensorService = sensorService;
    }

    [HttpGet]
    [Route("GetSensors")]
    public List<Sensor> GetSensors() 
    {
        return _sensorService.GetSensors();
    }

    [HttpGet]
    [Route("GetSensor")]
    public Sensor? GetSensor(int sensorId) 
    {
        return _sensorService.GetSensor(sensorId);
    }

    [HttpPost]
    [Route("AddSensor")]
    public async Task<IActionResult> AddSensor([FromBody]Sensor sensor) 
    {
        await _sensorService.AddSensor(sensor);
        return Ok();
    }

    [HttpPut]
    [Route("UpdateSensor")]
    public async Task<IActionResult> UpdateSensor([FromBody]Sensor sensorData) 
    {
        var success = await _sensorService.UpdateSensor(sensorData);
        return success ? Ok() : NotFound();
    }

    [HttpDelete]
    [Route("DeleteSensor")]
    public async Task<IActionResult> DeleteSensor(int sensorId) 
    {
        var success = await _sensorService.DeleteSensor(sensorId);
        return success ? Ok() : NotFound();
    }
}

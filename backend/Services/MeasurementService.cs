using Contexts;
using Models;
using Services.Abstract;

namespace Services;

public class MeasurementService : IMeasurementService
{
    private readonly SensorContext _sensorContext;

    public MeasurementService(SensorContext sensorContext) 
    {
        _sensorContext = sensorContext;
    }

    public List<Measurement> GetMeasurements() 
    {
        return _sensorContext.Measurements.ToList();
    }

    public async Task<bool> AddMeasurement(Measurement measurement)
    {
        if (!_sensorContext.Sensors.Where(x => x.Id == measurement.SensorId).Any()) 
        {
            return false;
        }

        // Npgsql only accepts UTC kind, for some reason the default is Unspecified.
        measurement.Timestamp = DateTime.SpecifyKind(measurement.Timestamp, DateTimeKind.Utc);

        _sensorContext.Measurements.Add(measurement);

        var sensor = _sensorContext.Sensors.Where(x => x.Id == measurement.SensorId).First();
        sensor.Measurements.Add(measurement);
        _sensorContext.Update<Sensor>(sensor);
        
        await _sensorContext.SaveChangesAsync();

        return true;
    }
}

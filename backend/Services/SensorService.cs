using Contexts;
using Microsoft.EntityFrameworkCore;
using Models;
using Services.Abstract;

namespace Services;

public class SensorService : ISensorService
{
    private readonly SensorContext _sensorContext;

    public SensorService(SensorContext sensorContext) 
    {
        _sensorContext = sensorContext;
    }

    public List<Sensor> GetSensors() 
    {
        var sensors = _sensorContext.Sensors.Include(x => x.Measurements).ToList();

        return sensors;
    }

    public Sensor? GetSensor(int id) 
    {
        var sensor = _sensorContext.Sensors.SingleOrDefault(x => x.Id == id);

        return sensor;
    }

    public async Task AddSensor(Sensor sensor)
    {
        _sensorContext.Sensors.Add(sensor);
        await _sensorContext.SaveChangesAsync();
    }

    public async Task<bool> DeleteSensor(int id)
    {
        var sensor = _sensorContext.Sensors.Find(id);

        if (sensor == null)  
            return false;

        _sensorContext.Sensors.Remove(sensor);

        await _sensorContext.SaveChangesAsync();

        return true;
    }

    public async Task<bool> UpdateSensor(Sensor sensorData)
    {
        var sensor = _sensorContext.Sensors.SingleOrDefault(x => x.Id == sensorData.Id);

        if (sensor == null) 
            return false;
        

        sensor.Model = sensorData.Model;
        sensor.Location = sensorData.Location;
        sensor.Indoor = sensorData.Indoor;

        await _sensorContext.SaveChangesAsync();

        return true;        
    }
}

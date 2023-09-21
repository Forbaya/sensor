using Models;

namespace Services.Abstract;

public interface ISensorService 
{
    List<Sensor> GetSensors();
    Sensor? GetSensor(int id);
    Task AddSensor(Sensor sensor);
    Task<bool> UpdateSensor(Sensor sensorData);
    Task<bool> DeleteSensor(int id);
}

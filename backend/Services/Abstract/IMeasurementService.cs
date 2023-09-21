using Models;

namespace Services.Abstract;

public interface IMeasurementService 
{
    List<Measurement> GetMeasurements();
    Task<bool> AddMeasurement(Measurement measurement);
}

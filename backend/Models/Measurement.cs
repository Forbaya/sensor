namespace Models;

public class Measurement
{
    public int Id { get;set; }
    public int SensorId { get;set; }
    public Sensor Sensor {get;set;}
    public DateTime Timestamp { get;set; }
    public double Temperature { get;set; }
}

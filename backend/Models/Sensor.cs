namespace Models;

public class Sensor 
{
    public int Id { get;set; }
    public string? Location { get;set; }
    public string? Model { get;set; }
    public bool Indoor { get;set; }
    public List<Measurement> Measurements { get;set; } = new List<Measurement>();
}

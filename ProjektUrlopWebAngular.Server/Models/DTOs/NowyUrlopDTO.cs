namespace ProjektUrlopWebAngular.Server.Models.DTOs
{
    public class NowyUrlopDTO
    {
        public DateTime DataRozp { get; set; }
        public DateTime DataZak { get; set; }
        public string Rodzaj { get; set; } = null!;
    }
}

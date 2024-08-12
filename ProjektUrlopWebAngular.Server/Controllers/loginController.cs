using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NLog;
using ProjektUrlopWebAngular.Server.Data;
using ProjektUrlopWebAngular.Server.Models.DTOs;
using ProjektUrlopWebAngular.Server.Models.Entities;
using ProjektUrlopWebAngular.Server.TokenJwt;

namespace ProjektUrlopWebAngular.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class loginController : ControllerBase
    {
        private readonly Logger logger = LogManager.GetCurrentClassLogger();
        private readonly AppDbContext context;
        private readonly TokenService tokenService;
        public loginController(AppDbContext context, TokenService tokenService)
        {
            this.context = context;
            this.tokenService = tokenService;
        }
        [HttpPost]
        public IActionResult Login(LoginDTO loginDto)
        {
            try
            {
                if (loginDto == null || string.IsNullOrEmpty(loginDto.Email) || string.IsNullOrEmpty(loginDto.Haslo))
                {
                    return BadRequest("Nieprawidłowe dane wejściowe");
                }
                var user = context.Pracownicy.Where(p => p.Email == loginDto.Email && p.Haslo == loginDto.Haslo).FirstOrDefault();
                if (user != null && user.IsArch == false)
                {
                    var log = new Log()
                    {
                        Pracownik = user,
                        Data = DateTime.Now
                    };
                    /*
                    var ostatniLogin = context.Logi.Where(l => l.Pracownik.Id_num == user.Id_num).LastOrDefault();
                    if (ostatniLogin != null)
                    {
                        if (IsDateWithinRange(user.DataZatr, ostatniLogin.Data, DateTime.Now))
                        {
                            user.DniUrlopu += 10;
                            context.SaveChanges();
                        }
                    }
                    */
                    context.Add(log);
                    context.SaveChanges();
                    var wnioskiUrlop = context.Urlopy.Where(u => u.DataRozp <= DateTime.Now && !u.IsAppr).ToList();
                    if (wnioskiUrlop != null)
                    {
                        foreach (var wniosek in wnioskiUrlop)
                        {
                            context.Urlopy.Remove(wniosek);
                        }
                        context.SaveChanges();
                    }
                    var token = tokenService.GenerateToken(user);

                    return Ok(new { token, isAdmin = user.IsAdmin, id = user.Id });
                }
                else
                {
                    return Unauthorized("Niepoprawny email lub hasło");
                }
            }
            catch (Exception ex)
            {
                logger.Error(ex.Message);
                return BadRequest("Błąd logowania");
            }
        }
        private bool IsDateWithinRange(DateTime dataZatr, DateTime dataOstLog, DateTime dataTeraz)
        {
            try
            {
                DateTime zmienionaDataZatr = new DateTime(1, dataZatr.Month, dataZatr.Day);
                DateTime zmienionaDataOstLog = new DateTime(1, dataOstLog.Month, dataOstLog.Day);
                DateTime zmienionaDataTeraz = new DateTime(1, dataTeraz.Month, dataTeraz.Day);

                if (zmienionaDataZatr >= zmienionaDataOstLog && zmienionaDataZatr <= zmienionaDataTeraz)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch
            {
                return false;
            }
        }
    }
}

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NLog;
using ProjektUrlopWebAngular.Server.Data;
using ProjektUrlopWebAngular.Server.Models.DTOs;
using ProjektUrlopWebAngular.Server.Models.Entities;
using ProjektUrlopWebAngular.Server.TokenJwt;

namespace ProjektUrlopWebAngular.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [Authorize(Policy = IdentityData.AdminUserPolicyName)]
    public class adminController : ControllerBase
    {
        private readonly Logger logger = LogManager.GetCurrentClassLogger();
        private readonly AppDbContext context;
        public adminController(AppDbContext context)
        {
            this.context = context;
        }

        [HttpGet]
        [Route("historiaurlopow")]
        public IActionResult GetHistory()
        {
            try
            {
                var urlopy = context.Urlopy.Include(u => u.Pracownik).Where(u => u.IsAppr == true).ToList();
                return Ok(urlopy);
            }
            catch (Exception ex)
            {
                logger.Error(ex.Message);
                return BadRequest("Błąd przy pobieraniu historii.");
            }
        }
        [HttpGet]
        [Route("wnioskiourlop")]
        public IActionResult GetWnioski()
        {
            try
            {
                var urlopy = context.Urlopy.Include(u => u.Pracownik).Where(u => u.IsAppr == false).ToList();
                return Ok(urlopy);
            }
            catch (Exception ex)
            {
                logger.Error(ex.Message);
                return BadRequest("Błąd przy pobieraniu wniosków.");
            }
        }

        [HttpPost]
        [Route("dodajpracownika")]
        public IActionResult AddPracownik(NowyPracownikDTO addPracownikDto)
        {
            try
            {
                var pracownik = new Pracownik()
                {
                    Id = Guid.NewGuid(),
                    Imie = addPracownikDto.Imie,
                    Nazwisko = addPracownikDto.Nazwisko,
                    Email = addPracownikDto.Email,
                    Haslo = addPracownikDto.Haslo,
                    IsAdmin = addPracownikDto.IsAdmin,
                    IsArch = false,
                    DataZatr = addPracownikDto.DataZatr,
                    DniUrlopu = addPracownikDto.DniUrlopu
                };
                context.Pracownicy.Add(pracownik);
                context.SaveChanges();
                return Ok(pracownik);
            }
            catch (Exception ex)
            {
                logger.Error(ex.Message);
                return BadRequest("Błąd podczas dodawania nowego pracownika.");
            }
        }

        [HttpGet]
        [Route("pracownicy")]
        public IActionResult GetPracownicy()
        {
            try
            {
                var pracownicy = context.Pracownicy.Where(p => p.IsArch == false).ToList();
                return Ok(pracownicy);
            }
            catch (Exception ex)
            {
                logger.Error(ex.Message);
                return BadRequest("Błąd przy pobieraniu listy pracowników.");
            }
        }
        [HttpPut]
        [Route("pracownicy/usun/{id:guid}")]
        public IActionResult UpdatePracownik([FromRoute] Guid id)
        {
            try
            {
                var pracownik = context.Pracownicy.Where(p => p.Id == id).FirstOrDefault();
                if (pracownik != null)
                {
                    pracownik.IsArch = true;
                    context.SaveChanges();
                    return Ok(pracownik);
                }
                else
                {
                    return NotFound("Brak pracownika o podanym ID.");
                }
            }
            catch (Exception ex)
            {
                logger.Error(ex.Message);
                return NotFound("Błąd podczas archiwizowania pracownika.");
            }
        }
        [HttpPut]
        [Route("urlopy/akceptuj/{id:guid}")]
        public IActionResult AkceptujUrlop(Guid id)
        {
            try
            {
                var urlop = context.Urlopy.Where(p => p.Id == id && p.IsAppr == false).FirstOrDefault();
                if (urlop != null)
                {
                    urlop.IsAppr = true;
                    context.SaveChanges();
                    return Ok(urlop);
                }
                else
                {
                    return NotFound("Brak  wniosku o urlop.");
                }
            }
            catch (Exception ex)
            {
                logger.Error(ex.Message);
                return NotFound("Błąd podczas akceptacji wniosku o urlop.");
            }
        }
    }
}

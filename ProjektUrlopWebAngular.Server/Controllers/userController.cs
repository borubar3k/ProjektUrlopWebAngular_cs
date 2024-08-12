using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NLog;
using ProjektUrlopWebAngular.Server.Data;
using ProjektUrlopWebAngular.Server.Models.DTOs;
using ProjektUrlopWebAngular.Server.Models.Entities;

namespace ProjektUrlopWebAngular.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [Authorize]

    public class userController : ControllerBase
    {
        private readonly Logger logger = LogManager.GetCurrentClassLogger();
        private readonly AppDbContext context;
        public userController(AppDbContext context)
        {
            this.context = context;
        }

        [HttpGet]
        [Route("twojahistoria/{id:guid}")]
        public IActionResult GetHistory([FromRoute] Guid id)
        {
            try
            {
                var urlopy = context.Urlopy.Where(p => p.Pracownik.Id == id && p.IsAppr == true).ToList();
                if (urlopy == null)
                {
                    return NotFound();
                }
                else
                {
                    return Ok(urlopy);
                }
            }
            catch (Exception ex)
            {
                logger.Error(ex.Message);
                return BadRequest("Błąd przy pobieraniu historii.");
            }
        }
        [HttpGet]
        [Route("wezurlop/{id:guid}")]
        public IActionResult GetDni([FromRoute] Guid id)
        {
            try
            {
                var dniUrl = context.Pracownicy.Where(p => p.Id == id).Select(p => p.DniUrlopu).FirstOrDefault();
                return Ok(dniUrl);
            }
            catch (Exception ex)
            {
                logger.Error(ex.Message);
                return BadRequest("Błąd przy pobieraniu liczby wolnych dni.");
            }
        }
        [HttpPost]
        [Route("wezurlop/{id:guid}")]
        public IActionResult AddUrlop([FromBody] NowyUrlopDTO addUrlopDto, [FromRoute] Guid id)
        {
            try
            {
                // Znajdź pracownika
                var pracownik = context.Pracownicy.FirstOrDefault(p => p.Id == id);
                if (pracownik == null)
                {
                    return BadRequest("Nie znaleziono pracownika.");
                }

                // Oblicz liczbę dni urlopu
                int roznica = (addUrlopDto.DataZak - addUrlopDto.DataRozp).Days + 1;
                if (roznica <= 0 || roznica > pracownik.DniUrlopu || addUrlopDto.DataRozp > addUrlopDto.DataZak)
                {
                    return BadRequest("Nieprawidłowa liczba dni.");
                }

                // Sprawdź, czy istnieje już urlop w tym okresie
                var istniejąceUrlopy = context.Urlopy
                    .Where(u => u.Pracownik.Id == id &&
                                ((addUrlopDto.DataRozp >= u.DataRozp && addUrlopDto.DataRozp <= u.DataZak) ||
                                 (addUrlopDto.DataZak >= u.DataRozp && addUrlopDto.DataZak <= u.DataZak) ||
                                 (addUrlopDto.DataRozp <= u.DataRozp && addUrlopDto.DataZak >= u.DataZak)))
                    .Any();

                if (istniejąceUrlopy)
                {
                    return BadRequest("Urlop w tym okresie już istnieje.");
                }

                // Dodaj nowy urlop
                var urlop = new Urlop()
                {
                    Id = Guid.NewGuid(),
                    Pracownik = pracownik,
                    DataRozp = addUrlopDto.DataRozp,
                    DataZak = addUrlopDto.DataZak,
                    IloscDni = roznica,
                    Rodzaj = addUrlopDto.Rodzaj
                };
                pracownik.DniUrlopu -= roznica;

                context.Urlopy.Add(urlop);
                context.SaveChanges();

                return Ok(urlop);
            }
            catch (Exception ex)
            {
                logger.Error(ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("twojedane/{id:guid}")]
        public IActionResult GetPracownikById([FromRoute] Guid id)
        {
            try
            {
                var dane = context.Pracownicy.Where(p => p.Id == id).FirstOrDefault();
                if (dane == null)
                {
                    return NotFound();
                }
                else
                {
                    return Ok(dane);
                }
            }
            catch (Exception ex)
            {
                logger.Error(ex.Message);
                return BadRequest("Błąd przy pobieraniu danych.");
            }

        }
    }
}

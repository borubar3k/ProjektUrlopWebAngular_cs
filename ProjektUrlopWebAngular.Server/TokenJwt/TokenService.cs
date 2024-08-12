using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using ProjektUrlopWebAngular.Server.Models.Entities;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ProjektUrlopWebAngular.Server.TokenJwt
{
    public class TokenService
    {
        private readonly TokenDTO tokenDto;

        public TokenService(IOptions<TokenDTO> jwtSettings)
        {
            tokenDto = jwtSettings.Value;
        }

        public string GenerateToken(Pracownik pracownik)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(tokenDto.Key);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                new Claim(ClaimTypes.NameIdentifier, pracownik.Id.ToString()),
                new Claim(ClaimTypes.Role, pracownik.IsAdmin ? "Admin" : "User"),
                new Claim(IdentityData.AdminUserClaimName, pracownik.IsAdmin.ToString().ToLower())
            }),
                Expires = DateTime.UtcNow.AddMinutes(tokenDto.ExpiresInMinutes),
                Issuer = tokenDto.Issuer,
                Audience = tokenDto.Audience,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}

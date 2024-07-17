using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController: BaseApiController
    {
        private readonly DataContext _db;
        private readonly ITokenService _token; 
        public AccountController(DataContext db, ITokenService token)
        {
            _db = db;
            _token = token;
            
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if(await UserExists(registerDto.UserName)) return BadRequest("Username is Taken!");

            using var hmac = new HMACSHA512();
            var user = new AppUser{
                UserName = registerDto.UserName.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmac.Key
            };
            _db.Users.Add(user);
            await _db.SaveChangesAsync();
            return new UserDto{
                UserName = user.UserName,
                Token = _token.CreateToken(user)
            };
        }
        

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _db.Users.SingleOrDefaultAsync(x => x.UserName == loginDto.UserName.ToLower());
            if(user == null) return Unauthorized("Invalid Username!");

            using var hmac = new HMACSHA512(user.PasswordSalt);
            var computeHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

            for(int i=0 ; i <computeHash.Length; i++){
                if(computeHash[i] != user.PasswordHash[i]){
                    return Unauthorized("Invalid Password!");
                }
            }
            
            return new UserDto {
                UserName = user.UserName,
                Token = _token.CreateToken(user)
            };
            
        }


        private async Task<bool> UserExists(string username)
        {
            return await _db.Users.AnyAsync(x => x.UserName == username.ToLower());
        }
        
    }
}
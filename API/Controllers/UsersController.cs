
using System.Collections.Generic;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    
    public class UsersController: BaseApiController
    {
        private readonly DataContext _db;
        public UsersController(DataContext db)
        {
            _db = db;
        }

       
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
        {
            return await _db.Users.ToListAsync();
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task <ActionResult<AppUser>> GetUser(int id)
        {
            return await _db.Users.FindAsync(id);
        }

    }
}
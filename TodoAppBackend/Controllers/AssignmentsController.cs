using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoAppBackend.Data;
using TodoAppBackend.DTOs;
using TodoAppBackend.enums;
using TodoAppBackend.Models;

namespace TodoAppBackend.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class AssignmentsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AssignmentsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AssignmentDto>>> GetAssignments()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);

            var assignments = await _context.Assignments
                .Where(a => a.UserId == userId)
                .Select(a => new AssignmentDto
                {
                    Id = a.Id,
                    Name = a.Name,
                    Description = a.Description,
                    Status = a.Status
                })
                .ToListAsync();

            return assignments;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AssignmentDto>> GetAssignment(int id)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);

            var assignment = await _context.Assignments
                .Where(a => a.Id == id && a.UserId == userId)
                .Select(a => new AssignmentDto
                {
                    Id = a.Id,
                    Name = a.Name,
                    Description = a.Description,
                    Status = a.Status
                })
                .FirstOrDefaultAsync();

            if (assignment == null)
            {
                return NotFound();
            }

            return assignment;
        }

        [HttpGet("user/{userId}")]
        [Authorize(Roles = nameof(UserRole.User))]
        public async Task<ActionResult<IEnumerable<AssignmentDto>>> GetAssignmentsByUserId(int userId)
        {
            var assignments = await _context.Assignments
                .Where(a => a.UserId == userId)
                .Select(a => new AssignmentDto
                {
                    Id = a.Id,
                    Name = a.Name,
                    Description = a.Description,
                    Status = a.Status
                })
                .ToListAsync();

            return assignments;
        }

        [HttpPost]
        [Authorize(Roles = nameof(UserRole.User))]
        public async Task<ActionResult<AssignmentDto>> CreateAssignment(CreateAssignmentDto createAssignmentDto)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);

            var assignment = new Assignment
            {
                Name = createAssignmentDto.Name,
                Description = createAssignmentDto.Description,
                Status = createAssignmentDto.Status,
                UserId = userId
            };

            _context.Assignments.Add(assignment);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAssignment), new { id = assignment.Id }, new AssignmentDto
            {
                Id = assignment.Id,
                Name = assignment.Name,
                Description = assignment.Description,
                Status = assignment.Status
            });
        }

        [HttpPut("{id}")]
        [Authorize(Roles = nameof(UserRole.User))]
        public async Task<IActionResult> UpdateAssignment(int id, UpdateAssignmentDto updateAssignmentDto)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);

            var assignment = await _context.Assignments
                .FirstOrDefaultAsync(a => a.Id == id && a.UserId == userId);

            if (assignment == null)
            {
                return NotFound();
            }

            assignment.Name = updateAssignmentDto.Name;
            assignment.Description = updateAssignmentDto.Description;
            assignment.Status = updateAssignmentDto.Status;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = nameof(UserRole.User))]
        public async Task<IActionResult> DeleteAssignment(int id)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);

            var assignment = await _context.Assignments
                .FirstOrDefaultAsync(a => a.Id == id && a.UserId == userId);

            if (assignment == null)
            {
                return NotFound();
            }

            _context.Assignments.Remove(assignment);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
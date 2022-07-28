using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Data;
using API.Models;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProductsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Products
        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
          if (_context.Products == null)
          {
              return NotFound();
          }
            return await _context.Products.Include(f=>f.Categories).ThenInclude(g=>g.Category).ToListAsync();
        }

        // GET: api/Products/5
        [HttpGet("Get/{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
          if (_context.Products == null)
          {
              return NotFound();
          }
            var product = await _context.Products.Include(f => f.Categories).ThenInclude(g => g.Category).FirstOrDefaultAsync(f=>f.ID==id);

            if (product == null)
            {
                return NotFound();
            }

            return product;
        }

        // PUT: api/Products/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("Edit/{id}")]
        public async Task<IActionResult> PutProduct(int id, ProductVM product)
        {
            if (id != product.Product.ID)
            {
                return BadRequest();
            }

            List<int> cats = await _context.Product_Category.Where(f => f.ProductID == product.Product.ID).Select(f => f.CategoryID).ToListAsync();
            List<int> not=new List<int>();
            foreach (var c in product.Categories)
            {
                if(!cats.Contains(c))
                {
                    _context.Product_Category.Remove(await _context.Product_Category.FirstOrDefaultAsync(f=>f.CategoryID==c));
                }
                else
                {
                    not.Add(c);
                }
            }

            foreach (var c in product.Categories)
            {
                if (!not.Contains(c))
                {
                    ProductCategory category=new ProductCategory()
                    {
                        CategoryID=c,
                        ProductID=id
                    };
                    await _context.Product_Category.AddAsync(category);
                }
            }
            try
            {
                await _context.SaveChangesAsync();
                _context.Products.Update(product.Product);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Products
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("Create")]
        public async Task<ActionResult<Product>> PostProduct(ProductVM product)
        {
          if (_context.Products == null)
          {
              return Problem("Entity set 'ApplicationDbContext.Products'  is null.");
          }
            _context.Products.Add(product.Product);
            await _context.SaveChangesAsync();

            foreach (var c in product.Categories)
            {

                ProductCategory category = new ProductCategory()
                {
                    CategoryID = c,
                    ProductID = product.Product.ID
                    };
                    await _context.Product_Category.AddAsync(category);

            }
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProduct", new { id = product.Product.ID }, product.Product);
        }

        // DELETE: api/Products/5
        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            if (_context.Products == null)
            {
                return NotFound();
            }
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductExists(int id)
        {
            return (_context.Products?.Any(e => e.ID == id)).GetValueOrDefault();
        }
    }
}

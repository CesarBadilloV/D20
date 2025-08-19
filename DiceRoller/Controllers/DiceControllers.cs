using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DiceRoller.Models;
using Microsoft.AspNetCore.Cors;


namespace DiceRoller.Controllers
{
    public class DiceControllers : Controller
    {

        [HttpGet("{sides}")]
        public IActionResult RollDice(int sides)
        {
            if (sides < 2)
                return BadRequest("Los dados deben tener al menos 2 caras y tirar al menos 1 vez");
            var dice = new Dice(sides);
            var results = dice.Roll();
            return Ok(new {result = results});
        }

      

        // GET: DiceControllers
        public ActionResult Index()
        {
            return View();
        }

        // GET: DiceControllers/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: DiceControllers/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: DiceControllers/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: DiceControllers/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: DiceControllers/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: DiceControllers/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: DiceControllers/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
    }
}

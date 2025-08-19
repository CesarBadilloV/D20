namespace DiceRoller.Models
{
    public class Dice
    {
        public int Sides { get; set; }

        public Dice(int sides, int amount = 1)
        {
            Sides = sides;
        }

        public List<int> Roll()
        {
            Random random = new Random();
            var results = new List<int>();
            results.Add(random.Next(1, Sides + 1));
            return results;
        }
    }
}

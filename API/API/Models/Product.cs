namespace API.Models
{
    public class Product
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public int qty { get; set; }
        public string Desc { get; set; }
        public ICollection<ProductCategory>? Categories { get; set; }

    }
}

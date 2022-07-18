namespace API.Models
{
    public class Category
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Desc { get; set; }
        public ICollection<ProductCategory>? Products { get; set; }
    }
}

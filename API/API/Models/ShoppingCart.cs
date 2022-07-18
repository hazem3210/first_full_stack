namespace API.Models
{
    public class ShoppingCart
    {
        public int ID { get; set; }
        public int CustomerID { get; set; }
        public int qty { get; set; }
        public double TotalPrice { get; set; }
        public int ProductID { get; set; }
        public Customer? Customer { get; set; }
        public Product? Product { get; set; }



    }
}

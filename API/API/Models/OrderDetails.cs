using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    public class OrderDetails
    {
        public int ID { get; set; }
        public int CustomerID { get; set; }
        public int ProductID { get; set; }
        public int OrderID { get; set; }
        public int qty { get; set; }
        public double TotalPrice { get; set; }
        public Customer? Customer { get; set; }
        public Product? Product { get; set; }
        [ForeignKey("OrderID")]
        public OrderHeader? Order { get; set; }

    }
}

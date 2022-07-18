namespace API.Models
{
    public class OrderHeader
    {
        public int ID { get; set; } 
        public string Address { get; set; }
        public string PaymentStatus { get; set; }
        public string Status { get; set; }
        public ICollection<OrderDetails>? Products { get; set; }

    }
}

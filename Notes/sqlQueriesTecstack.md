### Hotel_info

select concat(hotel_name," is a ", hotel_type," hotel") as HOTEL_INFO from hotel_details
order by HOTEL_INFO desc;

### Hotel that took order based on month

select distinct h.hotel_id, h.hotel_name, h.rating from hotel_details h join
orders o on h.hotel_id=o.hotel_id
where month(o.order_date)=7
order by h.hotel_id;

### Rentals based on date

select rental_id, car_id, customer_id, km_driven from rentals
where extract(month from pickup_date)=8 and extract(year from pickup_date)=2019;

### Customer using hdfc bank

select distinct u.name,u.address from users u right join bookingdetails b
on u.user_id=b.user_id where b.user_id not in(select user_id from bookingdetails where name="HDFC")
order by u.name;

### Password Generation

select name,concat(substring(name,1,3),substring(phno,1,3)) as PASSWORD FROM users
order by name;

### concatenation details

select concat(address,",", city) as Address from student
order by Address desc;

### student and their department

select s.student_name, d.department_name from student s join department d on 
s.department_id=d.department_id
where s.city="Coimbatore"
order by s.student_name
;













public class Solution {
    public int LastStoneWeight(int[] stones) {
        if(stones.Length==2)
            return Math.Abs(stones[1]-stones[0]);
        
        if(stones.Length == 1)
            return stones[0];
        
        Array.Sort(stones);
        Stack<int> s1 = new Stack<int>(stones);
        Stack<int> s2 = new Stack<int>();
        
        s2.Push(0);
        
        int temp1, temp2;
        while(s1.Count!=0)
        {
            if(s1.Peek() >= s2.Peek())
                temp1 = s1.Pop();
            else{
                s1.Pop();
                temp1 = s2.Peek();                
            }
                
            
            if(s1.Peek() >= s2.Peek())
                temp2 = s1.Pop();
            else{
                s1.Pop();
                temp2 = s2.Peek();
            }
            
            if((temp1-temp2)!=0)
            s2.Push(Math.Abs(temp1-temp2));
            
            Console.WriteLine(s2.Peek());
       }
        
        return s2.Peek();
      
        
    }
}
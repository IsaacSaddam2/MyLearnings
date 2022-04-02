### Notes

if 10^9 then use long

- Response.Write(string.Format("Test: {0}", i.ToString("00")));

- Console.WriteLine("{0:n6}\n{1:n6}\n{2:n6}",pos/count,neg/count,zero/count);

- include delimiter in split c# 

string input = "plumPear";
string pattern = "([A-Z])";

string[] substrings = Regex.Split(input, pattern);    // Split on hyphens
foreach (string match in substrings)
{
   Console.WriteLine("'{0}'", match);
}

## To Read Line Until null

using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using System.IO;
class Solution {
    static void Main(String[] args) {
        /* Enter your code here. Read input from STDIN. Print output to STDOUT. Your class should be named Solution */

      while(true)
      {
          string line = Console.ReadLine();
          
          if(line!=null)            
          Console.WriteLine(line);
          else
          break;
          
      }
    }
}



### Encryption

using System.CodeDom.Compiler;
using System.Collections.Generic;
using System.Collections;
using System.ComponentModel;
using System.Diagnostics.CodeAnalysis;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Runtime.Serialization;
using System.Text.RegularExpressions;
using System.Text;
using System;

class Result
{

    /*
     * Complete the 'encryption' function below.
     *
     * The function is expected to return a STRING.
     * The function accepts STRING s as parameter.
     */

    public static string encryption(string s)
    {
        //Hello Saddam
        
        //remove spaces
        s = s.Replace(" ","");
        
        Console.WriteLine(s.Length);
        int rows = (int)Math.Floor(Math.Sqrt(s.Length));
        
        int columns = (int)Math.Ceiling(Math.Sqrt(s.Length));
        
        while(rows*columns < s.Length){
            rows++;
        }

        List<string> slist = Split(s, rows, columns);
        
        slist.ForEach(x=>Console.WriteLine(x));
        
        string result = "";
        
        for(int i=0 ; i< columns ; i++ )
        {
            for( int j=0 ; j < slist.Count ;j++)
            {   if(i < slist[j].Length)
                result = result + slist[j][i];
            }
            
            result = result+ " ";
        }
        
        return result;
    }
    
    static List<string> Split(string str, int rows, int columns)
{
   List<string> result = new List<string>();
   
   int temp =0;
   for(int i= 1; i<rows ; i++)
   {
       result.Add(str.Substring(temp,columns));
       
       temp+=columns;
    
   }
   result.Add(str.Substring(temp)); 
   return result;
   
}
}

class Solution
{
    public static void Main(string[] args)
    {
        TextWriter textWriter = new StreamWriter(@System.Environment.GetEnvironmentVariable("OUTPUT_PATH"), true);

        string s = Console.ReadLine();

        string result = Result.encryption(s);

        textWriter.WriteLine(result);

        textWriter.Flush();
        textWriter.Close();
    }
}

*************** Alternate solution **************
   for(i=0;i<col;i++)
              {
                                for(j=i;j<len;j=j+col)
                                    printf("%c",msg[j]);
                                printf(" ");
              }

--------------------------------------------------------------------------------------------------------------------------------------- 
## cut the sticks

using System.CodeDom.Compiler;
using System.Collections.Generic;
using System.Collections;
using System.ComponentModel;
using System.Diagnostics.CodeAnalysis;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Runtime.Serialization;
using System.Text.RegularExpressions;
using System.Text;
using System;

class Result
{

    /*
     * Complete the 'cutTheSticks' function below.
     *
     * The function is expected to return an INTEGER_ARRAY.
     * The function accepts INTEGER_ARRAY arr as parameter.
     */
    public static int Minimum(List<int> arr)
    {
        int min = int.MaxValue;
        
        for(int i=0;i<arr.Count;i++)
        {
            if(arr[i]!=0)
            {
                if(arr[i]<min)
                    min = arr[i];
            }
        }
        Console.WriteLine(min);
        return min;
    }
    public static List<int> cutTheSticks(List<int> arr)
    {
        List<int> result = new List<int>();
        
        int min;
        while(true)
        {   int count =0; 
            min = Minimum(arr);
            
            if(min == int.MaxValue)
             break;
            for(int i=0 ; i< arr.Count ; i++)
            {
                if(arr[i] >= min){
                    arr[i]-=min;   
                    count++;
                }
            }
            if(count == 0)
                break;
             else
              result.Add(count);   
        }
        return result;
    }

}

class Solution
{
    public static void Main(string[] args)
    {
        TextWriter textWriter = new StreamWriter(@System.Environment.GetEnvironmentVariable("OUTPUT_PATH"), true);

        int n = Convert.ToInt32(Console.ReadLine().Trim());

        List<int> arr = Console.ReadLine().TrimEnd().Split(' ').ToList().Select(arrTemp => Convert.ToInt32(arrTemp)).ToList();

        List<int> result = Result.cutTheSticks(arr);

        textWriter.WriteLine(String.Join("\n", result));

        textWriter.Flush();
        textWriter.Close();
    }
}
----------------------------------------------------------------------------------------------------------------------------------------



##### last stone weight

public class Solution {
    public int LastStoneWeight(int[] stones) {
       
        List<int> list = new List<int>(stones);
        
        list.Sort();
        
        if(list.Count == 1)
            return list[0];
        
        if(list.Count == 2)
            return Math.Abs(list[0]-list[1]);
        
        int temp;
        
        while(list.Count>=2)
        {
            
            temp = list[list.Count-1] - list[list.Count-2];
            list.RemoveAt(list.Count -1);
            list.RemoveAt(list.Count - 1);
            
            
            if(temp!=0)
            {
                 list.Add(temp);
                list.Sort();
            }
               Console.WriteLine(list.Count);
        }
  
        if(list.Count == 0)
            return 0;
        
      return list[0];
        
    }
}

##### Equalize array


 /*
     * Complete the 'equalizeArray' function below.
     *
     * The function is expected to return an INTEGER.
     * The function accepts INTEGER_ARRAY arr as parameter.
     */

    public static int equalizeArray(List<int> arr)
    {
        int[] a =new int[1000];
        
        foreach(var x in arr)
        {
            a[x]++;
        }
        
        int max = -1;
        
        foreach(var x in arr)
        {
            if(a[x]>max)
                max = a[x];
        }
        
        return arr.Count - max;
    }

####  Plus minus

   public static void plusMinus(List<int> arr)
    {
        double pos = 0;
        double neg = 0;
        double zero = 0;
        int count = arr.Count;
        
        foreach(var x in arr)
        {
            if(x>0)
            pos++;
            else if(x<0)
            neg++;
            else
            zero++;
        }
        Console.WriteLine("{0:n6}\n{1:n6}\n{2:n6}",pos/count,neg/count,zero/count);
        
    }

### Min-max sum

   /*
     * Complete the 'miniMaxSum' function below.
     *
     * The function accepts INTEGER_ARRAY arr as parameter.
     */

    public static void miniMaxSum(List<long> arr)
    {
        
        long min = arr.Min();
        long max = arr.Max();
        
        long sum =0;
        
        foreach(var e in arr)
        {
            sum+=e;
        }
        
        Console.WriteLine("{0} {1}",sum-max,sum-min);
    }

}

### Time Conversion

 /*
     * Complete the 'timeConversion' function below.
     *
     * The function is expected to return a STRING.
     * The function accepts STRING s as parameter.
     */

    public static string timeConversion(string s)
    {
        Console.WriteLine(s);
        
        var hours = int.Parse(s.Substring(0,2));
        var min =   int.Parse(s.Substring(3,2));
        var pm = s.Substring(s.Length-2,2);
        var secs = int.Parse(s.Substring(s.Length-4,2));
        
        Console.WriteLine("{0},{1},{2}",hours.ToString("00"),min,secs);
        
        if(hours <12 && pm.Equals("PM"))
            hours+=12;        
        else if(pm.Equals("AM") && hours ==12)
        hours=0;
               
        return string.Format("{0}:{1}:{2}",hours.ToString("00"),min.ToString("00"),secs.ToString("00"));
    }

### Breaking the Records

    /*
     * Complete the 'breakingRecords' function below.
     *
     * The function is expected to return an INTEGER_ARRAY.
     * The function accepts INTEGER_ARRAY scores as parameter.
     */

    public static List<int> breakingRecords(List<int> arr)
    {
        List<int> count = new List<int>();
        count.Add(0);
        count.Add(0);
        
        int max = arr[0];
        int min = arr[0];
        
        foreach(var x in arr)
        {
            if(x>max)
            {                
             max = x;
             count[0]++;
            }
            
            if(x<min)
            {
                min = x;
                count[1]++;
            }
        }
        
        return count;

    }

##### Camel Case

var str = Console.ReadLine().Split(';');
  
        var let1 = str[0];
        var let2 = str[1];
        
        if(let1.Equals("S"))
        {
            var result = Regex.Split(str[2],"([A-Z])");               
            switch(let2)
            {
               case "M":
               var res = "";
                for(int i=0;i<result.Length;i++)
                {
                    if( result[i].Length ==1) 
                   {
                       res+=result[i].ToLower();
                   } 
                   else
        
                   res+= result[i]+ " ";
                    
                }
                
                Console.WriteLine(res.Remove(res.Length-3));              
               break;
               
               case "C":
               res = "";
               for(int i=1; i<result.Length;i++)
               {
                   
                  if( result[i].Length ==1) 
                   {
                       res+=result[i].ToLower();
                   } 
                   else
                   res+= result[i]+ " "; 
               }
               Console.WriteLine(res.Trim());
               break;
               
               case "V":
               res ="";
                for(int i=0;i<result.Length;i++)
                {
                    if( result[i].Length ==1) 
                   {
                       res+=result[i].ToLower();
                       if(i==0)
                       res+=" ";
                   } 
                   else
                   res+= result[i]+ " ";
                    
                }
                
                Console.WriteLine(res.Trim());              
               break;
               
               default: break;
                
            }
        }
        else{
            var res1 = "";
            var result1 = str[2].Split(' ');
            // Console.WriteLine(result1[0]);
            switch(let2)
            {
                case "M":
                 for(int i=0;i<result1.Length;i++)
                 {
                     if(i==0)
                     res1+=result1[i];
                     else{
                         result1[i] = char.ToUpper(result1[i][0])+ result1[i].Substring(1);
                         res1+=result1[i];
                     }
                 }
                 Console.WriteLine(res1+"()");
                     
                break;
                case "V":
                 for(int i=0;i<result1.Length;i++)
                 {
                     if(i==0)
                     res1+=result1[i];
                     else{
                         result1[i] = char.ToUpper(result1[i][0])+ result1[i].Substring(1);
                         res1+=result1[i];
                     }
                 }
                 Console.WriteLine(res1.Trim());
                break;
                case "C":
                for(int i=0;i<result1.Length;i++)
                 {
                    
                    result1[i] = char.ToUpper(result1[i][0])+ result1[i].Substring(1);
                     res1+=result1[i];
                 }
                 Console.WriteLine(res1.Trim());
                break;
                default:
                break;
            }
        }

*********************************************** Week 2 **************************************

### Lonely Integer

  public static int lonelyinteger(List<int> a)
    {
        int[] counts = new int[1000];
        
        foreach(var x in a)
        {
            counts[x]++;
        } 
        foreach(var y in a)
        {
            if(counts[y]==1)
                return y;
        }
        return 0;
    }

}

# in java

 public static int lonelyinteger(List<Integer> a) {
    // Write your code here  
        Integer[] counts = new Integer[1000];
        
        Arrays.fill(counts,0);
        
        for (Integer x : a) {           
            counts[x]++;
        }
        
        for (Integer y : a) {
            if(counts[y]==1)
               return y;
        }
        return 0;
    }
 --------------------------------------------------------------------------------------------------------
 ### Grading students
 
    public static List<int> gradingStudents(List<int> grades)
    {
        for(int i=0; i< grades.Count; i++)
        {
            if(grades[i]>=38)
            {
                int temp = grades[i]%5;
                
                if(temp>=3)
                {
                    grades[i]+=5-temp;
                }
            }
        }
       return grades;   
    }   
--------------------------------------------------------------------------------------------------
### flipping bits
 public static long flippingBits(long n)
    {
        return uint.MaxValue - n;
    }
--------------------------------------------------------------------------------------------------

### Counting Valleys

class Result
{

    /*
     * Complete the 'countingValleys' function below.
     *
     * The function is expected to return an INTEGER.
     * The function accepts following parameters:
     *  1. INTEGER steps
     *  2. STRING path
     */

    public static int countingValleys(int steps, string path)
    {
        int sealevel =0;
        int valleyCount=0;
        
        if(path.Length <= 1)
          if(path[0]=='D')
            return 1;
            
        for(int i=0; i<path.Length; i++)
        {
            if(path[i] == 'D')
                sealevel--;
            if(path[i] == 'U')
                sealevel++;             
                   
            if(sealevel==0 && path[i]=='U')
              valleyCount++; 
                 
        }
        return valleyCount;
    }
}
----------------------------------------------------------------------------------------------
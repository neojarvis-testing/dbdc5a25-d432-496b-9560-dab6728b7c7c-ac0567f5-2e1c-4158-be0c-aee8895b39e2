using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dotnetapp.Exceptions
{
    public class BlogPostException: Exception
    {
        public BlogPostException(string mssg): base(mssg){
            
        }
    }
}
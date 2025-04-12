using System;
 
namespace dotnetapp.Exceptions
{

    public class BlogPostException : Exception
    {
        public BlogPostException(string message) : base(message)
        {

    public class BlogPostException: Exception
    {
        public BlogPostException(string mssg): base(mssg){
            
        }
    }
}
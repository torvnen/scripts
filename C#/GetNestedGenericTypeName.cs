namespace FooNamespace
{
    using System;
    using System.Linq;

    public class Foo
    {
        /// <summary>
        /// <para>
        /// Recursively formats a (generic) type name as it reads in source code.
        /// </para>
        /// <example>
        /// GetNestedGenericTypeName(typeof(IEnumerable&lt;IDictionary&lt;string, IEnumerable&lt;string&gt;&gt;&gt;))
        /// returns "IEnumerable&lt;IDictionary&lt;string, IEnumerable&lt;string&gt;&gt;&gt;"
        /// </example>
        /// </summary>
        public string GetNestedGenericTypeName(Type type)
        {
            string GetGenericTypeName(Type _type)
            {
                if (_type.GenericTypeArguments.Length == 0)
                {
                    return _type.Name;
                }
                return $"{_type.Name.TrimEnd('1', '`')}<{string.Join(", ", _type.GenericTypeArguments.Select(t => GetGenericTypeName(t)))}>";
            }
            return GetGenericTypeName(type);
        }
    }
}
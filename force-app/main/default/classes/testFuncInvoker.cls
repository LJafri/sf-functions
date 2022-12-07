public with sharing class testFuncInvoker {
    public static void test() {
        functions.Function myFunction = functions.Function.get('functions-recipes.testFunc');

        functions.FunctionInvocation invocation = myFunction.invoke('')
    }
}

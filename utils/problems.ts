export const problems = [
    {
        id: 1,
        title: "Two Sum",
        level: "Easy",
        statement:
            "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.You may assume that each input would have exactly one solution, and you may not use the same element twice. Answer should be returned in non-decreasing order",
        constraints:
            "2 <= nums.length <= 1000, -10^9 <= nums[i] <= 10^9, -10^9 <= target <= 10^9",
        exampleTestcases: [
            {
                input: "4\n2 7 11 15\n9\n",
                output: "0 1\n",
                normalIO: {
                    input: "nums = [2,7,11,15], target = 9",
                    output: "[0,1]",
                },
            },
            {
                input: "3\n3 2 4\n6\n",
                output: "1 2\n",
                normalIO: {
                    input: "nums = [3,2,4], target = 6",
                    output: "[1,2]",
                },
            },
        ],
        sampleTestcases: [
            {
                input: "2\n1 2\n3\n",
                output: "0 1\n",
                normalIO: {
                    input: "nums = [1,2], target = 3",
                    output: "[0,1]",
                },
            },
            {
                input: "3\n1 5 3\n8\n",
                output: "1 2\n",
                normalIO: {
                    input: "nums = [1,5,3], target = 8",
                    output: "[1,2]",
                },
            },
            {
                input: "3\n-1 -2 -3\n-5\n",
                output: "1 2\n",
                normalIO: {
                    input: "nums = [-1,-2,-3], target = -5",
                    output: "[1,2]",
                },
            },
            {
                input: "4\n0 4 3 0\n0\n",
                output: "0 3\n",
                normalIO: {
                    input: "nums = [0,4,3,0], target = 0",
                    output: "[0,3]",
                },
            },
            {
                input: "5\n2 5 5 11 15\n10\n",
                output: "1 2\n",
                normalIO: {
                    input: "nums = [2,5,5,11,15], target = 10",
                    output: "[1,2]",
                },
            },
        ],

        boilerplate: {
            python: 'def two_sum(nums, target):\n    # Write your code here\n    return []\n\nif __name__ == "__main__":\n    n = int(input())\n    nums = list(map(int, input().split()))\n    target = int(input())\n    res = two_sum(nums, target)\n    print(" ".join(map(str, res)))\n',
            cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\nvector<int> two_sum(vector<int>& nums, int target) {\n    // Write your code here\n    return {};\n}\n\nint main() {\n    int n; cin >> n;\n    vector<int> nums(n);\n    for(int i=0;i<n;i++) cin >> nums[i];\n    int target; cin >> target;\n    vector<int> res = two_sum(nums, target);\n    for(int i=0;i<res.size();i++) cout << res[i] << (i+1==res.size()?"\\n":" ");\n}\n',
            java: 'import java.util.*;\npublic class Main {\n    public static int[] two_sum(int[] nums, int target) {\n        // Write your code here\n        return new int[]{};\n    }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] nums = new int[n];\n        for(int i=0;i<n;i++) nums[i]=sc.nextInt();\n        int target = sc.nextInt();\n        int[] res = two_sum(nums, target);\n        for(int i=0;i<res.length;i++){\n            System.out.print(res[i]);\n            if(i+1<res.length) System.out.print(" ");\n        }\n        System.out.println();\n    }\n}\n',
            javascript:
                "function two_sum(nums, target) {\n    // Write your code here\n    return [];\n}\n\nconst fs = require('fs');\nconst input = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\nlet n = input[0];\nlet nums = input.slice(1, n+1);\nlet target = input[n+1];\nlet res = two_sum(nums, target);\nconsole.log(res.join(\" \"));\n",
            typescript:
                "function two_sum(nums: number[], target: number): number[] {\n    // Write your code here\n    return [];\n}\n\nconst fs = require('fs');\nconst input: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\nlet n: number = input[0];\nlet nums: number[] = input.slice(1, n+1);\nlet target: number = input[n+1];\nlet res: number[] = two_sum(nums, target);\nconsole.log(res.join(\" \"));\n",
            c: '#include <stdio.h>\n\n// Write your code here\n\nint main() {\n    int n; scanf("%d", &n);\n    int nums[n];\n    for(int i=0;i<n;i++) scanf("%d", &nums[i]);\n    int target; scanf("%d", &target);\n    // Write your code here\n    return 0;\n}\n',
        },
        topics: ["Array", "Hash Map"],
        complexity: { time: "O(n)", space: "O(n)" },
    },
    // {
    //     id: 2,
    //     title: "Contains Duplicate",
    //     level: "Easy",
    //     statement:
    //         "Given an integer array nums, return true if any value appears at least twice in the array, and false if every element is distinct.",
    //     constraints: "1 <= nums.length <= 10^5, -10^9 <= nums[i] <= 10^9",
    //     exampleTestcases: [
    //         {
    //             input: "4\n1 2 3 1\n",
    //             output: "true\n",
    //             normalIO: { input: "nums = [1,2,3,1]", output: "true" },
    //         },
    //         {
    //             input: "3\n1 2 3\n",
    //             output: "false\n",
    //             normalIO: { input: "nums = [1,2,3]", output: "false" },
    //         },
    //     ],
    //     sampleTestcases: [
    //         { input: "5\n5 6 7 8 9\n", output: "false\n" },
    //         { input: "5\n2 2 3 4 5\n", output: "true\n" },
    //         { input: "6\n1 2 3 4 5 6\n", output: "false\n" },
    //         { input: "6\n10 20 30 10 40 50\n", output: "true\n" },
    //         { input: "2\n1000000000 -1000000000\n", output: "false\n" },
    //     ],
    //     boilerplate: {
    //         python: 'def contains_duplicate(nums):\n    # Write your code here\n    return False\n\nif __name__ == "__main__":\n    n = int(input())\n    nums = list(map(int, input().split()))\n    res = contains_duplicate(nums)\n    print("true" if res else "false")\n',
    //         cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\nbool contains_duplicate(vector<int>& nums) {\n    // Write your code here\n    return false;\n}\n\nint main() {\n    int n; cin >> n;\n    vector<int> nums(n);\n    for(int i=0;i<n;i++) cin >> nums[i];\n    bool res = contains_duplicate(nums);\n    cout << (res ? "true" : "false") << endl;\n}\n',
    //         java: 'import java.util.*;\npublic class Main {\n    public static boolean contains_duplicate(int[] nums) {\n        // Write your code here\n        return false;\n    }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] nums = new int[n];\n        for(int i=0;i<n;i++) nums[i]=sc.nextInt();\n        boolean res = contains_duplicate(nums);\n        System.out.println(res ? "true" : "false");\n    }\n}\n',
    //         javascript:
    //             "function contains_duplicate(nums) {\n    // Write your code here\n    return false;\n}\n\nconst fs = require('fs');\nconst input = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\nlet n = input[0];\nlet nums = input.slice(1, n+1);\nlet res = contains_duplicate(nums);\nconsole.log(res ? \"true\" : \"false\");\n",
    //         typescript:
    //             "function contains_duplicate(nums: number[]): boolean {\n    // Write your code here\n    return false;\n}\n\nconst fs = require('fs');\nconst input: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\nlet n: number = input[0];\nlet nums: number[] = input.slice(1, n+1);\nlet res: boolean = contains_duplicate(nums);\nconsole.log(res ? \"true\" : \"false\");\n",
    //         c: '#include <stdio.h>\n#include <stdbool.h>\n\nbool contains_duplicate(int* nums, int n) {\n    // Write your code here\n    return false;\n}\n\nint main() {\n    int n; scanf("%d", &n);\n    int nums[n];\n    for(int i=0;i<n;i++) scanf("%d", &nums[i]);\n    bool res = contains_duplicate(nums, n);\n    printf(res ? "true\\n" : "false\\n");\n    return 0;\n}\n',
    //     },
    //     topics: ["Array", "Hash Set"],
    //     complexity: { time: "O(n)", space: "O(n)" },
    // },
    // {
    //     id: 3,
    //     title: "Valid Parentheses",
    //     level: "Easy",
    //     statement:
    //         "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    //     constraints: "1 <= s.length <= 10^4",
    //     exampleTestcases: [
    //         {
    //             input: "1\n()[]{}\n",
    //             output: "true\n",
    //             normalIO: { input: 's = "()[]{}"', output: "true" },
    //         },
    //         {
    //             input: "1\n(]\n",
    //             output: "false\n",
    //             normalIO: { input: 's = "(]"', output: "false" },
    //         },
    //     ],
    //     sampleTestcases: [
    //         { input: "1\n([])\n", output: "true\n" },
    //         { input: "1\n((\n", output: "false\n" },
    //         { input: "1\n{[()]}\n", output: "true\n" },
    //         { input: "1\n{[(])}\n", output: "false\n" },
    //         { input: "1\n()\n", output: "true\n" },
    //     ],
    //     boilerplate: {
    //         python: 'def is_valid(s):\n    # Write your code here\n    return False\n\nif __name__ == "__main__":\n    input()  # ignore length\n    s = input()\n    print("true" if is_valid(s) else "false")\n',
    //         cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\nbool is_valid(string s){\n    // Write your code here\n    return false;\n}\n\nint main(){\n    int n; cin >> n;\n    string s; cin >> s;\n    cout << (is_valid(s)?"true":"false") << endl;\n}\n',
    //         java: 'import java.util.*;\npublic class Main {\n    public static boolean is_valid(String s){\n        // Write your code here\n        return false;\n    }\n    public static void main(String[] args){\n        Scanner sc=new Scanner(System.in);\n        int n=sc.nextInt();\n        String s=sc.next();\n        System.out.println(is_valid(s)?"true":"false");\n    }\n}\n',
    //         javascript:
    //             "function is_valid(s){\n    // Write your code here\n    return false;\n}\n\nconst fs=require('fs');\nconst input=fs.readFileSync(0,'utf8').trim().split(/\\s+/);\nlet s=input[1];\nconsole.log(is_valid(s)?\"true\":\"false\");\n",
    //         typescript:
    //             "function is_valid(s: string): boolean{\n    // Write your code here\n    return false;\n}\n\nconst fs=require('fs');\nconst input:string[]=fs.readFileSync(0,'utf8').trim().split(/\\s+/);\nlet s:string=input[1];\nconsole.log(is_valid(s)?\"true\":\"false\");\n",
    //         c: '#include <stdio.h>\n#include <stdbool.h>\n\nbool is_valid(char* s){\n    // Write your code here\n    return false;\n}\n\nint main(){\n    int n; scanf("%d", &n);\n    char s[10000]; scanf("%s", s);\n    bool res=is_valid(s);\n    printf(res ? "true\\n" : "false\\n");\n    return 0;\n}\n',
    //     },
    //     topics: ["Stack", "String"],
    //     complexity: { time: "O(n)", space: "O(n)" },
    // },
    // {
    //     id: 4,
    //     title: "Best Time to Buy and Sell Stock",
    //     level: "Easy",
    //     statement:
    //         "Given an array prices where prices[i] is the price of a stock on the ith day, return the maximum profit. If no profit can be made, return 0.",
    //     constraints: "1 <= prices.length <= 10^5, 0 <= prices[i] <= 10^4",
    //     exampleTestcases: [
    //         {
    //             input: "6\n7 1 5 3 6 4\n",
    //             output: "5\n",
    //             normalIO: { input: "prices = [7,1,5,3,6,4]", output: "5" },
    //         },
    //         {
    //             input: "5\n7 6 4 3 1\n",
    //             output: "0\n",
    //             normalIO: { input: "prices = [7,6,4,3,1]", output: "0" },
    //         },
    //     ],
    //     sampleTestcases: [
    //         { input: "6\n2 4 1 7 5 3\n", output: "6\n" },
    //         { input: "3\n2 1 4\n", output: "3\n" },
    //         { input: "4\n1 2 3 4\n", output: "3\n" },
    //         { input: "5\n5 4 3 2 1\n", output: "0\n" },
    //         { input: "2\n3 8\n", output: "5\n" },
    //     ],
    //     boilerplate: {
    //         python: 'def max_profit(prices):\n    # Write your code here\n    return 0\n\nif __name__=="__main__":\n    n=int(input())\n    prices=list(map(int,input().split()))\n    print(max_profit(prices))\n',
    //         cpp: "#include <bits/stdc++.h>\nusing namespace std;\n\nint max_profit(vector<int>& prices){\n    // Write your code here\n    return 0;\n}\n\nint main(){\n    int n; cin>>n;\n    vector<int> prices(n);\n    for(int i=0;i<n;i++) cin>>prices[i];\n    cout<<max_profit(prices)<<endl;\n}\n",
    //         java: "import java.util.*;\npublic class Main{\n    public static int max_profit(int[] prices){\n        // Write your code here\n        return 0;\n    }\n    public static void main(String[] args){\n        Scanner sc=new Scanner(System.in);\n        int n=sc.nextInt();\n        int[] prices=new int[n];\n        for(int i=0;i<n;i++) prices[i]=sc.nextInt();\n        System.out.println(max_profit(prices));\n    }\n}\n",
    //         javascript:
    //             "function max_profit(prices){\n    // Write your code here\n    return 0;\n}\nconst fs=require('fs');\nconst input=fs.readFileSync(0,'utf8').trim().split(/\\s+/).map(Number);\nlet n=input[0];\nlet prices=input.slice(1,n+1);\nconsole.log(max_profit(prices));\n",
    //         typescript:
    //             "function max_profit(prices:number[]):number{\n    // Write your code here\n    return 0;\n}\nconst fs=require('fs');\nconst input:number[]=fs.readFileSync(0,'utf8').trim().split(/\\s+/).map(Number);\nlet n:number=input[0];\nlet prices:number[]=input.slice(1,n+1);\nconsole.log(max_profit(prices));\n",
    //         c: '#include <stdio.h>\n\nint max_profit(int* prices,int n){\n    // Write your code here\n    return 0;\n}\nint main(){\n    int n; scanf("%d", &n);\n    int prices[n];\n    for(int i=0;i<n;i++) scanf("%d", &prices[i]);\n    printf("%d\\n", max_profit(prices,n));\n    return 0;\n}\n',
    //     },
    //     topics: ["Array", "Dynamic Programming"],
    //     complexity: { time: "O(n)", space: "O(1)" },
    // },
    // {
    //     id: 5,
    //     title: "Product of Array Except Self",
    //     level: "Medium",
    //     statement:
    //         "Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i]. You must solve it without using division and in O(n) time.",
    //     constraints: "2 <= nums.length <= 10^5, -30 <= nums[i] <= 30",
    //     exampleTestcases: [
    //         {
    //             input: "5\n1 2 3 4 5\n",
    //             output: "120 60 40 30 24\n",
    //             normalIO: {
    //                 input: "nums = [1,2,3,4,5]",
    //                 output: "[120,60,40,30,24]",
    //             },
    //         },
    //         {
    //             input: "3\n3 2 4\n",
    //             output: "8 12 6\n",
    //             normalIO: { input: "nums = [3,2,4]", output: "[8,12,6]" },
    //         },
    //     ],
    //     sampleTestcases: [
    //         { input: "4\n2 3 4 5\n", output: "60 40 30 24\n" },
    //         { input: "3\n1 2 1\n", output: "2 1 2\n" },
    //         { input: "2\n2 3\n", output: "3 2\n" },
    //         { input: "5\n1 1 1 1 1\n", output: "1 1 1 1 1\n" },
    //         { input: "3\n5 6 7\n", output: "42 35 30\n" },
    //     ],
    //     boilerplate: {
    //         python: "def product_except_self(nums):\n    # Write your code here\n    return []\n\nif __name__ == '__main__':\n    n = int(input())\n    nums = list(map(int,input().split()))\n    res = product_except_self(nums)\n    print(' '.join(map(str,res)))\n",
    //         cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\nvector<int> product_except_self(vector<int>& nums){\n    // Write your code here\n    return {};\n}\n\nint main(){\n    int n; cin>>n;\n    vector<int> nums(n);\n    for(int i=0;i<n;i++) cin>>nums[i];\n    vector<int> res = product_except_self(nums);\n    for(int i=0;i<res.size();i++) cout<<res[i]<<(i+1==res.size()?"\\n":" ");\n}\n',
    //         java: 'import java.util.*;\npublic class Main{\n    public static int[] product_except_self(int[] nums){\n        // Write your code here\n        return new int[]{};\n    }\n    public static void main(String[] args){\n        Scanner sc=new Scanner(System.in);\n        int n=sc.nextInt();\n        int[] nums=new int[n];\n        for(int i=0;i<n;i++) nums[i]=sc.nextInt();\n        int[] res=product_except_self(nums);\n        for(int i=0;i<res.length;i++){\n            System.out.print(res[i]);\n            if(i+1<res.length) System.out.print(" ");\n        }\n        System.out.println();\n    }\n}\n',
    //         javascript:
    //             "function product_except_self(nums){\n    // Write your code here\n    return [];\n}\nconst fs=require('fs');\nconst input=fs.readFileSync(0,'utf8').trim().split(/\\s+/).map(Number);\nlet n=input[0];\nlet nums=input.slice(1,n+1);\nconsole.log(product_except_self(nums).join(' '));\n",
    //         typescript:
    //             "function product_except_self(nums:number[]):number[]{\n    // Write your code here\n    return [];\n}\nconst fs=require('fs');\nconst input:number[]=fs.readFileSync(0,'utf8').trim().split(/\\s+/).map(Number);\nlet n:number=input[0];\nlet nums:number[]=input.slice(1,n+1);\nconsole.log(product_except_self(nums).join(' '));\n",
    //         c: '#include <stdio.h>\n\n// Write your code here\n\nint main(){\n    int n; scanf("%d", &n);\n    int nums[n];\n    for(int i=0;i<n;i++) scanf("%d", &nums[i]);\n    // call function here\n    return 0;\n}\n',
    //     },
    //     topics: ["Array", "Prefix Product"],
    //     complexity: { time: "O(n)", space: "O(1)" },
    // },
    // {
    //     id: 6,
    //     title: "Top K Frequent Elements",
    //     level: "Medium",
    //     statement:
    //         "Given an integer array nums and an integer k, return the k most frequent elements. Answer can be returned in any order.",
    //     constraints:
    //         "1 <= nums.length <= 10^5, k is in range [1, number of unique elements], -10^4 <= nums[i] <= 10^4",
    //     exampleTestcases: [
    //         {
    //             input: "6\n1 1 1 2 2 3\n2\n",
    //             output: "1 2\n",
    //             normalIO: { input: "nums=[1,1,1,2,2,3], k=2", output: "[1,2]" },
    //         },
    //         {
    //             input: "4\n1 2 3 4\n1\n",
    //             output: "1\n",
    //             normalIO: { input: "nums=[1,2,3,4], k=1", output: "[1]" },
    //         },
    //     ],
    //     sampleTestcases: [
    //         { input: "5\n1 1 2 2 3\n2\n", output: "1 2\n" },
    //         { input: "6\n3 3 3 2 2 1\n2\n", output: "3 2\n" },
    //         { input: "3\n4 4 4\n1\n", output: "4\n" },
    //         { input: "4\n1 2 2 3\n1\n", output: "2\n" },
    //         { input: "5\n5 4 4 5 5\n1\n", output: "5\n" },
    //     ],
    //     boilerplate: {
    //         python: "def top_k_frequent(nums,k):\n    # Write your code here\n    return []\n\nif __name__=='__main__':\n    n=int(input())\n    nums=list(map(int,input().split()))\n    k=int(input())\n    res=top_k_frequent(nums,k)\n    print(' '.join(map(str,res)))\n",
    //         cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\nvector<int> top_k_frequent(vector<int>& nums, int k){\n    // Write your code here\n    return {};\n}\n\nint main(){\n    int n; cin >> n;\n    vector<int> nums(n);\n    for(int i=0;i<n;i++) cin >> nums[i];\n    int k; cin >> k;\n    vector<int> res = top_k_frequent(nums,k);\n    for(int i=0;i<res.size();i++) cout << res[i] << (i+1==res.size()?"\\n":" ");\n}\n',
    //         java: 'import java.util.*;\npublic class Main {\n    public static int[] top_k_frequent(int[] nums, int k){\n        // Write your code here\n        return new int[]{};\n    }\n    public static void main(String[] args){\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] nums = new int[n];\n        for(int i=0;i<n;i++) nums[i]=sc.nextInt();\n        int k = sc.nextInt();\n        int[] res = top_k_frequent(nums,k);\n        for(int i=0;i<res.length;i++){\n            System.out.print(res[i]);\n            if(i+1<res.length) System.out.print(" ");\n        }\n        System.out.println();\n    }\n}\n',
    //         javascript:
    //             "function top_k_frequent(nums,k){\n    // Write your code here\n    return [];\n}\nconst fs=require('fs');\nconst input=fs.readFileSync(0,'utf8').trim().split(/\\s+/).map(Number);\nlet n=input[0];\nlet nums=input.slice(1,n+1);\nlet k=input[n+1];\nlet res=top_k_frequent(nums,k);\nconsole.log(res.join(\" \"));\n",
    //         typescript:
    //             "function top_k_frequent(nums:number[], k:number): number[]{\n    // Write your code here\n    return [];\n}\nconst fs=require('fs');\nconst input:number[]=fs.readFileSync(0,'utf8').trim().split(/\\s+/).map(Number);\nlet n:number=input[0];\nlet nums:number[]=input.slice(1,n+1);\nlet k:number=input[n+1];\nlet res:number[]=top_k_frequent(nums,k);\nconsole.log(res.join(\" \"));\n",
    //         c: '#include <stdio.h>\n\n// Write your code here\n\nint main(){\n    int n; scanf("%d", &n);\n    int nums[n];\n    for(int i=0;i<n;i++) scanf("%d", &nums[i]);\n    int k; scanf("%d", &k);\n    // call function here\n    return 0;\n}\n',
    //     },
    //     topics: ["Array", "Heap", "Hash Map"],
    //     complexity: { time: "O(n log k)", space: "O(n)" },
    // },
    // {
    //     id: 7,
    //     title: "Longest Substring Without Repeating Characters",
    //     level: "Medium",
    //     statement:
    //         "Given a string s, find the length of the longest substring without repeating characters.",
    //     constraints:
    //         "0 <= s.length <= 10^5, s consists of English letters, digits, symbols and spaces",
    //     exampleTestcases: [
    //         {
    //             input: "1\nabcabcbb\n",
    //             output: "3\n",
    //             normalIO: { input: 's = "abcabcbb"', output: "3" },
    //         },
    //         {
    //             input: "1\nbbbbb\n",
    //             output: "1\n",
    //             normalIO: { input: 's = "bbbbb"', output: "1" },
    //         },
    //     ],
    //     sampleTestcases: [
    //         { input: "1\npwwkew\n", output: "3\n" },
    //         { input: "1\n\n", output: "0\n" },
    //         { input: "1\nau\n", output: "2\n" },
    //         { input: "1\ndvdf\n", output: "3\n" },
    //         { input: "1\nanviaj\n", output: "5\n" },
    //     ],
    //     boilerplate: {
    //         python: "def length_of_longest_substring(s):\n    # Write your code here\n    return 0\n\nif __name__=='__main__':\n    input() # ignore length\n    s=input()\n    print(length_of_longest_substring(s))\n",
    //         cpp: "#include <bits/stdc++.h>\nusing namespace std;\nint length_of_longest_substring(string s){\n    // Write your code here\n    return 0;\n}\nint main(){\n    int n; cin>>n;\n    string s; cin>>s;\n    cout<<length_of_longest_substring(s)<<endl;\n}\n",
    //         java: "import java.util.*;\npublic class Main{\n    public static int length_of_longest_substring(String s){\n        // Write your code here\n        return 0;\n    }\n    public static void main(String[] args){\n        Scanner sc=new Scanner(System.in);\n        int n=sc.nextInt();\n        String s=sc.next();\n        System.out.println(length_of_longest_substring(s));\n    }\n}\n",
    //         javascript:
    //             "function length_of_longest_substring(s){\n    // Write your code here\n    return 0;\n}\nconst fs=require('fs');\nconst input=fs.readFileSync(0,'utf8').trim().split(/\\s+/);\nlet s=input[1];\nconsole.log(length_of_longest_substring(s));\n",
    //         typescript:
    //             "function length_of_longest_substring(s:string):number{\n    // Write your code here\n    return 0;\n}\nconst fs=require('fs');\nconst input:string[]=fs.readFileSync(0,'utf8').trim().split(/\\s+/);\nlet s:string=input[1];\nconsole.log(length_of_longest_substring(s));\n",
    //         c: '#include <stdio.h>\n#include <string.h>\nint length_of_longest_substring(char* s){\n    // Write your code here\n    return 0;\n}\nint main(){\n    int n; scanf("%d", &n);\n    char s[100000]; scanf("%s", s);\n    printf("%d\\n", length_of_longest_substring(s));\n    return 0;\n}\n',
    //     },
    //     topics: ["String", "Hash Map", "Sliding Window"],
    //     complexity: { time: "O(n)", space: "O(min(n,m))" },
    // },
    // {
    //     id: 8,
    //     title: "Merge Intervals",
    //     level: "Medium",
    //     statement:
    //         "Given an array of intervals where intervals[i] = [start_i, end_i], merge all overlapping intervals and return an array of the non-overlapping intervals sorted by start time.",
    //     constraints:
    //         "1 <= intervals.length <= 10^4, 0 <= start_i <= end_i <= 10^4",
    //     exampleTestcases: [
    //         {
    //             input: "4\n1 3 2 6 8 10 15 18\n",
    //             output: "1 6 8 10 15 18\n",
    //             normalIO: {
    //                 input: "intervals=[[1,3],[2,6],[8,10],[15,18]]",
    //                 output: "[[1,6],[8,10],[15,18]]",
    //             },
    //         },
    //         {
    //             input: "2\n1 4 4 5\n",
    //             output: "1 5\n",
    //             normalIO: {
    //                 input: "intervals=[[1,4],[4,5]]",
    //                 output: "[[1,5]]",
    //             },
    //         },
    //     ],
    //     sampleTestcases: [
    //         { input: "3\n1 4 5 6 6 8\n", output: "1 4 5 6 6 8\n" },
    //         { input: "2\n1 2 3 4\n", output: "1 2 3 4\n" },
    //         { input: "4\n1 3 2 4 5 7 6 8\n", output: "1 4 5 8\n" },
    //         { input: "3\n1 3 3 5 6 9\n", output: "1 5 6 9\n" },
    //         { input: "2\n1 10 2 3\n", output: "1 10\n" },
    //     ],
    //     boilerplate: {
    //         python: "def merge(intervals):\n    # Write your code here\n    return []\n\nif __name__=='__main__':\n    n=int(input())\n    arr=list(map(int,input().split()))\n    intervals=[arr[i:i+2] for i in range(0, len(arr),2)]\n    res=merge(intervals)\n    for pair in res: print(' '.join(map(str,pair)), end=' ')\n    print()\n",
    //         cpp: "#include <bits/stdc++.h>\nusing namespace std;\n\nint length_of_longest_substring(string s){\n    // Write your code here\n    return 0;\n}\n\nint main(){\n    int n; cin >> n; string s; cin >> s;\n    cout << length_of_longest_substring(s) << endl;\n}",
    //         java: "import java.util.*;\npublic class Main {\n    public static int length_of_longest_substring(String s){\n        // Write your code here\n        return 0;\n    }\n    public static void main(String[] args){\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        String s = sc.next();\n        System.out.println(length_of_longest_substring(s));\n    }\n}",
    //         javascript:
    //             "function length_of_longest_substring(s){\n    // Write your code here\n    return 0;\n}\nconst fs=require('fs');\nconst input=fs.readFileSync(0,'utf8').trim().split(/\\s+/);\nlet s=input[1];\nconsole.log(length_of_longest_substring(s));",
    //         typescript:
    //             "function length_of_longest_substring(s:string):number{\n    // Write your code here\n    return 0;\n}\nconst fs=require('fs');\nconst input:string[]=fs.readFileSync(0,'utf8').trim().split(/\\s+/);\nlet s:string=input[1];\nconsole.log(length_of_longest_substring(s));",
    //         c: '#include <stdio.h>\n#include <string.h>\n\nint length_of_longest_substring(char* s){\n    // Write your code here\n    return 0;\n}\n\nint main(){\n    int n; scanf("%d", &n);\n    char s[100000]; scanf("%s", s);\n    printf("%d\\n", length_of_longest_substring(s));\n    return 0;\n}',
    //     },
    //     topics: ["Array", "Sorting"],
    //     complexity: { time: "O(n log n)", space: "O(n)" },
    // },
    // {
    //     id: 9,
    //     title: "Median of Two Sorted Arrays",
    //     level: "Hard",
    //     statement:
    //         "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.",
    //     constraints: "0 <= m, n <= 10^3, -10^6 <= nums1[i], nums2[i] <= 10^6",
    //     exampleTestcases: [
    //         {
    //             input: "2\n1 3\n2\n",
    //             output: "2.0\n",
    //             normalIO: { input: "nums1=[1,3], nums2=[2]", output: "2.0" },
    //         },
    //         {
    //             input: "2\n1 2\n3 4\n",
    //             output: "2.5\n",
    //             normalIO: { input: "nums1=[1,2], nums2=[3,4]", output: "2.5" },
    //         },
    //     ],
    //     sampleTestcases: [
    //         { input: "3\n1 2 3\n4\n", output: "2.5\n" },
    //         { input: "2\n0 0\n0 0\n", output: "0.0\n" },
    //         { input: "1\n1\n1 2\n", output: "1.5\n" },
    //         { input: "2\n2 3\n1 4\n", output: "2.5\n" },
    //         { input: "1\n1\n2\n", output: "1.5\n" },
    //     ],
    //     boilerplate: {
    //         python: "def find_median_sorted_arrays(nums1,nums2):\n    # Write your code here\n    return 0.0\n\nif __name__=='__main__':\n    m=int(input())\n    nums1=list(map(int,input().split()))\n    n=int(input())\n    nums2=list(map(int,input().split()))\n    print(find_median_sorted_arrays(nums1,nums2))\n",
    //         cpp: "#include <bits/stdc++.h>\nusing namespace std;\ndouble find_median_sorted_arrays(vector<int>& nums1, vector<int>& nums2){\n    // Write your code here\n    return 0.0;\n}\nint main(){\n    int m,n; cin>>m; vector<int> nums1(m); for(int i=0;i<m;i++) cin>>nums1[i];\n    cin>>n; vector<int> nums2(n); for(int i=0;i<n;i++) cin>>nums2[i];\n    cout<<find_median_sorted_arrays(nums1,nums2)<<endl;\n}\n",
    //         java: "import java.util.*;\npublic class Main {\n    public static double find_median_sorted_arrays(int[] nums1, int[] nums2){\n        // Write your code here\n        return 0.0;\n    }\n    public static void main(String[] args){\n        Scanner sc=new Scanner(System.in);\n        int m=sc.nextInt(); int[] nums1=new int[m]; for(int i=0;i<m;i++) nums1[i]=sc.nextInt();\n        int n=sc.nextInt(); int[] nums2=new int[n]; for(int i=0;i<n;i++) nums2[i]=sc.nextInt();\n        System.out.println(find_median_sorted_arrays(nums1,nums2));\n    }\n}\n",
    //         javascript:
    //             "function find_median_sorted_arrays(nums1,nums2){\n    // Write your code here\n    return 0.0;\n}\nconst fs=require('fs');\nconst input=fs.readFileSync(0,'utf8').trim().split(/\\s+/).map(Number);\nlet m=input[0], nums1=input.slice(1,1+m);\nlet n=input[1+m], nums2=input.slice(2+m,2+m+n);\nconsole.log(find_median_sorted_arrays(nums1,nums2));\n",
    //         typescript:
    //             "function find_median_sorted_arrays(nums1:number[],nums2:number[]):number{\n    // Write your code here\n    return 0.0;\n}\nconst fs=require('fs');\nconst input:number[]=fs.readFileSync(0,'utf8').trim().split(/\\s+/).map(Number);\nlet m:number=input[0], nums1:number[]=input.slice(1,1+m);\nlet n:number=input[1+m], nums2:number[]=input.slice(2+m,2+m+n);\nconsole.log(find_median_sorted_arrays(nums1,nums2));\n",
    //         c: '#include <stdio.h>\n\n// Write your code here\n\nint main(){\n    int m,n; scanf("%d", &m); int nums1[m]; for(int i=0;i<m;i++) scanf("%d", &nums1[i]);\n    scanf("%d", &n); int nums2[n]; for(int i=0;i<n;i++) scanf("%d", &nums2[i]);\n    // call function here\n    return 0;\n}\n',
    //     },
    //     topics: ["Array", "Binary Search", "Divide and Conquer"],
    //     complexity: { time: "O(log(min(m,n)))", space: "O(1)" },
    // },
    // {
    //     id: 10,
    //     title: "Trapping Rain Water",
    //     level: "Hard",
    //     statement:
    //         "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
    //     constraints: "1 <= height.length <= 10^5, 0 <= height[i] <= 10^4",
    //     exampleTestcases: [
    //         {
    //             input: "12\n0 1 0 2 1 0 1 3 2 1 2 1\n",
    //             output: "6\n",
    //             normalIO: {
    //                 input: "height=[0,1,0,2,1,0,1,3,2,1,2,1]",
    //                 output: "6",
    //             },
    //         },
    //         {
    //             input: "5\n4 2 0 3 2\n",
    //             output: "4\n",
    //             normalIO: { input: "height=[4,2,0,3,2]", output: "4" },
    //         },
    //     ],
    //     sampleTestcases: [
    //         { input: "3\n3 0 1\n", output: "1\n" },
    //         { input: "4\n0 2 0 3\n", output: "2\n" },
    //         { input: "5\n2 0 2 1 0\n", output: "3\n" },
    //         { input: "6\n0 1 0 1 0 1\n", output: "2\n" },
    //         { input: "3\n1 2 1\n", output: "0\n" },
    //     ],
    //     boilerplate: {
    //         python: "def trap(height):\n    # Write your code here\n    return 0\n\nif __name__=='__main__':\n    n=int(input())\n    height=list(map(int,input().split()))\n    print(trap(height))\n",
    //         cpp: "#include <bits/stdc++.h>\nusing namespace std;\nint trap(vector<int>& height){\n    // Write your code here\n    return 0;\n}\nint main(){\n    int n; cin>>n;\n    vector<int> height(n); for(int i=0;i<n;i++) cin>>height[i];\n    cout<<trap(height)<<endl;\n}\n",
    //         java: "import java.util.*;\npublic class Main{\n    public static int trap(int[] height){\n        // Write your code here\n        return 0;\n    }\n    public static void main(String[] args){\n        Scanner sc=new Scanner(System.in);\n        int n=sc.nextInt(); int[] height=new int[n]; for(int i=0;i<n;i++) height[i]=sc.nextInt();\n        System.out.println(trap(height));\n    }\n}\n",
    //         javascript:
    //             "function trap(height){\n    // Write your code here\n    return 0;\n}\nconst fs=require('fs');\nconst input=fs.readFileSync(0,'utf8').trim().split(/\\s+/).map(Number);\nlet n=input[0];\nlet height=input.slice(1,n+1);\nconsole.log(trap(height));\n",
    //         typescript:
    //             "function trap(height:number[]):number{\n    // Write your code here\n    return 0;\n}\nconst fs=require('fs');\nconst input:number[]=fs.readFileSync(0,'utf8').trim().split(/\\s+/).map(Number);\nlet n:number=input[0];\nlet height:number[]=input.slice(1,n+1);\nconsole.log(trap(height));\n",
    //         c: '#include <stdio.h>\n\n// Write your code here\n\nint main(){\n    int n; scanf("%d", &n);\n    int height[n]; for(int i=0;i<n;i++) scanf("%d", &height[i]);\n    // call function here\n    return 0;\n}\n',
    //     },
    //     topics: ["Array", "Two Pointers", "Greedy"],
    //     complexity: { time: "O(n)", space: "O(1)" },
    // },
];

export const problems = [
  {
    id: '1',
    title: 'Two Sum',
    description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers in the array such that they add up to \`target\`.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

Example 1:
\`\`\`
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
\`\`\`

Example 2:
\`\`\`
Input: nums = [3,2,4], target = 6
Output: [1,2]
\`\`\`

Constraints:
- 2 <= nums.length <= 104
- -109 <= nums[i] <= 109
- -109 <= target <= 109
- Only one valid answer exists.
`,
    difficulty: 'easy',
    starterCode: `function twoSum(nums, target) {
  // Write your code here
}`,
    publicTestCases: [
      { id: '1', input: '[2,7,11,15], 9', expectedOutput: '[0,1]' },
      { id: '2', input: '[3,2,4], 6', expectedOutput: '[1,2]' },
    ],
    privateTestCases: [
      { id: '3', input: '[3,3], 6', expectedOutput: '[0,1]' },
      { id: '4', input: '[1,2,3,4], 7', expectedOutput: '[2,3]' },
    ],
  },
  {
    id: '2',
    title: 'Valid Parentheses',
    description: `Given a string \`s\` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.

Example 1:
\`\`\`
Input: s = "()"
Output: true
\`\`\`

Example 2:
\`\`\`
Input: s = "()[]{}"
Output: true
\`\`\`

Example 3:
\`\`\`
Input: s = "(]"
Output: false
\`\`\``,
    difficulty: 'medium',
    starterCode: `function isValid(s) {
  // Write your code here
}`,
    publicTestCases: [
      { id: '1', input: '"()"', expectedOutput: 'true' },
      { id: '2', input: '"()[]{}"', expectedOutput: 'true' },
    ],
    privateTestCases: [
      { id: '3', input: '"(]"', expectedOutput: 'false' },
      { id: '4', input: '"{[]}"', expectedOutput: 'true' },
    ],
  },
  {
    id: '3',
    title: 'Merge k Sorted Lists',
    description: `You are given an array of \`k\` linked-lists \`lists\`, each linked-list is sorted in ascending order.

Merge all the linked-lists into one sorted linked-list and return it.

Example 1:
\`\`\`
Input: lists = [[1,4,5],[1,3,4],[2,6]]
Output: [1,1,2,3,4,4,5,6]
Explanation: The linked-lists are:
[
  1->4->5,
  1->3->4,
  2->6
]
merging them into one sorted list:
1->1->2->3->4->4->5->6
\`\`\`

Example 2:
\`\`\`
Input: lists = []
Output: []
\`\`\``,
    difficulty: 'hard',
    starterCode: `function mergeKLists(lists) {
  // Write your code here
}`,
    publicTestCases: [
      { id: '1', input: '[[1,4,5],[1,3,4],[2,6]]', expectedOutput: '[1,1,2,3,4,4,5,6]' },
      { id: '2', input: '[]', expectedOutput: '[]' },
    ],
    privateTestCases: [
      { id: '3', input: '[[]]', expectedOutput: '[]' },
      { id: '4', input: '[[1],[2],[3]]', expectedOutput: '[1,2,3]' },
    ],
  },
];
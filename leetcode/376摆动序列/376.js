/* 376. 摆动序列 https://leetcode.cn/problems/wiggle-subsequence/

如果连续数字之间的差严格地在正数和负数之间交替，则数字序列称为摆动序列。第一个差（如果存在的话）可能是正数或负数。少于两个元素的序列也是摆动序列。
例如， [1,7,4,9,2,5] 是一个摆动序列，因为差值 (6,-3,5,-7,3) 是正负交替出现的。相反, [1,4,7,2,5] 和 [1,7,4,5,5] 不是摆动序列，第一个序列是因为它的前两个差值都是正数，第二个序列是因为它的最后一个差值为零。
给定一个整数序列，返回作为摆动序列的最长子序列的长度。 通过从原始序列中删除一些（也可以不删除）元素来获得子序列，剩下的元素保持其原始顺序。
示例 1:
输入: [1,7,4,9,2,5]
输出: 6
解释: 整个序列均为摆动序列。
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var wiggleMaxLength = function(nums) {
  if(nums.length <= 1) return nums.length
  let res = 1
  let preDiff = 0
  let curDiff = 0
  for(let i = 0; i < nums.length - 1; i++) {
      curDiff = nums[i + 1] - nums[i]
      if((curDiff > 0 && preDiff <= 0) || (curDiff < 0 && preDiff >= 0)) {
          res++
          preDiff = curDiff
      }
  }
  return res
};


/* 
时间复杂度：O(n)，其中 nn 是序列的长度。我们只需要遍历该序列一次。
空间复杂度：O(1)。我们只需要常数空间来存放若干变量。
*/
const nums = [1,17,5,10,13,15,10,5,16,8]
console.log('输入的数组为:',nums);
const res = wiggleMaxLength(nums)
console.log('输出的结果为:',res);

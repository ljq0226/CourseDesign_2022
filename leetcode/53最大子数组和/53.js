/* 
53.最大字数组和 https://leetcode.cn/problems/maximum-subarray
给你一个整数数组 nums ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
子数组 是数组中的一个连续部分。
示例 1：
输入：nums = [-2,1,-3,4,-1,2,1,-5,4]
输出：6
解释：连续子数组 [4,-1,2,1] 的和最大，为 6 。
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {

  //动态规划解法
  // let pre = 0, max = nums[0]
  // nums.map((num) => {
  //   pre = Math.max(pre + num, num)
  //   max = Math.max(max, pre)
  // })
  // return max

  //贪心解法
  // let res = -Infinity
  // let count = 0
  // for (let i = 0; i < nums.length; i++) {
  //   count += nums[i]
  //   if (count > result) { // 取区间累计的最大值（相当于不断确定最大子序终止位置）
  //     result = count;
  //   }
  //   if (count <= 0) {// 相当于重置最大子序起始位置，因为遇到负数一定是拉低总和
  //     count = 0
  //   }
  // }
  // return res


};

/* 分治解法
时间复杂度： O(nlogn) - n 是数组长度
空间复杂度： O(logn) - 因为调用栈的深度最多是logn。
 */

// 我们把数组nums以中间位置（m)分为左（left)右(right)两部分. 那么有，
// left = nums[0]...nums[m - 1] 和 right = nums[m + 1]...nums[n-1]
// 最大子序列和的位置有以下三种情况：
// 考虑中间元素nums[m], 跨越左右两部分，这里从中间元素开始，往左求出后缀最大，往右求出前缀最大, 保持连续性。
// 不考虑中间元素，最大子序列和出现在左半部分，递归求解左边部分最大子序列和
// 不考虑中间元素，最大子序列和出现在右半部分，递归求解右边部分最大子序列和

function LSS(list) {
  return helper(list, 0, list.length - 1);
}
function helper(list, m, n) {
  if (m === n) return list[m];
  let sum = 0;
  let lmax = -Number.MAX_VALUE;
  let rmax = -Number.MAX_VALUE;
  const mid = ((n - m) >> 1) + m;

  const l = helper(list, m, mid);
  const r = helper(list, mid + 1, n);

  for (let i = mid; i >= m; i--) {
    sum += list[i];
    if (sum > lmax) lmax = sum;
  }

  sum = 0;

  for (let i = mid + 1; i <= n; i++) {
    sum += list[i];
    if (sum > rmax) rmax = sum;
  }

  return Math.max(l, r, lmax + rmax);
}

console.log(LSS([-2, 1, -3, 4, -1, 2, 1, -5, 4]));

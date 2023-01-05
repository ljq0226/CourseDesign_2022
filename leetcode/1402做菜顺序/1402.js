/* 
[1402做菜顺序](https://leetcode.cn/problems/reducing-dishes/)
一个厨师收集了他 n 道菜的满意程度 satisfaction ，这个厨师做出每道菜的时间都是 1 单位时间。
一道菜的 「喜爱时间」系数定义为烹饪这道菜以及之前每道菜所花费的时间乘以这道菜的满意程度，也就是 time[i] * satisfaction[i] 。
请你返回做完所有菜 「喜爱时间」总和的最大值为多少。
你可以按 任意 顺序安排做菜的顺序，你也可以选择放弃做某些菜来获得更大的总和。
示例 1：
输入：satisfaction = [-1,-8,0,5,-9]
输出：14
解释：去掉第二道和最后一道菜，最大的喜爱时间系数和为 (-1* 1 + 0* 2 + 5* 3 = 14) 。每道菜都需要花费 1 单位时间完成。

*/


/**
 * @param {number[]} satisfaction
 * @return {number}
 */
const maxSatisfaction = (satisfaction) => {
  const arr = satisfaction.sort((a, b) => a - b) //好货压轴
  let pre = 0
  let res = 0
  //暴力遍历出所有选择，在遍历右指针的时候并更新当前“喜爱时间”的最大值
  for (let i = 0; i < arr.length; i++) {
    pre = 0
    for (let j = i; j < arr.length; j++) {
      pre += satisfaction[j] * (j - i + 1)
      //贪心准则：当前满意度最大
      res = Math.max(res, pre)
    }
  }
  return res
}
const res = maxSatisfaction([-1,-8,0,5,-9])
console.log('最大满意度为',res);

/*
39.组合总和 https://leetcode.cn/problems/combination-sum  
题目描述：
给你一个 无重复元素 的整数数组 candidates 和一个目标整数 target ，找出 candidates 中可以使数字和为目标数 target 的 所有 不同组合 ，并以列表形式返回。你可以按 任意顺序 返回这些组合。
candidates 中的 同一个 数字可以 无限制重复被选取 。如果至少一个数字的被选数量不同，则两种组合是不同的。 

示例：输入：candidates = [2,3,6,7], target = 7
输出：[[2,2,3],[7]]
解释：
2 和 3 可以形成一组候选，2 + 2 + 3 = 7 。注意 2 可以使用多次。
7 也是一个候选， 7 = 7 。
仅有这两种组合。
链接：*/



/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function (candidates, target) {
  const res = []
  const path = []
  candidates.sort((a, b) => a - b)
  const dfs = (index, sum) => {
    if (sum === target) {
      res.push(Array.from(path))
      return
    }
    for (let i = index; i < candidates.length; i++) {
      const n = candidates[i]
      //如果下一层的sum（就是本层的 sum + candidates[i]）已经大于target，就可以结束本轮for循环的遍历
      if (n > target - sum) break

      path.push(n)
      sum += n
      dfs(i, sum)
      //当满足递归终止条件时，将path[]和sum清零
      path.pop()
      sum -= n
    }
  }
  dfs(0, 0)
  return res
};


const candidates = [2,3,6,7]
const target = 7
console.log('输入的cadidates为:',candidates);
const res = combinationSum(candidates, target)
console.log('输出的结果为:',res)

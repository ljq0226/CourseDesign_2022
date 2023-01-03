/* 
给定一个字符串 s 和一个字符串 t ，计算在 s 的子序列中 t 出现的个数。
字符串的一个 子序列 是指，通过删除一些（也可以不删除）字符且不干扰剩余字符相对位置所组成的新字符串。（例如，"ACE" 是 "ABCDE" 的一个子序列，而 "AEC" 不是）
题目数据保证答案符合 32 位带符号整数范围。
示例 1：
输入：s = "rabbbit", t = "rabbit"
输出：3
解释：
如下图所示, 有 3 种可以从 s 中得到 "rabbit" 的方案。
rab bbit
rabb bit
rabbb it
*/
const numDistinct = (s, t) => {
  //1.定义dp数组：dp[i][j]：以i-1为结尾的s子序列中出现以j-1为结尾的t的个数为dp[i][j]。
  let dp = Array.from(Array(s.length + 1), () => Array(t.length + 1).fill(0));

  //2.初始化dp dp[i][0]:把以i-1为结尾的s，删除所有元素，出现空字符串的个数就是1 
  //dp[0][j]与之相反
  for (let i = 0; i <= s.length; i++) {
    dp[i][0] = 1;
  }

  for (let i = 1; i <= s.length; i++) {
    for (let j = 1; j <= t.length; j++) {
      if (s[i - 1] === t[j - 1]) {
        //相等的话，dp[i][j]可以有两部分组成。  一部分是用s[i - 1]来匹配，那么个数为dp[i - 1][j - 1]，  一部分是不用s[i - 1]来匹配，个数为dp[i - 1][j]。
        dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j];
      } else {
        //不相等的话，dp[i][j]只有一部分组成，不用s[i - 1]来匹配，即：dp[i - 1][j]
        dp[i][j] = dp[i - 1][j]
      }
    }
  }

  return dp[s.length][t.length];
};

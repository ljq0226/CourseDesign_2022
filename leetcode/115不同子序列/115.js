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
        //不用s[i - 1]来匹配，都相同了指定要匹配啊。
        //例如： s：bagg 和 t：bag ，s[3] 和 t[2]是相同的，但是字符串s也可以不用s[3]来匹配，即用s[0]s[1]s[2]组成的bag。
        dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j];
      } else {
        //不相等的话，dp[i][j]只有一部分组成，不用s[i - 1]来匹配，即：dp[i - 1][j]
        dp[i][j] = dp[i - 1][j]
      }
    }
  }

  return dp;
};
const s1 = 'baegg'
const s2 = 'bag'
const dp = numDistinct(s1, s2)
console.log('dp数组为:', dp);
console.log('从s1到s2有:', dp[s1.length][s2.length], '种方案');
/* 
时间复杂度：O(mn)，其中 m 和 n 分别是字符串 s 和 t 的长度。二维数组 dp 有 m+1m+1 行和 n+1n+1 列，需要对 dp 中的每个元素进行计算。
空间复杂度：O(mn)，其中 m 和 n 分别是字符串 s 和 t 的长度。创建了m+1 行 n+1 列的二维数组 dp。
*/

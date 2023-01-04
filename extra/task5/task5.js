const SCORING_MATRIX = {
  A: { A: 5, C: -1, G: -2, T: -1, "-": -3 },
  C: { A: -1, C: 5, G: -3, T: -2, "-": -4 },
  G: { A: -2, C: -3, G: 5, T: -2, "-": -2 },
  T: { A: -1, C: -2, G: -2, T: 5, "-": -1 },
  "-": { A: -3, C: -4, G: -2, T: -1, "-": 0 }
};
//操作DOM
const tbody = document.querySelector('.tableList')
const thead = document.querySelector('.thead')
const res_du = document.querySelector('.res_du')
const res_str = document.querySelector('.res_str')

//动态规划
function align(s1, s2) {
  console.log(s1, s2);
  // 初始化dp数组
  const dp = Array(s1.length + 1).fill(null).map(() => Array(s2.length + 1).fill(0));

  // 首先对第一行和第一列进行初始化
  // 因为它们都是只能从一种状态变换过来，所以直接赋值即可
  for (let i = 1; i <= s1.length; i++) {
    dp[i][0] = SCORING_MATRIX[s1[i - 1]]["-"] + dp[i - 1][0];
  }
  for (let j = 1; j <= s2.length; j++) {
    dp[0][j] = SCORING_MATRIX["-"][s2[j - 1]] + dp[0][j - 1];
  }
  // 计算dp数组
  for (let i = 1; i <= s1.length; i++) {
    for (let j = 1; j <= s2.length; j++) {
      dp[i][j] = Math.max(
        dp[i - 1][j - 1] + SCORING_MATRIX[s1[i - 1]][s2[j - 1]],
        dp[i - 1][j] + SCORING_MATRIX[s1[i - 1]]["-"],
        dp[i][j - 1] + SCORING_MATRIX["-"][s2[j - 1]]
      );
    }
  }

  showBestWay(dp, s1, s2)
  showList(dp, s1, s2)
  console.log(dp);
  // 返回最后一个元素的值，即最大分数
  return dp[s1.length][s2.length];
}
align("AGTGATG", "GTTAG")


// 输出最佳对齐方法
function showBestWay(dp, arr1, arr2) {
  const m = dp.length;
  const n = dp[0].length;
  const list = [];
  // 手动把终点的索引加入列表，从终点向后回溯
  list.push([m - 1, n - 1]);
  dfs(dp, arr1, arr2, m - 1, n - 1, list);
  // 使用栈倒转列表，方便从起点开始描述路径
  const stack = [];
  for (let i = 0; i < best.length; i++) {
    stack.push(best[i]);
  }
  // 双指针，分别记录两个基因序列的索引
  let index1 = 0;
  let index2 = 0;
  // 使用两个StringBuilder分别保存两个基因序列
  const sb1 = [];
  const sb2 = [];
  // 记录当前的位置，初始值为起点
  let nowX = 0;
  let nowY = 0;
  while (stack.length > 0) {
    const pop = stack.pop();
    const x = pop[0];
    const y = pop[1];
    if (x > nowX && y > nowY) { // 向右下移动了
      sb1.push(arr1[index1++]);
      sb2.push(arr2[index2++]);
    } else if (x > nowX) { // 向下移动了
      sb1.push(arr1[index1++]);
      sb2.push("-");
    } else { // 向右移动了
      sb2.push(arr2[index2++]);
      sb1.push("-");
    }
    // 更新当前位置
    nowX = x;
    nowY = y;
  }

  res_du.innerHTML = `
  ${dp[m - 1][n - 1]}
  `
  res_str.innerHTML = `
  <p class=""> ${sb1.join("")}</p>
  <p class=""> ${sb2.join("")}</p>
  `


}
function dfs(dp, arr1, arr2, x, y, list) {
  // 当列表中的元素足够多时，停止搜索
  if (list.length === dp.length - 1) {
    best = [...list];
    return;
  }
  const dirs = [[-1, 0], [0, -1], [-1, -1]];
  const s = [SCORING_MATRIX[arr1[x - 1]]['-'],
  SCORING_MATRIX['-'][arr2[y - 1]],
  SCORING_MATRIX[arr1[x - 1]][arr2[y - 1]]]
  for (let i = 0; i < dirs.length; i++) {
    const x1 = x + dirs[i][0];
    const y1 = y + dirs[i][1];
    if (x1 < 0 || y1 < 0 || dp[x][y] - s[i] !== dp[x1][y1]) {
      continue;
    }
    const temp = [x1, y1];
    list.push(temp);
    dfs(dp, arr1, arr2, x1, y1, list);
    list.pop();
  }
}


//页面渲染
function showList(dp, s1, s2) {
  thead.innerHTML = ``
  tbody.innerHTML = ``

  thead.innerHTML += `
    <th></th> 
    <th></th> 
  `
  for (let i = 0; i < s2.length; i++) {
    thead.innerHTML += `
    <th>${s2[i]}</th> 
    `
  }
  tbody.innerHTML += `
  <tr>
  <th>
  </th>
  </tr>
  `
  for (let i = 0; i < dp.length; i++) {
    tbody.innerHTML += `
    <tr>
    <th>
    ${s1[i]}
    </th>
    </tr>
    `
    for (let j = 0; j < dp[0].length; j++) {
      tbody.children[i].innerHTML += `
      <td>${dp[i][j]}</td>
      `
    }
  }
}

function showGene() {
  const str1 = document.querySelector('.str1')
  const str2 = document.querySelector('.str2')
  align(str1.value, str2.value)
}
document.querySelector('.gene').addEventListener('click', showGene)

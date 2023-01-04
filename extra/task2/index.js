const grid = Array(9).fill(null).map(() => Array(9).fill(0)); // 图的邻接矩阵
const goods = Array(9).fill(null).map(() => Array(2).fill(0));; // 货物的目的地及重量
const weight = Array(9).fill(0)
// 初始化矩阵
function init() {
  initGrid();
  initGoods();
}

function initGrid() {
  // 初始化图的邻接矩阵
  grid[0][8] = 1;
  grid[0][6] = 2;
  grid[0][4] = 1;
  grid[0][2] = 1;
  grid[1][8] = 1;
  grid[1][7] = 1;
  grid[1][2] = 1;
  grid[2][3] = 1;
  grid[3][7] = 2;
  grid[3][4] = 2;
  grid[4][5] = 2;
  grid[5][6] = 2;
  grid[7][8] = 2;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid.length; j++) {
      if (grid[i][j] !== 0) {
        grid[j][i] = grid[i][j];
      }
    }
  }
}

function initGoods() {

  goods[1][0] = 1
  goods[1][1] = 60
  goods[2][0] = 2
  goods[2][1] = 50
  goods[3][0] = 3
  goods[3][1] = 40
  goods[4][0] = 4
  goods[4][1] = 35

}


let min = Number.MAX_VALUE;
const MAX = 20;
let visNums;
let ans;
//问题1
function question1() {
  const n = grid.length;
  // 记录每个小区有无货物
  const hasGoods = new Array(n).fill(0);
  // 统计有货物的小区总数
  let less = 0;
  for (let i = 0; i < goods.length; i++) {
    const k = goods[i][0];
    if (hasGoods[k] === 0) {
      hasGoods[k] = 1;
      less++;
    }
    weight[k] += goods[i][1]
  }
  less--//4

  visNums = new Array(grid.length).fill(0);
  dfs(hasGoods, less, 0, 0, "0");
  console.log(`问题一：最短路程为: ${min}`);
  console.log('问题一：最短路径为:', ans);
}

function dfs(hasGoods, less, now, sum, path) {
  // 递归出口
  if (less === 0) {
    if (sum < min) {
      min = sum;
      ans = path;
    }
    return;
  }
  // 限制递归深度
  if (sum > MAX) {
    return;
  }
  path += "->";
  for (let i = 1; i < hasGoods.length; i++) {
    if (grid[now][i] !== 0) { // 如果下一个小区和当前所在的小区存在边
      path += i;
      if (hasGoods[i] === 1) { // 将要访问的小区有包裹
        hasGoods[i] = 0; // 设置为已投递
        dfs(hasGoods, less - 1, i, sum + grid[now][i], path);
        hasGoods[i] = 1; // 恢复为未投递
      } else { // 将要访问的小区没有包裹
        dfs(hasGoods, less, i, sum + grid[now][i], path);
      }
      path = path.slice(0, -1);
    }
  }
  path = path.slice(0, -2);
}



//问题2

function question2() {
  // 存储每一趟的剩余可装重量
  const list = [];
  for (let i = 0; i < goods.length; i++) {
    const weight = goods[i][1];
    let min = Number.MAX_VALUE;
    let k = 0;
    // console.log(`i:${i}    weight:${weight}`);
    // console.log(`1--${list}`);
    // 遍历所有趟的剩余
    for (let j = 0; j < list.length; j++) {
      const size = list[j];
      // console.log(`j:${j}    size:${size}`);

      if (size >= weight) {
        if (size - weight < min) {
          min = size - weight;
          k = j;
        }
      }
    }
    if (min !== Number.MAX_VALUE) {
      // console.log(`min:  ${min}`);
      const remove = list[k];
      list.splice(k, 1);
      list.push(remove - weight);
    } else {
      list.push(100 - weight);
    }
    // console.log(`2--${list}`);
  }
  console.log(`问题二：最少需要的趟数: ${list.length}`);
}




init()
question1()
question2()

function dijkstra(graph, start) {
  // 初始化
  let n = graph.length
  let dist = new Array(n).fill(Infinity)
  let prev = new Array(n).fill(null)
  let visited = new Array(n).fill(false)
  dist[start] = 0

  // 循环更新最短路径
  while (true) {
    let curr = null
    let currDist = Infinity
    for (let i = 0; i < n; i++) {
      if (!visited[i] && dist[i] < currDist) {
        curr = i
        currDist = dist[i]
      }
    }
    if (curr == null) {
      break
    }
    visited[curr] = true
    for (let i = 0; i < n; i++) {
      if (visited[i]) {
        continue
      }
      let newDist = dist[curr] + graph[curr][i]
      if (newDist < dist[i]) {
        dist[i] = newDist
        prev[i] = curr
      }
    }
  }

  // 返回最短路径信息
  return {
    dist: dist,
    prev: prev
  }
}

// 示例：使用 Dijkstra 算法求解从 0 号点到其他点的最短路径
let graph = [
  [0, 2, 4, 1, Infinity],
  [2, 0, 1, 4, 3],
  [4, 1, 0, 1, 2],
  [1, 4, 1, 0, 4],
  [Infinity, 3, 2, 4, 0]
]
let result = dijkstra(graph, 0)
console.log(result.dist) // [0, 2, 3, 1, 4]
console.log(result.prev) // [null, 0, 0, 0, 2]


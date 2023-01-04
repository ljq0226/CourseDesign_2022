
var points = []

//一些DOM操作
const getShapeBtn = document.querySelector('.getShapeBtn')
const bruceBtn = document.querySelector('.bruce')
const alertText = document.querySelector('.alert')
const clearBtn = document.querySelector('.clearBtn')
const inputY = document.querySelector('.textY')
const inputGroups = document.querySelector('.inputGroups')
const pointsDiv = document.querySelector('.pointsDiv')
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');


function init() {
  // 初始化实例 
  // const testPoints = [[50, 30], [200, 100], [300, 200], [300, 250], [300, 300], [400, 400]];
  const testPoints = [[133, 210], [10, 100], [331, 230], [40, 250], [300, 300], [400, 230]];
  draw(testPoints)
  console.time('Andrew')
  const andrewPoints = convexHull(testPoints)
  console.timeEnd('Andrew')
  console.time('bruteForce')
  let bruteForcePoints = bruteForce(testPoints);
  console.timeEnd('bruteForce')
  //console.log('Andrew算法生成的点',andrewPoints);
  //console.log('暴力算法生成的点',bruteForcePoints);
  drawShape(andrewPoints)
}
init()

/*
绑定交互事件
 */

//给input输入框增加键盘事件
inputY.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    // 触发 enter 键盘事件
    let point = [inputGroups.children[0].value, inputGroups.children[1].value]
    point = point.map(item => +item)
    points.push(point)
    let str = ''
    for (let i = 0; i < points.length; i++) {
      str += `${i}: [${points[i]}]  `
    }
    pointsDiv.innerHTML = `${str}`
    inputGroups.children[0].value = ''
    inputGroups.children[1].value = ''
  }
})

clearBtn.onclick = clearCanvas
getShapeBtn.onclick = () => {
  //绘制点
  draw(points)
  const hull = convexHull(points);
  setTimeout(() => {
    drawShape(hull)
  }, 1000);
}

/* 
Andrew求解
*/
function convexHull(points) {
  // 将点按照横坐标升序排序
  points.sort((a, b) => a[0] - b[0]);

  // 通过 Andrew(安德鲁)算法求凸包
  const n = points.length;
  let stack = [];

  //最左边的点出发，然后一次枚举下一个点，如果下一个点在栈顶向量延长线的左侧
  //（注意这里栈顶向量指的是栈顶第二个点指向站顶点的向量），那么我们就删去栈顶这个点，将新点入栈；
  //若下一个点在栈顶那个向量延长线的右侧，就不用将栈顶点出栈，直接将新点入栈即可。这样找到最右边的点时，上边界就确定完了。

  // 上凸包（从左到右维护上半部分的边界）
  for (let i = 0; i < n; i++) {
    //两向量的叉积正负值来判断在左侧还是在右侧，若为正，则在左侧；若为负，则在右侧。
    while (stack.length >= 2 && cross(stack[stack.length - 2], stack[stack.length - 1], points[i]) <= 0) {
      // stack.pop();
      console.log('stack pop:',stack.pop());
    }
    console.log('i:',i,"points:",points[i]);
    stack.push(points[i]);
  }


  // 下凸包(从右到左维护下半部分的边界)
  for (let i = n - 1, t = stack.length + 1; i >= 0; i--) {
    while (stack.length >= t && cross(stack[stack.length - 2], stack[stack.length - 1], points[i]) <= 0) {
      // stack.pop();
      console.log('stack pop:',stack.pop());
    }
    console.log('j:',i,"points:",points[i]);
    stack.push(points[i]);
  }
  console.log(stack);
  stack.pop();
  return stack;
}

// 计算向量 OA 和 OB 的叉积
function cross(O, A, B) {
  return (A[0] - O[0]) * (B[1] - O[1]) - (A[1] - O[1]) * (B[0] - O[0]);
}


/*
画点的 
 */
function draw(points) {

  ctx.beginPath();
  const radius = 5
  const len = points.length
  for (let i = 0; i < points.length - 1; i++) {
    ctx.arc(points[i][0], points[i][1], radius, 0, 2 * Math.PI);
    ctx.fill()
    ctx.fillStyle = 'green';
    ctx.strokeText(`[${points[i][0]} , ${points[i][1]}]`, points[i][0] + 10, points[i][1]);
    ctx.moveTo((points[i + 1][0] + radius), points[i + 1][1]);
  }
  ctx.arc(points[len - 1][0], points[len - 1][1], radius, 0, 2 * Math.PI);
  ctx.fill()
  ctx.fillStyle = 'green';
  ctx.strokeText(`${points[len - 1][0]} , ${points[len - 1][1]}`, points[len - 1][0] + 10, points[len - 1][1]);
  ctx.stroke();
}

/*
画线段的 
 */
function drawShape(hull) {
  ctx.beginPath();
  ctx.moveTo(hull[0][0], hull[0][1]);
  for (let i = 1; i < hull.length; i++) {
    ctx.lineTo(hull[i][0], hull[i][1]);
  }

  ctx.closePath();
  ctx.fillStyle = 'purple';
  ctx.stroke();
}
/* 
清除幕布
*/
function clearCanvas() {
  const w = 500;
  const h = 500;
  canvas.width = w;
  canvas.height = h;
}


/* 
暴力法
*/
function bruteForce(points) {
  let convexHullPoints = new Set();

  for (let i = 0; i < points.length; i++) {
    let point1 = points[i];
    for (let j = i + 1; j < points.length; j++) {
      let point2 = points[j];
      let oneSide = 0;
      let otherSide = 0;
      for (let k = 0; k < points.length; k++) {
        let point = points[k];
        let temp = calculate(point1, point2, point);
        if (temp > 0) {
          oneSide++;
        } else if (temp < 0) {
          otherSide++;
        }
      }
      if (oneSide == 0 || otherSide == 0) {
        convexHullPoints.add(point1);
        convexHullPoints.add(point2);
      }
    }
  }
  return Array.from(convexHullPoints);
}
// 计算一个点相对于由另外两个点定义的直线的位置
function calculate(point1, point2, point) {
  let x1 = point1[0];
  let y1 = point1[1];
  let x2 = point2[0];
  let y2 = point2[1];
  let x = point[0];
  let y = point[1];
  let a = y2 - y1;
  let b = x1 - x2;
  let c = x1 * y2 - y1 * x2;
  return a * x + b * y - c;
}


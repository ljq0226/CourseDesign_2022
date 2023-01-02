


const getShapeBtn = document.querySelector('.getShapeBtn')
const bruceBtn = document.querySelector('.bruce')
const alertText = document.querySelector('.alert')
const clearBtn = document.querySelector('.clearBtn')
const inputY = document.querySelectorAll('.textY')
const inputGroups = document.querySelector('.inputGroups')
const pointsDiv = document.querySelector('.pointsDiv')
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');


function init(){
  const testPoints =[[50, 30], [200, 100], [300, 200], [300, 250], [300, 300], [400, 400]];
  draw(testPoints)
  const testHullPoints = convexHull(testPoints)
  drawShape(testHullPoints)
}

var points = []
init()

for (const input of inputY) {
  input.addEventListener('keydown', event => {
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
}

function clearCanvas() {
  const w = 500;
  const h = 500;
  canvas.width = w;
  canvas.height = h;
}

clearBtn.onclick = clearCanvas


getShapeBtn.onclick = () => {

  //绘制点
  draw(points)
  const hull = convexHull(points);
  setTimeout(() => {
    drawShape(hull)
  }, 1000);
  //绘制凸包

}



function convexHull(points) {
  // 将点按照横坐标升序排序
  points.sort((a, b) => a[0] - b[0]);

  // 通过 Andrew 算法求凸包
  const n = points.length;
  let hull = [];

  // 下凸包
  for (let i = 0; i < n; i++) {
    while (hull.length >= 2 && cross(hull[hull.length - 2], hull[hull.length - 1], points[i]) <= 0) {
      hull.pop();
    }
    hull.push(points[i]);
  }

  // 上凸包
  for (let i = n - 1, t = hull.length + 1; i >= 0; i--) {
    while (hull.length >= t && cross(hull[hull.length - 2], hull[hull.length - 1], points[i]) <= 0) {
      hull.pop();
    }
    hull.push(points[i]);
  }

  hull.pop();
  return hull;
}

// 计算向量 OA 和 OB 的叉积
function cross(O, A, B) {
  return (A[0] - O[0]) * (B[1] - O[1]) - (A[1] - O[1]) * (B[0] - O[0]);
}

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





function draw(points) {

  ctx.beginPath();
  console.log(points);
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



const canvas = document.querySelector('canvas');
const generateButton = document.querySelector('.generate-tree-btn');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

let curve;

function drawTree(startX, startY, len, angle, branchWidth, color1, color2) {
    ctx.beginPath();
    ctx.save();
    ctx.strokeStyle = color1;
    ctx.fillStyle = color2;
    ctx.shadowBlur = 95;
    // = rgba(255,255,255,.5) black, white depending on bkgnd
    ctx.shadowColor = 'green';
    ctx.lineWidth = branchWidth;
    ctx.translate(startX, startY);
    ctx.rotate(angle * Math.PI/180);
    ctx.moveTo(0, 0);
    // ctx.lineTo(0, -len);
    // ctx.bezierCurveTo(10, -len/2, 40, -len/2, 0, -len);
    // add randomness to bezierCurves
    if(angle > 0) {
        ctx.bezierCurveTo(10, -len/2, 10, -len/2, 0, -len);
    } else {
        ctx.bezierCurveTo(10, -len/2, -10, -len/2, 0, -len);
    }
    ctx.stroke();

    if(len < 10) {
        ctx.beginPath();
        ctx.arc(0, -len, 10, 0, 1*Math.PI/3);
        ctx.fill();
        ctx.restore();
        return;
    }

    curve = (Math.random() * 10) + 10;

    drawTree(0, -len, len * 0.75, angle + curve, branchWidth * 0.5);
    drawTree(0, -len, len * 0.75, angle - curve, branchWidth * 0.5);

    ctx.restore();
}

drawTree(canvas.width/2, canvas.height - 80, 180, 0, 20, 'brown', 'green');

function generateRandomTree() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let centerX = canvas.width/2;
    let len = Math.floor((Math.random() * 100) + 100); // mul 80
    let angle = 0;
    let branchWidth = (Math.random() * 90) + 1; //140
    let color1 = `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`;
    let color2 = `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`;
    // curve = (Math.random() * 10) + 10;
    generateButton.style.background = color1;

    drawTree(centerX, canvas.height - 80, len, angle, branchWidth, color1, color2);
}

generateButton.addEventListener('click', generateRandomTree)
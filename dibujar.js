const canvas = document.getElementById('miCanvas');
const ctx = canvas.getContext('2d');
let img = new Image();
let startX, startY;
let isDrawing = false;
const circles = [];

// Manejar la carga de imágenes
document.getElementById('imageLoader').addEventListener('change', handleImage, false);

function handleImage(e) {
    const reader = new FileReader();
    reader.onload = function(event) {
        img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;
            drawImage();
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(e.target.files[0]);
}

function drawImage() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    // Dibujar círculos
    circles.forEach(circle => {
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
        ctx.strokeStyle = 'red';
        ctx.stroke();
        ctx.lineWidth = 2;
        ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
        ctx.fill();
    });
}

// Manejo de eventos de dibujo con el mouse
canvas.addEventListener('mousedown', (event) => {
    const rect = canvas.getBoundingClientRect();
    startX = (event.clientX - rect.left) * (canvas.width / rect.width);
    startY = (event.clientY - rect.top) * (canvas.height / rect.height);
    isDrawing = true;
});

canvas.addEventListener('mousemove', (event) => {
    if (isDrawing) {
        const rect = canvas.getBoundingClientRect();
        const endX = (event.clientX - rect.left) * (canvas.width / rect.width);
        const endY = (event.clientY - rect.top) * (canvas.height / rect.height);
        
        const radius = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
        
        drawImage(); // Redibujar la imagen y los círculos existentes
        
        ctx.beginPath();
        ctx.arc(startX, startY, radius, 0, 2 * Math.PI);
        ctx.strokeStyle = 'red';
        ctx.stroke();
        ctx.lineWidth = 2;
        ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
        ctx.fill();
    }
});

canvas.addEventListener('mouseup', (event) => {
    if (isDrawing) {
        const rect = canvas.getBoundingClientRect();
        const endX = (event.clientX - rect.left) * (canvas.width / rect.width);
        const endY = (event.clientY - rect.top) * (canvas.height / rect.height);
        
        const radius = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
        
        const areaName = prompt("Ingrese el nombre de la parte seleccionada:");
        if (areaName) {
            circles.push({ x: startX, y: startY, radius: radius, name: areaName });
            drawImage();
            updateSelectedAreas();
        } else {
            alert("Debe ingresar un nombre para la parte seleccionada.");
        }
        isDrawing = false;
    }
});

// Manejo de eventos táctiles
canvas.addEventListener('touchstart', (event) => {
    const rect = canvas.getBoundingClientRect();
    const touch = event.touches[0];
    startX = (touch.clientX - rect.left) * (canvas.width / rect.width);
    startY = (touch.clientY - rect.top) * (canvas.height / rect.height);
    isDrawing = true;
    event.preventDefault();
});

canvas.addEventListener('touchmove', (event) => {
    if (isDrawing) {
        const rect = canvas.getBoundingClientRect();
        const touch = event.touches[0];
        const endX = (touch.clientX - rect.left) * (canvas.width / rect.width);
        const endY = (touch.clientY - rect.top) * (canvas.height / rect.height);
        
        const radius = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
        
        drawImage(); // Redibujar la imagen y los círculos existentes
        
        ctx.beginPath();
        ctx.arc(startX, startY, radius, 0, 2 * Math.PI);
        ctx.strokeStyle = 'red';
        ctx.stroke();
        ctx.lineWidth = 2;
        ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
        ctx.fill();
    }
    event.preventDefault();
});

canvas.addEventListener('touchend', (event) => {
    if (isDrawing) {
        const rect = canvas.getBoundingClientRect();
        const touch = event.changedTouches[0];
        const endX = (touch.clientX - rect.left) * (canvas.width / rect.width);
        const endY = (touch.clientY - rect.top) * (canvas.height / rect.height);
        
        const radius = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
        
        const areaName = prompt("Ingrese el nombre de la parte seleccionada:");
        if (areaName) {
            circles.push({ x: startX, y: startY, radius: radius, name: areaName });
            drawImage();
            updateSelectedAreas();
        } else {
            alert("Debe ingresar un nombre para la parte seleccionada.");
        }
        isDrawing = false;
    }
    event.preventDefault();
});

// Actualizar la lista de áreas seleccionadas
function updateSelectedAreas() {
    const areasDiv = document.getElementById('selectedAreas');
    areasDiv.innerHTML = '';
    circles.forEach((circle, index) => {
        const div = document.createElement('div');
        div.className = 'selected-area';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `area_${index}`;
        checkbox.value = circle.name;
        checkbox.checked = true;

        const label = document.createElement('label');
        label.htmlFor = `area_${index}`;
        label.textContent = circle.name;

        div.appendChild(checkbox);
        div.appendChild(label);
        areasDiv.appendChild(div);
    });
}

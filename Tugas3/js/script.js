// script.js handles the custom color picker modal
// we rely on the helper functions defined below and the element IDs

// state variables used by modal picker logic
let currentTarget = null;
let selectedColor = null;
let customColorsList = JSON.parse(localStorage.getItem('customColors') || '[]');

// ... remaining code follows unchanged


const mainColors = [
    '#EF4444', '#F97316', '#EAB308', '#22C55E', '#93B5D0', '#A855F7', '#F59E0B', '#9CA3AF',
    '#CC2222', '#EA7700', '#D4A017', '#65B32E', '#4A7BA7', '#7B3F9E', '#CC8800', '#4B5563',
    '#991B1B', '#C2410C', '#A16207', '#4D7C0F', '#1E40AF', '#6B21A8', '#B45309', '#1F2937'
];

const grayColors = [
    '#000000', '#1F2937', '#6B7280', '#9CA3AF', '#B0B0B0', '#D1D5DB', '#E5E7EB', '#FFFFFF'
];


function buildGrid() {
    const colorGrid = document.getElementById('colorGrid');
    colorGrid.innerHTML = '';
    mainColors.forEach(color => {
        const swatch = document.createElement('div');
        swatch.className = 'color-swatch';
        swatch.style.backgroundColor = color;
        swatch.dataset.color = color;
        swatch.onclick = () => pickSwatch(swatch, color);
        colorGrid.appendChild(swatch);
    });

    const grayGrid = document.getElementById('grayGrid');
    grayGrid.innerHTML = '';
    grayColors.forEach(color => {
        const swatch = document.createElement('div');
        swatch.className = 'color-swatch';
        swatch.style.backgroundColor = color;
        swatch.dataset.color = color;
        swatch.onclick = () => pickSwatch(swatch, color);
        grayGrid.appendChild(swatch);
    });

    buildCustomGrid();
}

function buildCustomGrid() {
    const container = document.getElementById('customColors');
    container.innerHTML = '';

    const addDiv = document.createElement('div');
    addDiv.className = 'custom-add';
    addDiv.innerHTML = '+<input type="color" id="customColorInput" onchange="addCustomColor(this.value)">';
    container.appendChild(addDiv);

    customColorsList.forEach(color => {
        const swatch = document.createElement('div');
        swatch.className = 'color-swatch';
        swatch.style.backgroundColor = color;
        swatch.dataset.color = color;
        swatch.onclick = () => pickSwatch(swatch, color);
        container.appendChild(swatch);
    });
}

function pickSwatch(swatch, color) {
    document.querySelectorAll('.color-swatch.selected').forEach(s => s.classList.remove('selected'));
    swatch.classList.add('selected');
    selectedColor = color;
}

function openPicker(target) {
    currentTarget = target;
    selectedColor = null;

    document.querySelectorAll('.color-swatch.selected').forEach(s => s.classList.remove('selected'));

    let currentColor;
    if (target === 'bg') {
        currentColor = document.getElementById('bgColorBox').style.backgroundColor;
    } else {
        currentColor = document.getElementById('textColorBox').style.backgroundColor;
    }

    if (currentColor) {
        const hex = rgbToHex(currentColor);
        const allSwatches = document.querySelectorAll('.color-swatch');
        allSwatches.forEach(s => {
            if (s.dataset.color && s.dataset.color.toUpperCase() === hex.toUpperCase()) {
                s.classList.add('selected');
                selectedColor = hex;
            }
        });
    }

    document.getElementById('modalOverlay').classList.add('active');
}

function closePicker() {
    document.getElementById('modalOverlay').classList.remove('active');
    currentTarget = null;
    selectedColor = null;
}

function selectColor() {
    if (!selectedColor || !currentTarget) {
        closePicker();
        return;
    }

    if (currentTarget === 'bg') {
        document.getElementById('bgColorBox').style.backgroundColor = selectedColor;
    } else {
        document.getElementById('textColorBox').style.backgroundColor = selectedColor;
    }

    closePicker();
}

function addCustomColor(color) {
    if (!customColorsList.includes(color)) {
        customColorsList.push(color);
        localStorage.setItem('customColors', JSON.stringify(customColorsList));
        buildCustomGrid();
    }
}

function rgbToHex(rgb) {
    if (rgb.startsWith('#')) return rgb;
    const result = rgb.match(/\d+/g);
    if (!result) return rgb;
    return '#' + result.slice(0, 3).map(x => {
        const hex = parseInt(x).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    }).join('');
}

document.getElementById('simpanBtn').addEventListener('click', function () {
    const bgColor = rgbToHex(document.getElementById('bgColorBox').style.backgroundColor);
    const textColor = rgbToHex(document.getElementById('textColorBox').style.backgroundColor);

    document.body.style.backgroundColor = bgColor;
    document.body.style.color = textColor;
    document.querySelector('h1').style.color = textColor;

    localStorage.setItem('bgColor', bgColor);
    localStorage.setItem('textColor', textColor);
});

window.addEventListener('load', function () {
    buildGrid();

    // set defaults; localStorage will override if present
    const defaultBg = '#3f6aa3';
    const defaultText = 'red';
    document.getElementById('bgColorBox').style.backgroundColor = defaultBg;
    document.getElementById('textColorBox').style.backgroundColor = defaultText;

    const savedBg = localStorage.getItem('bgColor');
    const savedText = localStorage.getItem('textColor');

    if (savedBg) {
        document.getElementById('bgColorBox').style.backgroundColor = savedBg;
        document.body.style.backgroundColor = savedBg;
    }
    if (savedText) {
        document.getElementById('textColorBox').style.backgroundColor = savedText;
        document.body.style.color = savedText;
        document.querySelector('h1').style.color = savedText;
    }
});
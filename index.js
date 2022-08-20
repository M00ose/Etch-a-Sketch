//------------------- ELEMENTS ---------------------


const buttons = document.querySelectorAll(".btn");
const defaultBtn = document.querySelector(".color");
const activeBtn = document.getElementById('btn-active');
const editGridBtn = document.querySelector(".grid");
const resizeBtn = document.querySelector(".resize");
const slider = document.getElementById("slider");
const selector = document.getElementById("selector");
const sliderValue = document.getElementById("slider-value");
const heightInput = document.querySelector('.height');
const widthInput = document.querySelector('.width');
const grid = document.querySelector('.grid-wrapper');
let size = slider.value;
let colorSelect = '#333333';
let btnMode = activeBtn.attributes.class.value;

function sizeGrid(){
   for (var i = 0; i < (size*size); i++){
        const squareElement = document.createElement('div')
        squareElement.classList.add('square');
        squareElement.addEventListener('mouseover', color);
        grid.appendChild(squareElement);
    } 
}

editGridBtn.addEventListener('click',function(){
    size = slider.value;
    grid.style.gridTemplateColumns = `repeat(${size} ,1fr)`

    sizeGrid();

    //return to color mode by default
    editGridBtn.id = "btn-inactive";
    defaultBtn.id = "btn-active";
    btnMode = "btn color";
    colorSelect = '#333333';
});

//----------------- COLOR PICKER -------------------
const pickr = Pickr.create({
    el: '.color-picker',
    theme: 'classic',

    swatches: [
        'rgba(244, 67, 54, 1)',
        'rgba(233, 30, 99, 0.95)',
        'rgba(156, 39, 176, 0.9)',
        'rgba(103, 58, 183, 0.85)',
        'rgba(63, 81, 181, 0.8)',
        'rgba(33, 150, 243, 0.75)',
        'rgba(3, 169, 244, 0.7)',
        'rgba(0, 188, 212, 0.7)',
        'rgba(0, 150, 136, 0.75)',
        'rgba(76, 175, 80, 0.8)',
        'rgba(139, 195, 74, 0.85)',
        'rgba(205, 220, 57, 0.9)',
        'rgba(255, 235, 59, 0.95)',
        'rgba(255, 193, 7, 1)'
    ],

    components: {

        // Main components
        preview: true,
        opacity: true,
        hue: true,

        // Input / output Options
        interaction: {
            hex: true,
            rgba: true,
            input: true,
            save: true
        }
    }
});

pickr.on('change', (color) => {
    colorSelect = color.toRGBA().toString();
}).on('save',(color) => {
    colorSelect = color.toRGBA().toString();
    pickr.hide();
}).on('swatchselect', (color) => {
    colorSelect = color.toRGBA().toString();
    pickr.hide();
});

//-------------------- BUTTONS ----------------------

buttons.forEach(element => {
    element.addEventListener("click",function(){
        btnMode = this.attributes.class.value;

        buttons.forEach(button => button.id = "btn-inactive") 
        this.id = "btn-active";

        if(btnMode === "btn clear") {
            var squares = document.querySelectorAll('.square');
            squares.forEach(square => square.style.backgroundColor = "white");

            //return to color mode by default
            this.id = "btn-inactive";
            defaultBtn.id = "btn-active";
            btnMode = "btn color";
            colorSelect = '#333333';
        }

        if(btnMode == "btn grid"){
            //return to color mode by default
            this.id = "btn-inactive";
            defaultBtn.id = "btn-active";
            btnMode = "btn color";
            colorSelect = '#333333';
        }
        
        
    })
})

//-------------------- SLIDER ----------------------

sliderValue.innerHTML = slider.value;

slider.oninput = function () {
    sliderValue.innerHTML = this.value;
    sliderValue.style.left = this.value + '%';
    selector.style.left = this.value + '%';
}

//--------------------- GRID -----------------------

let mouseIsDown = false;
document.body.onmousedown = () => {mouseIsDown = true}
document.body.onmouseup = () => {mouseIsDown = false}

function color(element){

    if(element.type === 'mouseover' && !mouseIsDown) return;
    if(btnMode === 'btn color'){
        element.target.style.backgroundColor = colorSelect;
    } else if (btnMode === 'btn random'){
        colorSelect = Math.floor(Math.random()*16777215).toString(16);
        element.target.style.backgroundColor = '#' + colorSelect;
    } else if (btnMode === 'btn erase'){
        element.target.style.backgroundColor = "white";
    }
}

resizeBtn.addEventListener('click',function(){
    console.log([`${heightInput.value}px`,widthInput.value]);
    grid.style.height = `${heightInput.value}px`;
    grid.style.width = `${widthInput.value}px`;
});








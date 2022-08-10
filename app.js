// Declare Variables and Select Elements
const inputs = document.querySelectorAll('.sliders input');
const text = document.querySelector('#text-1');
const rotateOptions = document.querySelectorAll(".rotate button");
const defaultBtn =  document.querySelector("#default-btn");
const customBtn =  document.querySelector("#custom-btn");
const img1 = document.querySelector("#img1");
const saveImgBtn = document.querySelector("#save-img");
const previewImg = document.querySelector(".image img");

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

 


let rotate = 0, flipHorizontal = 1, flipVertical = 1;
let suffix;



// FOR IMAGE UPLOAD

function defaultBtnActive(){
    defaultBtn.click();
}
defaultBtn.addEventListener("change",function(){
    const file=this.files[0];
    if(file)
    {
        const reader = new FileReader();
        reader.onload=function(){
          
            
            const result=reader.result;
            img1.src=result;
        }
        reader.readAsDataURL(file);
    }
});


//SAVE IMAGE

function download() {
    canvas.width = previewImg.naturalWidth;
                canvas.height = previewImg.naturalHeight;
                ctx.filter = `brightness(${brightness.value}%) saturate(${saturate.value}%) invert(${invert.value}%) grayscale(${greyscale.value}%) contrast(${contrast.value}%) opacity(${opacity.value}%) blur(${blurr.value}px) `;
                ctx.translate(canvas.width / 2, canvas.height / 2);
                if(rotate !== 0) {
                    ctx.rotate(rotate * Math.PI / 180);
                }
                ctx.scale(flipHorizontal, flipVertical);
        
                ctx.drawImage(img1, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
                
               //document.body.appendChild(canvas);
                
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "image.png";
    link.click();
  }
  document.querySelector("#save-img").addEventListener("click", download);

// Create Event Listeners for Groups
inputs.forEach(input => input.addEventListener('click', handleUpdate));
inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));




// Set Text - display to 'none' 
text.style.display = 'none';



// When Sliders Values Change, Update the CSS Variables

function handleUpdate() {
    suffix = this.dataset.sizing || "";
    document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
    this.nextElementSibling.innerHTML = this.value + suffix;
    if (this.nextElementSibling.classList == "noSuffix") {
        this.nextElementSibling.innerHTML = "";
    };
    
}

//ROTATE
rotateOptions.forEach(option => {
    option.addEventListener("click", () => {
        if(option.id === "left") {
            rotate -= 90;
        } else if(option.id === "right") {
            rotate += 90;
        } else if(option.id === "horizontal") {
            flipHorizontal = flipHorizontal === 1 ? -1 : 1;
        } else {
            flipVertical = flipVertical === 1 ? -1 : 1;
        }
        applyFilter();
    });
});

const applyFilter = () => {
    previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
    
}

function reset()
{
    rotate=0;
    flipHorizontal=1;
    flipVertical=1;
    applyFilter();
}

function resetAll() {
    for (let i = 0; i < inputs.length; i++) {
        suffix = inputs[i].dataset.sizing || "";
        inputs[i].value = inputs[i].defaultValue;
        document.documentElement.style.setProperty(`--${inputs[i].name}`, inputs[i].defaultValue + suffix);
        inputs[i].nextElementSibling.innerHTML = inputs[i].defaultValue + suffix;

       
        reset();
       
    }

}


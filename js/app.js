
let imageContainer = document.getElementById('imagecontainer');
let imgfirst = document.getElementById('imgf');
let imgsecond = document.getElementById('imgs');
let imgthird = document.getElementById('imgt');

let showResults = document.getElementById('viewResults');
let result = document.getElementById('results');

let attemptEl = document.getElementById('attempts');

let product = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'water-can.jpg', 'wine-glass.jpg'];

let maxAttempts = 25;
let attempt = 1;
let productImges = []

function productImage(productName) {
    this.productName = productName.split('.')[0];
    this.src = `images/${productName}`;
    this.views = 0;
    this.click = 0;
    productImges.push(this);
}
for (let i = 0; i < product.length; i++) {
    new productImage(product[i]);
}


function randomImage() {
    return Math.floor(Math.random() * productImges.length);
}
console.log(productImges);

let firstImg;
let secImg;
let thirdImg;
function renderImg() {
    firstImg = randomImage();
    secImg = randomImage();
    thirdImg = randomImage();

    while (firstImg === secImg || firstImg === thirdImg || thirdImg === secImg) {
        firstImg = randomImage();
        thirdImg = randomImage();

    }
    console.log(imgfirst);
    imgfirst.setAttribute('src', productImges[firstImg].src);
    imgsecond.setAttribute('src', productImges[secImg].src);
    imgthird.setAttribute('src', productImges[thirdImg].src);



    productImges[firstImg].views++;
    productImges[secImg].views++;
    productImges[thirdImg].views++;

}
renderImg()

imgfirst.addEventListener('click', clickHandler);
imgsecond.addEventListener('click', clickHandler);
imgthird.addEventListener('click', clickHandler);


function clickHandler(event) {
    if (attempt < maxAttempts) {
        let clickedImage = event.target.id;
        if (clickedImage === 'imgf') {
            productImges[firstImg].click++;
        } else if (clickedImage === 'imgs') {
            productImges[secImg].click++
        }
        else if (clickedImage === 'imgt') {
            productImges[thirdImg].click++

        }
        renderImg();
        attempt++;
        attemptEl.textContent = `Attempts: ${attempt}`;
    } else {

        imgfirst.removeEventListener('click', clickHandler);
        imgsecond.removeEventListener('click', clickHandler);
        imgthird.removeEventListener('click', clickHandler);

    }
}

showResults.addEventListener('click', resultInButton);
function resultInButton(event){
    event.preventDefault();

    for( let i = 0; i < productImges.length; i++){
        let liEl = document.createElement('li');
       result.appendChild(liEl);
       liEl.textContent = `${productImges[i].productName} has ${productImges[i].click} click and  ${productImges[i].views} views.`;
   }
    }


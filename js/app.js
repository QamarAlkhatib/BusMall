
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
let productImges = [];
let pNames = [];
let click = [];
let views = [];
let storedImg = [];

function ProductImage(productName) {
    this.productName = productName.split('.')[0];
    this.src = `images/${productName}`;
    this.views = 0;
    this.click = 0;
    productImges.push(this);
    pNames.push(this.productName);
}

for (let i = 0; i < product.length; i++) {
    new ProductImage(product[i]);
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

    while (firstImg === secImg || firstImg === thirdImg || thirdImg === secImg || storedImg.includes(firstImg) || storedImg.includes(secImg) || storedImg.includes(thirdImg)) {
        firstImg = randomImage();
        secImg = randomImage();
        thirdImg = randomImage();
    }
    storedImg[0] = firstImg;
    storedImg[1] = secImg;
    storedImg[2] = thirdImg;

    console.log(storedImg);
    
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
function resultInButton(event) {
    event.preventDefault();

    for (let i = 0; i < productImges.length; i++) {
        let liEl = document.createElement('li');
        result.appendChild(liEl);
        liEl.textContent = `${productImges[i].productName} has ${productImges[i].click} votes and  ${productImges[i].views} views.`;
        views.push(productImges[i].views);
        click.push(productImges[i].click);
    }
    chartRender();
}


function chartRender() {
    let ctx = document.getElementById('myChart').getContext('2d');
    let myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: pNames,
            datasets: [{
                label: '# of Votes',
                data: click,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',

                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',

                ],
                borderWidth: 1
            }, {
                label: '# of views',
                data: views,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1

            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
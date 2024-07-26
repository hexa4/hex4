//GENERAR CIRCULOS ALEATORIOS SKINS!!!!!!!!!!!!!

let skinCode = '';	
const skins = document.querySelectorAll('.skin');
const playerGroup = document.getElementById('playerGroup');
const skinButton = document.getElementById('skinButton');
const closeSkinButton = document.getElementById('closeSkin');







/*

function generateRandomSVG() {
    const svgNamespace = "http://www.w3.org/2000/svg";
    const radius = 100;  // Adjusted for larger viewBox
    const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A8", "#A833FF", "#FFD700", "#40E0D0"];
    const patterns = ["stripes", "dots", "grid", "waves"];

    // Create SVG element
    const svg = document.createElementNS(svgNamespace, "svg");
    svg.setAttribute("width", "50");
    svg.setAttribute("height", "50");
    svg.setAttribute("viewBox", "0 0 200 200");
    svg.setAttribute("preserveAspectRatio", "xMidYMid meet");

    // Define clip path for the circle
    const defs = document.createElementNS(svgNamespace, "defs");
    const clipPath = document.createElementNS(svgNamespace, "clipPath");
    clipPath.setAttribute("id", "clipCircle");
    const clipCircle = document.createElementNS(svgNamespace, "circle");
    clipCircle.setAttribute("cx", 100);
    clipCircle.setAttribute("cy", 100);
    clipCircle.setAttribute("r", 100);
    clipPath.appendChild(clipCircle);
    defs.appendChild(clipPath);
    svg.appendChild(defs);

    // Create the main circle and apply clip path
    const mainCircle = document.createElementNS(svgNamespace, "circle");
    mainCircle.setAttribute("cx", 100);
    mainCircle.setAttribute("cy", 100);
    mainCircle.setAttribute("r", radius);
    mainCircle.setAttribute("fill", colors[Math.floor(Math.random() * colors.length)]);
    mainCircle.setAttribute("clip-path", "url(#clipCircle)");
    svg.appendChild(mainCircle);

    // Add random pattern inside the circle
    const patternType = patterns[Math.floor(Math.random() * patterns.length)];
    switch (patternType) {
        case "stripes":
            addStripes(svg, colors);
            break;
        case "dots":
            addDots(svg, colors);
            break;
        case "grid":
            addGrid(svg, colors);
            break;
        case "waves":
            addWaves(svg, colors);
            break;
    }

    return svg;
}

function addStripes(svg, colors) {
    const svgNamespace = "http://www.w3.org/2000/svg";
    for (let i = 0; i < 10; i++) {
        const line = document.createElementNS(svgNamespace, "line");
        line.setAttribute("x1", 0);
        line.setAttribute("y1", i * 20);
        line.setAttribute("x2", 200);
        line.setAttribute("y2", i * 20);
        line.setAttribute("stroke", colors[Math.floor(Math.random() * colors.length)]);
        line.setAttribute("stroke-width", 5);
        line.setAttribute("clip-path", "url(#clipCircle)");
        svg.appendChild(line);
    }
}

function addDots(svg, colors) {
    const svgNamespace = "http://www.w3.org/2000/svg";
    for (let i = 0; i < 50; i++) {
        const dot = document.createElementNS(svgNamespace, "circle");
        dot.setAttribute("cx", Math.random() * 200);
        dot.setAttribute("cy", Math.random() * 200);
        dot.setAttribute("r", 5);
        dot.setAttribute("fill", colors[Math.floor(Math.random() * colors.length)]);
        dot.setAttribute("clip-path", "url(#clipCircle)");
        svg.appendChild(dot);
    }
}

function addGrid(svg, colors) {
    const svgNamespace = "http://www.w3.org/2000/svg";
    for (let i = 0; i < 10; i++) {
        const line1 = document.createElementNS(svgNamespace, "line");
        line1.setAttribute("x1", i * 20);
        line1.setAttribute("y1", 0);
        line1.setAttribute("x2", i * 20);
        line1.setAttribute("y2", 200);
        line1.setAttribute("stroke", colors[Math.floor(Math.random() * colors.length)]);
        line1.setAttribute("stroke-width", 2);
        line1.setAttribute("clip-path", "url(#clipCircle)");
        svg.appendChild(line1);

        const line2 = document.createElementNS(svgNamespace, "line");
        line2.setAttribute("x1", 0);
        line2.setAttribute("y1", i * 20);
        line2.setAttribute("x2", 200);
        line2.setAttribute("y2", i * 20);
        line2.setAttribute("stroke", colors[Math.floor(Math.random() * colors.length)]);
        line2.setAttribute("stroke-width", 2);
        line2.setAttribute("clip-path", "url(#clipCircle)");
        svg.appendChild(line2);
    }
}

function addWaves(svg, colors) {
    const svgNamespace = "http://www.w3.org/2000/svg";
    const wavePath = document.createElementNS(svgNamespace, "path");
    wavePath.setAttribute("d", "M0 100 Q 50 0, 100 100 T 200 100");
    wavePath.setAttribute("stroke", colors[Math.floor(Math.random() * colors.length)]);
    wavePath.setAttribute("stroke-width", 5);
    wavePath.setAttribute("fill", "none");
    wavePath.setAttribute("clip-path", "url(#clipCircle)");
    svg.appendChild(wavePath);
}

// Generate random SVGs for each skin
            skins.forEach(skin => {
                const svg = generateRandomSVG();
                skin.appendChild(svg);
            });

            // Add click event listener for selection
            skins.forEach(skin => {
                skin.addEventListener('click', function() {
                    skins.forEach(s => s.classList.remove('selected'));
                    this.classList.add('selected');
                });
            });

            // Add click event listener to the select button



  skinButton.addEventListener('click', function() {
    const selectedSkin = document.querySelector('.skin.selected');
    if (selectedSkin) {
        const svg = selectedSkin.querySelector('svg').cloneNode(true);
        svg.setAttribute('width', '20');
        svg.setAttribute('height', '20');
        //playerGroup.innerHTML = '';
        //playerGroup.appendChild(svg);

        // Print the SVG code to the console
        console.log(svg.outerHTML);


//skinCode = svg.outerHTML;

	  

        // Hide the selectSkin element
        selectSkin.style.display = 'none';
    }
});


// Add click event listener to the cancel button
            closeSkinButton.addEventListener('click', function() {
                // Hide the selectSkin div
                selectSkin.style.display = 'none';
            });

	  


*/

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



function generateCreativeCircleSVG(radius) {
    const svgNamespace = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNamespace, "svg");
    svg.setAttribute("width", radius * 2);
    svg.setAttribute("height", radius * 2);
    
        svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    
    svg.setAttribute("viewBox", `0 0 ${radius * 2} ${radius * 2}`);
    svg.setAttribute("preserveAspectRatio", "xMidYMid meet");

    // Definir el clipPath del círculo
    const defs = document.createElementNS(svgNamespace, "defs");
    const clipPath = document.createElementNS(svgNamespace, "clipPath");
    clipPath.setAttribute("id", "clipCircle");
    const clipCircle = document.createElementNS(svgNamespace, "circle");
    clipCircle.setAttribute("cx", radius);
    clipCircle.setAttribute("cy", radius);
    clipCircle.setAttribute("r", radius);
    clipPath.appendChild(clipCircle);
    defs.appendChild(clipPath);
    svg.appendChild(defs);

    // Create main circle (visible area)
    const mainCircle = document.createElementNS(svgNamespace, "circle");
    mainCircle.setAttribute("cx", radius);
    mainCircle.setAttribute("cy", radius);
    mainCircle.setAttribute("r", radius);
    mainCircle.setAttribute("fill", getRandomColor());
    mainCircle.setAttribute("clip-path", "url(#clipCircle)");
    svg.appendChild(mainCircle);

    // Add random shapes
    const shapes = ['circle', 'rect', 'line', 'polygon', 'smiley', 'palmTree', 'flower', 'comet', 'eye', 'penguin', 'car'];

    const numShapes = 5 + Math.floor(Math.random() * 6);  // Between 5 and 10 shapes
    for (let i = 0; i < numShapes; i++) {
        const shapeType = shapes[Math.floor(Math.random() * shapes.length)];
        let shape;
        switch (shapeType) {
            case 'circle':
                shape = createRandomCircle(radius);
                break;
            case 'rect':
                shape = createRandomRect(radius);
                break;
            case 'line':
                shape = createRandomLine(radius);
                break;
            case 'polygon':
                shape = createRandomPolygon(radius);
                break;
  case 'smiley':
shape= createSmiley( radius);
break;

case 'palmTree':
                shape = createPalmTree(radius);
                break;
            case 'flower':
                shape = createFlower(radius);
                break;
            case 'comet':
                shape = createComet(radius);
                break;
            case 'eye':
                shape = createEye(radius);
                break;
            case 'penguin':
                shape = createPenguin(radius);
                break;
            case 'car':
                shape = createCar(radius);
                break;



        }
        shape.setAttribute("clip-path", "url(#clipCircle)");
        svg.appendChild(shape);
    }

    return svg;
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function createRandomCircle(radius) {
    const svgNamespace = "http://www.w3.org/2000/svg";
    const circle = document.createElementNS(svgNamespace, "circle");
    const angle = Math.random() * 2 * Math.PI;
    const r = Math.random() * (radius / 2);
    const cx = radius + (Math.random() * (radius - r) * Math.cos(angle));
    const cy = radius + (Math.random() * (radius - r) * Math.sin(angle));
    circle.setAttribute("cx", cx);
    circle.setAttribute("cy", cy);
    circle.setAttribute("r", r);
    circle.setAttribute("fill", getRandomColor());
    return circle;
}

function createRandomRect(radius) {
    const svgNamespace = "http://www.w3.org/2000/svg";
    const rect = document.createElementNS(svgNamespace, "rect");
    const angle = Math.random() * 2 * Math.PI;
    const width = Math.random() * radius;
    const height = Math.random() * radius;
    const x = radius + (Math.random() * (radius - width) * Math.cos(angle)) - width / 2;
    const y = radius + (Math.random() * (radius - height) * Math.sin(angle)) - height / 2;
    rect.setAttribute("x", x);
    rect.setAttribute("y", y);
    rect.setAttribute("width", width);
    rect.setAttribute("height", height);
    rect.setAttribute("fill", getRandomColor());
    return rect;
}

function createRandomLine(radius) {
    const svgNamespace = "http://www.w3.org/2000/svg";
    const line = document.createElementNS(svgNamespace, "line");
    const angle1 = Math.random() * 2 * Math.PI;
    const angle2 = Math.random() * 2 * Math.PI;
    const x1 = radius + Math.random() * radius * Math.cos(angle1);
    const y1 = radius + Math.random() * radius * Math.sin(angle1);
    const x2 = radius + Math.random() * radius * Math.cos(angle2);
    const y2 = radius + Math.random() * radius * Math.sin(angle2);
    line.setAttribute("x1", x1);
    line.setAttribute("y1", y1);
    line.setAttribute("x2", x2);
    line.setAttribute("y2", y2);
    line.setAttribute("stroke", getRandomColor());
    line.setAttribute("stroke-width", Math.random() * 2 + 1);
    return line;
}

function createRandomPolygon(radius) {
    const svgNamespace = "http://www.w3.org/2000/svg";
    const polygon = document.createElementNS(svgNamespace, "polygon");
    const points = [];
    const numPoints = 3 + Math.floor(Math.random() * 5); // Between 3 and 7 points
    for (let i = 0; i < numPoints; i++) {
        const angle = Math.random() * 2 * Math.PI;
        const x = radius + Math.random() * radius * Math.cos(angle);
        const y = radius + Math.random() * radius * Math.sin(angle);
        points.push(`${x},${y}`);
    }
    polygon.setAttribute("points", points.join(" "));
    polygon.setAttribute("fill", getRandomColor());
    return polygon;
}

// Generate random SVGs for each skin

skins.forEach(skin => {
    const svg = generateCreativeCircleSVG(25); // Using a radius of 25 for 50x50 containers
    skin.appendChild(svg);
});

// Add click event listener for selection
skins.forEach(skin => {
    skin.addEventListener('click', function() {
        skins.forEach(s => s.classList.remove('selected'));
        this.classList.add('selected');
    });
});




skinButton.addEventListener('click', function() {
    const selectedSkin = document.querySelector('.skin.selected');
    if (selectedSkin) {
        const svg = selectedSkin.querySelector('svg').cloneNode(true);
        svg.setAttribute("width", 100);
        svg.setAttribute("height", 100);
        svg.setAttribute("viewBox", "0 0 50 50");

    svg.setAttribute("preserveAspectRatio", "xMidYMid meet");



const scale = 0.2;  // 20/100 = 0.2 para escalar de 100 a 20
    //    svg.setAttribute("transform", `scale(${scale})`);




      skinCode = svg.outerHTML  ;

        // Print the SVG code to the console
        console.log(svg.outerHTML);

        // Hide the selectSkin element
        selectSkin.style.display = 'none';
    }
});



function obtenerCodigoDibujadoConRecorte(svgElement) {
    const elementosSVG = svgElement.querySelectorAll('circle, rect, line, polygon');
    const radius = 100;

    let codigoSVG = `<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" preserveAspectRatio="xMidYMid meet">`;
    
    // Definir el clipPath del círculo
    codigoSVG += `<defs><clipPath id="clipCircle"><circle cx="100" cy="100" r="100"/></clipPath></defs>`;
    
    elementosSVG.forEach(elemento => {
        let etiquetaSVG = elemento.tagName.toLowerCase();
        let atributos = '';
        
        for (let i = 0; i < elemento.attributes.length; i++) {
            let atributo = elemento.attributes[i];
            atributos += ` ${atributo.name}="${atributo.value}"`;
        }
        
        // Aplicar el clipPath a todos los elementos
        atributos += ` clip-path="url(#clipCircle)"`;
        
        codigoSVG += `<${etiquetaSVG}${atributos}></${etiquetaSVG}>`;
    });

    codigoSVG += '</svg>';

    return codigoSVG;
}








// New function to create smiley faces
function createSmiley(radius) {

const svgNamespace = "http://www.w3.org/2000/svg";

    const group = document.createElementNS(svgNamespace, "g");

    const face = document.createElementNS(svgNamespace, "circle");
    face.setAttribute("cx", radius);
    face.setAttribute("cy", radius);
    face.setAttribute("r", radius * 0.8);
    face.setAttribute("fill", "yellow");
    face.setAttribute("stroke", "black");
    face.setAttribute("stroke-width", radius * 0.05);
    group.appendChild(face);

    const eye1 = document.createElementNS(svgNamespace, "circle");
    eye1.setAttribute("cx", radius * 0.6);
    eye1.setAttribute("cy", radius * 0.5);
    eye1.setAttribute("r", radius * 0.1);
    eye1.setAttribute("fill", "black");
    group.appendChild(eye1);

    const eye2 = document.createElementNS(svgNamespace, "circle");
    eye2.setAttribute("cx", radius * 1.4);
    eye2.setAttribute("cy", radius * 0.5);
    eye2.setAttribute("r", radius * 0.1);
    eye2.setAttribute("fill", "black");
    group.appendChild(eye2);

    const mouth = document.createElementNS(svgNamespace, "path");
    const d = `M${radius * 0.7},${radius * 1.2} Q${radius},${radius * 1.5} ${radius * 1.3},${radius * 1.2}`;
    mouth.setAttribute("d", d);
    mouth.setAttribute("stroke", "black");
    mouth.setAttribute("stroke-width", radius * 0.05);
    mouth.setAttribute("fill", "none");
    group.appendChild(mouth);

    return group;
}





function createPalmTree(radius) {
    const svgNamespace = "http://www.w3.org/2000/svg";
    const group = document.createElementNS(svgNamespace, "g");

    // Trunk
    const trunk = document.createElementNS(svgNamespace, "rect");
    trunk.setAttribute("x", radius * 0.9);
    trunk.setAttribute("y", radius * 1.2);
    trunk.setAttribute("width", radius * 0.2);
    trunk.setAttribute("height", radius * 0.8);
    trunk.setAttribute("fill", "saddlebrown");
    group.appendChild(trunk);

    // Leaves
    const numLeaves = 5;
    for (let i = 0; i < numLeaves; i++) {
        const leaf = document.createElementNS(svgNamespace, "ellipse");
        const angle = (i * 360 / numLeaves) * Math.PI / 180;
        const cx = radius;
        const cy = radius;
        const rx = radius * 0.8;
        const ry = radius * 0.2;
        leaf.setAttribute("cx", cx);
        leaf.setAttribute("cy", cy);
        leaf.setAttribute("rx", rx);
        leaf.setAttribute("ry", ry);
        leaf.setAttribute("fill", "green");
        leaf.setAttribute("transform", `rotate(${i * 360 / numLeaves} ${cx} ${cy})`);
        group.appendChild(leaf);
    }

    return group;
}




function createFlower(radius) {
    const svgNamespace = "http://www.w3.org/2000/svg";
    const group = document.createElementNS(svgNamespace, "g");

    // Center
    const center = document.createElementNS(svgNamespace, "circle");
    center.setAttribute("cx", radius);
    center.setAttribute("cy", radius);
    center.setAttribute("r", radius * 0.2);
    center.setAttribute("fill", "yellow");
    group.appendChild(center);

    // Petals
    const numPetals = 6;
    for (let i = 0; i < numPetals; i++) {
        const petal = document.createElementNS(svgNamespace, "ellipse");
        const angle = (i * 360 / numPetals) * Math.PI / 180;
        const cx = radius;
        const cy = radius;
        const rx = radius * 0.6;
        const ry = radius * 0.2;
        petal.setAttribute("cx", cx);
        petal.setAttribute("cy", cy);
        petal.setAttribute("rx", rx);
        petal.setAttribute("ry", ry);
        petal.setAttribute("fill", "pink");
        petal.setAttribute("transform", `rotate(${i * 360 / numPetals} ${cx} ${cy})`);
        group.appendChild(petal);
    }

    return group;
}




function createComet(radius) {
    const svgNamespace = "http://www.w3.org/2000/svg";
    const group = document.createElementNS(svgNamespace, "g");

    // Comet body
    const cometBody = document.createElementNS(svgNamespace, "polygon");
    cometBody.setAttribute("points", `${radius},${radius * 0.2} ${radius * 1.2},${radius} ${radius},${radius * 1.8}`);
    cometBody.setAttribute("fill", "lightblue");
    group.appendChild(cometBody);

    // Comet tail
    const tail = document.createElementNS(svgNamespace, "polyline");
    tail.setAttribute("points", `${radius * 1.2},${radius} ${radius * 1.5},${radius * 0.5} ${radius * 1.8},${radius} ${radius * 1.5},${radius * 1.5} ${radius * 1.2},${radius}`);
    tail.setAttribute("stroke", "blue");
    tail.setAttribute("stroke-width", 2);
    tail.setAttribute("fill", "none");
    group.appendChild(tail);

    return group;
}


function createEye(radius) {
    const svgNamespace = "http://www.w3.org/2000/svg";
    const group = document.createElementNS(svgNamespace, "g");

    // Eyeball
    const eyeball = document.createElementNS(svgNamespace, "ellipse");
    eyeball.setAttribute("cx", radius);
    eyeball.setAttribute("cy", radius);
    eyeball.setAttribute("rx", radius);
    eyeball.setAttribute("ry", radius * 0.6);
    eyeball.setAttribute("fill", "white");
    eyeball.setAttribute("stroke", "black");
    eyeball.setAttribute("stroke-width", radius * 0.05);
    group.appendChild(eyeball);

    // Iris
    const iris = document.createElementNS(svgNamespace, "circle");
    iris.setAttribute("cx", radius);
    iris.setAttribute("cy", radius);
    iris.setAttribute("r", radius * 0.3);
    iris.setAttribute("fill", "blue");
    group.appendChild(iris);

    // Pupil
    const pupil = document.createElementNS(svgNamespace, "circle");
    pupil.setAttribute("cx", radius);
    pupil.setAttribute("cy", radius);
    pupil.setAttribute("r", radius * 0.15);
    pupil.setAttribute("fill", "black");
    group.appendChild(pupil);

    return group;
}



function createPenguin(radius) {
    const svgNamespace = "http://www.w3.org/2000/svg";
    const group = document.createElementNS(svgNamespace, "g");

    // Body
    const body = document.createElementNS(svgNamespace, "ellipse");
    body.setAttribute("cx", radius);
    body.setAttribute("cy", radius * 1.3);
    body.setAttribute("rx", radius * 0.5);
    body.setAttribute("ry", radius * 0.8);
    body.setAttribute("fill", "black");
    group.appendChild(body);

    // Belly
    const belly = document.createElementNS(svgNamespace, "ellipse");
    belly.setAttribute("cx", radius);
    belly.setAttribute("cy", radius * 1.3);
    belly.setAttribute("rx", radius * 0.4);
    belly.setAttribute("ry", radius * 0.6);
    belly.setAttribute("fill", "white");
    group.appendChild(belly);

    // Head
    const head = document.createElementNS(svgNamespace, "circle");
    head.setAttribute("cx", radius);
    head.setAttribute("cy", radius * 0.8);
    head.setAttribute("r", radius * 0.3);
    head.setAttribute("fill", "black");
    group.appendChild(head);

    // Eyes
    const eye1 = document.createElementNS(svgNamespace, "circle");
    eye1.setAttribute("cx", radius * 0.85);
    eye1.setAttribute("cy", radius * 0.75);
    eye1.setAttribute("r", radius * 0.05);
    eye1.setAttribute("fill", "white");
    group.appendChild(eye1);

    const eye2 = document.createElementNS(svgNamespace, "circle");
    eye2.setAttribute("cx", radius * 1.15);
    eye2.setAttribute("cy", radius * 0.75);
    eye2.setAttribute("r", radius * 0.05);
    eye2.setAttribute("fill", "white");
    group.appendChild(eye2);

    // Beak
    const beak = document.createElementNS(svgNamespace, "polygon");
    beak.setAttribute("points", `${radius * 0.95},${radius * 0.9} ${radius * 1.05},${radius * 0.9} ${radius},${radius}`);
    beak.setAttribute("fill", "orange");
    group.appendChild(beak);

    return group;
}




function createCar(radius) {
    const svgNamespace = "http://www.w3.org/2000/svg";
    const group = document.createElementNS(svgNamespace, "g");

    // Body
    const body = document.createElementNS(svgNamespace, "rect");
    body.setAttribute("x", radius * 0.5);
    body.setAttribute("y", radius);
    body.setAttribute("width", radius);
    body.setAttribute("height", radius * 0.5);
    body.setAttribute("fill", "blue");
    group.appendChild(body);

    // Roof
    const roof = document.createElementNS(svgNamespace, "rect");
    roof.setAttribute("x", radius * 0.7);
    roof.setAttribute("y", radius * 0.7);
    roof.setAttribute("width", radius * 0.6);
    roof.setAttribute("height", radius * 0.3);
    roof.setAttribute("fill", "blue");
    group.appendChild(roof);

    // Windows
    const window1 = document.createElementNS(svgNamespace, "rect");
    window1.setAttribute("x", radius * 0.75);
    window1.setAttribute("y", radius * 0.75);
    window1.setAttribute("width", radius * 0.2);
    window1.setAttribute("height", radius * 0.2);
    window1.setAttribute("fill", "lightblue");
    group.appendChild(window1);

    const window2 = document.createElementNS(svgNamespace, "rect");
    window2.setAttribute("x", radius * 1.05);
    window2.setAttribute("y", radius * 0.75);
    window2.setAttribute("width", radius * 0.2);
    window2.setAttribute("height", radius * 0.2);
    window2.setAttribute("fill", "lightblue");
    group.appendChild(window2);

    // Wheels
    const wheel1 = document.createElementNS(svgNamespace, "circle");
    wheel1.setAttribute("cx", radius * 0.75);
    wheel1.setAttribute("cy", radius * 1.5);
    wheel1.setAttribute("r", radius * 0.2);
    wheel1.setAttribute("fill", "black");
    group.appendChild(wheel1);

    const wheel2 = document.createElementNS(svgNamespace, "circle");
    wheel2.setAttribute("cx", radius * 1.25);
    wheel2.setAttribute("cy", radius * 1.5);
    wheel2.setAttribute("r", radius * 0.2);
    wheel2.setAttribute("fill", "black");
    group.appendChild(wheel2);

    return group;
}



 closeSkinButton.addEventListener('click', function() {
                // Hide the selectSkin div
                selectSkin.style.display = 'none';
            });
            
            
            //OPEN CANVAS CIRCLE SKIN DRAW BUTTON	
document.getElementById('paintSkin').addEventListener('click', function () {
selectSkin.style.display = 'none';
document.getElementById('paintBox').style.display = 'block';
});


/////////////////////

/*
const svgNamespace = "http://www.w3.org/2000/svg";

function generateCreativeCircleSVG(radius) {
    const svg = document.createElementNS(svgNamespace, "svg");
    svg.setAttribute("width", radius * 2);
    svg.setAttribute("height", radius * 2);
    svg.setAttribute("viewBox", `0 0 ${radius * 2} ${radius * 2}`);
    svg.setAttribute("preserveAspectRatio", "xMidYMid meet");

    // Define the clipPath for the circle
    const defs = document.createElementNS(svgNamespace, "defs");
    const clipPath = document.createElementNS(svgNamespace, "clipPath");
    clipPath.setAttribute("id", "clipCircle");
    const clipCircle = document.createElementNS(svgNamespace, "circle");
    clipCircle.setAttribute("cx", radius);
    clipCircle.setAttribute("cy", radius);
    clipCircle.setAttribute("r", radius);
    clipPath.appendChild(clipCircle);
    defs.appendChild(clipPath);
    svg.appendChild(defs);

    // Create main circle (visible area)
    const mainCircle = document.createElementNS(svgNamespace, "circle");
    mainCircle.setAttribute("cx", radius);
    mainCircle.setAttribute("cy", radius);
    mainCircle.setAttribute("r", radius);
    mainCircle.setAttribute("fill", getRandomColor());
    mainCircle.setAttribute("clip-path", "url(#clipCircle)");
    svg.appendChild(mainCircle);

    // Add random shapes
    const shapes = ['circle', 'rect', 'line', 'polygon', 'smiley', 'fruit'];
    const numShapes = 5 + Math.floor(Math.random() * 6);  // Between 5 and 10 shapes
    for (let i = 0; i < numShapes; i++) {
        const shapeType = shapes[Math.floor(Math.random() * shapes.length)];
        let shape;
        switch (shapeType) {
            case 'circle':
                shape = createRandomCircle(radius);
                break;
            case 'rect':
                shape = createRandomRect(radius);
                break;
            case 'line':
                shape = createRandomLine(radius);
                break;
            case 'polygon':
                shape = createRandomPolygon(radius);
                break;
            case 'smiley':
                shape = createSmiley(radius);
                break;
            case 'fruit':
                shape = createFruit(radius);
                break;
        }
        shape.setAttribute("clip-path", "url(#clipCircle)");
        svg.appendChild(shape);
    }

    return svg;
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function createRandomCircle(radius) {
    const circle = document.createElementNS(svgNamespace, "circle");
    const angle = Math.random() * 2 * Math.PI;
    const r = Math.random() * (radius / 2);
    const cx = radius + (Math.random() * (radius - r) * Math.cos(angle));
    const cy = radius + (Math.random() * (radius - r) * Math.sin(angle));
    circle.setAttribute("cx", cx);
    circle.setAttribute("cy", cy);
    circle.setAttribute("r", r);
    circle.setAttribute("fill", getRandomColor());
    return circle;
}

function createRandomRect(radius) {
    const rect = document.createElementNS(svgNamespace, "rect");
    const angle = Math.random() * 2 * Math.PI;
    const width = Math.random() * radius;
    const height = Math.random() * radius;
    const x = radius + (Math.random() * (radius - width) * Math.cos(angle)) - width / 2;
    const y = radius + (Math.random() * (radius - height) * Math.sin(angle)) - height / 2;
    rect.setAttribute("x", x);
    rect.setAttribute("y", y);
    rect.setAttribute("width", width);
    rect.setAttribute("height", height);
    rect.setAttribute("fill", getRandomColor());
    return rect;
}

function createRandomLine(radius) {
    const line = document.createElementNS(svgNamespace, "line");
    const angle1 = Math.random() * 2 * Math.PI;
    const angle2 = Math.random() * 2 * Math.PI;
    const x1 = radius + Math.random() * radius * Math.cos(angle1);
    const y1 = radius + Math.random() * radius * Math.sin(angle1);
    const x2 = radius + Math.random() * radius * Math.cos(angle2);
    const y2 = radius + Math.random() * radius * Math.sin(angle2);
    line.setAttribute("x1", x1);
    line.setAttribute("y1", y1);
    line.setAttribute("x2", x2);
    line.setAttribute("y2", y2);
    line.setAttribute("stroke", getRandomColor());
    line.setAttribute("stroke-width", Math.random() * 2 + 1);
    return line;
}

function createRandomPolygon(radius) {
    const polygon = document.createElementNS(svgNamespace, "polygon");
    const points = [];
    const numPoints = 3 + Math.floor(Math.random() * 5); // Between 3 and 7 points
    for (let i = 0; i < numPoints; i++) {
        const angle = Math.random() * 2 * Math.PI;
        const x = radius + Math.random() * radius * Math.cos(angle);
        const y = radius + Math.random() * radius * Math.sin(angle);
        points.push(`${x},${y}`);
    }
    polygon.setAttribute("points", points.join(" "));
    polygon.setAttribute("fill", getRandomColor());
    return polygon;
}

// New function to create smiley faces
function createSmiley(radius) {
    const group = document.createElementNS(svgNamespace, "g");

    const face = document.createElementNS(svgNamespace, "circle");
    face.setAttribute("cx", radius);
    face.setAttribute("cy", radius);
    face.setAttribute("r", radius * 0.8);
    face.setAttribute("fill", "yellow");
    face.setAttribute("stroke", "black");
    face.setAttribute("stroke-width", radius * 0.05);
    group.appendChild(face);

    const eye1 = document.createElementNS(svgNamespace, "circle");
    eye1.setAttribute("cx", radius * 0.6);
    eye1.setAttribute("cy", radius * 0.5);
    eye1.setAttribute("r", radius * 0.1);
    eye1.setAttribute("fill", "black");
    group.appendChild(eye1);

    const eye2 = document.createElementNS(svgNamespace, "circle");
    eye2.setAttribute("cx", radius * 1.4);
    eye2.setAttribute("cy", radius * 0.5);
    eye2.setAttribute("r", radius * 0.1);
    eye2.setAttribute("fill", "black");
    group.appendChild(eye2);

    const mouth = document.createElementNS(svgNamespace, "path");
    const d = `M${radius * 0.7},${radius * 1.2} Q${radius},${radius * 1.5} ${radius * 1.3},${radius * 1.2}`;
    mouth.setAttribute("d", d);
    mouth.setAttribute("stroke", "black");
    mouth.setAttribute("stroke-width", radius * 0.05);
    mouth.setAttribute("fill", "none");
    group.appendChild(mouth);

    return group;
}

// New function to create fruit shapes
function createFruit(radius) {
    const group = document.createElementNS(svgNamespace, "g");

    const fruitBody = document.createElementNS(svgNamespace, "circle");
    fruitBody.setAttribute("cx", radius);
    fruitBody.setAttribute("cy", radius);
    fruitBody.setAttribute("r", radius * 0.8);
    fruitBody.setAttribute("fill", "red"); // Example: a red apple
    fruitBody.setAttribute("stroke", "darkred");
    fruitBody.setAttribute("stroke-width", radius * 0.05);
    group.appendChild(fruitBody);

    const stem = document.createElementNS(svgNamespace, "rect");
    stem.setAttribute("x", radius * 0.9);
    stem.setAttribute("y", radius * 0.1);
    stem.setAttribute("width", radius * 0.2);
    stem.setAttribute("height", radius * 0.4);
    stem.setAttribute("fill", "brown");
    group.appendChild(stem);

    const leaf = document.createElementNS(svgNamespace, "ellipse");
    leaf.setAttribute("cx", radius * 0.8);
    leaf.setAttribute("cy", radius * 0.1);
    leaf.setAttribute("rx", radius * 0.2);
    leaf.setAttribute("ry", radius * 0.1);
    leaf.setAttribute("fill", "green");
    group.appendChild(leaf);

    return group;
}

// Generate random SVGs for each skin
skins.forEach(skin => {
    const svg = generateCreativeCircleSVG(25); // Using a radius of 25 for 50x50 containers
    skin.appendChild(svg);
});

// Add click event listener for selection
skins.forEach(skin => {
    skin.addEventListener('click', function() {
        skins.forEach(s => s.classList.remove('selected'));
        this.classList.add('selected');
    });
});

skinButton.addEventListener('click', function() {
    const selectedSkin = document.querySelector('.skin.selected');
    if (selectedSkin) {
        const svg = selectedSkin.querySelector('svg').cloneNode(true);
        svg.setAttribute("width", 40);
        svg.setAttribute("height", 40);
        svg.setAttribute("viewBox", "0 0 100 100");
        svg.setAttribute("preserveAspectRatio", "xMidYMid meet");

        skinCode = svg.outerHTML;

        // Print the SVG code to the console
        console.log(svg.outerHTML);

        // Hide the selectSkin element
        selectSkin.style.display = 'none';
    }
});

function obtenerCodigoDibujadoConRecorte(svgElement) {
    const elementosSVG = svgElement.querySelectorAll('circle, rect, line, polygon');
    const radius = 100;

    let codigoSVG = `<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" preserveAspectRatio="xMidYMid meet">`;
    
    // Definir el clipPath del círculo
    codigoSVG += `<defs><clipPath id="clipCircle"><circle cx="100" cy="100" r="100"/></clipPath></defs>`;
    
    elementosSVG.forEach(elemento => {
        let etiquetaSVG = elemento.tagName.toLowerCase();
        let atributos = '';
        
        for (let i = 0; i < elemento.attributes.length; i++) {
            let atributo = elemento.attributes[i];
            atributos += ` ${atributo.name}="${atributo.value}"`;
        }
        
        // Aplicar el clipPath a todos los elementos
        atributos += ` clip-path="url(#clipCircle)"`;
        
        codigoSVG += `<${etiquetaSVG}${atributos}></${etiquetaSVG}>`;
    });

    codigoSVG += '</svg>';

    return codigoSVG;
}
*/

//////////////////////////////////


/*
*/
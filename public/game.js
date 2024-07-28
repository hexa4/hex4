 const socket = io();

const dpi = window.devicePixelRatio;
const width = window.innerWidth * dpi;
const height = window.innerHeight * dpi;

    let playerName;
    let playerNameInput = document.getElementById('playerName');
    let errorMessage = document.getElementById('errorMessage');
    let submitButton = document.getElementById('submitButton');
const nameForm = document.getElementById('nameForm');

//FUNCION DEL BOTON JUGAR PLAY SE INICIA JUEGO
    submitButton.addEventListener('click', function() {
         playerName = playerNameInput.value.trim();      
        if (playerName.length === 0 || playerName.length > 20) {
            errorMessage.style.display = 'block';
            return;
        }


nameForm.style.display = 'none';


requestAnimationFrame(function() {
        startGame(playerName);
    });
		

        
    });
    
        function startGame(playerName) {

        
        const config = {
            type: Phaser.AUTO,
            width: width,
            height: height,
		physics: {
        	default: 'arcade',
        	arcade: {
            gravity: { y: 0 }, // Puedes ajustar la gravedad según lo necesites
            debug: false // Puedes activar esto para ver los cuerpos de colisión
        			} },
            backgroundColor: '#0a0a0a',
            scale: {
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH
            },
            scene: {
                preload: preload,
                create: create,
                update: update
            },
            pixelArt: true,
            roundPixels: true
        };

        const game = new Phaser.Game(config);

        let player;
        let hexagonGraphics;
        let hexagonSize = 50;
        let hexagonWidth = hexagonSize * 2;
        let hexagonHeight = Math.sqrt(3) * hexagonSize;
        let hexagons = [];
        let vertices = [];
        let redVertices = [];

	let greenCirclesGroup;	
	let noMover = false;
	let fixedText7;
	let checkSecure = 0;
	let Cam = 1;
	let fixedText1, fixedText2, fixedText3, fixedText4, fixedText5, fixedText6;
	const players = {}; // Usaremos un objeto para almacenar los jugadores
	let topplayers = [];	
		
        let redCirclesGroup;
        let hexagonGroup;
        let playerNameCircle;


		             const hexagonMap = [
        [{ direction: 'NE' }, { direction: 'E' }, { direction: 'SE' }, { direction: 'E' }],
        [{ direction: 'SW' }, { direction: 'ES' } ,{ direction: 'E' }, { direction: 'ES' }, { direction: 'E' }],
        [{ direction: 'SW' }, { direction: 'ES' }, { direction: 'E' }, { direction: 'ES' }, { direction: 'E' }]
    ];
    
    

        function preload() {
            // Cargar recursos si es necesario
        }

        function create() {
            // Escalar gráficos según la densidad de píxeles
            this.cameras.main.setZoom(8 / dpi);

            hexagonGraphics = this.add.graphics({ lineStyle: { width: 2, color: 0x0099ff } });

            redCirclesGroup = this.add.group();
            hexagonGroup = this.add.group();
	greenCirclesGroup = this.physics.add.group();
              
            // Crear el mapa hexagonal
     for (let y = 0; y < hexagonMap.length; y++) {
    for (let x = 0; x < hexagonMap[y].length; x++) {
        let hexX = x * hexagonWidth * 0.75;
        let hexY = y * hexagonHeight + (x % 2 === 0 ? 0 : hexagonHeight / 2);

        // Opcional: Usa la dirección del hexágono si es necesario
        let direction = hexagonMap[y][x].direction;
        console.log(`Hexágono en (${x}, ${y}) tiene dirección: ${direction}`);

        drawHexagon(hexX, hexY, hexagonSize);
        hexagons.push({ x: hexX, y: hexY });
        vertices.push(...getHexVertices(hexX, hexY));
        hexagonGroup.add(hexagonGraphics); // Añadir el gráfico del hexágono al grupo
    }
}

	

            // Crear el jugador en un vértice aleatorio
            const randomHex = hexagons[Phaser.Math.Between(0, hexagons.length - 1)];
            const randomVertex = getHexVertices(randomHex.x, randomHex.y)[Phaser.Math.Between(0, 5)];
            player = this.add.circle(randomVertex.x, randomVertex.y, 10, 0xffffff);

socket.emit('newPlayer', { name: playerName, x: randomVertex.x, y: randomVertex.y, skin: skinCode });

            // Añadir texto encima del jugador
           
           
           
         //   playerName = this.add.text(randomVertex.x, randomVertex.y - 20, 'Player', { fontSize: '12px', fill: '#ffffff' });
           
           
            playerNameCircle = this.add.text(randomVertex.x, randomVertex.y - 20, 'Player', { fontSize: '12px', fill: '#ffffff', resolution: dpi });
           
           
            playerNameCircle.setOrigin(0.5);

            // Centrar la cámara en el jugador
            this.cameras.main.startFollow(player);

            player.setInteractive();
            player.vertices = [];
          
            updateRedVertices.call(this); // Llamar a updateRedVertices con el contexto correcto
          
            this.input.on('pointerdown', onPointerDown, this);

	        	socket.emit('LlamargreenCirclesS');
	
        }

        function update() {
            // Lógica de actualización
        }

        function drawHexagon(x, y, size) {
            const points = getHexVertices(x, y, size);
            hexagonGraphics.strokePoints(points, true);
        }

        function getHexVertices(x, y, size = hexagonSize) {
            const points = [];
            for (let i = 0; i < 6; i++) {
                const angle = Phaser.Math.DegToRad(60 * i);
                const px = x + size * Math.cos(angle);
                const py = y + size * Math.sin(angle);
                points.push(new Phaser.Geom.Point(px, py));
            }
            return points;
        }

        function updateRedVertices() {
            clearRedVertices.call(this); 

            const verticesInRadius = getVerticesInRadius(player.x, player.y, 60); // Radio de 60 píxeles
            verticesInRadius.forEach(vertex => {
                redVertices.push({ x: vertex.x, y: vertex.y });
                const graphics = this.add.graphics();
                graphics.fillStyle(0xff0000, 1); // Color rojo, opacidad 1
                graphics.fillCircle(vertex.x, vertex.y, 4); // Dibuja un círculo en la posición (vertex.x, vertex.y) con radio 5
                redCirclesGroup.add(graphics);
            });
        }

        function getVerticesInRadius(x, y, radius) {
            return vertices.filter(vertex => {
                let distance = Phaser.Math.Distance.Between(x, y, vertex.x, vertex.y);
                return distance <= radius && distance > 20;
            });
        }

//CLICK EN LA PANTALLA  
//CLICK EN LA PANTALLA            
//CLICK EN LA PANTALLA                      
        function onPointerDown(pointer) {
        
        

        
        if(checkSecure===0){
        if(noMover===false){
        
        noMover = true;
        
        //INTENTO DE CUADRAR COORDENADAS AL HACER ZOOM OUT
     
           
        
        let cameraX = this.cameras.main.scrollX;
    	let cameraY = this.cameras.main.scrollY;
    	
    	///  let zoom = this.cameras.main.zoom;

            // Ajustar las coordenadas del puntero considerando el zoom
           // let pointerX = pointer.x / zoom + cameraX;
            //let pointerY = pointer.y / zoom + cameraY;
    	console.log(`Camera coordinates: (${cameraX}, ${cameraY})`); 
		console.log(`Click: (${pointer.x + cameraX}, ${pointer.y + cameraY}) `);	
        console.log(`ClickW: (${pointer.worldX + cameraX}, ${pointer.worldY + cameraY}) `);	
let worldPoint = this.cameras.main.getWorldPoint(this.cameras.main.width / 2, this.cameras.main.height / 2);

console.log(`World coordinates: (${worldPoint.x}, ${worldPoint.y})`);

		 let closestRedVertex = findClosestRedVertexToClick(pointer.x + cameraX, pointer.y + cameraY, cameraX, cameraY);


		if(ZoomOut === 1){
		 closestRedVertex = findClosestRedVertexToClick(pointer.x + cameraX, pointer.y + cameraY, cameraX, cameraY);
        }
    	if(ZoomOut === 2){
    	let worldPoint = this.cameras.main.getWorldPoint(this.cameras.main.width / 2, this.cameras.main.height / 2);

		 closestRedVertex = findClosestRedVertexToClick(pointer.x + worldPoint.x, pointer.y + worldPoint.y, cameraX, cameraY);
		}
        
        
        console.log(`Closest Click: (${closestRedVertex.x}, ${closestRedVertex.y}) `);	

	//ENVIAR A SERVER QUE SE EJECUTE MOVIMIENTO EN TODOS
	const player = players[socket.id];
	
	let VelocidadValor = 0;
	if(Velocidad===true){
	VelocidadValor = 50;
	}else if (Velocidad===false){
		VelocidadValor = 500;

	}
	
	socket.emit('animationData', { start: { x: player.x, y: player.y }, end: { x: closestRedVertex.x, y: closestRedVertex.y }, speed: VelocidadValor });
     
     
                 
	}
	}
	
	
	checkSecure = 0;
	}

   //FIND CLOSEST RED VERTEX  
//FIND CLOSEST RED VERTEX            
//FIND CLOSEST RED VERTEX                              
        function findClosestRedVertexToClick(x, y) {
            let closestVertex = null;
            let minDistance = Infinity;
            redVertices.forEach(vertex => {
                const dist = Phaser.Math.Distance.Between(x, y, vertex.x, vertex.y);
                if (dist < minDistance) {
                    minDistance = dist;
                    closestVertex = vertex;
                }
            });
           // console.log(`Click: (${x}, ${y})`);
          //  redVertices.forEach(vertex => console.log(`VERTEX TEST: (${vertex.x}, ${vertex.y})`));
           // console.log(`Closest Vertex: (${closestVertex.x}, ${closestVertex.y})`);
            return closestVertex;
        }

      







	//////////////////

//CLEAR RED VERTEX   
//CLEAR RED VERTEX                                      
//CLEAR RED VERTEX                                                                         
function clearRedVertices() {
             redCirclesGroup.clear(true, true);  // Borra todos los elementos del grupo redCirclesGroup
    redVertices = []; 
        }
		
//UPDATE RED VERTEX POINTS
//UPDATE RED VERTEX POINTS
//UPDATE RED VERTEX POINTS        
	function updateRedVertices(x, y) {
		//console.log(`UPDATE RED VERTICES: (${x}) `);	

	clearRedVertices.call(this);  

    const verticesInRadius = getVerticesInRadius(x, y, 60); // Radio de 60 píxeles
    verticesInRadius.forEach(vertex => { 
    redVertices.push({ x: vertex.x, y: vertex.y });
    //console.log(`redVertex: (${vertex.x}, ${vertex.y}) `);	
    
    const graphics = this.add.graphics();
    graphics.fillStyle(0xff0000, 1); // Color rojo, opacidad 1
    graphics.fillCircle(vertex.x, vertex.y, 4); // Dibuja un círculo en la posición (vertex.x, vertex.y) con radio 5
	
//textCamera.ignore([redCirclesGroup]);

	
	redCirclesGroup.add(graphics); 
                       
    });
            
    }       
//END UPDATE RED VERTEX POINTS   
		


	///TOP PLATERS SYSTEM
function addPlayer(name, puntos, color) {
	const nuevoJugador = { name: name, puntos: puntos, color: color };
	topplayers.push(nuevoJugador);
}
function getTopPlayers() {
const sortedPlayers = topplayers.sort((a, b) => b.puntos - a.puntos);
const topPlayersx = sortedPlayers.slice(0, 5);
topPlayersx.forEach(topplayer => { });
return topPlayersx;
}	


function gameOver(){

document.getElementById("retryBox").style.visibility = "visible";
var retryButton = document.getElementById("retryButton");
retryButton.onclick = function() {
console.log("Retry Game.");
location.reload();
};	


}

        
}  

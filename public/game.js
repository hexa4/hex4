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
		let ZoomOut = 1;

	let greenCirclesGroup;	
	let noMover = false;
	let checkSecure = 0;
	let Cam = 1;
	let fixedText1, fixedText2, fixedText3, fixedText4, fixedText5, fixedText6, fixedText7;
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






            


fixedText1 = this.add.text(10, 10, '', { fontSize: '16px', fill: '#ffffff' });
         fixedText2 = this.add.text(10, 30, '', { fontSize: '16px', fill: '#ffffff' });
         fixedText3 = this.add.text(10, 50, '', { fontSize: '16px', fill: '#ffffff' });
         fixedText4 = this.add.text(10, 70, '', { fontSize: '16px', fill: '#ffffff' });
         fixedText5 = this.add.text(10, 90, '', { fontSize: '16px', fill: '#ffffff' });
		 fixedText6 = this.add.text(window.innerWidth * dpi - 10, 10 * dpi, 'Points: 0', { fontSize: '16px', fill: '#ffffff' });
		

		
		
		fixedText6.setOrigin(1, 0); 
		//VELOCIDAD TOP RIGHT TEXT
		fixedText7 = this.add.text(window.innerWidth - 10, 30, '', { fontSize: '16px', fill: '#0000ff' });
		fixedText7.setOrigin(1, 0); 
        // Hace que los textos no se muevan con la cámara
        fixedText1.setScrollFactor(0);
        fixedText2.setScrollFactor(0);
        fixedText3.setScrollFactor(0);
        fixedText4.setScrollFactor(0);
        fixedText5.setScrollFactor(0);
        fixedText6.setScrollFactor(0);
		fixedText7.setScrollFactor(0);

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
          
            updateRedVertices.call(this, randomVertex.x, randomVertex.y); 


// Llamar a updateRedVertices con el contexto correcto
          
            this.input.on('pointerdown', onPointerDown, this);

	        	socket.emit('LlamargreenCirclesS');




//RECIBIR UPDATE POINTS AND SIZE Of PLAYER
socket.on('updatePuntos', function(myID, puntos) {
console.log('Recibido upDate Puntos:', myID, puntos);
const sizeCalc = (0.01 * puntos) + 0.2;		
players[myID].text.setText(players[myID].name + ' (' + puntos + ')');
players[myID].circle.setScale(sizeCalc); 
players[myID].puntos = puntos;
if(socket.id===myID)
fixedText6.setText('Points: '+puntos);
});


//UPDATE PLAYERS!!!!!! // AND CREATE PLAYERS //UPDATE PLAYERS!!!!!! // AND CREATE PLAYERS
//UPDATE PLAYERS!!!!!! // AND CREATE PLAYERS //UPDATE PLAYERS!!!!!! // AND CREATE PLAYERS
//UPDATE PLAYERS!!!!!! // AND CREATE PLAYERS //UPDATE PLAYERS!!!!!! // AND CREATE PLAYERS
//UPDATE PLAYERS!!!!!! // AND CREATE PLAYERS //UPDATE PLAYERS!!!!!! // AND CREATE PLAYERS
//UPDATE PLAYERS!!!!!! // AND CREATE PLAYERS //UPDATE PLAYERS!!!!!! // AND CREATE PLAYERS
socket.on('updatePlayers', updatedPlayers => {
console.log('SOCKET UPDATE PLAYERS');	
for (const playerId in updatedPlayers) {
const playerData = updatedPlayers[playerId];
console.log("Jugador:", playerData);
// Si el jugador ya existe, actualiza su posición
if (players[playerData.id]) {
} else {
// Si el jugador no existe, créalo y añádelo al objeto players
const playerKey = `player_${playerData.id}`; // Llave única para cada jugador
if (!this.textures.exists(playerKey)) {
const svgBlob = new Blob([playerData.skin], { type: 'image/svg+xml;charset=utf-8' });
const svgUrl = URL.createObjectURL(svgBlob);
this.load.image(playerData.id, svgUrl);
this.load.once('complete', () => {
//INVALIDAR IMAGEN DESPEUS DE CARGARLA
URL.revokeObjectURL(svgUrl);
const player = new Player(this, playerData.id, playerData.name, playerData.x, playerData.y, 10, playerData.skin, greenCirclesGroup, playerData.puntos,playerData.color);
players[playerData.id] = player;
console.log('SE CREA PLAYER', players[playerData.id]);
if(socket.id===playerData.id)
socket.emit('crearTopPlayers');
});
this.load.start();
} else {
const player = new Player(this, playerData.id, playerData.name, playerData.x, playerData.y, 10, playerData.skin, greenCirclesGroup, playerData.puntos,playerData.color);
players[playerData.id] = player;
}
}
}
});


///ANIMATE PLAYER MOVE // MOVE PLAYER FROM SERVER - ///ANIMATE PLAYER MOVE // MOVE PLAYER FROM SERVER - 
///ANIMATE PLAYER MOVE // MOVE PLAYER FROM SERVER - ///ANIMATE PLAYER MOVE // MOVE PLAYER FROM SERVER - 
///ANIMATE PLAYER MOVE // MOVE PLAYER FROM SERVER - ///ANIMATE PLAYER MOVE // MOVE PLAYER FROM SERVER - 
///ANIMATE PLAYER MOVE // MOVE PLAYER FROM SERVER - ///ANIMATE PLAYER MOVE // MOVE PLAYER FROM SERVER - 
socket.on('animatePlayer', animationData => {
    
    const playerId = animationData.playerId;
    const player = players[playerId];
	const data = animationData.data;
    const endX = data.end.x;
    const endY = data.end.y;
    
this.tweens.add({
                targets: [player.circle],
               	x: { value: endX, duration: data.speed, ease: 'Power2' },
    			y: { value: endY, duration: data.speed, ease: 'Power2' },
                duration: data.speed,
                ease: 'Power2',
                onUpdate: function(tween) {
				player.text.setPosition(player.circle.x, player.circle.y - 20);
              		},
               	onComplete: function() {
               	if(socket.id === playerId){
        		updateRedVertices.call(this, endX, endY);
        		socket.emit('updatePosition', { x: endX, y: endY });
        		noMover = false;
        		        
        		        
        		if(Cam===2){  
        		   
        		//INTENTO LIMITES CAMARA NO MARK:
        		let cameraX = this.cameras.main.scrollX;
        		let cameraY = this.cameras.main.scrollY;
        		let rightLimit = window.innerWidth * 0.7;
        		let leftLimit = window.innerWidth * 0.3;
        		let bottomLimit = window.innerHeight * 0.7;
        		let topLimit = window.innerHeight * 0.3;
        		let playerRelativeX = -cameraX + player.circle.x;
        		let playerRelativeY = -cameraY + player.circle.y;
				const playerLocal = players[socket.id];
				
				//DERECHA
				if (playerRelativeX >= rightLimit) {      
					console.log(`70% ALCANZADO RIGHT`);
						playerLocal.moveCameraToCenter();
				}     
				
				//IZQUIERDA
				if (playerRelativeX <= leftLimit) {    
										playerLocal.moveCameraToCenter();
  
					console.log(`30% ALCANZADO LEFT`);
				} 
				
				//BOTTOM
				if (playerRelativeY >= bottomLimit) { 
										playerLocal.moveCameraToCenter();
     
					console.log(`70% ALCANZADO BOTTOM`);
				} 
				
				//TOP
				if (playerRelativeY <= topLimit) {    
										playerLocal.moveCameraToCenter();
  
					console.log(`30% ALCANZADO TOP`);
				} 
				
				
				
				
				
				
				
				//END INTENTO LIMITES CAMARA NO MARK:
				}
				
				
        		        

				}
    			},
                onCompleteScope: this
  });
  
      
});    
///END ANIMATE PLAYER MOVE

			
//RECIBIR GREENCIRCLESS FROM SERVER

socket.on('greenCirclesS', function(greenCirclesS) {
    console.log('Recibido greenCircles:', greenCirclesS);
    drawGreenCircles.call(this, greenCirclesS); // Usar call para establecer el contexto correcto
}.bind(this));	





//ELIMINAR VERDE ACTIVADO DESDE EL SERVER. DESDE EL SERVER ESTA FUNCION
socket.on('eliminarGreenServer', (collisionIndex, myID) => {
    	console.log(`eliminarGreenServer`);
    	
    	if(myID!=socket.id){
    	greenCirclesGroup.children.each((greenCircle) => {
        if (greenCircle.z === collisionIndex) {
        

                        textOnDestroy(this, greenCircle.x, greenCircle.y, '+1 points', '20px', '#00ff00');

		if(greenCircle.type === 'blue'){
       	 
       	 		textOnDestroy(this, greenCircle.x, greenCircle.y, '+speed', '20px', '#0000ff');

       	 console.log(`SPEED ACTIVATED.`);

       	}
            
            console.log(`Green circle with z = ${collisionIndex} found and destroyed.`);
            greenCircle.destroy();
            

            
        }
    });
    }
});







        
        
        

//ELIMINAR PLAYER ACTIVADO DESDE EL SERVER. DESDE EL SERVER ESTA FUNCION
socket.on('eliminarPlayerServer', (collisionIndex) => {
    	console.log(`eliminarPlayerServer`);
    	
    	if(collisionIndex!=socket.id){
   

   
			const otherPlayer = players[collisionIndex];
			
			       	console.log(`playerEliminado:`, otherPlayer);

			
			textOnDestroy(this, otherPlayer.x, otherPlayer.y, otherPlayer.name +' eliminated!', '20px', '#ff0000');

    		otherPlayer.destroyPlayer(collisionIndex);
    		
    		
    		socket.emit('crearTopPlayers');


    
    
    
    }
}); 

	
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



//DRAW GREEN CIRCLES!!!!!!
function drawGreenCircles(greenCirclesS) {
console.log('GREEN CIRCLES DRAW');
    let index = 0;


      for (const circle of greenCirclesS) {
        const circleGraphics = this.add.graphics(); // 'this' debería ser la escena de Phaser.js
       // circleGraphics.fillStyle(0x00ff00, 0.5); // Color verde con opacidad del 50%
      
      
      
      //COLISION    
      
       //GREEN POINTS
       if(index<15){
     		let graphics = this.add.graphics({ fillStyle: { color: 0x00ff00 } });
            let greenCircle = graphics.fillCircle(0, 0, 5);
            let greenCirclePhysics = this.physics.add.existing(greenCircle);
            greenCirclePhysics.body.setCircle(5);
            greenCirclePhysics.body.setCollideWorldBounds(true);
            greenCirclePhysics.x = circle.x;
            greenCirclePhysics.y = circle.y;
            greenCirclePhysics.z = circle.z;
                                    greenCirclePhysics.type = 'green';

            greenCirclesGroup.add(greenCirclePhysics);  
 
        
        //BLUE SPEED
        }else{
        let graphics = this.add.graphics({ fillStyle: { color: 0x0000ff } });
            let greenCircle = graphics.fillCircle(0, 0, 3);
            let greenCirclePhysics = this.physics.add.existing(greenCircle);
            greenCirclePhysics.body.setCircle(3);
            greenCirclePhysics.body.setCollideWorldBounds(true);
            greenCirclePhysics.x = circle.x;
            greenCirclePhysics.y = circle.y;
            greenCirclePhysics.z = circle.z;
                        greenCirclePhysics.type = 'blue';

            greenCirclesGroup.add(greenCirclePhysics);   

        
        }
        
        
    
            index++;

    }
}



//CLASE PLAYER 
//CLASE PLAYER  
//CLASE PLAYER   
  class Player {
    constructor(scene, id, name, x, y, size, skin, greenCirclesGroup, puntos,color) {
        this.scene = scene;
        this.id = id;
        this.name = name;
        this.size = size;
        this.x = x;
        this.y = y;
        this.skin = skin;
        this.greenCirclesGroup = greenCirclesGroup; 
        this.puntos = puntos;
        this.color = color;
        
        //TAMANO DEL JUGADOR
        //TAMANO DEL JUGADOR
        //TAMANO DEL JUGADOR
        const sizeCalc = (0.01 * puntos) + 0.2;		


		//this.circle = this.scene.add.image(x, y, 'player');
		this.circle = this.scene.physics.add.image(x, y, id);
        this.circle.setScale(sizeCalc); 
        
        this.circle.setInteractive();

        // Texto encima del jugador
        this.text = this.scene.add.text(x, y - 20, name + ' (' + puntos + ')', { fontSize: '12px', fill: '#ffffff' });
        this.text.setOrigin(0.5);
        
		//CAMARA PARA CLIENTE INDIVIDUAL
        if (id === socket.id) {
            // código adicional para el jugador local
           this.scene.cameras.main.startFollow(this.circle);
            this.scene.physics.add.overlap(this.circle, greenCirclesGroup, collectGreenCircle, null, this.scene);


			//COLISION PLAYERS PRUEBA


						


        }
        
        			this.circle.type = 'player';
					this.circle.id = id;
                    greenCirclesGroup.add(this.circle);  

        
        
        
        //COLISION NUEVA

        
    }
    
    
    stopCameraFollow() {
        // Detener el seguimiento de la cámara
        this.scene.cameras.main.stopFollow();
    }
    
      fontSizePlayer(number) {
        // Detener el seguimiento de la cámara
        this.text.setFontSize(number); // Cambia el tamaño de la fuente a 48px
    }
    
    startCameraFollow() {
        // Detener el seguimiento de la cámara
            this.scene.cameras.main.startFollow(this.circle);
    }
    
    // Método para actualizar la posición del jugador
    setPosition(x, y) {
        this.circle.setPosition(x, y);
        this.text.setPosition(x, y - 20);
        this.x = x;
        this.y = y;
    }

    updateGraphicsPosition() {
        // Actualizar la posición del círculo y el texto
        if (this.circle && this.text) {
            this.circle.x = this.x;
            this.circle.y = this.y;
            this.text.x = this.x;
            this.text.y = this.y - 20;
        }
    }
    
    
    
    //MOVER CAMARA A CENTRO CUANDO 30% y 70% LIMITE
    moveCameraToCenter() {
        // Si ya está siguiendo la cámara, no hacer nada
        if (this.followingCamera) {
            return;
        }

        // Obtener las coordenadas del jugador
        const playerX = this.circle.x;
        const playerY = this.circle.y;

        // Usar un tween para mover la cámara suavemente hacia el jugador
        this.scene.tweens.add({
            targets: this.scene.cameras.main,
            scrollX: playerX - this.scene.scale.width / 2,
            scrollY: playerY - this.scene.scale.height / 2,
            duration: 1000, // Duración del tween en milisegundos
            ease: 'Power2',
            onComplete: () => {
               // this.startCameraFollow();
            }
        });
    }   
    
    
        destroyPlayer(suID) {
        // Detener el seguimiento de la cámara si es necesario
        if (this.id === socket.id) {
            this.stopCameraFollow();
        }

        // Eliminar el círculo del jugador
        if (this.circle) {
            this.circle.destroy();
        }

        // Eliminar el texto del jugador
        if (this.text) {
            this.text.destroy();
        }

        // Eliminar el jugador del grupo de círculos verdes si es necesario
        if (this.greenCirclesGroup) {
            this.greenCirclesGroup.remove(this.circle);
        }
        
        
                delete players[suID];

        
    } 

}


//COLISION CON GREEN CIRCLES
function collectGreenCircle(player, greenCircle) {

		    //	console.log(`COLISION!!!!!!!!!!.`);


        // Acceder a las propiedades del círculo verde
    	//console.log(`Green circle col. ${greenCircle.z}`);
    	

		//MANDAR A SERVIDOR PARA EJECUTAR QUE SE ELIMINE EN TODOS CLIENTES
       	//SUMAR PUNTO
       	
       	      // 	 console.log(`TYPE CIRCLE.`, );

       	
       	if(greenCircle.type === 'green'){
       			socket.emit('eliminarGreen', greenCircle.z, socket.id);

       	        greenCircle.destroy();

       	    	textOnDestroy(this, greenCircle.x, greenCircle.y, '+1 points', '20px', '#00ff00');

       	       	socket.emit('greenCircleEaten');
       	}
       	
       	 if(greenCircle.type === 'blue'){
       	 		socket.emit('eliminarGreen', greenCircle.z, socket.id);

       	         greenCircle.destroy();

       	 
       	 activarVelocidad() ;
       	  llamarTextoSpeed(this);
       	 
       	 
       	 		textOnDestroy(this, greenCircle.x, greenCircle.y, '+speed', '20px', '#0000ff');

       	 console.log(`SPEED ACTIVATED.`);

       	}
       	
       	
       	
       	//COLISION WITH PLAYER
       	if(greenCircle.type === 'player'){
       	    	//textOnDestroy(this, greenCircle.x, greenCircle.y, '+1 points', '20px', '#00ff00');


			    const localPlayer = players[socket.id];
			    const otherPlayer = players[greenCircle.id];
			    
			    const localPuntos = localPlayer.puntos;
			    const otherPuntos = otherPlayer.puntos;
			    
			    
			    if(otherPuntos > localPuntos){
			    
			    				localPlayer.destroyPlayer(socket.id);

			    
			    socket.emit('eliminarPlayer', socket.id);

			    
			    
			    gameOver();
			    
			    }
			    
			     if(otherPuntos < localPuntos){
			    
			    
				textOnDestroy(this, greenCircle.x, greenCircle.y, otherPlayer.name +' eliminated!', '20px', '#ff0000');

				otherPlayer.destroyPlayer(greenCircle.id);

			    
			    }

			
			console.log(`COLISION WItH PLAYER`);
			console.log(`PLAYER `,greenCircle.id );

			
       	}
       
}





let Velocidad = false;
let segundosRestantes = 5;
let intervalo;
///ACTIVAR VELOCIDAD TEXTO
function activarVelocidad() {
clearInterval(intervalo);

    Velocidad = true;
    const newVel = { velocidad: Velocidad };
    //socket.emit('updateVelocidadServer', newVel);
    console.log('Velocidad activada');
    fixedText7.setText(`X2 SPEED - 5 s`);

    segundosRestantes = 5;
    intervalo = setInterval(function() {
        segundosRestantes--;
        if (segundosRestantes > 0) {
            fixedText7.setText(`X2 SPEED - ${segundosRestantes} s`);
        } else {
            clearInterval(intervalo);
            Velocidad = false;
            console.log('Velocidad desactivada');
            const newVel = { velocidad: Velocidad };
            //socket.emit('updateVelocidadServer', newVel);
            fixedText7.setText(``);
        }
    }, 1000); // Actualizar cada segundo
}



//BORRA TODOS CIRCULOS VERDES PARA VOLVER A GENERAR (DESDE SERVER ACCIONADO)
socket.on('borrarTodosGreen', () => {
	console.log('BORRAR GREEN CIRCLES.');
	
	
    	    greenCirclesGroup.getChildren().forEach(circle => {
        // Verificar si el tipo no es 'player'
        if (circle.type !== 'player') {
            // Eliminar el círculo
            circle.destroy();
        }
    });
    	    
    	    
    	    
});
		





///TEXTO VELOCIDAD EN EL MEDIO PANTALLA
  function llamarTextoSpeed(scene) {
        const width = scene.scale.width;
        const height = scene.scale.height;

        const text = scene.add.text(width / 2, height / 2, '+speed!', {
            fontSize: '48px',
            fill: '#0000ff'
        }).setOrigin(0.5, 0.5);

        text.setScrollFactor(0);


        scene.tweens.add({
            targets: text,
            scaleX: 2,
            scaleY: 2,
            duration: 500,
            ease: 'Power2',
            yoyo: scene, // Para hacer que el tween vuelva al tamaño original
            onComplete: () => {
                scene.time.addEvent({
                    delay: 500,
                    callback: () => {
                        text.destroy();
                    }
                });
            }
        });
    }


function textOnDestroy(scene, x, y, texto, size, color) {

            
            const text = scene.add.text(x, y, texto, {
                    fontSize: size,
                    fill: color
            });
            
               text.setOrigin(0.5, 0.5); // Establece el origen del texto en su centro
    text.setPosition(x, y); // Reposiciona el texto
            
             scene.time.addEvent({
                    delay: 1200,
                    callback: () => {
                        text.destroy();
                    }
            });


}




		

        
}  

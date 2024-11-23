const dpi = window.devicePixelRatio;
const width = window.innerWidth * dpi;
const height = window.innerHeight * dpi;
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

let playerName;
let playerNameInput = document.getElementById('playerName');
let errorMessage = document.getElementById('errorMessage');
let submitButton = document.getElementById('submitButton');
const nameForm = document.getElementById('nameForm');

///FUNCION DEL BOTON JUGAR PLAY SE INICIA JUEGO
submitButton.addEventListener('click', function() {
playerName = playerNameInput.value.trim();      
if (playerName.length === 0 || playerName.length > 20) {
errorMessage.style.display = 'block';
return; }
nameForm.style.display = 'none';
requestAnimationFrame(function() {
startGame(playerName); });
});
    
function startGame(playerName) {
   	let player;
        let hexagonGraphics,hexagonGraphics2;
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
        let hexagonGroup,hexagonGroup2;
        let playerNameCircle;
	let checkbox, fixedText, hitArea;
        let checkboxSize = 20;
        let isChecked = true;
	let Velocidad = false;
	let segundosRestantes = 5;
	let intervalo;
	const hexagonMap = [
        [{ direction: 'NE' }, { direction: 'E' }, { direction: 'SE' }, { direction: 'E' }],
        [{ direction: 'SW' }, { direction: 'ES' } ,{ direction: 'E' }, { direction: 'ES' }, { direction: 'E' }],
        [{ direction: 'SW' }, { direction: 'ES' }, { direction: 'E' }, { direction: 'ES' }, { direction: 'E' }]
    	];

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
        const sizeCalc = (0.01 * puntos) + 0.2;		
	    
	this.circle = this.scene.physics.add.image(x, y, id);
     //   this.circle.setScale(sizeCalc); 
	this.circle.setScale(2);	
        this.circle.setInteractive();

        // Texto encima del jugador
        this.text = this.scene.add.text(Math.round(x), Math.round(y - 20), name + ' (' + puntos + ')', { fontSize: '12px', fill: '#ffffff'  , resolution: dpi * 2  , fontFamily: 'Roboto'});
        this.text.setOrigin(0.5);
	this.text.setShadow(2, 2, 'blue', 5);
	
        
	//CAMARA PARA CLIENTE INDIVIDUAL
        if (id === socket.id) {
        this.scene.cameras.main.startFollow(this.circle);
        this.scene.physics.add.overlap(this.circle, this.greenCirclesGroup, this.collectGreenCircle2, null, this.scene);
        }
        
	this.circle.type = 'player';
	this.circle.id = id;
        this.greenCirclesGroup.add(this.circle);  
    }

 collectGreenCircle2(player, greenCircle) {

	//COLISION WITH GREEN CIRCLE 	 
       	if(greenCircle.type === 'green'){
       	socket.emit('eliminarGreen', greenCircle.z, socket.id);
	greenCircle.destroy();
	this.textOnDestroy(this, greenCircle.x, greenCircle.y, '+1 points', '10px', '#00ff00');
	socket.emit('greenCircleEaten');
	console.log(`type ='GREEN.`);
	
       	}

	//COLISION WITH BLUE CIRCLE 
       	if(greenCircle.type === 'blue'){
       	socket.emit('eliminarGreen', greenCircle.z, socket.id);
	greenCircle.destroy();
	this.activarVelocidad() ;
       	this.llamarTextoSpeed(this);
       	this.textOnDestroy(this, greenCircle.x, greenCircle.y, '+speed', '10px', '#0000ff');
	console.log(`SPEED ACTIVATED.`);
	console.log(`type ='BLUE.`);

       	}
       	
       	//COLISION WITH PLAYER
       	if(greenCircle.type === 'player'){
	const localPlayer = players[socket.id];
	const otherPlayer = players[greenCircle.id];
	const localPuntos = localPlayer.puntos;
	const otherPuntos = otherPlayer.puntos;
	if(otherPuntos > localPuntos){
	localPlayer.destroyPlayer(socket.id);
	socket.emit('eliminarPlayer', socket.id);
	console.log(`type ='PLAYER.`);
	this.gameOver();
	}	    
	if(otherPuntos < localPuntos){
	this.textOnDestroy(this, greenCircle.x, greenCircle.y, otherPlayer.name +' eliminated!', '20px', '#ff0000');
	otherPlayer.destroyPlayer(greenCircle.id);
	}
	console.log(`COLISION WItH PLAYER`);
	console.log(`PLAYER `,greenCircle.id );	
       	}

	console.log(`ELIMINAR ESTE Z: `,greenCircle.z);
 
	 
} //END collectGreenCircle2
    
stopCameraFollow() {
        this.scene.cameras.main.stopFollow();
}
    
fontSizePlayer(number) {
        this.text.setFontSize(number); 
}
    
startCameraFollow() {
        this.scene.cameras.main.startFollow(this.circle);
}
    
setPosition(x, y) {
        this.circle.setPosition(x, y);
        this.text.setPosition(x, y - 20);
        this.x = x;
        this.y = y;
}

updateGraphicsPosition() {
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
        if (this.followingCamera) { return; }
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
            onComplete: () => { } });
}   
    
destroyPlayer(suID) {
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

} //END PLAYER CLASS //END PLAYER CLASS //END PLAYER CLASS //END PLAYER CLASS //END PLAYER CLASS 

///GAMESCENE///////!?!?!?!?!?!??!?!?!?!?!?!?!?!?!?!?!?!?!??! /// /// ////// /// ////// /// ////// /// ////// /// ////// /// ////// /// ///
///GAMESCENE///////!?!?!?!?!?!??!?!?!?!?!?!?!?!?!?!?!?!?!??! /// /// ////// /// ////// /// ////// /// ////// /// ////// /// ////// /// ///
///GAMESCENE///////!?!?!?!?!?!??!?!?!?!?!?!?!?!?!?!?!?!?!??! /// /// ////// /// ////// /// ////// /// ////// /// ////// /// ////// /// ///

class GameScene extends Phaser.Scene {
        constructor() { super({ key: 'GameScene' }); }
        preload() { }

	//CREATE GameScene //CREATE GameScene //CREATE GameScene //CREATE GameScene 
	//CREATE GameScene //CREATE GameScene //CREATE GameScene //CREATE GameScene 
        create() {		

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
	
	//RECIBIR UPDATE TOP PLAYERS
	socket.on('updateTopPlayers', () =>  {
	topplayers = [];
	for (const playerId in players) {
	const player = players[playerId];
	console.log(`ID: ${playerId}, Nombre: ${player.name}, Puntos: ${player.puntos}`);
	this.addPlayer(players[playerId].name, players[playerId].puntos, players[playerId].color);
	}
	const topPlayers = this.getTopPlayers();
	fixedText1.setText(topPlayers.length >= 1 ? `#1 ${topPlayers[0].name}: ${topPlayers[0].puntos}` : '');
	if (topPlayers[0] && topPlayers[0].color) {
	fixedText1.setFill(topPlayers[0].color); }
	fixedText2.setText(topPlayers.length >= 2 ? `#2 ${topPlayers[1].name}: ${topPlayers[1].puntos}` : '');
	if (topPlayers[1] && topPlayers[1].color) {
	fixedText2.setFill(topPlayers[1].color); }
	fixedText3.setText(topPlayers.length >= 3 ? `#3 ${topPlayers[2].name}: ${topPlayers[2].puntos}` : '');
	if (topPlayers[2] && topPlayers[2].color) {
	fixedText3.setFill(topPlayers[2].color); }
	fixedText4.setText(topPlayers.length >= 4 ? `#4 ${topPlayers[3].name}: ${topPlayers[3].puntos}` : '');
	if (topPlayers[3] && topPlayers[3].color) {
	fixedText4.setFill(topPlayers[3].color); }
	fixedText5.setText(topPlayers.length >= 5 ? `#5 ${topPlayers[4].name}: ${topPlayers[4].puntos}` : '');
	if (topPlayers[4] && topPlayers[4].color) {
	fixedText5.setFill(topPlayers[4].color); }
	});			 	

	//BORRA TODOS CIRCULOS VERDES PARA VOLVER A GENERAR (DESDE SERVER ACCIONADO)
	socket.on('borrarTodosGreen', () => {
	console.log('BORRAR GREEN CIRCLES.');
	this.greenCirclesGroup.getChildren().forEach(circle => {
        // Verificar si el tipo no es 'player'
        if (circle.type !== 'player') {
            circle.destroy();
        } });   	    
	});
   
//CAM ZOOM INITIALIZATION
const zoomLevel = isMobile ? 8 / dpi : 1 / dpi; // Menos zoom en PC
this.cameras.main.setZoom(zoomLevel);
let zoomFactor = this.cameras.main.zoom; 
let worldPoint = this.cameras.main.getWorldPoint(this.cameras.main.width / 2, this.cameras.main.height / 2);


this.greenCirclesGroup = this.physics.add.group();

//HEXAGONAL MAP INITIALIZATION		
//hexagonGraphics2 = this.add.graphics({ lineStyle: { width: 6, color: 0x0077ff, alpha: 0.2 } });
//hexagonGraphics2 = this.add.graphics({ lineStyle: { width: 6, color: 0x808080 } });	
		hexagonGraphics2 = this.add.graphics({
    lineStyle: { width: 6, color: 0x808080 },
    antialias: true // Intenta añadir esta propiedad si el renderizador lo permite
});
hexagonGroup2 = this.add.group();
//hexagonGraphics = this.add.graphics({ lineStyle: { width: 2, color: 0x808080 } });
hexagonGraphics = this.add.graphics({
    lineStyle: { width: 2, color: 0x0099ff },
    antialias: true // Intenta añadir esta propiedad si el renderizador lo permite
});
		
redCirclesGroup = this.add.group();
hexagonGroup = this.add.group();

/*		
for (let y = 0; y < hexagonMap.length; y++) {
    for (let x = 0; x < hexagonMap[y].length; x++) {
        let hexX = x * hexagonWidth * 0.75;
        let hexY = y * hexagonHeight + (x % 2 === 0 ? 0 : hexagonHeight / 2);
        // Opcional: Usa la dirección del hexágono si es necesario
        let direction = hexagonMap[y][x].direction;
        //console.log(`Hexágono en (${x}, ${y}) tiene dirección: ${direction}`);
        this.drawHexagon2(hexX, hexY, hexagonSize);
        hexagons.push({ x: hexX, y: hexY });
        vertices.push(...this.getHexVertices(hexX, hexY));
        hexagonGroup2.add(hexagonGraphics2); // Añadir el gráfico del hexágono al grupo
    }
}  
	*/	
// Crear el mapa hexagonal
for (let y = 0; y < hexagonMap.length; y++) {
    for (let x = 0; x < hexagonMap[y].length; x++) {
        let hexX = x * hexagonWidth * 0.75;
        let hexY = y * hexagonHeight + (x % 2 === 0 ? 0 : hexagonHeight / 2);
        // Opcional: Usa la dirección del hexágono si es necesario
        let direction = hexagonMap[y][x].direction;
       	//console.log(`Hexágono en (${x}, ${y}) tiene dirección: ${direction}`);
        this.drawHexagon(hexX, hexY, hexagonSize);
        hexagons.push({ x: hexX, y: hexY });
        vertices.push(...this.getHexVertices(hexX, hexY));
        hexagonGroup.add(hexagonGraphics); // Añadir el gráfico del hexágono al grupo
    }
}

// Crear el jugador en un vértice aleatorio
const randomHex = hexagons[Phaser.Math.Between(0, hexagons.length - 1)];
const randomVertex = this.getHexVertices(randomHex.x, randomHex.y)[Phaser.Math.Between(0, 5)];
player = this.add.circle(randomVertex.x, randomVertex.y, 0, 0xffffff);

socket.emit('newPlayer', { name: playerName, x: randomVertex.x, y: randomVertex.y, skin: skinCode });       
this.updateRedVertices.call(this, randomVertex.x, randomVertex.y); 
//console.log("COORDS", randomVertex.x,randomVertex.y);
this.input.on('pointerdown', this.onPointerDown, this);

socket.emit('LlamargreenCirclesS');

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
const player = new Player(this, playerData.id, playerData.name, playerData.x, playerData.y, 10, playerData.skin, this.greenCirclesGroup, playerData.puntos,playerData.color);
players[playerData.id] = player;
console.log('SE CREA PLAYER', players[playerData.id]);
socket.emit('crearTopPlayers');

if(socket.id===playerData.id){
console.log("Ejecutar Top Players");
//socket.emit('crearTopPlayers');
}
});
this.load.start();
} else {
const player = new Player(this, playerData.id, playerData.name, playerData.x, playerData.y, 10, playerData.skin, this.greenCirclesGroup, playerData.puntos,playerData.color);
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
        		this.updateRedVertices.call(this, endX, endY);
        		socket.emit('updatePosition', { x: endX, y: endY });
        		noMover = false;
             
        	if(Cam===2){  
        		//INTENTO LIMITES CAMARA NO MARK:
        		let cameraX = this.cameras.main.scrollX;
        		let cameraY = this.cameras.main.scrollY;
        		let rightLimit = (window.innerWidth*dpi) * 0.7;
        		let leftLimit = (window.innerWidth*dpi) * 0.3;
        		let bottomLimit = (window.innerHeight*dpi) * 0.7;
        		let topLimit = (window.innerHeigh*dpi) * 0.3;
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
    this.drawGreenCircles.call(this, greenCirclesS); // Usar call para establecer el contexto correcto
}.bind(this));	

//ELIMINAR VERDE ACTIVADO DESDE EL SERVER. DESDE EL SERVER ESTA FUNCION
socket.on('eliminarGreenServer', (collisionIndex, myID) => {
    	console.log(`eliminarGreenServer`);

	
    	if(myID!=socket.id){
    	this.greenCirclesGroup.children.each((greenCircle) => {
        if (greenCircle.z === collisionIndex) {
        	this.textOnDestroy(this, greenCircle.x, greenCircle.y, '+1 points', '20px', '#00ff00');
		if(greenCircle.type === 'blue'){
       	 		this.textOnDestroy(this, greenCircle.x, greenCircle.y, '+speed', '20px', '#0000ff');
			console.log(`SPEED ACTIVATED.`);
		}
            console.log(`Green circle with z = ${collisionIndex} found and destroyed.`);
            greenCircle.destroy();   
        } });
    }

	
});

//ELIMINAR PLAYER ACTIVADO DESDE EL SERVER. DESDE EL SERVER ESTA FUNCION
socket.on('eliminarPlayerServer', (collisionIndex) => {
    	console.log(`eliminarPlayerServer`);
    	if(collisionIndex!=socket.id){
   		const otherPlayer = players[collisionIndex];
		console.log(`playerEliminado:`, otherPlayer);
		this.textOnDestroy(this, otherPlayer.x, otherPlayer.y, otherPlayer.name +' eliminated!', '20px', '#ff0000');
    		otherPlayer.destroyPlayer(collisionIndex);
    		socket.emit('crearTopPlayers');
    	}
}); 

game.scene.start('UIScene');
game.scene.bringToTop('UIScene');

	
}
//END CREATE GAME SCENE END CREATE
//END CREATE GAME SCENE END CREATE
//END CREATE GAME SCENE END CREATE
//END CREATE GAME SCENE END CREATE
//END CREATE GAME SCENE END CREATE

update() { }

drawHexagon(x, y, size) {
	const points = this.getHexVertices(x, y, size);
        hexagonGraphics.strokePoints(points, true);
}
drawHexagon2(x, y, size) {
	const points = this.getHexVertices(x, y, size);
        hexagonGraphics2.strokePoints(points, true);
}
getHexVertices(x, y, size = hexagonSize) {
        const points = [];
        for (let i = 0; i < 6; i++) {
                const angle = Phaser.Math.DegToRad(60 * i);
                const px = x + size * Math.cos(angle);
                const py = y + size * Math.sin(angle);
                points.push(new Phaser.Geom.Point(px, py));
        } return points;
}

getVerticesInRadius(x, y, radius) {
		return vertices.filter(vertex => {
                let distance = Phaser.Math.Distance.Between(x, y, vertex.x, vertex.y);
                return distance <= radius && distance > 20; });
}

//CLICK EN LA PANTALLA  
//CLICK EN LA PANTALLA            
//CLICK EN LA PANTALLA                      
onPointerDown(pointer) { 
	if(checkSecure===0){
        	if(noMover===false){
        		noMover = true;
        let cameraX = this.cameras.main.scrollX;
    	let cameraY = this.cameras.main.scrollY;
    	console.log(`Camera coordinates: (${cameraX}, ${cameraY})`); 
	console.log(`Click: (${pointer.x + cameraX}, ${pointer.y + cameraY}) `);	
        //console.log(`ClickW: (${pointer.worldX + cameraX}, ${pointer.worldY + cameraY}) `);	
	let worldPoint = this.cameras.main.getWorldPoint(this.cameras.main.width / 2, this.cameras.main.height / 2);
	console.log(`World coordinates: (${worldPoint.x}, ${worldPoint.y})`);
	
	let closestRedVertex = this.findClosestRedVertexToClick(pointer.x + cameraX, pointer.y + cameraY, cameraX, cameraY);

	if(ZoomOut === 1){
		 closestRedVertex = this.findClosestRedVertexToClick(pointer.x + cameraX, pointer.y + cameraY, cameraX, cameraY);
       	        console.log(`1 Closest Click: (${closestRedVertex.x}, ${closestRedVertex.y}) `);	

	}


			
    	if(ZoomOut === 2){
	    let worldPoint = this.cameras.main.getWorldPoint(pointer.x, pointer.y);
    	//let worldPoint = this.cameras.main.getWorldPoint(this.cameras.main.width / 2, this.cameras.main.height / 2);
		// closestRedVertex = this.findClosestRedVertexToClick(pointer.x + worldPoint.x, pointer.y + worldPoint.y, cameraX, cameraY);
	closestRedVertex = this.findClosestRedVertexToClick(
        worldPoint.x, 
        worldPoint.y, 
        this.cameras.main.scrollX, 
        this.cameras.main.scrollY
    );

	        console.log(`2 Closest Click: (${closestRedVertex.x}, ${closestRedVertex.y}) `);	
	
	}


			

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
} //END POINTER CLICK

//FIND CLOSEST RED VERTEX  
//FIND CLOSEST RED VERTEX            
//FIND CLOSEST RED VERTEX                              
findClosestRedVertexToClick(x, y) {
            let closestVertex = null;
            let minDistance = Infinity;
            redVertices.forEach(vertex => {
                const dist = Phaser.Math.Distance.Between(x, y, vertex.x, vertex.y);
                if (dist < minDistance) {
                    minDistance = dist;
                    closestVertex = vertex;
                }
            }); return closestVertex;
}
                                     
//CLEAR RED VERTEX                                                                         
 clearRedVertices() {
	redCirclesGroup.clear(true, true);  // Borra todos los elementos del grupo redCirclesGroup
    	redVertices = []; 
}
		
//UPDATE RED VERTEX POINTS        
updateRedVertices(x, y) {
	this.clearRedVertices.call(this);  
    	const verticesInRadius = this.getVerticesInRadius(x, y, 60); // Radio de 60 píxeles
    	verticesInRadius.forEach(vertex => { 
    	redVertices.push({ x: vertex.x, y: vertex.y });
    	//console.log(`redVertex: (${vertex.x}, ${vertex.y}) `);	
   	const graphics = this.add.graphics();
    	graphics.fillStyle(0xff0000, 1); // Color rojo, opacidad 1
    	graphics.fillCircle(vertex.x, vertex.y, 4); // Dibuja un círculo en la posición (vertex.x, vertex.y) con radio 5
	redCirclesGroup.add(graphics);                        
    });         
}       
//END UPDATE RED VERTEX POINTS   
		
///TOP PLATERS SYSTEM
 addPlayer(name, puntos, color) {
	const nuevoJugador = { name: name, puntos: puntos, color: color };
	topplayers.push(nuevoJugador);
}
getTopPlayers() {
	const sortedPlayers = topplayers.sort((a, b) => b.puntos - a.puntos);
	const topPlayersx = sortedPlayers.slice(0, 5);
	topPlayersx.forEach(topplayer => { });
	return topPlayersx;
}	

//GAME OVER FUNCTION	
gameOver(){
	let pointsText = fixedText6.text;

    // Encuentra el elemento HTML
    let pointsElement = document.getElementById('points');

    // Actualiza el texto del elemento con el puntaje
    pointsElement.innerText = pointsText;

	document.getElementById("retryBox").style.visibility = "visible";
	var retryButton = document.getElementById("retryButton");
	retryButton.onclick = function() {
	console.log("Retry Game.");
	location.reload();
	};	
}

//DRAW GREEN CIRCLES!!!!!!



drawGreenCircles(greenCirclesS) {
console.log('GREEN CIRCLES DRAW');

const initialRadius = 5;
        const maxRadius = 10;
        const duration = 1000; // Duración del tween en milisegundos



    let index = 0;
      for (const circle of greenCirclesS) {
	          	console.log('CIRCLES Z', circle.z);

        const circleGraphics = this.add.graphics(); // 'this' debería ser la escena de Phaser.js
       // circleGraphics.fillStyle(0x00ff00, 0.5); // Color verde con opacidad del 50%      
       //GREEN POINTS
       if(index<15){



	       
                  /*   let graphics = this.add.graphics({ fillStyle: { color: 0x00ff00 } });
                    let greenCircle = graphics.fillCircle(0, 0, 5);
                    let greenCirclePhysics = this.physics.add.existing(greenCircle);
                    greenCirclePhysics.body.setCircle(5);
                    greenCirclePhysics.body.setCollideWorldBounds(true);
                    greenCirclePhysics.x = circle.x;
                    greenCirclePhysics.y = circle.y;
                    greenCirclePhysics.z = circle.z;
                greenCirclePhysics.type = 'green';
*/

	           //    const circleGraphics = this.add.graphics({ fillStyle: { color: 0x00ff00, alpha: 0.5 } });
    const circleGraphics = this.add.graphics({ resolution: window.devicePixelRatio * 2 });
circleGraphics.fillStyle(0x00ff00, 0.5); // Color y opacidad

    // Dibujar el círculo inicialmente con radio 5
    circleGraphics.fillCircle(0, 0, 5); // Radio 5 inicial

    // Crear un contenedor para manejar la escala
    let container = this.add.container(circle.x, circle.y, [circleGraphics]);

    // Añadir física al contenedor (no a los gráficos directamente)
    let greenCirclePhysics = this.physics.add.existing(container);
    greenCirclePhysics.body.setCircle(5); // Radio inicial del cuerpo físico

    // Hacer que colisione con los límites del mundo
    greenCirclePhysics.body.setCollideWorldBounds(true);

    // Asignar el 'type' personalizado para clasificar el círculo
    greenCirclePhysics.type = 'green'; // En este caso, lo etiquetamos como un círculo "azul"
                        greenCirclePhysics.z = circle.z;

    // Añadir el círculo al grupo
    this.greenCirclesGroup.add(greenCirclePhysics);
  
                  //  this.greenCirclesGroup.add(greenCirclePhysics);  



 this.tweens.add({
        targets: container, // Escalar el contenedor
        scaleX: 1.5, // Escala en el eje X (para un radio de 10)
        scaleY: 1.5, // Escala en el eje Y (para un radio de 10)
        duration: 1000, // Cambia en 1 segundo
        yoyo: true, // Vuelve al tamaño original (radio 5)
        repeat: -1, // Repite indefinidamente
        onUpdate: (tween) => {


if (!container.active) {
                tween.stop();  // Detén el tween
                tween.remove(); // Elimina el tween
            } else {

            // Obtener el valor de la escala actual (suponiendo que escala 1 = radio 5, y escala 2 = radio 10)
            let scale = container.scaleX;
            let newRadius = 5 * scale; // Ajustar el nuevo radio según la escala
            greenCirclePhysics.body.setCircle(newRadius); // Actualizar el radio físico
        }

}

    });




        //BLUE SPEED
        }else{




        const circleGraphics = this.add.graphics({ fillStyle: { color: 0x0000ff, alpha: 0.5 } });
    
    // Dibujar el círculo inicialmente con radio 5
    circleGraphics.fillCircle(0, 0, 2); // Radio 5 inicial

    // Crear un contenedor para manejar la escala
    let container = this.add.container(circle.x, circle.y, [circleGraphics]);

    // Añadir física al contenedor (no a los gráficos directamente)
    let greenCirclePhysics = this.physics.add.existing(container);
    greenCirclePhysics.body.setCircle(2); // Radio inicial del cuerpo físico

    // Hacer que colisione con los límites del mundo
    greenCirclePhysics.body.setCollideWorldBounds(true);

    // Asignar el 'type' personalizado para clasificar el círculo
    greenCirclePhysics.type = 'blue'; // En este caso, lo etiquetamos como un círculo "azul"
                        greenCirclePhysics.z = circle.z;

    // Añadir el círculo al grupo
    this.greenCirclesGroup.add(greenCirclePhysics);

    // Crear el tween para cambiar el tamaño del círculo usando escalado
   






 this.tweens.add({
        targets: container, // Escalar el contenedor
        scaleX: 2, // Escala en el eje X (para un radio de 10)
        scaleY: 2, // Escala en el eje Y (para un radio de 10)
        duration: 1000, // Cambia en 1 segundo
        yoyo: true, // Vuelve al tamaño original (radio 5)
        repeat: -1, // Repite indefinidamente
        onUpdate: (tween) => {


if (!container.active) {
                tween.stop();  // Detén el tween
                tween.remove(); // Elimina el tween
            } else {

            // Obtener el valor de la escala actual (suponiendo que escala 1 = radio 5, y escala 2 = radio 10)
            let scale = container.scaleX;
            let newRadius = 5 * scale; // Ajustar el nuevo radio según la escala
            greenCirclePhysics.body.setCircle(newRadius); // Actualizar el radio físico
        }

}

    });


/*

this.tweens.add({
        targets: greenCirclesGroup.getChildren(),  // Obtener todos los círculos del grupo
        scaleX: 2,  // Cambiar la escala en el eje X
        scaleY: 2,  // Cambiar la escala en el eje Y
        duration: 1000,
        yoyo: true,  // Hacer que vuelva al tamaño original
        repeat: -1  // Repetir indefinidamente
    });

*/

/////////////__________________


   }
        index++;
        }
} //END DRAW GREEN CIRCLES!!!!!!













///ACTIVAR VELOCIDAD TEXTO
activarVelocidad() {
	fixedText7.visible = true;
	clearInterval(intervalo);
    	Velocidad = true;
    	const newVel = { velocidad: Velocidad };
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
        } }, 1000); // Actualizar cada segundo
}

///TEXTO VELOCIDAD EN EL MEDIO PANTALLA
llamarTextoSpeed(scene) {
        const width = scene.scale.width;
        const height = scene.scale.height;
        const text = scene.add.text(width / 2, height / 2, '+speed!', {
            fontSize: '40px',
            fill: '#0000ff', resolution: dpi * 2, fontFamily: 'Roboto'
        }).setOrigin(0.5, 0.5);
        text.setScrollFactor(0);
	scene.tweens.add({ targets: text, scaleX: 2, scaleY: 2, duration: 500, ease: 'Power2', yoyo: scene, 
            onComplete: () => {
                scene.time.addEvent({
                    delay: 200,
                    callback: () => { text.destroy();  }
                }); } });
}

textOnDestroy(scene, x, y, texto, size, color) {
            const text = scene.add.text(x, y, texto, {
                    fontSize: size,
                    fill: color, resolution: dpi * 2 , fontFamily: 'Roboto'
            });
            	text.setOrigin(0.5, 0.5); // Establece el origen del texto en su centro
    		text.setPosition(x, y); // Reposiciona el texto
            	scene.time.addEvent({
                    delay: 500,
                    callback: () => {
                        text.destroy();
                    } });
}

///GAMESCENE END !!!/!?!?!?!?!?!?!?!?!?!?	
///GAMESCENE END !!!/!?!?!?!?!?!?!?!?!?!?	
///GAMESCENE END !!!/!?!?!?!?!?!?!?!?!?!?		
}  


//UISCENE!!!!!!////!!! / / /// // / / / / / / / / // / / / / / / 	
//UISCENE!!!!!!////!!! / / /// // / / / / / / / / // / / / / / / 	
//UISCENE!!!!!!////!!! / / /// // / / / / / / / / // / / / / / / 	
//UISCENE!!!!!!////!!! / / /// // / / / / / / / / // / / / / / / 	
//UISCENE!!!!!!////!!! / / /// // / / / / / / / / // / / / / / / 	
//UISCENE!!!!!!////!!! / / /// // / / / / / / / / // / / / / / / 		
class UIScene extends Phaser.Scene {
        constructor() {super({ key: 'UIScene' });}
        
         create() {
         console.log(`INICIADO UISCENE!!!!`);

	const zoomLevel = isMobile ? 8 / dpi : 1 / dpi; // Menos zoom en PC
        this.cameras.main.setZoom(zoomLevel);
	let zoomFactor = this.cameras.main.zoom; 
	let worldPoint = this.cameras.main.getWorldPoint(this.cameras.main.width / 2, this.cameras.main.height / 2);

//	const textResolution = dpi > 1 ? dpi * 2 : dpi;
	 
		 
fixedText1 = this.add.text(10, 10, '', { fontSize: '16px', fill: '#ffffff'  , resolution: dpi * 2 , fontFamily: 'Roboto' });
fixedText1.setShadow(2, 2, 'blue', 5);
fixedText2 = this.add.text(10, 30, '', { fontSize: '16px', fill: '#ffffff'  , resolution: dpi * 2   , fontFamily: 'Roboto' });
fixedText2.setShadow(2, 2, 'blue', 5);
fixedText3 = this.add.text(10, 50, '', { fontSize: '16px', fill: '#ffffff'  , resolution: dpi * 2  , fontFamily: 'Roboto' });
fixedText4 = this.add.text(10, 70, '', { fontSize: '16px', fill: '#ffffff'  , resolution: dpi * 2   , fontFamily: 'Roboto' });
fixedText5 = this.add.text(10, 90, '', { fontSize: '16px', fill: '#ffffff'  , resolution: dpi * 2   , fontFamily: 'Roboto' });
fixedText6 = this.add.text(window.innerWidth * dpi - 10, 10 * dpi, 'Points: 0', { fontSize: '16px', fill: '#ffffff'   , resolution: dpi * 2  , fontFamily: 'Roboto' });
fixedText7 = this.add.text(window.innerWidth * dpi - 10, 10 * dpi, 'X2 SPEED - 5 s', { fontSize: '16px', fill: '#ffffff'   , resolution: dpi * 2  , fontFamily: 'Roboto' });
        // Hace que los textos no se muevan con la cámara
fixedText1.setScrollFactor(0);
fixedText2.setScrollFactor(0);
fixedText3.setScrollFactor(0);
fixedText4.setScrollFactor(0);
fixedText5.setScrollFactor(0);
fixedText6.setScrollFactor(0);
fixedText7.setScrollFactor(0);

fixedText3.setShadow(2, 2, 'blue', 5);
fixedText4.setShadow(2, 2, 'blue', 5);
fixedText5.setShadow(2, 2, 'blue', 5);
fixedText6.setShadow(2, 2, 'blue', 5);
fixedText7.setShadow(2, 2, 'blue', 5);
		 

fixedText1.setPosition( 	
worldPoint.x - (this.cameras.main.width / 2) / zoomFactor + 10, 
worldPoint.y - (this.cameras.main.height / 2) / zoomFactor + 10); 

fixedText2.setPosition( 	
worldPoint.x - (this.cameras.main.width / 2) / zoomFactor + 10, 
worldPoint.y - (this.cameras.main.height / 2) / zoomFactor + 30); 

fixedText3.setPosition( 	
worldPoint.x - (this.cameras.main.width / 2) / zoomFactor + 10, 
worldPoint.y - (this.cameras.main.height / 2) / zoomFactor + 50); 

fixedText4.setPosition( 	
worldPoint.x - (this.cameras.main.width / 2) / zoomFactor + 10, 
worldPoint.y - (this.cameras.main.height / 2) / zoomFactor + 70); 

fixedText5.setPosition( 	
worldPoint.x - (this.cameras.main.width / 2) / zoomFactor + 10, 
worldPoint.y - (this.cameras.main.height / 2) / zoomFactor + 90); 

fixedText6.setPosition(worldPoint.x + (this.cameras.main.width / 2) / zoomFactor - fixedText6.width - 20, 
worldPoint.y - (this.cameras.main.height / 2) / zoomFactor + 10);

		 
fixedText7.visible = false;
fixedText7.setPosition(worldPoint.x + (this.cameras.main.width / 2) / zoomFactor - fixedText7.width - 20, 
worldPoint.y - (this.cameras.main.height / 2) / zoomFactor + 30);
//fixedText7.setText("");

//CHECKBOXES FOR ZOOM AND CAMERA		 
let lineWidth = 2; 	
let boxSize = 20;
let boxX = worldPoint.x - (this.cameras.main.width / 2) / zoomFactor + 10;
let boxY = worldPoint.y + (this.cameras.main.height / 2) / zoomFactor - boxSize*2 - 20;
// Añadir texto fijo en la pantalla y centrarlo verticalmente con el checkbox
let textYOffset = boxSize / 2;
let staticText = this.add.text(boxX + boxSize + 10, boxY + textYOffset, 'Zoom', { fontSize: '16px', fill: '#ffffff' , resolution: dpi * 2 , fontFamily: 'Roboto'   });
staticText.setShadow(2, 2, 'blue', 5);
staticText.setOrigin(0, 0.5); // Ajuste vertical para centrar con el checkbox
staticText.setScrollFactor(0); // Esto fija el texto para que no se desplace con la cámara
// Crear el gráfico del checkbox
let box = this.add.graphics();
// Dibujar el checkbox
box.fillStyle(0x00ff00); // Color verde
box.fillRect(boxX, boxY, boxSize, boxSize);
// Estado inicial del checkbox
let isBoxChecked = true;
// Función para dibujar o borrar la "X"
let drawBoxCheck = (isBoxChecked) => {
    box.clear();
    box.fillStyle(0x00ff00); // Color verde
    box.fillRect(boxX, boxY, boxSize, boxSize);
    if (isBoxChecked) {
        box.lineStyle(lineWidth, 0x000000); // Color negro para la "X"
        box.beginPath();
        box.moveTo(boxX, boxY);
        box.lineTo(boxX + boxSize, boxY + boxSize);
        box.moveTo(boxX + boxSize, boxY);
        box.lineTo(boxX, boxY + boxSize);
        box.strokePath();
    }
};
// Dibujar el estado inicial del checkbox
drawBoxCheck(isBoxChecked);
// Hacer que el checkbox sea interactivo
let hitAreaBox = new Phaser.Geom.Rectangle(boxX, boxY, boxSize, boxSize);
box.setInteractive(hitAreaBox, Phaser.Geom.Rectangle.Contains);
let toggleBox = () => {
    	isBoxChecked = !isBoxChecked;
    	drawBoxCheck(isBoxChecked); 
    	checkSecure = 1;
    	ZoomOut = 1;
	let playerLocal = players[socket.id];
    	if (isBoxChecked) {
        //this.cameras.main.setZoom(8 / dpi);
		//this.scene.get('GameScene').cameras.main.setZoom(8 / dpi);
        //let zoomFactor = this.cameras.main.zoom; 
		const zoomLevel = isMobile ? 8 / dpi : 1 / dpi; // Menos zoom en PC
                this.scene.get('GameScene').cameras.main.setZoom(zoomLevel);

		    	ZoomOut = 1;

		//playerLocal.fontSizePlayer(12);
		Object.values(players).forEach(player => {
    		player.fontSizePlayer(12); // Cambia el tamaño de la fuente a 24px para cada jugador
		});
    	} else {
		const zoomLevel = isMobile ? 4 / dpi : 0.5 / dpi; // Menos zoom en PC
                this.scene.get('GameScene').cameras.main.setZoom(zoomLevel);

		    	ZoomOut = 2;

		
		//playerLocal.fontSizePlayer(24);
		Object.values(players).forEach(player => {
    		player.fontSizePlayer(24); // Cambia el tamaño de la fuente a 24px para cada jugador
		});

		
    	}
};
box.on('pointerdown', toggleBox);
// Hacer que el texto sea interactivo y reaccione de la misma manera que el checkbox
staticText.setInteractive();
staticText.on('pointerdown', toggleBox);
// Fijar el checkbox y el texto para que no se desplacen con la cámara
box.setScrollFactor(0);
staticText.setScrollFactor(0);

//CHECKBOX CAM MOVE//////////////////
// Tamaño y posición del checkbox
let checkboxSize = 20;
let checkboxX =   worldPoint.x - (this.cameras.main.width / 2) / zoomFactor + 10 ;
let checkboxY = worldPoint.y + (this.cameras.main.height / 2) / zoomFactor - checkboxSize - 10;
// Añadir texto fijo en la pantalla y centrarlo verticalmente con el checkbox
let textOffsetY = checkboxSize / 2;
let fixedText = this.add.text(checkboxX + checkboxSize + 10, checkboxY + textOffsetY, 'Centered Cam', { fontSize: '16px', fill: '#ffffff' , resolution: dpi * 2   , fontFamily: 'Roboto'});
fixedText.setShadow(2, 2, 'blue', 5);
fixedText.setOrigin(0, 0.5); // Ajuste vertical para centrar con el checkbox
fixedText.setScrollFactor(0); // Esto fija el texto para que no se desplace con la cámara
// Crear el gráfico del checkbox
let checkbox = this.add.graphics();
// Dibujar el checkbox
checkbox.fillStyle(0x00ff00); // Color verde
checkbox.fillRect(checkboxX, checkboxY, checkboxSize, checkboxSize);
// Estado inicial del checkbox
let isChecked = true;
// Función para dibujar o borrar la "X"
        let drawCheck = (isChecked) => {
            checkbox.clear();
            checkbox.fillStyle(0x00ff00); // Color verde
            checkbox.fillRect(checkboxX, checkboxY, checkboxSize, checkboxSize);
            if (isChecked) {
                checkbox.lineStyle(lineWidth, 0x000000); // Color negro para la "X"
                checkbox.beginPath();
                checkbox.moveTo(checkboxX, checkboxY);
                checkbox.lineTo(checkboxX + checkboxSize, checkboxY + checkboxSize);
                checkbox.moveTo(checkboxX + checkboxSize, checkboxY);
                checkbox.lineTo(checkboxX, checkboxY + checkboxSize);
                checkbox.strokePath();
            }
        };
        // Dibujar el estado inicial del checkbox
        drawCheck(isChecked);
        // Hacer que el checkbox sea interactivo
        let hitArea = new Phaser.Geom.Rectangle(checkboxX, checkboxY, checkboxSize, checkboxSize);
        checkbox.setInteractive(hitArea, Phaser.Geom.Rectangle.Contains);
        let toggleCheckbox = () => {
            	isChecked = !isChecked;
            	drawCheck(isChecked);
            	checkSecure = 1;
    		let playerLocal = players[socket.id];
            if (isChecked) {
                Cam = 1;
                console.log('Checkbox checked, Cam =', Cam);
                playerLocal.startCameraFollow();

            } else {
                Cam = 2;
                console.log('Checkbox unchecked, Cam =', Cam);
                playerLocal.stopCameraFollow();
            }
        };
        checkbox.on('pointerdown', toggleCheckbox);
        // Hacer que el texto sea interactivo y reaccione de la misma manera que el checkbox
        fixedText.setInteractive();
        fixedText.on('pointerdown', toggleCheckbox);
        // Fijar el checkbox y el texto para que no se desplacen con la cámara
        checkbox.setScrollFactor(0);
        fixedText.setScrollFactor(0);  



	 		
window.addEventListener('resize', () => resizeTexts(this));

function resizeTexts(scene) {
    console.log(`RESIZE!!!!`);

    const worldPoint = scene.cameras.main.midPoint; // Asumimos que este es el punto central que estás usando
    const zoomFactor = scene.cameras.main.zoom;

    fixedText1.setPosition( 	
        worldPoint.x - (scene.cameras.main.width / 2) / zoomFactor + 10, 
        worldPoint.y - (scene.cameras.main.height / 2) / zoomFactor + 10
    ); 

    fixedText2.setPosition( 	
        worldPoint.x - (scene.cameras.main.width / 2) / zoomFactor + 10, 
        worldPoint.y - (scene.cameras.main.height / 2) / zoomFactor + 30
    ); 

    fixedText3.setPosition( 	
        worldPoint.x - (scene.cameras.main.width / 2) / zoomFactor + 10, 
        worldPoint.y - (scene.cameras.main.height / 2) / zoomFactor + 50
    ); 

    fixedText4.setPosition( 	
        worldPoint.x - (scene.cameras.main.width / 2) / zoomFactor + 10, 
        worldPoint.y - (scene.cameras.main.height / 2) / zoomFactor + 70
    ); 

    fixedText5.setPosition( 	
        worldPoint.x - (scene.cameras.main.width / 2) / zoomFactor + 10, 
        worldPoint.y - (scene.cameras.main.height / 2) / zoomFactor + 90
    ); 

    fixedText6.setPosition(
        worldPoint.x + (scene.cameras.main.width / 2) / zoomFactor - fixedText6.width - 20, 
        worldPoint.y - (scene.cameras.main.height / 2) / zoomFactor + 10
    );

    fixedText7.setPosition(
        worldPoint.x + (scene.cameras.main.width / 2) / zoomFactor - fixedText7.width - 20, 
        worldPoint.y - (scene.cameras.main.height / 2) / zoomFactor + 30
    );
    	//fixedText7.setText(`X2 SPEED - 5 s`);
    	//fixedText7.setText(`              `);



boxSize = 20;
boxX = worldPoint.x - (scene.cameras.main.width / 2) / zoomFactor + 10;
boxY = worldPoint.y + (scene.cameras.main.height / 2) / zoomFactor - boxSize*2 - 20;
// Añadir texto fijo en la pantalla y centrarlo verticalmente con el checkbox
textYOffset = boxSize / 2;	
staticText.setPosition(boxX + boxSize + 10, boxY + textYOffset);
drawBoxCheck(isBoxChecked);



checkboxSize = 20;
checkboxX =   worldPoint.x - (scene.cameras.main.width / 2) / zoomFactor + 10 ;
checkboxY = worldPoint.y + (scene.cameras.main.height / 2) / zoomFactor - checkboxSize - 10;
// Añadir texto fijo en la pantalla y centrarlo verticalmente con el checkbox
textOffsetY = checkboxSize / 2;
fixedText.setPosition(checkboxX + checkboxSize + 10, checkboxY + textOffsetY);
drawCheck(isChecked);

	


	
}


		 
        } //END CREATE UISCENE
            
        update() {}
        preload() {
	}
         
}
//END UISCENE!!!!!!////!!! / / /// // / / / / / / / / // / / / / / / 	
//END UISCENE!!!!!!////!!! / / /// // / / / / / / / / // / / / / / / 	
//END UISCENE!!!!!!////!!! / / /// // / / / / / / / / // / / / / / / 	
//END UISCENE!!!!!!////!!! / / /// // / / / / / / / / // / / / / / / 	

//CONFIG SCENEN/////!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
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
            backgroundColor: '#000000',
		      //      backgroundColor: '#0B1E00',

            scale: {
              // mode: Phaser.Scale.FIT,
		//mode: Phaser.Scale.RESIZE, // Mantén el tamaño del juego fijo

		        mode: isMobile ? Phaser.Scale.RESIZE : Phaser.Scale.RESIZE,

                autoCenter: Phaser.Scale.CENTER_BOTH
            },
        	scene: [GameScene, UIScene],
           pixelArt: false,
//pixelArt: true,
            roundPixels: false,
antialias: true,
		resolution: window.devicePixelRatio * 2

		/* render: {
        pixelArt: false,
        antialias: true,
    },


*/
        };

        const game = new Phaser.Game(config);
	game.scene.start('GameScene');

	// Listener para el redimensionamiento de la ventana
/*window.addEventListener('resize', () => {
    const newWidth = window.innerWidth * dpi;
    const newHeight = window.innerHeight * dpi;
    game.scale.resize(newWidth, newHeight);
    game.scene.scenes.forEach(scene => {
        if (scene.cameras.main) {
            scene.cameras.main.setViewport(0, 0, newWidth, newHeight);
        }
    });
});*/

	
}  //END FUNCTION START GAME!!!!

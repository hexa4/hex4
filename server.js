// server.js

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

let players = [];
const connectedUsers = new Set();



///let todosVertices = [];


	/////////
	
	/*
		const hexagonMap = [
        [{ direction: 'NE' }, { direction: 'E' }, { direction: 'SE' }, { direction: 'E' }, { direction: 'SE' }, { direction: 'E' }, { direction: 'SE' }, { direction: 'E' }],
        [{ direction: 'NW' }, { direction: 'ES' }, { direction: 'E' }, { direction: 'ES' }, { direction: 'E' }, { direction: 'ES' }, { direction: 'E' }, { direction: 'ES' }, { direction: 'E' }],
        [{ direction: 'NW' }, { direction: 'ES' }, { direction: 'E' }, { direction: 'ES' }, { direction: 'E' }, { direction: 'ES' }, { direction: 'E' }, { direction: 'ES' }, { direction: 'E' }],
        [{ direction: 'SW' }, { direction: 'ES' }, { direction: 'E' }, { direction: 'ES' }, { direction: 'E' }, { direction: 'ES' }, { direction: 'E' }, { direction: 'ES' }, { direction: 'E' }],
        [{ direction: 'SW' }, { direction: 'ES' }, { direction: 'E' }, { direction: 'ES' }, { direction: 'E' }, { direction: 'ES' }, { direction: 'E' }, { direction: 'ES' }, { direction: 'E' }],
        [{ direction: 'SW' }, { direction: 'ES' }, { direction: 'E' }, { direction: 'ES' }, { direction: 'E' }, { direction: 'ES' }, { direction: 'E' }, { direction: 'ES' }, { direction: 'E' }]
    ];
    
    
    function generateAllHexagonVertices() {
const hexagonSize = 50;
const numRows = hexagonMap.length;
const numCols = hexagonMap[0].length;
const hexWidth = hexagonSize * Math.sqrt(3);
const hexHeight = hexagonSize * Math.sqrt(3);
const vertices = [];
// Generar coordenadas medias entre los vértices adyacentes
for (let row = 0; row < numRows; row++) {
for (let col = 0; col < numCols; col++) {
const x = col * (hexWidth * 0.87);
const y = row * hexHeight + (col % 2 === 1 ? hexHeight / 2 : 0);
const points = getHexagonPoints(x, y, hexagonSize);
for (let i = 0; i < points.length; i++) {
vertices.push(points[i]);
todosVertices.push(points[i]);
}}}
return vertices;
}
const allHexagonVertices = generateAllHexagonVertices();

    
    function getHexagonPoints(x, y, size) {
const points = [];
for (let i = 0; i < 6; i++) {
const angle = (2 * Math.PI / 6) * i;
const pointX = x + size * Math.cos(angle);
const pointY = y + size * Math.sin(angle);
points.push({ x: pointX, y: pointY });
}return points;}
    
    
        
function printRandomValue(min, max) {
const randomValue = Math.floor(Math.random() * (max - min + 1)) + min;
return randomValue;
}  
*/


//////////////    ///////    ///////    ///////    ///////    ///////    ///////    ///////    ///////   
///////    ///////    ///////    ///////    ///////    ///////    ///////    ///////    ///////    ///////    ///////  
//////////////    ///////    ///////    ///////    ///////    ///////    ///////    ///////    ///////   
///////    ///////    ///////    ///////    ///////    ///////    ///////    ///////    ///////    ///////    ///////  
//GREEN BALLS !!!!!!!!!!!!!
              const hexagonMap = [
        [{ direction: 'NE' }, { direction: 'E' }, { direction: 'SE' }, { direction: 'E' }],
        [{ direction: 'SW' }, { direction: 'ES' } ,{ direction: 'E' }, { direction: 'ES' }, { direction: 'E' }],
        [{ direction: 'SW' }, { direction: 'ES' }, { direction: 'E' }, { direction: 'ES' }, { direction: 'E' }]
    ];
    
const availableColors = ['blue', 'purple', 'orange', 'pink', 'yellow', 'cyan', 'teal', 'maroon', 'lime', 'brown', 'indigo', 'gray', 'gold', 'silver', 'olive', 'navy', 'magenta', 'peach', 'violet', 'turquoise', 'lavender', 'salmon', 'beige'];


const assignedColors = new Map();    
let colorIndex = 0;

let greenCirclesS = [];




function getHexagonPoints(x, y, size) {
const points = [];
for (let i = 0; i < 6; i++) {
const angle = (2 * Math.PI / 6) * i;
const pointX = x + size * Math.cos(angle);
const pointY = y + size * Math.sin(angle);
points.push({ x: pointX, y: pointY });
}return points;}
function generateRandomLineCoordinates() {
const hexagonSize = 50;
const numRows = hexagonMap.length;
const numCols = hexagonMap[0].length;
const hexWidth = hexagonSize * Math.sqrt(3);
const hexHeight = hexagonSize * Math.sqrt(3);
const coordinates = [];
// Generar coordenadas medias entre los vértices adyacentes
for (let row = 0; row < numRows; row++) {
for (let col = 0; col < numCols; col++) {
const x = col * (hexWidth * 0.87);
const y = row * hexHeight + (col % 2 === 1 ? hexHeight / 2 : 0);
const points = getHexagonPoints(x, y, hexagonSize);
for (let i = 0; i < points.length; i++) {
const nextIndex = (i + 1) % points.length;
const point1 = points[i];
const point2 = points[nextIndex];
const midX = (point1.x + point2.x) / 2;
const midY = (point1.y + point2.y) / 2;
const randomFactor = Math.random(); // Factor aleatorio entre 0 y 1
const randomX = point1.x + (point2.x - point1.x) * randomFactor;
const randomY = point1.y + (point2.y - point1.y) * randomFactor;
if (!isNaN(midX) && !isNaN(midY)) {
coordinates.push({ x: randomX, y: randomY, z: 0 });
//console.log('randomX:', randomX, randomY);  
}}}}	
const randomCoordinates = new Set(); // Usamos un conjunto para evitar duplicados
let index = 200; // Inicializamos el índice en 0
while (randomCoordinates.size < 20) {
const randomIndex = Math.floor(Math.random() * coordinates.length);
const randomCoordinate = coordinates[randomIndex];
// Verificar si randomCoordinate está definido
if (randomCoordinate) {
randomCoordinate.index = index; // Asignamos el índice a randomCoordinate
randomCoordinates.add(randomCoordinate); // Agregamos la coordenada al conjunto
// Agregar un console.log para imprimir las coordenadas aleatorias seleccionadas
// console.log(`Coordenada aleatoria ${randomCoordinate.index}: (${randomCoordinate.x}, ${randomCoordinate.y}), ${randomCoordinate.z}, ${randomCoordinate.index}`);
index++; 
} else {
console.log(`Error: No se pudo obtener la coordenada aleatoria ${randomCoordinates.size + 1}`); }
}
return Array.from(randomCoordinates); // Convertimos el conjunto a un array para mantener el formato de salida
}
greenCirclesS = generateRandomLineCoordinates();
for (let i = 0; i < greenCirclesS.length; i++) {
//console.log(`Valor Z MODIFICA: ${greenCirclesS[i].x}:`);
greenCirclesS[i].z = i+1;
}

console.log(`LENGTH GreenCirclesS: ${greenCirclesS.length}:`);	





//////////////    ///////    ///////    ///////    ///////    ///////    ///////    ///////    ///////   
///////    ///////    ///////    ///////    ///////    ///////    ///////    ///////    ///////    ///////    ///////  
//////////////    ///////    ///////    ///////    ///////    ///////    ///////    ///////    ///////   
///////    ///////    ///////    ///////    ///////    ///////    ///////    ///////    ///////    ///////    ///////  





io.on('connection', (socket) => {
    console.log('Nuevo jugador conectado');
    
    connectedUsers.add(socket.id);

    console.log(`Total de usuarios: ${connectedUsers.size}`);
    
	io.emit('userCount', connectedUsers.size);
	
	//RECIBIR LLAMADA GREENCIRCLESS DE CLIENTE 
  socket.on('LlamargreenCirclesS', () => {
      console.log(`LLAMAR GREEN CIR:`);
		//ENVIAR GREENCIRCLES A CLIENTE DESDES SERVER
           socket.emit('greenCirclesS', greenCirclesS);
    });
    
	
//OBTENER COLOR PARA JUGADOR    
const colorsArray = Array.from(availableColors);
const userColor = colorsArray[colorIndex % colorsArray.length];
colorIndex++;
assignedColors.set(socket.id, { color: userColor});
    
    
 //SE LLAMA DESDE EL CLIENTE.   
        socket.on('newPlayer', (data) => {
        const player = {
            id: socket.id,
            name: data.name,
            x: data.x, // Ejemplo de posición inicial aleatoria
            y: data.y,
            speed: 200,
            skin: data.skin,
            size: 10,
            puntos: 0,
            color: assignedColors.get(socket.id).color,

        };

        players.push(player);
        console.log('Nuevo jugador:', player);
        
        
	io.emit('updatePlayers', players);
	
	


    });
    
            //MOVER JUGADOR EN CLIENTE	
socket.on('crearTopPlayers', () => {

	socket.emit('updateTopPlayers'); 


});



   /* 
        //MOVER JUGADOR EN CLIENTE	
socket.on('animationData', function (data) {
//const playerName = assignedColors.get(socket.id).name;
const playerSpeed = 200; // Acceso a la velocidad del jugador
console.log(`Annimation Speed: ${playerSpeed}`);
// Emitir datos a todos los clientes
io.emit('animatePlayer', { playerId: socket.id, data: data, playerSpeed: playerSpeed });
});
 */   
    
    
    ///SISTEMA PUNTOS CUNADO CIRCULO VERDE HA SIDO COMIDO////////////////////
socket.on('greenCircleEaten', () => {
const player = players.find(p => p.id === socket.id);
    if (player) {

player.puntos += 1;
io.emit('updatePuntos', socket.id, player.puntos); 
io.emit('updateTopPlayers', players); 

} else {
        console.error(`Jugador con id ${socket.id} no encontrado.`);
    }

// Actualizar la información de los jugadores para todos
//io.emit('updatePlayers2', players);
console.log(`+ Puntos: ${player.puntos}, ${player.name} `);
});	
    
    
    
       // Manejar la actualización de posición del jugador
    socket.on('updatePosition', (data) => {
            console.log('POSITION UPDATED:', socket.id);

        // Buscar el jugador por su ID
        const player = players.find(p => p.id === socket.id);
        if (player) {
            // Actualizar las coordenadas del jugador
            player.x = data.x;
            player.y = data.y;
            console.log(`Actualización de posición para el jugador ${socket.id}: (${data.x}, ${data.y})`);

            // Emitir la actualización a todos los jugadores conectados
           // io.emit('updatePlayers', players);
        }
    });
    
    
    
    

    socket.on('disconnect', () => {
    connectedUsers.delete(socket.id);
assignedColors.delete(socket.id);

removePlayerById(socket.id);       
io.emit('eliminarPlayerServer', socket.id);

        console.log('Jugador desconectado');
        

    });
    
    
    
    

    socket.on('playerMove', (moveData) => {
        console.log('Movimiento del jugador:', moveData);
        // Lógica para manejar el movimiento del jugador y actualizar el estado del juego
        socket.broadcast.emit('playerMoved', moveData);
    });
    
    
    
    
    
    //MOVER JUGADOR EN CLIENTE	
socket.on('animationData', function (data) {
//const playerName = assignedColors.get(socket.id).name;
const playerSpeed = data.speed; // Acceso a la velocidad del jugador
console.log(`Annimation Speed: ${playerSpeed}`);
// Emitir datos a todos los clientes
io.emit('animatePlayer', { playerId: socket.id, data: data });
});



//COLISION GREEN CIRCLE BORRAR EN TODOS CLIENTES
//COLISION GREEN CIRCLE BORRAR EN TODOS CLIENTES	
//COLISION GREEN CIRCLE BORRAR EN TODOS CLIENTES	
//COLISION GREEN CIRCLE BORRAR EN TODOS CLIENTES	
//COLISION GREEN CIRCLE BORRAR EN TODOS CLIENTES	
//COLISION GREEN CIRCLE BORRAR EN TODOS CLIENTES	
	
socket.on('eliminarGreen', (collisionIndex, myID) => {
var indice = greenCirclesS.findIndex(function(elemento) {
return elemento.z === collisionIndex; });
if (indice !== -1) {
console.log("Elemento eliminado correctamente", greenCirclesS[indice]);
greenCirclesS.splice(indice, 1);
} else {
console.log("No se encontró ningún elemento con z igual a 10"); }        
io.emit('eliminarGreenServer', collisionIndex, myID);
console.log(`GreenCircleS QUEDAN: ${greenCirclesS.length}:`);	


	
// Comprobar si quedan menos de 5 círculos verdes
if (greenCirclesS.length < 5) {
io.emit('borrarTodosGreen');
greenCirclesS = [];
	
// Generar 15 círculos verdes nuevos
const newGreenCircles = generateRandomLineCoordinates();
for (let i = 0; i < newGreenCircles.length; i++) {
newGreenCircles[i].z = greenCirclesS.length + i + 1; }
// Agregar los nuevos círculos verdes a la lista existente
greenCirclesS.push(...newGreenCircles);
console.log(`GreenCircleS RENOVADO: ${greenCirclesS.length}:`);	

io.emit('greenCirclesS', greenCirclesS);

}		


});	

const removePlayerById = (playerId) => {
    players = players.filter(player => player.id !== playerId);
};


//COLISION JUGADORES ELIMINAR JUGADOR DE TODOS LOS CLIENTES
socket.on('eliminarPlayer', (collisionIndex) => {  
removePlayerById(collisionIndex);       
io.emit('eliminarPlayerServer', collisionIndex);
});	


    
    
});




server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

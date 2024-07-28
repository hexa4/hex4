 const socket = io();





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
		
startGame("hehe");


        
    });
    
        function startGame(playerName) {

        const dpi = window.devicePixelRatio;
        const width = window.innerWidth * dpi;
        const height = window.innerHeight * dpi;

        const config = {
            type: Phaser.AUTO,
            width: width,
            height: height,
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
      
        let redCirclesGroup;
        let hexagonGroup;
        let playerNameCircle;

        function preload() {
            // Cargar recursos si es necesario
        }

        function create() {
            // Escalar gráficos según la densidad de píxeles
            this.cameras.main.setZoom(8 / dpi);

            hexagonGraphics = this.add.graphics({ lineStyle: { width: 2, color: 0x0099ff } });

            redCirclesGroup = this.add.group();
            hexagonGroup = this.add.group();
              
            // Crear el mapa hexagonal
            for (let y = 0; y < 12; y++) {
                for (let x = 0; x < 12; x++) {
                    let hexX = x * hexagonWidth * 0.75;
                    let hexY = y * hexagonHeight + (x % 2 === 0 ? 0 : hexagonHeight / 2);
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

        function onPointerDown(pointer) {
            let cameraX = this.cameras.main.scrollX;
            let cameraY = this.cameras.main.scrollY;
            const closestRedVertex = findClosestRedVertexToClick(pointer.x + cameraX, pointer.y + cameraY, cameraX, cameraY);

            this.tweens.add({
                targets: [player],
                x: closestRedVertex.x,
                y: closestRedVertex.y,
                duration: 500,
                ease: 'Power2',
                onUpdate: function(tween) {
                    playerNameCircle.x = player.x;
                    playerNameCircle.y = player.y - 20; // Mantener el texto 20 píxeles por encima del jugador
                },
                onComplete: updateRedVertices,
                onCompleteScope: this
            });
        }

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
            return closestVertex;
        }

        function clearRedVertices() {
            redCirclesGroup.clear(true, true);
            redVertices = [];
        }

        
}  

		let hexagonSize = 50;
        let hexagonWidth = hexagonSize * 2;
        let hexagonHeight = Math.sqrt(3) * hexagonSize;
        let hexagons = [];
        let vertices = [];
        let redVertices = [];
        
              const hexagonMap = [
        [{ direction: 'NE' }, { direction: 'E' }, { direction: 'SE' }, { direction: 'E' }],
        [{ direction: 'SW' }, { direction: 'ES' } ,{ direction: 'E' }, { direction: 'ES' }, { direction: 'E' }],
        [{ direction: 'SW' }, { direction: 'ES' }, { direction: 'E' }, { direction: 'ES' }, { direction: 'E' }]
    ];
    
    
    
    
    
    






//OBTENER VERTICES ROJOS
//OBTENER VERTICES ROJOS  
//OBTENER VERTICES ROJOS    
   function getVerticesInRadius(x, y, radius) {
    return vertices.filter(vertex => {
        // Calcula la distancia entre (x, y) y el vértice actual
        let distance = Phaser.Math.Distance.Between(x, y, vertex.x, vertex.y);
        
        // Devuelve true si la distancia está dentro del radio y es mayor que 10
        return distance <= radius && distance > 20;
    });
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
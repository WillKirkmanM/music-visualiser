function SphereVisual() {
    this.name = "Sphere";
    this.rotationAngle = 0;

    this.draw = function() {
        push();
        translate(width/2, height/2);
        
        
        let spectrum = fourier.analyze();
        
        
        rotateX(PI/4);
        this.rotationAngle += 0.005;
        rotateY(this.rotationAngle);
        
        
        let radius = min(width, height) / 4;
        let rows = 8;
        let cols = spectrum.length / rows;
        
        for (let i = 0; i < rows; i++) {
            let phi = map(i, 0, rows, 0, PI);
            for (let j = 0; j < cols; j++) {
                let theta = map(j, 0, cols, 0, TWO_PI);
                
                let spectrumIndex = i * cols + j;
                let amp = spectrum[spectrumIndex];
                let height = map(amp, 0, 256, 10, 100);
                let hue = map(spectrumIndex, 0, spectrum.length, 0, 360);
                
                push();
                
                let x = radius * sin(phi) * cos(theta);
                let y = radius * sin(phi) * sin(theta);
                let z = radius * cos(phi);
                
                translate(x, y, z);
                
                
                let rotation = createVector(x, y, z);
                let angle = atan2(rotation.y, rotation.x);
                let elevation = atan2(sqrt(rotation.x * rotation.x + rotation.y * rotation.y), rotation.z);
                
                rotateY(angle);
                rotateX(elevation - PI/2);
                
                
                colorMode(HSB);
                fill(hue, 255, 255, 0.7);
                stroke(hue, 255, 255);
                strokeWeight(1);
                box(20, 20, height);
                colorMode(RGB);
                
                pop();
            }
        }
        
        
        stroke(255, 50);
        strokeWeight(1);
        noFill();
        sphere(radius);
        
        pop();
    };
}
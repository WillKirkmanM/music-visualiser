function Spectrum() {
	this.name = "spectrum";

	this.draw = function() {
		push();
		var spectrum = fourier.analyze();
		noStroke();

		for (var i = 0; i< spectrum.length; i++){
			let ratio = map(spectrum[i], 0, 255, 0, 1);
			let colour = lerpColor(color("green"), color("red"), ratio);
			fill(colour);
			
			var y = map(i, 0, spectrum.length, 0, height);
			var w = map(spectrum[i], 0, 255, 0, width);
			rect(0, y, w, height / spectrum.length);
  		}
	
		pop();
	};
}
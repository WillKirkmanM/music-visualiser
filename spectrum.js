function Spectrum() {
	this.name = "spectrum";

	this.draw = function() {
		push();
		var spectrum = fourier.analyze();
		noStroke();

		for (var i = 0; i< spectrum.length; i++){
			let ratio = i/spectrum.length;
			let colour = lerpColor(color("green"), color("red"), ratio);
			fill(colour);
			var x = map(i, 0, spectrum.length, 0, width);
		    var h = -height + map(spectrum[i], 0, 255, height, 0);
		    rect(x, height, width / spectrum.length, h );
  		}
	
		pop();
	};
}
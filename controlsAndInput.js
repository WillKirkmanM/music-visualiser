//Constructor function to handle the onscreen menu, keyboard and mouse
//controls
function ControlsAndInput() {

	this.menuDisplayed = false;

	//playback button displayed in the top left of the screen
	this.playbackButton = new PlaybackButton();

	//volume slider
	this.volumeSlider = createSlider(0, 1, 0.5, 0.01);
	this.volumeSlider.position(20, height - 20);
	this.volumeSlider.style('width', '150px');
	this.volumeSlider.hide();

	//make the window fullscreen or revert to windowed
	this.mousePressed = function() {
		if (this.playbackButton.hitCheck()) {
			return;
		}
		else {
			let fs = fullscreen();
			fullscreen(!fs);
		}
	};

	//responds to keyboard presses
	//@param keycode the ascii code of the keypressed
	this.keyPressed = function(keycode) {
		console.log(keycode);
		if (keycode == 32) {
			this.menuDisplayed = !this.menuDisplayed;
		}

		if (keycode > 48 && keycode < 58) {
			var visNumber = keycode - 49;
			vis.selectVisual(vis.visuals[visNumber].name);
		}
	};

	//draws the playback button and potentially the menu
	this.draw = function() {
		push();
		fill("white");
		stroke("black");
		textFont(font);
		strokeWeight(2);
		textSize(30);

		//playback button
		this.playbackButton.draw();
		//only draw the menu if menu displayed is set to true.
		if (this.menuDisplayed) {
			text("Select a visualisation:", 100, 45);
			this.menu();
		}
		else{
			this.volumeSlider.hide();
		}
		pop();
		
		let volume = this.volumeSlider.value();
		if (sound && typeof sound.setVolume === 'function'){
			sound.setVolume(volume);
		}
	};
	
	this.menu = function() {
		//draw out menu items for each visualisation
		for (let i = 0; i < vis.visuals.length; i++) {
			let name = (i + 1) + ": " + vis.visuals[i].name
			let y = 45 + 35  * (i + 1);
			text(name, 100, y);
		}
		text("Volume", this.volumeSlider.x, this.volumeSlider.y - 10);
		text("Currently playing: " + music[musicIndex][0], width/2 - 175, height - 40);
		this.volumeSlider.show();
	};
	
	this.onResize = function () {
		this.volumeSlider.position(20, height - 40);
	};
}

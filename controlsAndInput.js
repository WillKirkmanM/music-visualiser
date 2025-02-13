//Constructor function to handle the onscreen menu, keyboard and mouse
//controls
function ControlsAndInput() {

	this.menuDisplayed = false;

	//playback button displayed in the top left of the screen
	this.playbackButton = new PlaybackButton();

	//make the window fullscreen or revert to windowed
	this.mousePressed = function() {
		if (this.playbackButton.hitCheck()) {
			return;
		}

		let fs = fullscreen();
		fullscreen(fs)
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
		textSize(34);

		//playback button
		this.playbackButton.draw();
		//only draw the menu if menu displayed is set to true.
		if (this.menuDisplayed) {
			text("Select a visualisation:", 100, 50);
			this.menu();
		}
		pop();

	};

	this.menu = function() {
		//draw out menu items for each visualisation
		for (let i = 0; i < vis.visuals.length; i++) {
			let name = (i + 1) + ": " + vis.visuals[i].name
			let y = 55 + 40  * (i + 1);
			text(name, 100, y);
		}
	};
}

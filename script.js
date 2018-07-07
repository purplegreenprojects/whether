window.onload = function(){

	/*** global variables ***/
		var msecpb
		var bpMeasure

	/*** components ***/
		// dropRain(1, 2, "raindropA", "raindropSplash1", 20, 1000, 175, 50)
			function dropRain(measure, beat, raindropType, splashType, left, startBottom, endBottom, size) {
				setTimeout(function(){
					var windowWidth = window.innerWidth / 100
					var windowHeight = window.innerHeight / 100

					var raindrop = document.createElement("div")
						raindrop.style.left = left * windowWidth + "px"
						raindrop.style.bottom = startBottom * windowHeight + "px"
						raindrop.style.height = size * windowHeight + "px"
						raindrop.style.width = size * windowWidth + "px"
						raindrop.className = raindropType
					document.getElementById("container").appendChild(raindrop)

					var timer = 0
					var loop = setInterval(function(){
						var currentBottom = Number(raindrop.style.bottom.replace("px", "")) / windowHeight

						if (currentBottom > endBottom) {
							timer += 10
							currentBottom = (-0.0001 * Math.pow(timer, 2) * windowHeight) + (startBottom * windowHeight)
							raindrop.style.bottom = currentBottom + "px"
						}
						else {
							clearInterval(loop)
							raindrop.className = splashType
							
							setTimeout(function() {
								raindrop.style.bottom = endBottom * windowHeight + 5 + "px"
								raindrop.className = "raindropPuddle"
							}, 50)
						}
					}, 10)
				}, ((measure - 1) * msecpb * bpMeasure) + ((beat - 1) * msecpb))
				// MATH to MUSIC conversion (measure 1 is really measure 0; same with beats)
			}

		// fadeOut
			function fadeOut(measure, beat, time, object) {
				setTimeout(function(){
					var loop = setInterval(function(){
						var opacity = window.getComputedStyle(object).opacity

						if (opacity > 0) {
							opacity = opacity - 0.01
							object.style.opacity = opacity
						}
						else {
							object.remove()
							clearInterval(loop)
						}
					}, time / 100)

				}, ((measure - 1) * msecpb * bpMeasure) + ((beat - 1) * msecpb))
			}

		// fadeIn
			function fadeIn(measure, beat, time, object) {
				setTimeout(function(){
					var loop = setInterval(function(){
						var opacity = Number(window.getComputedStyle(object).opacity)
						console.log(opacity)
						if (opacity < 1) {
							opacity = opacity + 0.01
							object.style.opacity = opacity
						}
						else {
							clearInterval(loop)
						}
					}, time / 100)

				}, ((measure - 1) * msecpb * bpMeasure) + ((beat - 1) * msecpb))
			}
	
	/*** performance ***/
		var going = false
		document.addEventListener("click", playWhether)
			
		function playWhether() {
			if (going == false) {
				going = true

				fadeOut(1, 1, 800, document.getElementById("blackBackground"))
				fadeIn(1, 1, 1000, document.getElementById("surface"))

				setTimeout(function(){
					document.getElementById("musicPlayer").play()
				}, 1200)

			// section 1
				msecpb = 800
				bpMeasure = 4

			// 1
				dropRain(1, 1.5, "raindropA", "raindropSplash1", 15, 130, 10, 15)
				dropRain(1,   2, "raindropA", "raindropSplash1", 30, 140, 20, 8)
				dropRain(1,   3, "raindropA", "raindropSplash1", 55, 135, 15, 12)
				dropRain(1, 3.5, "raindropA", "raindropSplash1", 75, 140, 20, 8)

			// 2
				dropRain(2, 1.5, "raindropA", "raindropSplash2", 40, 128, 7, 15)
				dropRain(2,   2, "raindropA", "raindropSplash3", 90, 135, 15, 10)
				dropRain(2,   3, "raindropA", "raindropSplash1", 64, 120, 5, 15)
				dropRain(2, 3.5, "raindropA", "raindropSplash1", 8, 140, 20, 10)

			// 3
				dropRain(3,   2, "raindropA", "raindropSplash1", 20, 145, 25, 5)
				dropRain(3, 2.5, "raindropA", "raindropSplash1", 40, 146, 26, 5)
				dropRain(3,   3, "raindropA", "raindropSplash1", 60, 145, 25, 5)
				dropRain(3, 3.5, "raindropA", "raindropSplash1", 80, 146, 26, 5)

			// 4
				dropRain(4,   1, "raindropA", "raindropSplash1", 2, 145, 8, 12)
				dropRain(4,   2, "raindropA", "raindropSplash1", 47, 135, 18, 8)
				dropRain(4,   3, "raindropA", "raindropSplash1", 85, 145, 10, 8.8)
				dropRain(4, 3.5, "raindropA", "raindropSplash1", 92, 146, 26, 4)

			// 5 
				dropRain(5,   1, "raindropA", "raindropSplash1", 5, 140, 19, 5)
				dropRain(5, 1.5, "raindropA", "raindropSplash1", 32, 127, 7, 7)
				dropRain(5, 2.5, "raindropA", "raindropSplash1", 69, 140, 19, 8)
				dropRain(5,   3, "raindropA", "raindropSplash1", 59, 126, 6, 9)
				dropRain(5,   4, "raindropA", "raindropSplash1", 41, 136, 16, 8)
				dropRain(5, 4.5, "raindropA", "raindropSplash1", 84, 136, 16, 4)

				// snare
				dropRain(5, 1.5, "raindropA", "raindropSplash1", 79, 133, 13, 8)
				dropRain(5,   2, "raindropA", "raindropSplash1", 14, 124, 4, 6)
				dropRain(5,   2.5, "raindropA", "raindropSplash1", 10, 125, 5, 5)
				dropRain(5,   2.75, "raindropA", "raindropSplash1", 83, 135, 5, 7)
				dropRain(5,   3, "raindropA", "raindropSplash1", 54, 146, 26, 5)
				dropRain(5,   3.25, "raindropA", "raindropSplash1", 4, 147, 27, 5)
				dropRain(5,   3.5, "raindropA", "raindropSplash1", 89, 143, 23, 8)

			// 6 
				dropRain(6,   1, "raindropA", "raindropSplash1", 13, 133, 13, 5)
				dropRain(6, 1.5, "raindropA", "raindropSplash1", 26, 140, 20, 7)
				dropRain(6, 2.5, "raindropA", "raindropSplash1", 69, 145, 25, 8)
				dropRain(6,   3, "raindropA", "raindropSplash1", 93, 126, 20, 6)
				dropRain(6,   4, "raindropA", "raindropSplash1", 27, 130, 10, 10)
				dropRain(6, 4.5, "raindropA", "raindropSplash1", 31, 148, 28, 7)

				// snare
				dropRain(6, 1.5, "raindropA", "raindropSplash1", 22, 143, 23, 5)
				dropRain(6,   2, "raindropA", "raindropSplash1", 49, 147, 27, 4)
				dropRain(6,   2.5, "raindropA", "raindropSplash1", 93, 129, 9, 7)
				dropRain(6,   2.75, "raindropA", "raindropSplash1", 37, 135, 15, 7)
				dropRain(6,   3, "raindropA", "raindropSplash1", 86, 144, 24, 4)
				dropRain(6,   3.25, "raindropA", "raindropSplash1", 55, 147, 3, 10)
				dropRain(6,   3.5, "raindropA", "raindropSplash1", 26, 143, 5, 9)

			}	
		}

	/*** raindropPlacer ***/
	document.addEventListener("click", getCoordinates)
	function getCoordinates(event) {
		console.log(event.clientX / window.innerWidth * 100, 100 - (event.clientY / window.innerHeight * 100))
	}
}
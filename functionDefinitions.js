window.addEventListener("load", function(){
	/*** global variables ***/
		var msecpb = window.msecpb
		var bpMeasure = window.bpMeasure
		var backgroundMoveLoop = window.backgroundMoveLoop

	/*** helpers ***/
		/* calculateDelay */
			window.calculateDelay = calculateDelay
			function calculateDelay(measure, beat, timeOffset) {
				if (measure && beat) {
					var delay = ((measure - 1) * window.msecpb * window.bpMeasure) + ((beat - 1) * window.msecpb) + timeOffset
				}
				else {
					var delay = timeOffset
				}
				return delay
			}

	/*** components ***/
		// dropRain(1, 2, "raindropA", "raindropSplash1", 20, 1000, 175, 50)
			window.dropRain = dropRain
			function dropRain(measure, beat, timeOffset, raindropType, splashType, left, startBottom, endBottom, size) {

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
							
							if(calculateDelay(measure, beat, timeOffset) < 18800) {

								setTimeout(function() {
									raindrop.style.bottom = endBottom * windowHeight + 5 + "px"
									raindrop.className = "raindropPuddle"
								}, 50)

								fadeOut(0, 0, 3000, 1000, raindrop)
							}

							else {
								//raindrop.remove()

								removeObject(0, 0, 200, raindrop)
							}

							// else raindrop.remove

						}
					}, 10)
				}, calculateDelay(measure, beat, timeOffset))
				// MATH to MUSIC conversion (measure 1 is really measure 0; same with beats)
			}

		// fadeOut
			window.fadeOut = fadeOut
			function fadeOut(measure, beat, timeOffset, fadeTime, object) {
				setTimeout(function(){
					var loop = setInterval(function(){
						var opacity = window.getComputedStyle(object).opacity

							if (opacity > 0) {
								opacity = opacity - 0.01
								object.style.opacity = opacity
							}
							else {
								clearInterval(loop)
							}
						
						}, fadeTime / 100)

					}, calculateDelay(measure, beat, timeOffset))
				}

		// fadeIn
			window.fadeIn = fadeIn
			function fadeIn(measure, beat, timeOffset, fadeTime, object) {

				setTimeout(function(){
					var loop = setInterval(function(){
						var opacity = Number(window.getComputedStyle(object).opacity)
						if (opacity < 1) {
							opacity = opacity + 0.01
							object.style.opacity = opacity
						}
						else {
							clearInterval(loop)
						}
					}, fadeTime / 100)

				}, calculateDelay(measure, beat, timeOffset))
			}

		// removeObject
			window.removeObject = removeObject
			function removeObject(measure, beat, timeOffset, object) {
				setTimeout(function(){
					object.remove()
				}, calculateDelay(measure, beat, timeOffset))
			}

		/* startBackgroundRain */
			window.startBackgroundRain = startBackgroundRain
			function startBackgroundRain(measure, beat, timeOffset) {

				setTimeout(function(){
					// fade in
						fadeIn(0, 0, 0, 2000, document.getElementById("backgroundRain1"))
						fadeIn(0, 0, 0, 2000, document.getElementById("backgroundRain2"))
						fadeIn(0, 0, 0, 2000, document.getElementById("backgroundRain3")) //
						fadeIn(0, 0, 0, 2000, document.getElementById("backgroundRain4")) //
						fadeIn(0, 0, 0, 2000, document.getElementById("backgroundRain5")) //
						fadeIn(0, 0, 0, 2000, document.getElementById("backgroundRain6")) //
						fadeIn(0, 0, 0, 2000, document.getElementById("backgroundRain7"))
						fadeIn(0, 0, 0, 2000, document.getElementById("backgroundRain8"))

					// start move loop
						window.backgroundMoveLoop = setInterval(function(){
							for (var x = 1; x <= 3; x++) {
								var top = Number(document.getElementById("backgroundRain" + x).style.top.replace("vh",""))

								if (top > 100) {
									top = -198
								}
								else {
									top = top + 3
								}

								document.getElementById("backgroundRain" + x).style.top = top + "vh"
							}
						}, 50)

				}, calculateDelay(measure, beat, timeOffset))
				// ^ the delay from the *beginning* - the timestamp of this new action
				// ^ "calculateDelay" is calling that function (where it calculates and returns the "delay" variable, which is what was here)
 			}

		/* stopBackgroundRain */
			window.stopBackgroundRain = stopBackgroundRain
			function stopBackgroundRain(measure, beat, timeOffset) {

				setTimeout(function(){
					// fade out
						fadeOut(0, 0, 0, 2000, document.getElementById("backgroundRain1"))
						fadeOut(0, 0, 0, 2000, document.getElementById("backgroundRain2"))
						fadeOut(0, 0, 0, 2000, document.getElementById("backgroundRain3"))
				}, calculateDelay(measure, beat, timeOffset))

				setTimeout(function() {
					// kill move loop
						clearInterval(window.backgroundMoveLoop)
				}, calculateDelay(measure, beat, timeOffset) + 2000)
			}

		/* changeStaticScene */
			window.changeStaticScene = changeStaticScene
			function changeStaticScene(measure, beat, timeOffset, fadeTime, changeClass) {

				setTimeout(function(){
					document.getElementById("staticSceneB").style.opacity = 0
					document.getElementById("staticSceneB").className = changeClass
					document.getElementById("staticSceneA").style.opacity = 1
					fadeIn(0, 0, 0, fadeTime, document.getElementById("staticSceneB"))
					fadeOut(0, 0, 0, fadeTime, document.getElementById("staticSceneA"))
					// flip A and B for when the function runs again (after the same fadeTime)
					setTimeout(function(){
						document.getElementById("staticSceneA").className = changeClass
						document.getElementById("staticSceneA").style.opacity = 1
						document.getElementById("staticSceneB").style.opacity = 0
					}, fadeTime)
				}, calculateDelay(measure, beat, timeOffset))
			}

	
})
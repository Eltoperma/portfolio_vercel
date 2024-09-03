<script lang="ts">
	import { onMount } from 'svelte';
	let audioFile: File | null = null;
	let imageFile: File | null = null;
	let audioContext: AudioContext;
	let audioElement: HTMLAudioElement;
	let analyser: AnalyserNode;
	let frequencyData: Uint8Array;
	let kickDetected = false;
	let baseRadius = 110; // Basisradius für den Kreis
	let pulseRadius = baseRadius; // Pulsierender Radius, der sich ändert
	let imageObjectURL: string | null = null;
	let img = new Image();
	let lastKickTime = 0; // Zeitpunkt des letzten Kicks

	// Diese Funktion wird aufgerufen, wenn eine Audiodatei hochgeladen wird
	function handleFileUpload(event: Event) {
		const target = event.target as HTMLInputElement;
		if (target.files && target.files.length > 0) {
			audioFile = target.files[0];
			const url = URL.createObjectURL(audioFile);
			audioElement.src = url;
		}
	}

	// Diese Funktion wird aufgerufen, wenn eine Bilddatei hochgeladen wird
	function handleImageUpload(event: Event) {
		const target = event.target as HTMLInputElement;
		if (target.files && target.files.length > 0) {
			imageFile = target.files[0];
			imageObjectURL = URL.createObjectURL(imageFile);
			img.src = imageObjectURL;
		}
	}

	// Diese Funktion initialisiert den AudioContext und den Analyser
	function setupAudioContext() {
		if (!audioContext) {
			audioContext = new AudioContext();
		}
		if (audioContext.state === 'suspended') {
			audioContext.resume();
		}

		analyser = audioContext.createAnalyser();
		analyser.fftSize = 2048;
		frequencyData = new Uint8Array(analyser.frequencyBinCount);

		const source = audioContext.createMediaElementSource(audioElement);
		source.connect(analyser);
		analyser.connect(audioContext.destination);
	}

	// Funktion zur verbesserten Erkennung von Kick-Drum
	function detectKick() {
		const currentTime = audioContext.currentTime;
		const bassFrequencies = frequencyData.slice(0, 20); // Erweiterter Bereich für Bassfrequenzen
		const averageBass =
			bassFrequencies.reduce((sum, value) => sum + value, 0) / bassFrequencies.length;

		// Schwellenwert dynamisch basierend auf der Veränderung der Amplitude
		const dynamicThreshold = 1.5 * (Math.max(...bassFrequencies) - Math.min(...bassFrequencies));

		if (averageBass > dynamicThreshold && currentTime - lastKickTime > 0.15) {
			kickDetected = true;
			lastKickTime = currentTime;
			pulseRadius = baseRadius + 20; // Radius vergrößern bei Kick
		} else {
			kickDetected = false;
		}
	}

	// Diese Funktion interpoliert den Radius für einen glatteren Übergang
	function interpolateRadius() {
		if (pulseRadius > baseRadius) {
			pulseRadius -= 1; // Verringert den Radius schrittweise
		} else {
			pulseRadius = baseRadius;
		}
	}

	// Diese Funktion zeichnet die Frequenzdaten in einem Kreis auf das Canvas
	function drawCircularVisualizer() {
		const canvas = document.getElementById('visualizer') as HTMLCanvasElement;
		const canvasContext = canvas.getContext('2d');
		if (!canvasContext) return;

		// Leinwandauflösung anpassen
		const width = 800; // erhöhte Breite für höhere Auflösung
		const height = 800; // erhöhte Höhe für höhere Auflösung
		canvas.width = width;
		canvas.height = height;

		const draw = () => {
			requestAnimationFrame(draw);

			analyser.getByteFrequencyData(frequencyData);
			detectKick(); // Kick-Drum-Erkennung aufrufen
			interpolateRadius(); // Radius interpolieren für glatteren Übergang
			canvasContext.clearRect(0, 0, canvas.width, canvas.height);

			const centerX = canvas.width / 2;
			const centerY = canvas.height / 2;
			const maxBarHeight = 120; // Maximalhöhe der Balken
			const barCount = frequencyData.length / 2;

			for (let i = 0; i < barCount; i++) {
				const barHeight = (frequencyData[i] / 255) * maxBarHeight;
				const angle = (i / barCount) * Math.PI * 2; // Voller Kreis

				const x1 = centerX + Math.cos(angle) * pulseRadius;
				const y1 = centerY + Math.sin(angle) * pulseRadius;
				const x2 = centerX + Math.cos(angle) * (pulseRadius + barHeight);
				const y2 = centerY + Math.sin(angle) * (pulseRadius + barHeight);

				// Gradient basierend auf Frequenzbereich
				const hue = (i / barCount) * 360; // Hue-Wert von 0 bis 360
				const gradient = canvasContext.createLinearGradient(x1, y1, x2, y2);
				gradient.addColorStop(0, 'black');
				gradient.addColorStop(1, `hsl(${hue}, 100%, 50%)`);

				// Linie für den Kreis mit weißem Rand
				canvasContext.beginPath();
				canvasContext.moveTo(x1, y1);
				canvasContext.lineTo(x2, y2);
				canvasContext.strokeStyle = 'white';
				canvasContext.lineWidth = 3;
				canvasContext.stroke();

				// Füllt den Balken mit dem Farbverlauf
				canvasContext.beginPath();
				canvasContext.moveTo(x1, y1);
				canvasContext.lineTo(x2, y2);
				canvasContext.strokeStyle = gradient;
				canvasContext.lineWidth = 2;
				canvasContext.stroke();
			}

			// Bild in der Mitte des Kreises zeichnen, falls vorhanden
			if (imageFile) {
				const imgSize = pulseRadius * 2; // Bildgröße basiert auf dem aktuellen Radius
				canvasContext.save();
				canvasContext.beginPath();
				canvasContext.arc(centerX, centerY, pulseRadius, 0, Math.PI * 2);
				canvasContext.clip();
				canvasContext.drawImage(
					img,
					centerX - pulseRadius,
					centerY - pulseRadius,
					imgSize,
					imgSize
				);
				canvasContext.restore();
			}
		};

		draw();
	}

	onMount(() => {
		audioElement = document.getElementById('audio') as HTMLAudioElement;

		audioElement.onplay = () => {
			if (!audioContext) {
				setupAudioContext();
				drawCircularVisualizer();
			} else if (audioContext.state === 'suspended') {
				audioContext.resume().then(() => drawCircularVisualizer());
			}
		};
	});
</script>

<div class="container">
	<input type="file" accept="audio/*" on:change={handleFileUpload} />
	<input type="file" accept="image/*" on:change={handleImageUpload} />
	<!-- Bild-Upload-Input -->
	<audio id="audio" controls></audio>
	<canvas id="visualizer"></canvas>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		margin-top: 2rem;
	}

	canvas {
		width: 100%;
		max-width: 800px; /* Maximale Breite des Canvas */
		height: 800px; /* Maximale Höhe des Canvas */
		background-color: #fff;
	}

	input[type='file'] {
		margin-bottom: 1rem;
	}
</style>

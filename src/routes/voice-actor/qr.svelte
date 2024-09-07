<script lang="ts">
	import { onMount } from 'svelte';
	import QRCode from 'qrcode';

	let url: string = 'tjarkhueter.de'; // Replace with your public URL or local URL (e.g., 'http://192.168.1.x:5000')
	let qrCodeUrl: string = '';
	let socket: WebSocket | null = null;

	// This function generates the QR code when the component is mounted
	onMount(() => {
		// Generate QR code as a Data URL
		QRCode.toDataURL(
			url,
			{ errorCorrectionLevel: 'H' },
			(err: Error | null | undefined, generatedUrl: string) => {
				if (err) {
					console.error(err);
				} else {
					qrCodeUrl = generatedUrl;
				}
			}
		);

		// Initialize WebSocket connection
		socket = new WebSocket('wss://tjarkhueter.de:8080'); // Use wss for WebSocket Secure if using HTTPS

		// Handle WebSocket events
		socket.onopen = () => {
			console.log('WebSocket connection established');
		};

		socket.onmessage = (event: MessageEvent) => {
			console.log('Message from server:', event.data);
			// Handle messages from the server here
		};

		socket.onclose = () => {
			console.log('WebSocket connection closed');
		};

		socket.onerror = (error: Event) => {
			console.error('WebSocket error:', error);
		};
	});

	// Example functions to send commands to the server
	const startRecording = (): void => {
		if (socket && socket.readyState === WebSocket.OPEN) {
			socket.send('start-recording');
		} else {
			console.error('WebSocket connection not open');
		}
	};

	const stopRecording = (): void => {
		if (socket && socket.readyState === WebSocket.OPEN) {
			socket.send('stop-recording');
		} else {
			console.error('WebSocket connection not open');
		}
	};
</script>

<!-- Display the generated QR code and buttons to control the app -->
<div>
	<h2>Control the App via QR Code</h2>
	{#if qrCodeUrl}
		<img src={qrCodeUrl} alt="QR Code" />
	{:else}
		<p>Generating QR code...</p>
	{/if}

	<div>
		<button on:click={startRecording}>Start Recording</button>
		<button on:click={stopRecording}>Stop Recording</button>
	</div>
</div>

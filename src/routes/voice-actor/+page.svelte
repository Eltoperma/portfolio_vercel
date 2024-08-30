<script lang="ts">
	import { onMount } from 'svelte';
	import * as FileSaver from 'file-saver';

	const { saveAs } = FileSaver;

	let voicelineList: string[] = [];
	let currentIndex: number = 0;
	let voicelineName: string = '';
	let userName: string = ''; // Der Name, den der Benutzer eingibt
	let isRecording: boolean = false;
	let isPlaying: boolean = false;
	let audioBlob: Blob | null = null;
	let mediaRecorder: MediaRecorder | null = null;
	let audio: HTMLAudioElement | null = null;
	let audioURL: string = '';

	// Initialisiere den Audio-Elementen nur auf der Client-Seite
	onMount(() => {
		audio = new Audio();
	});

	// Handler für Datei-Upload
	function handleFileUpload(event: Event) {
		const input = event.target as HTMLInputElement;
		const file = input.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				if (typeof e.target?.result === 'string') {
					voicelineList = e.target.result.split('\n').filter((line) => line.startsWith('usec1'));
					currentIndex = 0;
					updateVoicelineName();
				}
			};
			reader.readAsText(file);
		}
	}

	// Update den aktuellen Voiceline-Namen basierend auf dem Index
	function updateVoicelineName() {
		if (voicelineList.length > 0) {
			voicelineName = voicelineList[currentIndex];
		}
	}

	// Wechsle zur nächsten Voiceline
	function next() {
		if (currentIndex < voicelineList.length - 1) {
			currentIndex++;
			updateVoicelineName();
		}
	}

	// Wechsle zur vorherigen Voiceline
	function previous() {
		if (currentIndex > 0) {
			currentIndex--;
			updateVoicelineName();
		}
	}

	// Aufnahme starten oder stoppen
	async function toggleRecording() {
		if (isRecording) {
			mediaRecorder?.stop();
			isRecording = false;
		} else {
			try {
				const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
				mediaRecorder = new MediaRecorder(stream);
				mediaRecorder.ondataavailable = (event: BlobEvent) => {
					audioBlob = event.data;
					audioURL = URL.createObjectURL(audioBlob);
					if (audio) {
						audio.src = audioURL;
					}
				};
				mediaRecorder.start();
				isRecording = true;
			} catch (err) {
				console.error('Error accessing the microphone', err);
			}
		}
	}

	// Wiedergabe der aktuellen Aufnahme
	function togglePlayback() {
		if (audio) {
			if (isPlaying) {
				audio.pause();
				isPlaying = false;
			} else {
				audio.play();
				isPlaying = true;
			}
		}
	}

	// Lösche die aktuelle Aufnahme
	function deleteRecording() {
		audioBlob = null;
		audioURL = '';
		if (audio) {
			audio.src = '';
		}
	}

	// Speichere die Aufnahme als WAV-Datei
	function saveRecording() {
		if (audioBlob) {
			const baseName = voicelineName.replace('usec1_', ''); // Entferne 'usec1_' vom Voiceline-Namen
			const newFileName = userName ? `${userName}_${baseName}.wav` : `${baseName}.wav`; // Ersetze 'usec1' durch den Benutzernamen
			saveAs(audioBlob, newFileName);
		}
	}
</script>

<div class="container">
	<input type="file" accept=".txt" on:change={handleFileUpload} />
	<input type="text" bind:value={userName} placeholder="Enter your name" />

	{#if voicelineList.length > 0}
		<div class="voiceline">{voicelineName}</div>
	{/if}
	<div class="flex flex-row">
		<button on:click={previous}>Back</button>
		<button on:click={toggleRecording}>{isRecording ? 'Stop Recording' : 'Record'}</button>
		<button on:click={togglePlayback}>{isPlaying ? 'Stop Playback' : 'Play'}</button>
		<button on:click={deleteRecording}>Delete</button>
		<button on:click={saveRecording}>Save</button>
		<button on:click={next}>Next</button>
	</div>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.voiceline {
		font-size: 2rem;
		margin: 1rem;
	}
	button {
		margin: 0.5rem;
		@apply bg-my-red p-4 rounded-md;
	}
</style>

<script lang="ts">
	import { onMount } from 'svelte';
	import * as FileSaver from 'file-saver';

	const { saveAs } = FileSaver;

	let voicelineList: string[] = [];
	let currentIndex: number = 0;
	let voicelineName: string = '';
	let userName: string = '';
	let isRecording: boolean = false;
	let isPlaying: boolean = false;
	let audioBlob: Blob | null = null;
	let mediaRecorder: MediaRecorder | null = null;
	let audio: HTMLAudioElement | null = null;
	let audioURL: string = '';

	onMount(() => {
		audio = new Audio();
	});

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

	function updateVoicelineName() {
		if (voicelineList.length > 0) {
			voicelineName = voicelineList[currentIndex];
		}
	}

	function next() {
		if (currentIndex < voicelineList.length - 1) {
			currentIndex++;
			updateVoicelineName();
		}
	}

	function previous() {
		if (currentIndex > 0) {
			currentIndex--;
			updateVoicelineName();
		}
	}

	async function toggleRecording() {
		if (isRecording) {
			mediaRecorder?.stop();
			isRecording = false;
		} else {
			try {
				const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
				mediaRecorder = new MediaRecorder(stream);
				mediaRecorder.ondataavailable = async (event: BlobEvent) => {
					audioBlob = event.data;
					const normalizedBlob = await normalizeAudio(audioBlob);
					audioURL = URL.createObjectURL(normalizedBlob);
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

	function deleteRecording() {
		audioBlob = null;
		audioURL = '';
		if (audio) {
			audio.src = '';
		}
	}

	function saveRecording() {
		if (audioBlob) {
			const baseName = voicelineName.replace('usec1_', '');
			const newFileName = userName ? `${userName}_${baseName}.wav` : `${baseName}.wav`;
			saveAs(audioBlob, newFileName);
		}
	}

	// Normalize the audio levels of the recorded audio
	async function normalizeAudio(blob: Blob): Promise<Blob> {
		const audioContext = new AudioContext();
		const arrayBuffer = await blob.arrayBuffer();
		const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

		// Normalize audio data
		const normalizedBuffer = normalizeAudioBuffer(audioContext, audioBuffer);

		// Use OfflineAudioContext to render the normalized buffer to a WAV file
		const offlineContext = new OfflineAudioContext(
			audioBuffer.numberOfChannels,
			normalizedBuffer.length,
			audioBuffer.sampleRate
		);

		const bufferSource = offlineContext.createBufferSource();
		bufferSource.buffer = normalizedBuffer;
		bufferSource.connect(offlineContext.destination);
		bufferSource.start();

		const renderedBuffer = await offlineContext.startRendering();
		audioContext.close();

		// Convert the rendered buffer to a Blob
		const wavBlob = await convertBufferToWavBlob(renderedBuffer);

		return wavBlob;
	}

	function normalizeAudioBuffer(audioContext: AudioContext, buffer: AudioBuffer): AudioBuffer {
		const data = buffer.getChannelData(0);
		const maxAmplitude = Math.max(...data.map(Math.abs));
		const gain = 1 / maxAmplitude;

		const normalizedBuffer = audioContext.createBuffer(
			buffer.numberOfChannels,
			buffer.length,
			buffer.sampleRate
		);

		for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
			const inputData = buffer.getChannelData(channel);
			const outputData = normalizedBuffer.getChannelData(channel);
			for (let sample = 0; sample < inputData.length; sample++) {
				outputData[sample] = inputData[sample] * gain;
			}
		}

		return normalizedBuffer;
	}

	async function convertBufferToWavBlob(buffer: AudioBuffer): Promise<Blob> {
		const wavBuffer = audioBufferToWav(buffer);
		return new Blob([new DataView(wavBuffer)], { type: 'audio/wav' });
	}

	function audioBufferToWav(buffer: AudioBuffer): ArrayBuffer {
		let numOfChannels = buffer.numberOfChannels;
		let length = buffer.length * numOfChannels * 2 + 44;
		let bufferArray = new ArrayBuffer(length);
		let view = new DataView(bufferArray);

		// RIFF chunk descriptor
		writeString(view, 0, 'RIFF');
		view.setUint32(4, length - 8, true);
		writeString(view, 8, 'WAVE');

		// FMT sub-chunk
		writeString(view, 12, 'fmt ');
		view.setUint32(16, 16, true);
		view.setUint16(20, 1, true);
		view.setUint16(22, numOfChannels, true);
		view.setUint32(24, buffer.sampleRate, true);
		view.setUint32(28, buffer.sampleRate * 4, true);
		view.setUint16(32, numOfChannels * 2, true);
		view.setUint16(34, 16, true);

		// Data sub-chunk
		writeString(view, 36, 'data');
		view.setUint32(40, length - 44, true);

		// Write the PCM samples
		let offset = 44;
		let interleaved = interleave(buffer);
		for (let i = 0; i < interleaved.length; i++, offset += 2) {
			view.setInt16(offset, interleaved[i] * 0x7fff, true);
		}

		return bufferArray;
	}

	function writeString(view: DataView, offset: number, string: string) {
		for (let i = 0; i < string.length; i++) {
			view.setUint8(offset + i, string.charCodeAt(i));
		}
	}

	function interleave(buffer: AudioBuffer): Float32Array {
		let length = buffer.length * buffer.numberOfChannels;
		let result = new Float32Array(length);
		let inputL = buffer.getChannelData(0);
		let inputR = buffer.numberOfChannels > 1 ? buffer.getChannelData(1) : inputL;

		for (let i = 0, j = 0; i < buffer.length; i++) {
			result[j++] = inputL[i];
			result[j++] = inputR[i];
		}

		return result;
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

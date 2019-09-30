type BlobAndTime = { startTime: number; blob: Blob };
export async function recordAudioBlob(
  input: AudioNode,
  recordingLength = 5000
): Promise<BlobAndTime> {
  const startTime = Date.now();
  console.log(`recording for ${recordingLength}ms`);
  const context = input.context as AudioContext;
  const destination = context.createMediaStreamDestination();
  input.connect(destination);

  const recorder = new MediaRecorder(destination.stream);
  recorder.start();

  const chunks: Blob[] = [];

  recorder.addEventListener("dataavailable", (event: BlobEvent) => {
    chunks.push(event.data);
    console.log("dataavailable");
  });

  setTimeout(() => {
    recorder.stop();
  }, recordingLength);

  return new Promise<BlobAndTime>(resolve => {
    recorder.addEventListener("stop", event => {
      console.log("recording finished");
      const blob = new Blob(chunks);
      resolve({ startTime, blob });
    });
  });
}

export function playAudioBlob(blob: Blob) {
  const url = URL.createObjectURL(blob);
  const audio = new Audio(url);
  audio.play();
}

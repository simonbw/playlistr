const audioContext = new AudioContext();

export function useAudioContext() {
  return audioContext;
}

export function resumeIfPaused(context: AudioContext) {
  if (context.state === "suspended") {
    context.resume().then(function() {
      console.log("audioContext resumed");
    });
  }
}

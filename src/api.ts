import { SongData } from "./data/SongData";
import { msToTimecode } from "./utils";

type ApiResponse =
  | {
      status: "success";
      result: SongData | null;
    }
  | { status: "error" };

export async function identifyAudioBlob(
  blob: Blob,
  apiToken?: string
): Promise<SongData | null> {
  if (window.location.hostname === "localhost") {
    return mockApiRequest();
  }

  const params = new URLSearchParams();
  params.append(
    "return",
    ["timecode", "lyrics", "apple_music", "deezer", "spotify"].join(",")
  );
  if (apiToken) {
    params.append("api_token", apiToken);
  }
  const url = "//api.audd.io?" + params;
  console.log("fetching", url);

  const formData = new FormData();
  formData.append("file", blob);

  const response = await fetch(url, {
    method: "POST",
    body: formData,
    mode: "cors"
  });

  if (response.ok) {
    const data = (await response.json()) as ApiResponse;
    if (data.status === "success") {
      const song = data.result;
      if (song == null) {
        console.error("song is null", data);
      }
      return song;
    } else {
      console.error(data);
      throw new Error("status is not success");
    }
  } else {
    throw response;
  }
}

// TODO: This is hacky
let START_TIME: number;

function mockApiRequest(): Promise<SongData> {
  if (!START_TIME) {
    START_TIME = Date.now();
  }
  console.log("mocking api");

  const now = Date.now();

  const songDuration = 1000 * 20;
  const msSinceStart = now - START_TIME + 1;
  const songNumber = Math.ceil(msSinceStart / songDuration);
  const msIntoSong = msSinceStart % songDuration;
  const timecode = msToTimecode(msIntoSong);
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        title: `Song Number ${songNumber}`,
        album: "Album Name",
        artist: "Artist",
        timecode
      });
    }, 400 + Math.random() * 2600);
  });
}

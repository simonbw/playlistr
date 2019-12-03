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
  if (shouldMockRequest()) {
    return mockApiRequest();
  }

  const params = new URLSearchParams();
  params.append(
    "return",
    ["timecode", "lyrics", "apple_music", "deezer", "spotify"].join(",")
  );
  if (apiToken) {
    params.append("api_token", apiToken);
  } else {
    console.log("making request with no api_token");
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
        console.warn("song not recognized", data);
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

function shouldMockRequest(): boolean {
  return localStorage.getItem("SHOULD_MOCK_REQUEST") === "true";
}

let songNumber = 0;

function mockApiRequest(): Promise<SongData> {
  songNumber += 1;
  console.log("mocking api");

  const now = Date.now();

  const songDuration = 1000 * 20;
  const msIntoSong = Math.random() * songDuration;
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

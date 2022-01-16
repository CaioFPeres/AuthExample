import "./Video.css";

class Video {

    videoElement: HTMLMediaElement | null;
    videoStream: MediaStream | null;

    constructor(id: string){

        this.videoStream = null;
        this.videoElement = document.getElementById(id) as HTMLMediaElement;
        this.getVideo();
    }

    public sendVideo(){
        // should send to people in chat through WebRTC
    }

    private async getVideo(){
        
        this.videoStream = await navigator.mediaDevices.getUserMedia({ 
            audio: false, video: {
                width: { ideal: 1280 },
                height: { ideal: 720 }
            }
        }) as MediaStream;
        
        if ("srcObject" in this.videoElement!) {
            this.videoElement.srcObject = this.videoStream;
        } else {
            // Avoid using this in new browsers, as it is going away.
            this.videoElement!.src = URL.createObjectURL(this.videoStream as unknown as MediaSource);
        }

    }

    public stop(e: Event) {
        var stream = this.videoElement!.srcObject;
        var tracks = (stream! as MediaStream).getTracks();
      
        for (var i = 0; i < tracks.length; i++) {
          var track = tracks[i];
          track.stop();
        }
      
        this.videoElement!.srcObject = null;
    }
}

export default Video;
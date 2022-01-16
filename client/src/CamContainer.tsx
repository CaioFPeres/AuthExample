import React from "react";
import "./Cam.css";
import Video from "./Video";

class CamContainer extends React.Component<{children?: never[]}> {

    video: Video | null;

    constructor(props: {children?: never[]}){
        super(props);

        this.video = null;
        window.onload = () =>{
            this.video = new Video("cam");
            this.video.sendVideo();
        }
    }

    render(){
        return(
            <div className="CamContainer">
                <video className="Cam" id="cam" autoPlay={true}>
                </video>
                <div>Need to send the video with WebRTC</div>
            </div>
        );
    }

}

export default CamContainer;
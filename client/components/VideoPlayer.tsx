import React from 'react'
import videojs from 'video.js'
import axios from 'axios'
import config from '../../server/config/default'

export default class VideoPlayer extends React.Component<any, any>{
    constructor(props: any) {
        super(props)
        this.state = {
            stream: false,
            videojsOptions: null
        }
    }

    componentDidMount() {
        axios.get(`/user`, { 
            params: { 
                username: this.props.match.params.username
            }
        }).then(res => {
            this.setState({
                stream: true,
                videojsOptions: {
                    autoplay: false,
                    controls: true,
                    sources: [{
                        src: `http://127.0.0.1:${config.rtmp_server.http.port}/live/${res.data.stream_key}/idnex.m3u8`,
                        type: 'application/x-mpegURL'
                    }],
                    fluid: true
                }
                //@ts-ignore
            }), this.player = videojs(this.videoNode, this.state.videojsOptions, function onPlayerReady() {
                //@ts-ignore
                console.log('onPlayerReady', this)
            })
        }
    )}

    componentWillMount() {
        //@ts-ignore
        if(this.player) {
            //@ts-ignore
            this.player.dispose()
        }
    }

    render() {
        return(
            <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-8 mx-auto mt-5">
                    {this.state.stream ? (
                        <div data-vjs-player>
                            <video ref={// @ts-ignore
                                node => this.videoNode = node} className="video-js vjs-big-play-centered"/>
                        </div>
                    ): 'Loading'}
                </div>
            </div>
        )
    }
}
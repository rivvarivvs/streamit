//@ts-ignore
import NodeMediaServer from 'node-media-server'
import config from './config/default'
import {User} from './models/User'
import {generateStreamThumbnail} from './helpers/helpers'

const nms = new NodeMediaServer(config)

nms.on('prePublish', async (id: string, StreamPath: string, args: {}) => {
    let stream_key = getStreamKeyFromStreamPath(StreamPath)
    console.log('[NodeEvent on prePublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`)

    const user = await User.findOne({stream_key})

    if (!user) {
        let session = nms.getSession(id)
        return session.reject()
    }

    generateStreamThumbnail(stream_key)
})

const getStreamKeyFromStreamPath = (path:string) => {
    let parts = path.split('/')
    return parts[parts.length -1];
}

export {nms}
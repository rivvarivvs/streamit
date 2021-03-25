import request from 'request'
import {generateStreamThumbnail} from '../helpers/helpers' 
import config from '../config/default'
import { json } from 'body-parser'

const CronJob = require('cron').CronJob
const port = config.rtmp_server.http.port

const job = new CronJob('*/5 * * * * *', () => {
    request.get(`http://127.0.0.1:${port}/api/streams`, (err, res, body) => {
        let streams = JSON.parse(body)
        if (typeof streams !== undefined) {
            let live_streams = streams['live']
            for (let stream in live_streams) {
                if(!live_streams.hasOwnProperty(stream)) continue;
                generateStreamThumbnail(stream)
            }
        }
    })
}, null, true)

export { job }
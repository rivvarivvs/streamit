// @ts-ignore
import NodeMediaServer from 'node-media-server';
import config from '../config/default';
import {User} from '../models/User'

const nms = new NodeMediaServer(config);

nms.on('prePublish', async (id: any, StreamPath: any, args: any) => {
	let stream_key = getStreamKeyFromStreamPath(StreamPath);
	console.log(
		'[NodeEvent on prePublish]',
		`id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`
	);

	const user = await User.findOne({ stream_key })

	if(!user) {
		let session = nms.getSession(id)
		session.reject()
	}
});

const getStreamKeyFromStreamPath = (path: any) => {
	let parts = path.split('/');
	return parts[parts.length - 1];
};

module.exports = nms;

navigator.webkitGetUserMedia({video: true, audio: false}, function(stream) {

	const Peer = require('simple-peer');

	const peer = new Peer({
		initiator: location.hash === '#init',
		trickle: false,
		stream: stream
	});

	peer.on('signal', function (data) {
		document.getElementById('yourId').value = JSON.stringify(data);
	});

	document.getElementById('connect').addEventListener('click', function() {
		const otherId = JSON.parse(document.getElementById('otherId').value);
		peer.signal(otherId);
	});

	document.getElementById('send').addEventListener('click', function() {
		const yourMessage = document.getElementById('yourMessage').value
		peer.send(yourMessage);
	});

	peer.on('data', function(data) {
		document.getElementById('messages').textContent += data + '\n';
	});

	peer.on('stream', function (stream) {
		var video = document.createElement('video')
		document.body.appendChild(video)

		video.srcObject = stream;
		video.play();
	  })
	
}, function(err) {
	console.log(err);
});
AFRAME.registerComponent('blink-teleportation', {
	schema: {
		pos: {type: 'vec3'},
		dur: {type: 'number', default: 300}
	},
	
	init: function () {
		var el = this.el;
		var data = this.data;
		var camera = document.querySelector('#camera');
		var cameraRig = document.querySelector('#cameraRig');
		
		// Create the illusion of blink using a black image
		var blink = document.createElement('a-image');
		blink.setAttribute('material', {
			color: '#000000',
			opacity: 0
		});
		// After setting the z coordinate we append the blink image to the camera as its child
		blink.setAttribute('position', {x: 0, y: 0, z: -0.1});
		camera.appendChild(blink);
		// Animating the black image on click event (fade-in)
		el.addEventListener('click', function () {
			blink.setAttribute('animation', {
				property: 'material.opacity',
				from: 0,
				to: 1,
				dur: data.dur,
				easing: 'easeOutCubic'
			});
			// After animation completion, move the camera rig to the component's position
			setTimeout(function () {
				cameraRig.setAttribute('position', data.pos);
				// Emitting a custom event to trigger the fade-out animation
				el.emit('trigger-fadeout');
			}, data.dur);
		});
		// Listen on the custom event and trigger the fadeout animation
		el.addEventListener('trigger-fadeout', function () {
			blink.setAttribute('animation', {
				to: 0
			});
		});
	}
});
/* global AFRAME */
AFRAME.registerComponent('highlight', {
    init: function () {
      this.onClick = this.onClick.bind(this); 
      this.el.addEventListener('click',this.onClick);
     
    },
  
    onClick: function (evt) {
        var infoPanel = this.el.sceneEl.querySelector('#infoPanel');
        infoPanel.setAttribute('visible','true');
    },
  
  });
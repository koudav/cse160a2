class Cylinder{
    constructor(){
      this.type='cylinder';
      //this.position = [0.0, 0.0, 0.0];
      this.color = [1.0, 1.0, 1.0, 1.0];
      //this.size = 5.0;
      this.segments = 10;
      this.matrix = new Matrix4();
    }
  
    render() {
      //var xy = this.position;
      var rgba = this.color;
      // var size = this.size;
    
      // Pass the color of a point to u_FragColor uniform variable
      gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);

      gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

      //var d = this.size / 200.0; // delta

        let angleStep=360.0/this.segments;
        for(var angle = 0; angle < 360; angle = angle + angleStep){
          let centerPt = [0.0, 0.0, 0.0];
          let angle1 = angle;
          let angle2 = angle + angleStep;
          let vec1 = [Math.cos(angle1*Math.PI/180), 0, Math.sin(angle1*Math.PI/180)];
          let vec2 = [Math.cos(angle2*Math.PI/180), 0, Math.sin(angle2*Math.PI/180)];
          let pt1 = [centerPt[0] + vec1[0], 0, centerPt[2] + vec1[2]];
          let pt2 = [centerPt[0] + vec2[0], 0, centerPt[2] + vec2[2]];

          gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
          drawTriangle3D([0.0, 0.0, 0.0,    pt1[0], 0.0, pt1[2],    pt2[0], 0.0, pt2[2]]);
          gl.uniform4f(u_FragColor, rgba[0]*0.85, rgba[1]*0.85, rgba[2]*0.85, rgba[3]);
          drawTriangle3D([0.0, 1.0, 0.0,    pt1[0], 1.0, pt1[2],    pt2[0], 1.0, pt2[2]]);
          gl.uniform4f(u_FragColor, rgba[0]*0.7, rgba[1]*0.7, rgba[2]*0.7, rgba[3]);
          drawTriangle3D([pt1[0], 0.0, pt1[2],    pt1[0], 1.0, pt1[2],    pt2[0], 0.0, pt2[2]]);
          drawTriangle3D([pt2[0], 0.0, pt2[2],    pt1[0], 1.0, pt1[2],    pt2[0], 1.0, pt2[2]]);
      }
  }
}

/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTriangle extends CGFobject {
	constructor(scene, x1, y1,z1, x2, y2,z2, x3, y3,z3) {
		super(scene);

		this.x1=x1;
		this.y1=y2;
		this.x2=x2;
		this.y2=y2;
		this.x3=x3;
		this.y3=y3;
		this.z1=z1;
		this.z2=z2;
		this.z3=z3;
		this.initBuffers();
	}
	initBuffers() {
		this.vertices = [
			this.x1, this.y1, this.z1,	//0
			this.x2, this.y2, this.z2,	//1
			this.x3, this.y3, this.z3	//2
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 2, 1,
			1, 2, 0 //clock wise so it can be seen both ways
		];
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}
}

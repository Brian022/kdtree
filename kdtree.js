k = 2;
class Node 
{
    constructor (point , axis )
    {
        this.point = point;
        this.left  = null;
        this.right = null;
        this.axis  = axis;
    }
}

function build_kdtree(points, depth = 0)
{
	if(points.length==0)return null;

	var axis = depth % k;
	//console.log(points.length);
	points.sort(function (a,b){
		return a[axis]-b[axis];
	});

	var median = int(points.length/2);

	var node = new Node(points[median],axis);
	node.left=build_kdtree(points.slice(0,median),depth+1);
	node.right=build_kdtree(points.slice(median+1,points.length),depth+1);

	return node;
}

function getHeight(node) {
	if(node == null)   
		return 0;
	else   
		return 1 +(Math.max(getHeight(node.left),getHeight(node.right)));   
}

function generate_dot(node){
	var cad="";
	if(node==null)
		return "";

	if(node.left!=null)
	{
		cad=cad+'"'+node.point.toString()+"\"";
		cad=cad+" -> "+'"'+node.left.point.toString()+'"'+";"+"\n";
	}
	if(node.right!=null)
	{
		cad=cad+"\""+node.point.toString()+"\"";
		cad=cad+" -> "+'"'+node.right.point.toString()+'"'+";"+"\n";
	}
	return cad+generate_dot(node.left)+generate_dot(node.right);
}

function distanceSquared(point1, point2)
{
	var distance = 0;
	for (var i = 0; i < k; i++)
		distance += Math.pow((point1[i] - point2[i]), 2);
	return Math.sqrt(distance);
}

function closest_point_brute_force(points, point)
{
	var dist=distanceSquared(points[0],point);
	var punto=points[0];
	for (var i = 1; i < points.length; i++) {
		var aux=distanceSquared(points[i],point);
		if(aux<dist){
			dist=aux;
			punto=points[i];
		}
	}
	return punto;
}

function naive_closest_point(node, point, depth = 0, best = null)
{
	if(node==null)return best;

	var axis=depth% k;
	var best1 = null;
	var camino = null;
	if(best==null)
		best1=node.point;

	if(point[axis]>node.point[axis])
		camino=node.right
	else
		camino=node.left
	return naive_closest_point(camino,point,depth+1,best1)	
}

function closest_point (node , point , depth = 0, best=null)
{
	if(node==null)return best;

	var axis=depth% k;
	var camino = null;

	if(best==null)
	{
		best1=node.point;
	}
	else if((distanceSquared(best, point)> distanceSquared(node.point,point)))
		best1=node.point;
	else
		best1=best;

	if(point[axis]>node.point[axis])
		camino=node.right;

	else
		camino=node.left;

	return closest_point(camino,point,depth+1,best1)
}

function KNN(points, point, K)
{
	puntos = [];
	resultado = [];
	var pointm=points[0];
	for (var i = 0; i < points.length; i++) 
	{
		var aux=distanceSquared(points[i],point);
		puntos.push([aux,points[i]])
		//console.log(puntos[i])

		puntos.sort(function (a,b){
			return a[0]-b[0];
		});
	}
	for(var i = 0; i < puntos.length; i++){
		resultado.push(puntos[i].slice(1,2));
	}
	console.log(resultado.slice(0, k))
}
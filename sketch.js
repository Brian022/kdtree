function setup () 
{
    var width = 250;
    var height = 200;
    createCanvas (width ,height);
    background(0);
    for (var x = 0; x < width ; x += width / 10) 
    {
        for (var y = 0; y < height ; y += height / 5)
        {
            stroke (125 , 125 , 125) ;
            strokeWeight (1) ;
            line (x, 0, x, height ) ;
            line (0 , y, width , y);
        }
    }
    var data = [
        [40 ,70] ,
        [70 ,130] ,
        [90 ,40] ,
        [110 , 100] ,
        [140 ,110] ,
        [160 , 100] ,
        [150 , 30]
        ];
    var point = [140 ,90];
    for(let i = 0; i < 7 ; i ++) 
    {
        var x = data[i][0]
        var y = data[i][1]
        fill(255 ,255 ,255);
        circle(x, height - y, 7); // 200 -y para q se dibuje apropiadamente
        textSize(8);
        text (x + ',' + y, x + 5, height - y);// 200 -y para q se dibuje apropiadamente
    }
    var root = build_kdtree(data);
    console.log(root);
    console.log(generate_dot(root));
    console.log("Fuerza bruta")
    console.log(closest_point_brute_force(data, point))
    console.log("Naive_Closest_Point")
    console.log(naive_closest_point(root, point))
    //console.log("Closest_Point")
    //console.log(closest_point(root, point))
    console.log("KNN")
    KNN(data,point, 2)
}

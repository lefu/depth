function Triangle(){
    this.c0 = $V([0,0,0]);
    this.c1 = $V([0,0,0]);
    this.c2 = $V([0,0,0]);
    
    this.normal = function(){
        return this.plane().normal;
        //return this.c0.subtract(this.c1).cross(this.c0.subtract(this.c2));
    }
    
    this.scale = function(mul){
        var a1 = this.c1.subtract(this.c0);
        var a2 = this.c2.subtract(this.c0);
        
        this.c1 =  this.c0.add(a1.x(mul));
        this.c2 =  this.c0.add(a2.x(mul));
    }
    
    this.translate = function(dir){
        this.c0 = this.c0.add(dir);    
        this.c1 = this.c1.add(dir); 
        this.c2 = this.c2.add(dir); 
    }
    
    this.rotate = function(angle, axis){
        this.c1 = this.c1.subtract(this.c0).rotate(angle,$L([0,0,0],axis)).add(this.c0);    
        this.c2 = this.c2.subtract(this.c0).rotate(angle,$L([0,0,0],axis)).add(this.c0); 
    }
    
    this.p = null;
    this.plane = function(){
        if(this.p != null)return this.p;
        this.p = Plane.create(this.c0, this.c1.subtract(this.c0), this.c2.subtract(this.c0));
       return this.p;
    }
    
    this.intersection = function(ray) {
        var line = Line.create([0, 0, 0], [0, 0, 0]);
        line = ray;
    
        var point = this.plane().intersectionWith(line);
        if (point != null && 
        insideLine(point, this.c0, this.c1, this.c2) && 
        insideLine(point, this.c1, this.c2, this.c0) && 
        insideLine(point, this.c2, this.c0, this.c1)) {
            return point;
        }
        else {
            return null;
        }
    }
    
    function insideLine(point, c0, c1,c2){
        var pointCross = point.subtract(c1).cross(c2.subtract(c1));
        var c0Cross = c0.subtract(c1).cross(c2.subtract(c1));
        return pointCross.toUnitVector().dot(c0Cross.toUnitVector()) >= -0.05 
        
        var dir = $L(c0, point.subtract(c0));
        var line = c1.subtract(c2);
        
        var normal = line.cross(dir.direction).cross(line);
        if(normal === null){
            return false;
        };
        
        
        var plane = $P(c1, normal);
        if(plane === null)return false;
        var intersection = dir.intersectionWith(plane);
        if(intersection === null){
            return false;
        }
        return c0.distanceFrom(point) <= c0.distanceFrom(intersection);
    }
}
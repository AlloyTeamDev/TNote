Jx().$package('tn.storage', function(J){
    
    var packageContext = this;

    this.init = function(){
        
    }

    this.save = function(note){
        J.event.notifyObservers(packageContext, 'beforeSave', note);
        //do...do...do...
        
        J.event.notifyObservers(packageContext, 'save', note);
    }






});
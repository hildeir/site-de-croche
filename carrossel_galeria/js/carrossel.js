export default class Carrossel{
    constructor(){
        this.root = document.querySelector(".conf-galeria");
        this.root_computed = window.getComputedStyle(this.root);
       this.property_width = this.root_computed.getPropertyValue("--width-galeria-carrossel");
        this.width_carrossel = parseInt(this.property_width.replace("px",""));
        this.total_items = document.querySelectorAll(".galeria-carrossel-item").length;
        this.carrossel_window = document.querySelector(".galeria-carrossel-window");
        this.carrossel_window_style = window.getComputedStyle(this.carrossel_window);
        this.pos_left =  this.carrossel_window_style.getPropertyValue("left");
        this.item = document.querySelector(".galeria-carrossel-item");
        this.item_computed = window.getComputedStyle(this.item);
        this.item_propert = this.item_computed.getPropertyValue("flex-basis");
        this.item_size = parseInt(this.item_propert.replace("px",""));
        this.pos = parseInt(this.pos_left.replace("px",""));
        this.side = "left";
        this.current_item = null;
        this.animation_automatic = true;
        this.walk = 0;
        this.id = 0;
        this.buildLegenda();
    }
    start(){
        const self = this;
        const state_animation = document.querySelector(".galeria-carrossel-window");
        const btn_left = document.querySelector(".galeria-btn-left");
        const btn_right = document.querySelector(".galeria-btn-right");
        state_animation.addEventListener("mouseenter",function(){
            if(self.animation_automatic){
                self.animation_automatic = false;
                clearInterval(self.id);
            }else{
                self.animation_automatic = true;
                clearInterval(self.id);
                setTimeout(()=>{
                    self.id = setInterval(runAnitmation.bind(self),10);
                });
            }
        });
        
        btn_left.addEventListener("click",function(){
            if(self.animation_automatic == false){
                self.side = "left";
                animationManual(self);
            }
        });
        
        btn_right.addEventListener("click",function(){
            if(self.animation_automatic == false){
                self.side = "right";
                animationManual(self);
            }
        });
        if(this.animation_automatic){
            self.id = setInterval(runAnitmation.bind(self),10);
        }
        
        function runAnitmation(){
            if(this.animation_automatic){
                if(this.side == "left"){
                    if(this.current_item == (this.total_items - 1)){
                        this.side = "right";
                        delayOnItem(this);
                    }else{
                        if(this.pos == 0){
                            this.current_item = 0;
                            this.updateLegenda(this.current_item);
                        }
                        this.walk++;
                        this.pos--;
                        this.carrossel_window.style.left = this.pos + "px";
                        if(this.walk == this.item_size){
                            this.walk = 0;
                            this.current_item++;
                            this.updateLegenda(this.current_item);
                            delayOnItem(this);
                        }
                    }
                    
                }else if(this.side == "right"){
                    if(this.pos == 0){
                        this.side = "left";
                        delayOnItem(this);
                    }else{
                        this.walk++;
                        this.pos++
                        this.carrossel_window.style.left = this.pos + "px";
                        if(this.walk == this.item_size){
                            this.walk = 0;
                            this.current_item--;
                            this.updateLegenda(this.current_item);
                            delayOnItem(this);
                        }
                    }
                }
            }
        }
        function animationManual(self){
            if(self.side == "right"){
                if(self.current_item >= 0 && self.current_item < (self.total_items - 1)){
                    self.current_item++;
                    const newpos = -(self.current_item * self.item_size);
                    self.carrossel_window.style.left = newpos + "px";
                    self.pos = newpos;
                    self.side = "left";
                    self.walk = 0;
                }
                self.updateLegenda(self.current_item);
            }else if(self.side == "left"){
                if(self.current_item > 0){
                    self.current_item--;
                    const newpos = -(self.current_item * self.item_size);
                    self.carrossel_window.style.left = newpos + "px";
                    self.pos = newpos;
                    self.side = "right";
                    self.walk = 0;
                }
                self.updateLegenda(self.current_item);
            }
        }
        function delayOnItem(e){
            if(self.animation_automatic){
                clearInterval(self.id);
                setTimeout(()=>{
                    self.id = setInterval(runAnitmation.bind(e),10);
                },1000);
            }
        }
    }
    updateLegenda(current_item){
        const total_items = document.querySelectorAll(".galeria-item-legenda");
        for (let i = 0; i < total_items.length; i++) {
            const element = total_items[i];
            element.classList.remove("galeria-active-item-legenda");
        }
        total_items[current_item].classList.add("galeria-active-item-legenda");
    }
    buildLegenda(){
        const legenda = document.querySelector(".galeria-legenda");
        const total_items = document.querySelectorAll(".galeria-carrossel-item");
        for (let i = 0; i < total_items.length; i++) {
            let div = document.createElement("div");
            div.classList.add("galeria-item-legenda");
            legenda.appendChild(div);
        }
    }
}
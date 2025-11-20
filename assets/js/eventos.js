window.addEventListener("load",function(){
    const btn_encomendar_topo_2 = document.querySelector(".btn-encomendar-topo-2");
    btn_encomendar_topo_2.addEventListener("click",go);
    const btn_encomendar = document.querySelector(".btn-encomendar");
    btn_encomendar.addEventListener("click",go);
});
function go(){
    window.open("https://api.whatsapp.com/send?phone=5521974638394&text=Olá gostaria de Encomendar um crochê");
}
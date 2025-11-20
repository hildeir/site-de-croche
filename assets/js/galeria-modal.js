window.addEventListener('load', function() {
  const btn = document.querySelector(".btn-galeria");
  btn.addEventListener("click",function(){
    const modal = document.querySelector(".container-galeria-modal");
    modal.style.display = "flex";
  });

  const btn_fechar = document.querySelector(".btn-fechar");
  btn_fechar.addEventListener("click",function(){
    const modal = document.querySelector(".container-galeria-modal");
    modal.style.display = "none";
  })
});
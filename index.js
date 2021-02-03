document.addEventListener('DOMContentLoaded', function(){
    submit.addEventListener('click', function(e){
    
    e.preventDefault();
    // document.getElementById("divforms").style.display = "none";
    flag = 0;
    var vca = document.getElementById("vca").value.replace(",", ".");
    var ica = document.getElementById("ica").value.replace(",", ".");
    var pca = document.getElementById("pca").value.replace(",", ".");
    var vcc = document.getElementById("vcc").value.replace(",", ".");
    var icc = document.getElementById("icc").value.replace(",", ".");
    var pcc = document.getElementById("pcc").value.replace(",", ".");
    var vs = document.getElementById("vs").value.replace(",", ".");
    var vp = document.getElementById("vp").value.replace(",", ".");
    

    validate(vca);
    validate(ica);
    validate(pca);
    validate(vcc);
    validate(icc);
    validate(pcc);
    validate(vs);
    validate(vp);
    
    if (flag == 0){
        document.getElementById("feedback").style.display = "none";
        vca = parseFloat(vca);
        ica = parseFloat(ica);
        pca = parseFloat(pca);
        vcc = parseFloat(vcc);
        icc = parseFloat(icc);
        pcc = parseFloat(pcc);
        vs = parseFloat(vs);
        vp = parseFloat(vp);
        alert(vca + ica);
    }


    
    var medca  = document.querySelector('input[name="medicao1"]:checked').value;
    var medcc = document.querySelector('input[name="medicao2"]:checked').value;
    
    function validate(value){
        
        if (value==null || value == "" || value <= 0 || isNaN(value)){
             document.querySelector('#feedback').innerHTML = "Os valores não podem estar vazios, conter letras ou serem iguais ou menor que zero.";
             document.getElementById("feedback").style.display = "block";
             flag = 1;
        }
    }



    
    })




















});
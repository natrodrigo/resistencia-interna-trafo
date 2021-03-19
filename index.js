var flag = 0;
var formValues = {vca:0, ica:0, pca:0, vcc:0, icc:0, pcc:0, vp:0, vs:0};
var medca = "";
var medcc = "";
var finalValues = {rc_p:.0, z_phi_p:.0, xm_p:.0, rc_s:.0,z_phi_s:.0, 
    xm_s:.0, a:.0,pnucleo:.0, pcu:.0, zeq_p:.0, req_p:.0, xeq_p:.0,
     zeq_s:.0, req_s:.0, xeq_s:.0, rp:.0, xp:.0, rs:.0, xs:.0}

document.addEventListener('DOMContentLoaded', function(){
    submit.addEventListener('click', function(e){
        flag = 0;
        e.preventDefault();
        getElementFromForms();
        validateDataFromForms();
        convertDataToFloat();
        if (flag == 0){
            mathCalculate();
            formatFinalValues();
            formValues.vp = decimal(formValues.vp);
            formValues.vs = decimal(formValues.vs);
            printOnScreen();
        }
    })
    

    testeCApriCCpri.addEventListener('click', function(e){
        e.preventDefault();
        formValues = {vca:1500, ica:0.14, pca:21.4, vcc:31.3, icc:4, pcc:71.2, vp:2300, vs:230};
        medca = "pri";
        medcc = "pri";
        mathCalculate();
        formatFinalValues();
        formValues.vp = decimal(formValues.vp);
        formValues.vs = decimal(formValues.vs);
        printOnScreen();
    })


    testeCApriCCsec.addEventListener('click', function(e){
        e.preventDefault();
        formValues = {vca:119, ica:0.11, pca:3.9, vcc:18.1, icc:8.7, pcc:38.1, vp:230, vs:115};
        medca = "pri";
        medcc = "sec";
        mathCalculate();
        formatFinalValues();
        formValues.vp = decimal(formValues.vp);
        formValues.vs = decimal(formValues.vs);
        printOnScreen();
    })


    testeCAsecCCpri.addEventListener('click', function(e){
        e.preventDefault();
        formValues = {vca:240, ica:7.133, pca:400, vcc:489, icc:2.5, pcc:240, vp:8000, vs:240};
        medca = "sec";
        medcc = "pri";
        mathCalculate();
        formatFinalValues();
        formValues.vp = decimal(formValues.vp);
        formValues.vs = decimal(formValues.vs);
        printOnScreen();
    })


    testeCAsecCCsec.addEventListener('click', function(e){
        e.preventDefault();
        formValues = {vca:115, ica:0.11, pca:3.9, vcc:17.1, icc:8.7, pcc:38.1, vp:230, vs:115};
        medca = "sec";
        medcc = "sec";
        mathCalculate();
        formatFinalValues();
        formValues.vp = decimal(formValues.vp);
        formValues.vs = decimal(formValues.vs);
        printOnScreen();
    })
});


function getElementFromForms(){

    formValues.vca = document.getElementById("vca").value.replace(",", ".");
    formValues.ica = document.getElementById("ica").value.replace(",", ".");
    formValues.pca = document.getElementById("pca").value.replace(",", ".");
    formValues.vcc = document.getElementById("vcc").value.replace(",", ".");
    formValues.icc = document.getElementById("icc").value.replace(",", ".");
    formValues.pcc = document.getElementById("pcc").value.replace(",", ".");
    formValues.vp = document.getElementById("vs").value.replace(",", ".");
    formValues.vs = document.getElementById("vp").value.replace(",", ".");
    
    medca  = document.querySelector('input[name="medicao1"]:checked').value;
    medcc = document.querySelector('input[name="medicao2"]:checked').value;
}


function validateDataFromForms(){

    for (var [key] of Object.entries(formValues)) {
        validate(formValues[key]);
    }
    if (medca !="pri" & medca != "sec"){
        validate(medca);
    }
    if (medcc !="pri" & medcc != "sec"){
        validate(medcc);
    }
}


function validate(value){ 

    if (value==null || value == "" || value <= 0 || isNaN(value)){
         document.querySelector('#feedback').innerHTML = "Os valores não podem estar vazios, conter letras ou serem iguais ou menor que zero.";
         document.getElementById("feedback").style.display = "block";
         flag = 1;
    }
}


function convertDataToFloat() {

    for (var [key] of Object.entries(formValues)) {
        formValues[key] = parseFloat(formValues[key]);
    }
}


function mathCalculate(){

    finalValues.a = formValues.vp/formValues.vs;

    if (medca == "pri"){
        finalValues.rc_p = (formValues.vca ** 2) / formValues.pca;
        finalValues.z_phi_p = formValues.vca / formValues.ica;
        finalValues.xm_p = 1 / Math.sqrt(((1 / finalValues.z_phi_p)**2) - ((1/finalValues.rc_p)**2));
    
        finalValues.rc_s = finalValues.rc_p / finalValues.a**2;
        finalValues.z_phi_s = finalValues.z_phi_p / finalValues.a**2;
        finalValues.xm_s = finalValues.xm_p / finalValues.a**2;
    }

    else{
        finalValues.rc_s = (formValues.vca ** 2) / formValues.pca;
        finalValues.z_phi_s = formValues.vca / formValues.ica;
        finalValues.xm_s = 1 / Math.sqrt(((1 / finalValues.z_phi_s)**2) - ((1/finalValues.rc_s)**2));
        

        finalValues.rc_p = finalValues.rc_s * finalValues.a**2;
        finalValues.z_phi_p = finalValues.z_phi_s * finalValues.a**2;
        finalValues.xm_p = finalValues.xm_s * finalValues.a**2;
    }
    
    finalValues.pnucleo = formValues.vca**2 / finalValues.rc_p;

    if (medcc == "pri"){
        finalValues.zeq_p = formValues.vcc / formValues.icc;
        finalValues.req_p = formValues.pcc/ formValues.icc**2;
        finalValues.xeq_p = Math.sqrt(finalValues.zeq_p**2 - finalValues.req_p**2);
        
        finalValues.zeq_s = finalValues.zeq_p / finalValues.a**2;
        finalValues.req_s = finalValues.req_p / finalValues.a**2;
        finalValues.xeq_s = finalValues.xeq_p / finalValues.a**2;
    }

    else{
        finalValues.zeq_s = formValues.vcc / formValues.icc;
        finalValues.req_s = formValues.pcc/ formValues.icc**2;
        finalValues.xeq_s = Math.sqrt(finalValues.zeq_s**2 - finalValues.req_s**2);
        
        finalValues.zeq_p = finalValues.zeq_s * finalValues.a**2;
        finalValues.req_p = finalValues.req_s * finalValues.a**2;
        finalValues.xeq_p = finalValues.xeq_s * finalValues.a**2;
    }

    finalValues.pcu = formValues.icc**2 * finalValues.req_p;

    finalValues.rp = finalValues.req_p / 2;
    finalValues.xp  = finalValues.xeq_p / 2;
    finalValues.rs = finalValues.req_s / 2;
    finalValues.xs = finalValues.xeq_s / 2;

}


function formatFinalValues(){

    for (var [key] of Object.entries(finalValues)) {
        finalValues[key] = decimal(finalValues[key]);
    }
}


function decimal(value){

    if (value > 999.999){
        value = value / 1000;
        return value.toFixed(2) + "k";
    }
    if (value < 1){
        value = value * 1000
        return value.toFixed(2) + "m";
    }
    else{
        return value.toFixed(2);
    }
}


function printOnScreen(){
    console.log("SIM")
    document.getElementById("feedback").style.display = "none";

    document.querySelector('#valores').innerHTML = (
        "Vca = " + formValues.vca + " V, Ica = " + formValues.ica + " A, Pca = " + formValues.pca + " W, " +
        "Vcc = " + formValues.vcc + " V, Icc = " + formValues.icc + " A, Pcc = " + formValues.pcc + " W, " +
        "<br>Vp = " + formValues.vp + " V, Vs = " + formValues.vs + " V"
    );

    document.querySelector('#realcont').innerHTML = (
    "<img src='https://imgur.com/2EK6nrx.png' style='max-width: 100%' alt='Circuito Real'><br>R<sub>1</sub> = " 
    + finalValues.rp + "Ω"+"<br>"+
    "X<sub>l1</sub> = " + finalValues.xp + "Ω"+"<br>"+
    "R<sub>c</sub> = " + finalValues.rc_p + "Ω"+"<br>"+
    "jX<sub>m</sub> = " + finalValues.xm_p + "Ω"+"<br>"+
    "R<sub>2</sub> = " + finalValues.rs + "Ω"+"<br>"+
    "jX<sub>2</sub> = " + finalValues.xs + "Ω"+"<br>"+
    "Perdas no núcleo = " + finalValues.pnucleo + "W"+"<br>"+
    "Perdas no cobre = " + finalValues.pcu + "W");
    
    document.querySelector('#tp').innerHTML = (
    "<img src='https://imgur.com/nGztdtn.png' style='max-width: 100%' alt='Circuito T Primário'><br>V<sub>1</sub> = " 
    + formValues.vp + "V"+"<br>"+
    "V<sub>2</sub>' = " + formValues.vp + "V"+"<br>"+
    "R<sub>1</sub> = " + finalValues.rp + "Ω"+"<br>"+
    "jX<sub>1</sub> = " + finalValues.xp + "Ω"+"<br>"+
    "R<sub>c</sub> = " + finalValues.rc_p + "Ω"+"<br>"+
    "jX<sub>m</sub> = " + finalValues.xm_p + "Ω"+"<br>"+
    "R<sub>2</sub>' = " + finalValues.rp + "Ω"+"<br>"+
    "X<sub>2</sub>' = " + finalValues.xp + "Ω");

    document.querySelector('#ts').innerHTML = (
    "<img src='https://imgur.com/JbtPXPK.png' style='max-width: 100%' alt='Circuito T Secundário'><br>V<sub>1</sub>' = " 
    + formValues.vs + "V"+"<br>"+
    "R<sub>1</sub>' = " + finalValues.rs + "Ω"+"<br>"+
    "jX<sub>1</sub>' = " + finalValues.xs + "Ω"+"<br>"+
    "R<sub>c</sub>' = " + finalValues.rc_s + "Ω"+"<br>"+
    "V<sub>2</sub> = " + formValues.vs + "V"+"<br>"+
    "R<sub>2</sub> = " + finalValues.rs + "Ω"+"<br>"+
    "X<sub>2</sub> = " + finalValues.xs + "Ω"+"<br>"+
    "jX<sub>m</sub>' = " + finalValues.xm_s + "Ω");

    document.querySelector('#lp').innerHTML = (
    "<img src='https://imgur.com/TcLwEsl.png' style='max-width: 100%' alt='Circuito L Primário'><br>V<sub>1</sub> = " 
    + formValues.vp + "V"+"<br>"+
    "R<sub>c</sub> = " + finalValues.rc_p + "Ω"+"<br>"+
    "jX<sub>m</sub> = " + finalValues.xm_p + "Ω"+"<br>"+
    "V<sub>2</sub>' = " + formValues.vp + "V"+"<br>"+
    "R<sub>eq(p)</sub> = " + finalValues.req_p + "Ω"+"<br>"+
    "X<sub>eq(p)</sub> = " + finalValues.xeq_p + "Ω");
    
    document.querySelector('#ls').innerHTML = (
    "<img src='https://imgur.com/jDxNmBi.png' style='max-width: 100%' alt='Circuito L Secundário'><br>V<sub>1</sub>' = " 
    + formValues.vs + "V"+"<br>"+
    "R<sub>c</sub>' = " + finalValues.rc_s + "Ω"+"<br>"+
    "jX<sub>m</sub>'= " + finalValues.xm_s + "Ω"+"<br>"+
    "V<sub>2</sub> = " + formValues.vs + "V"+"<br>"+
    "R<sub>eq(s)</sub> = " + finalValues.req_s + "Ω"+"<br>"+
    "jX<sub>eq(s)</sub> = " + finalValues.xeq_s + "Ω");
    

    document.getElementById("divforms").style.display = "none";
    document.getElementById("results").style.display = "block";
}
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
    
    var medca  = document.querySelector('input[name="medicao1"]:checked').value;
    var medcc = document.querySelector('input[name="medicao2"]:checked').value;

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

        var rc_p = 0.1;
        var z_phi_p = 0.1;
        var xm_p = 0.1;
        
        var rc_s = 0.1;
        var z_phi_s = 0.1;
        var xm_s = 0.1;

        var a = 0.1;
        var pnucleo = 0.1;
        var pcu = 0.1;

        var zeq_p = 0.1;
        var req_p = 0.1;
        var xeq_p = 0.1;
        
        var zeq_s = 0.1;
        var req_s = 0.1;
        var xeq_s = 0.1;

        var rp = 0.1;
        var xp = 0.1;
        var rs = 0.1;
        var xs = 0.1;

        rc_p = (vca ** 2) / pca;
        z_phi_p = vca / ica;
        xm_p = 1 / Math.sqrt(((1 / z_phi_p)**2) - ((1/rc_p)**2));
        a = vp/vs;
        rc_s = rc_p / a**2;
        z_phi_s = z_phi_p / a**2;
        xm_s = xm_p / a**2;
        pnucleo = vca**2 / rc_p;
        zeq_p = vcc / icc;
        req_p = pcc/ icc**2;
        xeq_p = Math.sqrt(zeq_p**2 - req_p**2);
        pcu = icc**2 * req_p;
        zeq_s = zeq_p / a**2;
        req_s = req_p / a**2;
        xeq_s = xeq_p / a**2;

        rp = req_p / 2;
        xp  = xeq_p / 2;
        rs = req_s / 2;
        xs = xeq_s / 2;

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
        
        rc_p= decimal(rc_p);
        z_phi_p= decimal(z_phi_p);
        xm_p=decimal(xm_p);
        a=decimal(a);
        rc_s = decimal(rc_s);
        z_phi_s = decimal(z_phi_s);
        xm_s=decimal(xm_s);
        pnucleo=decimal(pnucleo);
        zeq_p=decimal(zeq_p);
        req_p=decimal(req_p);
        xeq_p =decimal(xeq_p);
        pcu=decimal(pcu);
        zeq_s=decimal(zeq_s);
        req_s=decimal(req_s);
        xeq_s=decimal(xeq_s);
        rp=decimal(rp);
        xp=decimal(xp);
        rs=decimal(rs);
        xs=decimal(xs);




        document.querySelector('#res').innerHTML = (
        "<div class='container col-md-2'> <h3>Circuito Real</h3> <hr> R<sub>1</sub> = " + rp + "Ω"+"<br>"+
        "X<sub>l1</sub> = " + xp + "Ω"+"<br>"+
        "R<sub>c</sub> = " + rc_p + "Ω"+"<br>"+
        "X<sub>m</sub> = " + xm_p + "Ω"+"<br>"+
        "R<sub>2</sub> = " + rs + "Ω"+"<br>"+
        "R<sub>l2</sub> = " + xs + "Ω"+"<br>"+
        "Perdas no núcleo = " + pnucleo + "W"+"<br>"+
        "Perdas no cobre = " + pcu + "W"+"</div>"+

        "<div class='container col-md-2'> <h3>Circuito T Primário</h3> <hr> V<sub>p</sub> = " + vp + "V"+"<br>"+
        "aV<sub>s</sub> = " + vp + "V"+"<br>"+
        "R<sub>p</sub> = " + rp + "Ω"+"<br>"+
        "jX<sub>p</sub> = " + xp + "Ω"+"<br>"+
        "R<sub>c</sub> = " + rc_p + "Ω"+"<br>"+
        "jX<sub>m</sub> = " + xm_p + "Ω"+"<br>"+
        "a²R<sub>s</sub> = " + rp + "Ω"+"<br>"+
        "ja²X<sub>s</sub> = " + xp + "Ω"+"</div>"+

        "<div class='container col-md-2'> <h3>Circuito T Secundário</h3> <hr> V<sub>p</sub>/a = " + vs + "V"+"<br>"+
        "R<sub>p</sub>/a² = " + rs + "V"+"<br>"+
        "jX<sub>p</sub>/a² = " + xs + "Ω"+"<br>"+
        "R<sub>c</sub>/a² = " + rc_s + "Ω"+"<br>"+
        "V<sub>s</sub> = " + vs + "V"+"<br>"+
        "R<sub>s</sub> = " + rs + "Ω"+"<br>"+
        "jX<sub>s</sub> = " + xs + "Ω"+"<br>"+
        "jX<sub>m</sub>/a² = " + xm_s + "Ω"+"</div>"+

        "<div class='container col-md-2'> <h3>Circuito L Primário</h3> <hr> V<sub>p</sub> = " + vp + "V"+"<br>"+
        "R<sub>c</sub> = " + rc_p + "Ω"+"<br>"+
        "jX<sub>m</sub> = " + xm_p + "Ω"+"<br>"+
        "aV<sub>s</sub> = " + vp + "V"+"<br>"+
        "R<sub>eq(p)</sub> = " + req_p + "Ω"+"<br>"+
        "X<sub>eq(p)</sub> = " + xeq_p + "Ω"+"</div>"+
        
        "<div class='container col-md-2'> <h3>Circuito L Secundário</h3> <hr> V<sub>p</sub>/a = " + vs + "V"+"<br>"+
        "R<sub>c</sub>/a² = " + rc_s + "Ω"+"<br>"+
        "jX<sub>m</sub>/a²= " + xm_s + "Ω"+"<br>"+
        "V<sub>s</sub> = " + vs + "V"+"<br>"+
        "R<sub>eq(s)</sub> = " + req_s + "Ω"+"<br>"+
        "X<sub>eq(s)</sub> = " + xeq_s + "Ω"+"</div>"
        );
        

        document.getElementById("divforms").style.display = "none";
        document.getElementById("results").style.display = "block";
    }


    
    
    
    function validate(value){ 
        if (value==null || value == "" || value <= 0 || isNaN(value)){
             document.querySelector('#feedback').innerHTML = "Os valores não podem estar vazios, conter letras ou serem iguais ou menor que zero.";
             document.getElementById("feedback").style.display = "block";
             flag = 1;
        }
    }
    })

    



















});
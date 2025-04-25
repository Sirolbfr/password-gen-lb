/* -------- Constants -------- */

const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercase = "abcdefghijklmnopqrstuvwxyz";
const digits = "0123456789";
const special = "!@#$%^*()_+[]{}|;:,.?/`~-=\\'";

const upp = document.getElementById("ckbox_upp");
const low = document.getElementById("ckbox_low");
const dig = document.getElementById("ckbox_dig");
const spe = document.getElementById("ckbox_spe");

const input = document.getElementById("input");
const display = document.getElementById("display");


/* -------- Main -------- */

function selection() {
    let selected = "";

    if (upp.checked==true) {selected += uppercase;}
    if (low.checked==true) {selected += lowercase;}
    if (dig.checked==true) {selected += digits;}
    if (spe.checked==true) {selected += special;}

    return selected;
}



function pswrd_gen() {
    let res = "";
    let input_length = Number(input.value);
    let cp_btn = document.getElementById("cp_btn");
    if (cp_btn!=undefined) {cp_btn.remove();}


    if (selection().length>0) {
        if (input_length < Number(input.min)) {res = 'Nombre de caractères trop bas';}
        else if (input_length > Number(input.max)) {res = 'Nombre de caractères trop haut';}
        else {
            for (let i=0; i<input_length; i++) {
                let rndm = Math.floor(Math.random()* selection().length);
                res += selection().charAt(rndm);
            }
            
            cp_btn = document.createElement("button");
            cp_btn.className="material-symbols-outlined";
            cp_btn.id="cp_btn";
            cp_btn.setAttribute("onclick", "copy();");
            cp_btn.innerHTML="content_copy";
            document.getElementById("display_cont").appendChild(cp_btn);
        }
    } else {res = 'Veuillez cocher au moins une des cases de la partie 2.';}
    
    display.innerHTML = res.toString();
}

function copy() {
    const output = document.getElementById("display").innerHTML;
    navigator.clipboard.writeText(output);
    alert("Mot de passe copié dans le presse-papier");
}


/* --------- Testing on 'Enter' key press --------- */

input.onkeydown = function(key){
    if(key.keyCode == 13){pswrd_gen();}
};


/* --------- Password Strength Test --------- */

function strength(pswrd) {
    let score = 0;

    for (let i=0; i<uppercase.length; i++) {
        if (pswrd.includes(uppercase.charAt(i))) {
            score++;
            break;
        }
    }

    for (let j=0; j<lowercase.length; j++) {
        if (pswrd.includes(lowercase.charAt(j))) {
            score++;
            break;
        }
    }

    for (let k=0; k<digits.length; k++) {
        if (pswrd.includes(digits.charAt(k))) {
            score++;
            break;
        }
    }

    for (let l=0; l<special.length; l++) {
        if (pswrd.includes(special.charAt(l))) {
            score++;
            break;
        }
    }

    return score;
}


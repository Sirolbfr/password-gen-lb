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

const var_accent = getComputedStyle(document.body).getPropertyValue('--accent');
const clr_weak = "rgb(255, 69, 58)";
const clr_decent = "rgb(255, 159, 10)";
const clr_strong = "rgb(131, 210, 100)";
const clr_v_strong = "rgb(52, 199, 89)";

const recent_list = document.getElementById("recent_list");


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
        if (input_length < Number(input.min)) {res = 'Nombre de caractères trop bas (12-128)';}
        else if (input_length > Number(input.max)) {res = 'Nombre de caractères trop haut (12-128)';}
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
    store_pswrd();
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

document.getElementById("pass").addEventListener("keypress", function(event){
    if(event.key == "Enter"){strength_verify();}
});


/* --------- Password Strength Test --------- */

function str_score(pswrd) {
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

function strength_verify() {
    const pass = document.getElementById("pass");
    const lvl_bar = document.querySelectorAll(".lvl");
    const lvl_txt = document.getElementById("lvl_txt");

    if (str_score(pass.value) == 1) {
        lvl_bar[0].style.backgroundColor = clr_weak;
        lvl_bar[1].style.backgroundColor = var_accent;
        lvl_bar[2].style.backgroundColor = var_accent;
        lvl_bar[3].style.backgroundColor = var_accent;
        lvl_txt.innerHTML = "Faible";
        lvl_txt.style.color = clr_weak;
    }
    else if (str_score(pass.value) == 2) {
        lvl_bar[0].style.backgroundColor = clr_decent;
        lvl_bar[1].style.backgroundColor = clr_decent;
        lvl_bar[2].style.backgroundColor = var_accent;
        lvl_bar[3].style.backgroundColor = var_accent;
        lvl_txt.innerHTML = "Moyen";
        lvl_txt.style.color = clr_decent;
    }
    else if (str_score(pass.value) == 3) {
        lvl_bar[0].style.backgroundColor = clr_strong;
        lvl_bar[1].style.backgroundColor = clr_strong;
        lvl_bar[2].style.backgroundColor = clr_strong;
        lvl_bar[3].style.backgroundColor = var_accent;
        lvl_txt.innerHTML = "Fort";
        lvl_txt.style.color = clr_strong;
    }
    else if (str_score(pass.value) == 4) {
        lvl_bar[0].style.backgroundColor = clr_v_strong;
        lvl_bar[1].style.backgroundColor = clr_v_strong;
        lvl_bar[2].style.backgroundColor = clr_v_strong;
        lvl_bar[3].style.backgroundColor = clr_v_strong;
        lvl_txt.innerHTML = "Très Fort";
        lvl_txt.style.color = clr_v_strong;
    }
    else {
        pass.value = display.innerHTML;
        strength_verify();
    }
}


/* --------- Storing Recent Passwords --------- */

function store_pswrd() {
    let new_pswrd = display.innerHTML;
    let li_elts = document.querySelectorAll(".li_elt");

    if (localStorage.getItem("4")!=null) {
        localStorage.removeItem("4");
        li_elts[4].remove();
    }
    for (let i=3; i>=0; i--) {
        if (localStorage.getItem(i.toString())!=null) {
            localStorage.setItem((i+1).toString(), localStorage.getItem(i.toString()));
        }
    }
    localStorage.setItem("0", new_pswrd);
    let li = document.createElement("li");
    li.innerHTML = new_pswrd;
    li.className = "li_elt";
    recent_list.prepend(li);
}

function init_display_recent() {
    for (let i=0; i<5; i++) {
        if (localStorage.getItem(i.toString())!=undefined) {
            let li = document.createElement("li");
            li.innerHTML = localStorage.getItem(i.toString());
            li.className = "li_elt";
            recent_list.appendChild(li);
        }
    }
}

window.onload = init_display_recent();
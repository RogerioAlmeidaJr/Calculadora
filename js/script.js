const poText = document.querySelector('.po');
const coText = document.querySelector('.co');
const btns = document.querySelectorAll("#div-btns button");

class Calc{
    constructor(poText, coText){
        this.poText = poText;
        this.coText = coText;
        this.co = "";
    }

    addDigit(digit){
        if(digit === "." && this.coText.innerText.includes(".")){
            return;
        }

        this.co = digit;
        this.up();
    }

    po(oper){

        if(this.coText.innerText === "" && oper !== "C"){
            if(this.poText.innerText !== ""){
                this.chOp(oper);
            }
            return;
        }
        
        let opValor;
        const poValor = +this.poText.innerText.split(" ")[0];
        const coValor = +this.coText.innerText;

        switch(oper){
            case "+":

                opValor = poValor + coValor;
                this.up(opValor, oper, coValor, poValor);

                break;

            case "-":

                opValor = poValor - coValor;
                this.up(opValor, oper, coValor, poValor);

                break;

            case "/":

                opValor = poValor / coValor;
                this.up(opValor, oper, coValor, poValor);

                break;

            case "*":

                opValor = poValor * coValor;
                this.up(opValor, oper, coValor, poValor);

                break;

            case "DEL":

                this.pdo();

                break;

            case "CE":

                this.ce();

                break;

            case "C":

                this.c();

                break;

            case "=":

                this.ep();

                break;

            default:
                return;
        }

    }

    up(opValor = null, oper = null, coValor = null, poValor = null){
        console.log(opValor, oper, coValor, poValor);

        if(opValor === null){
            this.coText.innerText += this.co;
        }else{
            if(poValor === 0){
                opValor = coValor;
            }

            this.poText.innerText = `${opValor} ${oper}`;
            this.coText.innerText = "";
        }
        
    }

    chOp(oper){
        const mOper = ["*", "/", "+", "-"];

        if(!mOper.includes(oper)){
            return;
        }

        this.poText.innerText = this.poText.innerText.slice(0, -1) + oper;
    }

    pdo(){
        this.coText.innerText = this.coText.innerText.slice(0, -1);
    }

    ce(){
        this.coText.innerText = "";
    }

    c(){
        this.coText.innerText = "";
        this.poText.innerText = "";
    }

    ep(){
        const oper = poText.innerText.split(" ")[1];

        this.po(oper);
    }
}

const calc = new Calc(poText, coText);

btns.forEach((btn) => {
    btn.addEventListener("click", (e) => {

        const valor = e.target.innerText;

        if(+valor >= 0 || valor === "."){
            calc.addDigit(valor);
        }else{
            calc.po(valor);
        }
    });
});
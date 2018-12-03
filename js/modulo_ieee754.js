'use strict' 
/*
	1º Se recoge la parte entera del número
	2º Se transforma la parte entera en binario dividiendo el mismo entre 2 y guardando el resto
	3º Si hay parte decimal se calcula el número binario del mismo, se multiplica la parte decimal por 2
	4º Se mueve la coma hasta el primer numero se multiplica por por 2 elevado a la cantidad de posiciones movidas --> 1,111111 * 2^6
*/

function ieee754aBinario(numero) {
	/*Declaración de variables*/
	var posDec, longNum, partEnt, partDec, resulFin, partEntBin, partDecBin, valorExpo, resultFinal, numDec = 0, numBinario;
	var sig, valorSig = 0;
	var numExpo;
	var ePosit = 0;
	
	/*Comprobaciones previas*/
	//Control si se inserta NaN
	if (isNaN(numero) == true){
		alert("No se puede realizar el cálculo. Introduzca un dato válido.");
		resultFinal = "";
		return resultFinal;
	}
	
	if (typeof numero != "string"){
		numero = " " + numero; //Lo convierte a cadena para poder tratarlo
	}
	
	if(numero.indexOf("E") != -1 || numero.indexOf("e") != -1){
		if (numero.indexOf("-") != -1){
			ePosit = 0;
			numero = Number(numero);
			numero = "" + numero;
		}else{
			ePosit = 1;
			/*var posE = numero.indexOf("E");
			var longE = numero.length;
			var expoE = numero.substr(posE + 1,longE);
			var num = numero.substr(0,posE + 1);
			
			numero = "" + num + "+" + expoE;*/
		}
		/*var posE = numero.indexOf("E");
		var longE = numero.length;
		var expoE = numero.substr(posE + 1,longE);
		var num = numero.substr(0,posE);
		
		var exponenteE = Math.round((Math.log(num)+expoE*Math.log(10))/Math.log(2));
		exponenteE = Math.pow(2,exponenteE);
		numero = (num * Math.pow(10,expoE))/exponenteE;
		numero = " " + numero;*/
	}

	//limpiar(); //deja en blanco la caja de resultado (se comenta porque da error cuando se ejecuta test.js)
	
	
	if(numero.indexOf(",") != -1  && numero.indexOf("E") == -1){ //Si insertar "," se sustituye por "."
		numero = numero.replace(",", ".");
	}
		
	sig = Math.sign(numero); //comprueba el signo del valor insertado
	if (sig == -1) {
		valorSig = 1;
	}
	
	
	if (numero == "0" || numero == "-0") {
		resultFinal = "";
		if (numero == "-0") {
			numero = numero.substr(1,1); //recoge la parte entera del número insertado
			valorSig = 1;
		}
		for (var i = 0; i < 31; i++){ //Se rellenan de 0 la parte decimal de la notación ciéntifica del número a la derecha hasta complertar 23 bits
				resultFinal = ("" + resultFinal + 0);
		}
		resultFinal = ("" + valorSig + resultFinal);
	}else{
		longNum = numero.length;
		

		if(numero.indexOf(".") != -1 && ePosit == 0){ //número decimal
			numDec = 1;
			posDec = numero.indexOf(".");
				
			if (sig == -1) {
				partEnt = numero.substr(1,posDec); //recoge la parte entera del número insertado
			}else{
				partEnt = numero.substr(0,posDec);
			}
			partDec = numero.substr(posDec + 1,longNum); //recoge la parte decimal del número insertado
				
			/*Llamadas a métodos que calculan los números en binarios*/
			partEntBin = "" + calcBin(partEnt); //cacula el número binario de la parte entera
			partDecBin = "" + calcBinDec(partDec); //cacula el número binario de la parte decimal
			
			numBinario = partEntBin + "." + partDecBin;

			var posUno = numBinario.indexOf("1");
			posDec = numBinario.indexOf(".");

			if (posUno > posDec){ //comprueba la poscion del decimal
				var posTot = posDec - posUno;
			}

			if (posTot < 0){
				var longPartDecBin = partDecBin.length;
				numBinario = numBinario.substr(posUno,longPartDecBin);
				valorExpo = (posTot) + 127;
			}else{
				var longPartEntBin = partEntBin.length;
				partDecBin = partDecBin.substr(0,23 - (longPartEntBin - 1));
				numBinario = ("" + partEntBin  + partDecBin);
				valorExpo = (longPartEntBin - 1) + 127; 
			}
							
			/*Cálculo número científico*/
			//numBinario = ("" + partEntBin  + partDecBin);
			var longBin = numBinario.length;
			var partEntRes = numBinario.substr(0,1);
			var partDecRes = numBinario.substr(1,longBin);
				
			var numCient = ("" + partEntRes + "." + partDecRes);
				
			/*Cálculo exponente*/
			
			valorExpo = calcBin(valorExpo);
			var valorExpoLong = valorExpo.length;
			if (valorExpoLong < 8){
				for(var i = valorExpoLong; i < 8; i++){
				valorExpo = "0" + valorExpo;
				}
			}
			/*var numCientLong = numCient.length;
			if (numCientLong < 23){
				for(var i = numCientLong; i < 23; i++){
				numCient = numCient + "0";
				}
			}*/
			resultFinal = ("" + valorSig + valorExpo + partDecRes);
			
			var resultFinalLong = resultFinal.length;
			if (resultFinalLong < 32){
				for(var i = resultFinalLong; i < 32; i++){
				resultFinal = resultFinal + "0";
				}
			}
		}else{
				if (sig == -1) {
					numero = numero.substr(1,longNum); //recoge el número sin el signo -
				}
				
				numBinario = calcBin(numero); //Resultado en binario del número introducido
				var longRes = numBinario.length;
				var partEntRes = numBinario.substr(0,1);
				var partDecRes = numBinario.substr(1,longRes);
					
				valorExpo = partDecRes.length;
				valorExpo = parseInt(valorExpo) + 127;
				valorExpo = calcBin(valorExpo);
				var valorExpoLong = valorExpo.length;
			if (valorExpoLong < 8){
				for(var i = valorExpoLong; i < 8; i++){
					valorExpo = "0" + valorExpo;
				}
			}
					
				//Se calcula la mantisa a partir del formato científico
				var longParDecRes = partDecRes.length
				var mantisa = partDecRes;
				if (longParDecRes < 23){
					for (var i = longParDecRes; i < 23; i++){ //Se rellenan de 0 la parte decimal de la notación ciéntifica del número a la derecha hasta complertar 23 bits
					mantisa = ("" + mantisa + 0);
					}
				}else{
					mantisa = mantisa.substr(0,23);
				}
				
					
				resultFinal = ("" + valorSig + valorExpo + mantisa);
			}
	}

   return resultFinal;
}

function calcBin(partEnt){
	var valorDiv;
	var valorResto;
	var numBin = "";
	var ePosit = 0;
	var eCount = 0;

	partEnt = "" + partEnt;

	if (partEnt.indexOf("E") != -1 || partEnt.indexOf("e") != -1){
		ePosit = 1;
	}

	partEnt = Number(partEnt);

	valorDiv = partEnt / 2;
	valorResto = partEnt % 2;
	
	if (valorDiv == 1){
		numBin = ("" + valorDiv + valorResto);
	}else{
		do{
			numBin = ("" + valorResto + numBin);
			if (ePosit == 0){
			valorResto = parseInt(valorDiv % 2);
			valorDiv = parseInt(valorDiv / 2);
			}else{
				valorDiv = valorDiv.toFixed(); 
				valorResto =valorDiv % 2;
				valorDiv = valorDiv / 2;
			}
			if (valorDiv == 1 && ePosit == 0){
				numBin = ("" + valorDiv + valorResto + numBin);
			}
			if (ePosit == 1){
				eCount = eCount + 1;
				if (eCount == 23){
					valorDiv = 1;
					numBin = ("" + valorDiv + valorResto + numBin);
				}
			}
		}while(valorDiv > 1);
	}
	return numBin;	
}

function calcBinDec(partDec){
	var valorMul, longDec, partEntCalc;
	var resultBinDec = "";
	var mulDec;
	var partDecCalc;
	
	/*Recoge la parte decimal del número insertado y le añade un 0. delante y lo multiplica por 2 para ir construyendo el número binario*/
	partDec = parseFloat("0." + partDec);
	valorMul = "" + (partDec * 2);
	
	longDec = valorMul.length; //recoge la longitud del valor de la multiplicación calculado
	partEntCalc  = parseInt(valorMul.substr(0,1)); //Extrae la parte entera de la multiplicación para formar el número en binario

	if (partEntCalc != "0") {
		partDecCalc = valorMul.substr(1,longDec); //Recoge la parte decimal
		valorMul = ("0" + partDecCalc);
	}
	
	do{
		resultBinDec = ("" + resultBinDec + partEntCalc);
		valorMul = ("" + valorMul * 2);
		
		longDec = valorMul.length; //recoge la longitud del valor de la multiplicación calculado
		partEntCalc  = parseInt(valorMul.substr(0,1));
	
		if (partEntCalc != "0") {
			partDecCalc = valorMul.substr(1,longDec); //Recoge la parte decimal
			valorMul = "0" + partDecCalc;
		}
	
	}while(resultBinDec.length < 22);
	
	return resultBinDec;	
}

function checkExponencial(number){
		//comprobamos si es un número exponencial
	if(number.indexOf("E") != 1){
		var posE = number.indexOf("E");
		var longE = number.length;
		var expoE = number.substr(posE + 1,longE);
		var num = number.substr(0,posE);
		
		var exponenteE = Math.round((Math.log(num)+expoE*Math.log(10))/Math.log(2));
		exponenteE = Math.pow(2,exponenteE);
		number = (num * Math.pow(10,expoE))/exponenteE;
		
		return number;
	}
}
module.exports = {  
  ieee754aBinario,
  calcBin
};

/*function limpiar(){
	document.getElementById("ieee754").value = "";
}*/
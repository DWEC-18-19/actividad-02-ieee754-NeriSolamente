'use strict' 
/*
	1º Se recoge la parte entera del número
	2º Se transforma la parte entera en binario dividiendo el mismo entre 2 y guardando el resto
	3º Si hay parte decimal se calcula el número binario del mismo
	4º Se mueve la come hasta el primer numero se multiplica por por 2 elevado a la cantidad de posiciones movidas --> 1,111111 * 2^6

*/
function ieee754aBinario(numero) {
	/*Declaración de variables*/
	var posDec, longNum, partEnt, partDec, resulFin, partEntBin, partDecBin, valorExpo, resultFinal, numDec = 0, numBinario;
	var sig, valorSig = 0;
	
	//Control si se inserta NaN
	if (isNaN(numero) == true){
			alert("No se puede realizar el cálculo.");
			resultFinal = "";
			return resultFinal;
	}
	
	limpiar();
	
	if (typeof numero != "string"){ //si es un número o float
		numero = " " + numero; //Lo convierte a cadena para poder tratarlo
	}
//	}else{ //si es una cadena
		if(numero.indexOf(",") != -1){ //Si insertar "," se sustituye por "."
			numero = numero.replace(",", ".");
		}
		
		sig = Math.sign(numero);
		
		if (sig == -1) {
				valorSig = 1;
		}
		
		longNum = numero.length;
		
		if(numero.indexOf(".") != -1){
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
			
			var longPartEntBin = partEntBin.length;
			partDecBin = partDecBin.substr(0,23 - (longPartEntBin - 1));
			
			/*Cálculo número científico*/
			numBinario = ("" + partEntBin  + partDecBin);
			var longBin = numBinario.length;
			var partEntRes = numBinario.substr(0,1);
			var partDecRes = numBinario.substr(1,longBin);
			
			var numCient = ("" + partEntRes + "." + partDecRes);
			
			/*Cálculo exponente*/
			valorExpo = (longPartEntBin - 1) + 127; 
			valorExpo = calcBin(valorExpo);
			
			resultFinal = ("" + valorSig + valorExpo + partDecRes);//partEntBin + partDecBin);
		}else{
				if (sig == -1) {
					numero = numero.substr(1,longNum); //recoge la parte entera del número insertado
				}
				
				numBinario = calcBin(numero); //Resultado en binario del número introducido
				var longRes = numBinario.length;
				var partEntRes = numBinario.substr(0,1);
				var partDecRes = numBinario.substr(1,longRes);
				
				valorExpo = partDecRes.length;
				valorExpo = parseInt(valorExpo) + 127;
				valorExpo = calcBin(valorExpo);
				
				//Se calcula la matista a partir del formato científico
				var longParDecRes = partDecRes.length
				var matista = partDecRes;
				for (var i = longParDecRes;i<=22;i++){ //Se rellenan de 0 la parte decimal de la notación ciéntifica del número a la derecha hasta complertar 23 bits
					 matista = ("" + matista + 0);
				}
				
				resultFinal = ("" + valorSig + valorExpo+ matista);
			}
//		}

   return resultFinal;
}

function calcBin(partEnt){
	var valorDiv;
	var valorResto;
	var numBin = "";

	partEnt = parseInt(partEnt);
			
	valorDiv = parseInt(partEnt / 2);
	valorResto = parseInt(partEnt % 2);
	
	do{
		numBin = ("" + valorResto + numBin);
		valorResto = parseInt(valorDiv % 2);
		valorDiv = parseInt(valorDiv / 2);
		if (valorDiv == 1){
			numBin = ("" + valorDiv + valorResto + numBin);
			//resulFin = reverseString(resulFin);
		}
	}while(valorDiv > 1);
	
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
	partEntCalc  = valorMul.substr(0,1); //Extrae la parte entera de la multiplicación para formar el número en binario

	if (partEntCalc == "1") {
		partDecCalc = valorMul.substr(1,longDec); //Recoge la parte decimal
		valorMul = parseFloat(("0." + partDecCalc));
	}
	
	do{
		resultBinDec = ("" + resultBinDec + partEntCalc);
		valorMul = ("" + parseFloat(valorMul) * 2);
		
		longDec = valorMul.length; //recoge la longitud del valor de la multiplicación calculado
		partEntCalc  = valorMul.substr(0,1);
	
		if (partEntCalc == "1") {
			partDecCalc = valorMul.substr(1,longDec); //Recoge la parte decimal
			valorMul = "0" + partDecCalc;
		}
	
	}while(resultBinDec.length < 22);
	
	return resultBinDec;	
}


function limpiar(){
	document.getElementById("ieee754").value = "";
}
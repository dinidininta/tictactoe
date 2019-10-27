class Board{
	constructor(input){
		this.input = input;
		this.winner = "x";
		this.result = "Game is still in progress";
		this.occurences = 0;
	}

	print(){
		let i = 0;

		while(i<this.input.length){
			let j = 0;
			while(j<3){
				process.stdout.write(this.input[i]);
				j++;
				i++;
			}
			console.log();
		}
	}

	validate(i, j, k){
		if(this.input[i] == this.input[j] && this.input[j] == this.input[k]){
			this.winner = this.input[i];
			this.occurences++;
		}
	}

	validateHorizontalRows(){
		let j = 1, k = 2;
		for(var i=0; i<7; i=i+3){
			this.validate(i, j, k);
			j = j + 3;
			k = k + 3;
		}
	}

	validateVerticalRows(){
		let j = 3, k = 6;
		for(var i=0; i<3; i++){
			this.validate(i, j, k);
			j++;
			k++;
		}
	}

	validateDiagonalRows(){
		let k = 8;
		for(var i=0; i<3; i=i+2){
			this.validate(i, 4, k);
			k = k-2;
		}
	}

	execute(){
		if(this.input.indexOf("-") < 0){

			this.validateHorizontalRows();
			this.validateVerticalRows();
			this.validateDiagonalRows();

			if(this.occurences>1){
				this.result = "Invalid board!";
			}else if(this.occurences == 0){
				this.result = "It's a draw";
			}else{
				this.result = this.winner + " wins!";
			}
		}

	}

	getResult(){
		return this.result;
	}
}


const readline = require('readline');
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

rl.question("Input Tictactoe board: ", (input) => {
	// const board = new Board("xoxxooxxo");
	const re = /[^xoXO-]/;
	if(input.length !== 9){
		console.log("Tictactoe board must consists of 9 boxes");
	}else if(re.test(input)){
		console.log("Tictactoe board only accepts X, O, and - as the input");
	}else{		
		const board = new Board(input);
		board.print();
		board.execute();
		console.log(board.getResult());
	}
	rl.close();
});
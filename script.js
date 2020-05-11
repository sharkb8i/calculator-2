class Calculator {
	constructor(previousTextElement, currentTextElement) {
		this.previousTextElement = previousTextElement
		this.currentTextElement = currentTextElement
		this.clear()
	}

	clear() {
		this.currentOperand = ''
		this.previousOperand = ''
		this.operation = undefined
	}

	delete() {
		this.currentOperand = this.currentOperand.toString().slice(0, -1) /* TAKING OFF THE LAST NUMBER */
	}

	appendNumber(number) {
		if(number === '.' && this.currentOperand.includes('.')) return
		this.currentOperand = this.currentOperand.toString() + number.toString()
	}

	chooseOperation(operation) {
		if(this.currentOperand === '') return
		if(this.previousOperand !== '') {
			this.compute()
		}
		this.operation = operation
		this.previousOperand = this.currentOperand
		this.currentOperand = ''
	}

	compute() {
		let computation
		const prev = parseFloat(this.previousOperand)
		const curr = parseFloat(this.currentOperand)
		
		if(isNaN(prev) || isNaN(curr)) return
		
		switch(this.operation) {
			case '+':
				computation = prev + curr
				break
			case '-':
				computation = prev - curr
				break
			case '×':
				computation = prev * curr
				break
			case '÷':
				computation = prev / curr
				break
			default:
				return
		}

		this.currentOperand = computation
		this.operation = undefined
		this.previousOperand = ''
	}

	getDisplayNumber(number) {
		const stringNumber = number.toString()
		const integerDigits = parseFloat(stringNumber.split('.')[0])
		const decimalDigits = stringNumber.split('.')[1]
		
		let integerDisplay

		if(isNaN(integerDigits))
			integerDisplay = ''
		else
			integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })

		if(decimalDigits != null)
			return `${integerDisplay}.${decimalDigits}`
		else
			return integerDisplay
	}

	updateDisplay() {
		this.currentTextElement.innerText = this.getDisplayNumber(this.currentOperand)
		if(this.operation != null)
			this.previousTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this. operation}`
		else
			this.previousTextElement.innerText = ''
	}
}


const numberButtons = document.querySelectorAll('[data-number]') /* TO SELECT DATA ATTRIBUTES USE: BRACKETS */
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const clearButton = document.querySelector('[data-clear]')
const previousTextElement = document.querySelector('[data-previous]')
const currentTextElement = document.querySelector('[data-current]')

const calculator = new Calculator(previousTextElement, currentTextElement)

numberButtons.forEach(button => {
	button.addEventListener('click', () => {
		calculator.appendNumber(button.innerText)
		calculator.updateDisplay()
	})
})

operationButtons.forEach(button => {
	button.addEventListener('click', () => {
		calculator.chooseOperation(button.innerText)
		calculator.updateDisplay()
	})
})

equalsButton.addEventListener('click', () => {
	calculator.compute()
	calculator.updateDisplay()
})

clearButton.addEventListener('click', () => {
	calculator.clear()
	calculator.updateDisplay()
})

deleteButton.addEventListener('click', () => {
	calculator.delete()
	calculator.updateDisplay()
})
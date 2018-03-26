let winner = false
let opponentChoice = ""
let choice = ""
radio.onDataPacketReceived(({ receivedString }) => {
   if (receivedString == "countDown") {
       if (choice == "") {
           basic.showLeds(`
               . # # # .
               . . . # .
               . . # . .
               . . . . .
               . . # . .
               `)
       }
   } else if (receivedString == "youWin") {
       winner = true
       EndGame()
   } else if (receivedString == "youLose") {
       winner = false
       EndGame()
   } else {
       opponentChoice = receivedString
       Fight()
       EndGame()
   }
})
input.onButtonPressed(Button.A, () => {
   choice = "rock"
   basic.showLeds(`
       . . # . .
       . # # # .
       # # # # #
       . # # # .
       . . # . .
       `)
   control.waitMicros(50)
})
input.onButtonPressed(Button.B, () => {
   choice = "paper"
   basic.showLeds(`
       # # # # #
       # # # # #
       # # # # #
       # # # # #
       # # # # #
       `)
   control.waitMicros(50)
})
input.onButtonPressed(Button.AB, () => {
   choice = "scissor"
   basic.showLeds(`
       # # . . .
       # # . # #
       . . # . .
       # # . # #
       # # . . .
       `)
   control.waitMicros(50)
})
input.onGesture(Gesture.Shake, () => {
   if (choice != "") {
       radio.sendString("countDown")
       showCountdown()
   }
})
function Fight() {
   if (choice == "scissor" && opponentChoice == "rock") {
       winner = false
   } else if (choice == "scissor" && opponentChoice == "paper") {
       winner = true
   } else if (choice == "scissor" && opponentChoice == "scissors") {
       winner = false
   } else if (choice == "rock" && opponentChoice == "rock") {
       winner = false
   } else if (choice == "rock" && opponentChoice == "scissors") {
       winner = true
   } else if (choice == "rock" && opponentChoice == "paper") {
       winner = false
   } else if (choice == "paper" && opponentChoice == "scissor") {
       winner = false
   } else if (choice == "paper" && opponentChoice == "paper") {
       winner = false
   } else if (choice == "paper" && opponentChoice == "rock") {
       winner = true
   }
   if (winner == true) {
       radio.sendString("youLose")
   } else {
       radio.sendString("youWin")
   }
}
function EndGame() {
   if (winner == true) {
       basic.showIcon(IconNames.Happy)
   } else {
       basic.showLeds(`
           # . . . .
           # . . . .
           # . . . .
           # . . . .
           # # # # .
           `)
   }
   Reset()
}
function showCountdown() {
   basic.showNumber(3)
   basic.pause(1000)
   basic.showNumber(2)
   basic.pause(1000)
   basic.showNumber(1)
   basic.pause(1000)
   radio.sendString(choice)
}
function Reset() {
   choice = ""
   opponentChoice = ""
   winner = false
}
Reset()
radio.setGroup(1)



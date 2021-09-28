/**
 * 2C = Two of Clubs
 * 2D = Two of Diamonds
 * 2H = Two of Hearts
 * 2S = Two of Spades
 */

let deck         = [];
const typeCards      = ['C','D','H','S'];
const specialsTypeCards = ['A','J','Q','K'];

let playerPoints = 0,
    computerPoints = 0;

//  HTML references
const btnGetCard   = document.querySelector('#btnGetCard');
const btnStop = document.querySelector('#btnStop');
const btnNewGame   = document.querySelector('#btnNewGame');

const divPlayerCards     = document.querySelector('#player-cards');
const divComputerCards = document.querySelector('#computer-cards');

const htmlPoints = document.querySelectorAll('small');

// This function create a new deck
const createDeck = () => {

    for( let i = 2; i <= 10; i++ ) {
        for( let tipo of typeCards ) {
            deck.push( i + tipo);
        }
    }

    for( let tipo of typeCards ) {
        for( let esp of specialsTypeCards ) {
            deck.push( esp + tipo);
        }
    }
    deck = _.shuffle( deck );
    console.log( deck );
    return deck;
}

createDeck();


// This function give a card to the players
const askCard = () => {

    if ( deck.length === 0 ) {
        throw 'No hay cartas en el deck';
    }
    const carta = deck.pop();
    return carta;
}

// This function determine the value of the cards for the game and the respective current rules
const cardValue = ( carta ) => {

    const valor = carta.substring(0, carta.length - 1);
    return ( isNaN( valor ) ) ? 
            ( valor === 'A' ) ? 11 : 10
            : valor * 1;
}

// Computer turn
const computerTurn = ( minimumPoints ) => {

    do {
        const carta = askCard();

        computerPoints = computerPoints + cardValue( carta );
        htmlPoints[1].innerText = computerPoints;
        
        // <img class="carta" src="assets/cards/2C.png">
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cards/${ carta }.png`; //3H, JD
        imgCarta.classList.add('carta');
        divComputerCards.append( imgCarta );

        if( minimumPoints > 21 ) {
            break;
        }

    } while(  (computerPoints < minimumPoints)  && (minimumPoints <= 21 ) );

    setTimeout(() => {
        if( computerPoints === minimumPoints ) {
            alert('No one wins, its draw :D');
        } else if ( minimumPoints > 21 ) {
            alert('Computer wins!')
        } else if( computerPoints > 21 ) {
            alert('Player wins!');
        } else {
            alert('Computer wins!')
        }
    }, 100 );
}



// Events
btnGetCard.addEventListener('click', () => {

    const carta = askCard();
    
    playerPoints = playerPoints + cardValue( carta );
    htmlPoints[0].innerText = playerPoints;
    
    // <img class="carta" src="assets/cards/2C.png">
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cards/${ carta }.png`; //3H, JD
    imgCarta.classList.add('carta');
    divPlayerCards.append( imgCarta );

    if ( playerPoints > 21 ) {
        console.warn('Im sorry, you Lost! :(');
        btnGetCard.disabled   = true;
        btnStop.disabled = true;
        computerTurn( playerPoints );

    } else if ( playerPoints === 21 ) {
        console.warn('21, Great!');
        btnGetCard.disabled   = true;
        btnStop.disabled = true;
        computerTurn( playerPoints );
    }

});


btnStop.addEventListener('click', () => {
    btnGetCard.disabled   = true;
    btnStop.disabled = true;

    computerTurn( playerPoints );
});

btnNewGame.addEventListener('click', () => {

    console.clear();
    deck = [];
    deck = createDeck();

    playerPoints     = 0;
    computerPoints = 0;
    
    htmlPoints[0].innerText = 0;
    htmlPoints[1].innerText = 0;

    divComputerCards.innerHTML = '';
    divPlayerCards.innerHTML = '';

    btnGetCard.disabled   = false;
    btnStop.disabled = false;

});

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
        for( let type of typeCards ) {
            deck.push( i + type);
        }
    }

    for( let type of typeCards ) {
        for( let esp of specialsTypeCards ) {
            deck.push( esp + type);
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
        throw 'There is not cards on the deck';
    }
    const card = deck.pop();
    return card;
}

// This function determine the value of the cards for the game and the respective current rules
const cardValue = ( card ) => {

    const value = card.substring(0, card.length - 1);
    return ( isNaN( value ) ) ? 
            ( value === 'A' ) ? 11 : 10
            : value * 1;
}

// Computer turn
const computerTurn = ( minimumPoints ) => {

    do {
        const card = askCard();

        computerPoints = computerPoints + cardValue( card );
        htmlPoints[1].innerText = computerPoints;
        
        // <img class="Card" src="assets/cards/2C.png">
        const imgCard = document.createElement('img');
        imgCard.src = `assets/cards/${ card }.png`; //3H, JD
        imgCard.classList.add('carta');
        divComputerCards.append( imgCard );

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

    const card = askCard();
    
    playerPoints = playerPoints + cardValue( card );
    htmlPoints[0].innerText = playerPoints;
    
    // <img class="Card" src="assets/cards/2C.png">
    const imgCard = document.createElement('img');
    imgCard.src = `assets/cards/${ card }.png`; //3H, JD
    imgCard.classList.add('carta');
    divPlayerCards.append( imgCard );

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

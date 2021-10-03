/**
 * The sintax to declare a module chunk is
 *   const module =  (() => {
 *      .. all the code
 * 
 *   return something
 * 
 *  })();
 * 
 */
const blackjackModule = (() => {
 
    'use strict' //forces the code interpreter to always evaluate and validate before returning content in the view

    let deck                = [];
    const typeCards         = ['C','D','H','S'],
          specialsTypeCards = ['A','J','Q','K'];

    let playersPoints = [];

    //  HTML references
    const btnGetCard   = document.querySelector('#btnGetCard'),
          btnStop = document.querySelector('#btnStop'),
          btnNewGame   = document.querySelector('#btnNewGame'),
          btnRules   = document.querySelector('#btnRules'),
          divCardsPlayers   = document.querySelectorAll('.divCards'),
          htmlPoints = document.querySelectorAll('small');

    //This funtion start the game
    const startGame = ( numberPlayers = 2 ) => {

       deck =  createDeck();

       playersPoints = [];

       for(let i = 0;i < numberPlayers; i++ ){
           playersPoints.push(0);
       }

       htmlPoints.forEach(elem => elem.innerText = 0);
       divCardsPlayers.forEach(elem => elem.innerHTML = '');

       btnGetCard.disabled   = false;
       btnStop.disabled = false;
    }

    // This function create a new deck
    const createDeck = () => {

        deck = [];

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

        return _.shuffle( deck );
    }

    const askCard = () => {

        if ( deck.length === 0 ) {
            throw 'There is not cards on the deck, you should start new game to get a deck of cards';
        }

        return deck.pop();
    }

    // This function determine the value of the cards for the game and the respective current rules
    const cardValue = ( card ) => {
        const value = card.substring(0, card.length - 1);
        return ( isNaN( value ) ) ? 
                ( value === 'A' ) ? 11 : 10
                : value * 1;
    }

    const acumulatePoints = ( card, turn ) => {

        playersPoints[turn] = playersPoints[turn] + cardValue( card );
        htmlPoints[turn].innerText = playersPoints[turn];
        return playersPoints[turn];

    }

    const createCard = (card , turn) => {

        const imgCard = document.createElement('img');
        imgCard.src = `assets/cards/${ card }.png`; //3H, JD
        imgCard.classList.add('show-card');
        divCardsPlayers[turn].append(imgCard);
    }

    const findWinner = () => {

        const [minimumPoints, computerPoints] = playersPoints;

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

    // Computer turn
    const computerTurn = ( minimumPoints ) => {

        let computerPoints = 0;

        do {
            const card = askCard();
            computerPoints = acumulatePoints(card, playersPoints.length - 1);
            createCard(card, playersPoints.length - 1);

        } while(  (computerPoints < minimumPoints)  && (minimumPoints <= 21 ) );

        findWinner();
    }



    // Events
    btnGetCard.addEventListener('click', () => {

        const card = askCard();
        const playerPoints = acumulatePoints(card, 0);
        
        createCard(card, 0);

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
        computerTurn( playersPoints[0] );
        
    });

    btnRules.addEventListener('click', () => {
        alert('- 2 Players exists\n- The first player to get close than 21 points or exactly wins' +
           ' \n- If a player gets more than 21 points automatically lose' +
            '\n- If you press stop button you will not receive more Cards and the next card of the computer player will define the winner of the game');
    });

    btnNewGame.addEventListener('click', () => {
        startGame();
    });


    return {
        newGame : startGame
    }

})();

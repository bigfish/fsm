//idea for js fsm
function FSM() {

    var cur_state = function(){};

    //utility methods
    function changeState(newState) {
        cur_state('EXIT');
        cur_state = newState;
        cur_state('ENTER');
    }

    function sendSignal(signal) {
        cur_state(signal);
    }

    //domain methods -- these would be implemented by subclasses
    function turnLightOn(){
        console.log("turning light on.")   ;
    }
    function turnLightOff(){
        console.log("turning light off.")   ;
    }

    //states -- these would be implemented by subclasses
    function preinit_state(signal) {
        switch (signal) {
        case 'ENTER':
            console.log('preinit_state recieved ENTER signal');
            return;
        case 'INIT':
            console.log('preinit_state recieved INIT signal');
            changeState(initial_state);
            return;
        case 'EXIT':
            console.log('preinit_state recieved EXIT signal');
            break;
        default:
            console.log('preinit_state received unknown signal: ' + signal);
            break;
        }
    }

    function on_state(signal) {

        switch (signal) {
        case 'ENTER':
            console.log('on_state recieved ENTER signal:');
            turnLightOn();
            return;
        case 'TURN_OFF':
            console.log('on_state recieved TURN_OFF signal:');
            changeState(off_state);
            return;
        case 'EXIT':
            console.log('on_state recieved EXIT signal:');
            break;
        default:
            console.log('on_state received unknown signal: ' + signal);
            break;

        }
    }

    function off_state(signal) {
        switch (signal) {
        case 'ENTER':
            console.log('off_state recieved ENTER signal:');
            turnLightOff();
            return;
        case 'TURN_ON':
            console.log('off_state recieved TURN_ON signal:');
            changeState(on_state);
            return;
        case 'EXIT':
            console.log('off_state recieved EXIT signal:');
            break;
        default:
            console.log('off_state received unknown signal: ' + signal);
            break;
        }
    }

    function initial_state(signal) {
        //go to first state
        switch (signal) {
        case 'ENTER':
            console.log('initial_state recieved INIT signal:');
            changeState(on_state);
            return;
        default:
            console.log('initial_state received unknown signal: ' + signal);
            break;
        }
    }

    cur_state = preinit_state;

    //public API
    this.sendSignal = sendSignal;
}

var fsm = new FSM();

//fsm only accepts signals and fires events
fsm.sendSignal('INIT');
fsm.sendSignal('TURN_OFF');
fsm.sendSignal('TURN_ON');


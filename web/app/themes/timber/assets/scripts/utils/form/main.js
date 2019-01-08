import validatonInit from './validaton';
import toggleInit from './toggle';
import labelFoatingInit from './label-floating';

export default function(lang) {

    labelFoatingInit();
    toggleInit();
    validatonInit(lang);
    
}

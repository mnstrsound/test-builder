import CreateStore from './create-store';
import CategoriesStore from './categories-store';
import LimitsStore from './limits-store';
import CardsStore from './cards-store';
import TransactionsStore from './transactions-store';

export default (state) => {
    return {
        createStore: new CreateStore(),
        categoriesStore: new CategoriesStore(),
        limitsStore: new LimitsStore(),
        cardsStore: new CardsStore(state.cards),
        transactionsStore: new TransactionsStore(state.transactions)
    };
};

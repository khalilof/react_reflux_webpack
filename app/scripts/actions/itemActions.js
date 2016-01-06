import Reflux from 'reflux';

var ItemActions = Reflux.createActions([
    'loadItems',
    'loadItemsSuccess',
    'loadItemsError',
    'showRepoCommits',
    'hideCommits',
    'searchMsgs'
]);

ItemActions.loadItems.preEmit = function (data) {
    
    //fetch repos 
    let url = 'https://api.github.com/users/facebook/repos';
    fetch(url)
        .then(function(response) {
            return response.json()
        }).then(function(json) {
            ItemActions.loadItemsSuccess(json)
        }).catch(function(ex) {
            ItemActions.loadItemsError(ex)
        })
};

export default ItemActions;
import Reflux from 'reflux';
import ItemActions from '../actions/itemActions';

var ItemStore = Reflux.createStore({

    init() {
        this.repos = [];
        this.commitsData = [];

        this.listenTo(ItemActions.loadItems, this.loadItems);
        this.listenTo(ItemActions.loadItemsSuccess, this.loadItemsSuccess);
        this.listenTo(ItemActions.loadItemsError, this.loadItemsError);
        this.listenTo(ItemActions.showRepoCommits, this.showRepoCommits);
        this.listenTo(ItemActions.hideCommits, this.hideCommits);
        this.listenTo(ItemActions.searchMsgs, this.searchMsgs);
    },

    loadItems() {
        this.trigger({
            loading: true
        });
    },

    loadItemsSuccess(repos) {
        this.repos = repos;
        this.trigger({
            repos: this.repos,
            loading: false
        });
    },

    loadItemsError(error) {
        let msg = error && error.message ? error.message : 'An error occurred.';
        this.trigger({
            error: msg,
            loading: false
        });
    },

    showRepoCommits(repo) {
        
            let repoId = repo; 
            let url  =  "https://api.github.com/repos/facebook/"+ repoId + "/commits";
            let thisInstance = this;
            fetch(url)
                .then(function(response) {
                    return response.json()
                }).then(function(json) {
                    thisInstance.commitsData = json;
                    thisInstance.trigger({
                    commitsData: thisInstance.commitsData
                    });
                }).catch(function(ex) {
                    console.log("faild to load commits" + ex)
                })
        
    },

    hideCommits(){
        this.commitsData = null;
         this.trigger({
            commitsData: this.commitsData
         });
    },

    searchMsgs(regex){
        var filtered = this.commitsData.filter(function (datum) {
          return datum.commit.message.search(regex) > -1;
        });
         this.trigger({
            commitsData: filtered
         });

    }

});

export default ItemStore;
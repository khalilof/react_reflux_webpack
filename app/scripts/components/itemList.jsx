import React from 'react';
import ItemActions from '../actions/itemActions';
var mui = require('material-ui'),
    Snackbar = mui.Snackbar,
    List = mui.List,
    Divider = mui.Divider,
    ListItem = mui.ListItem,
    RaisedButton = mui.RaisedButton,
    Toolbar = mui.Toolbar,
    ToolbarGroup = mui.ToolbarGroup,
    ToolbarSeparator = mui.ToolbarSeparator,
    ToolbarTitle = mui.ToolbarTitle,
    TextField = mui.TextField
    ;


class ItemList extends React.Component {

    constructor() {
        
    }

    render() {
        var thisInstance = this;
        this.props.showList = true;
        var error = '';
        if(this.props.error)
            error = (<h4>{this.props.error}</h4>);

        var commits = '';
        if(this.props.commitsData){
            this.props.showList = false;
            commits = this.props.commitsData.map((item) => {
                return (
                    <ListItem key={ item.id } primaryText={"Commit by : " + item.commit.committer.name} 
                            secondaryText={
                                    <p>
                                    <span>commit msg : {item.commit.message} </span>
                                    <br/>
                                    <span>  Commit Date : {item.commit.committer.date}</span>
                                    </p>
                                }
                            secondaryTextLines={2}/>
                    )
                })
            }
        
        var boundBack = function(){
            ItemActions.hideCommits();
        }

        var onSearchChangeBtn = function(event){
            event.preventDefault();
            var regex = new RegExp(event.target.value, "i");
            ItemActions.searchMsgs(regex);  
        };

        let toolBar  = (
            <Toolbar>
                <ToolbarGroup firstChild={true} float="left">
                    <TextField hintText="search commit msgs"
                          onChange={onSearchChangeBtn} />
                    <RaisedButton label="Back To Repo List" primary={true} onClick={boundBack} />
                </ToolbarGroup>
            </Toolbar>
            );

        //  list repos
        let repos = this.props.repos.map((item) => {
                var boundClick = function () {
                    if (item) ItemActions.showRepoCommits(item.name);
                };
                return (
                    <ListItem key={ item.id } primaryText={item.full_name} onClick={boundClick} />
                );
            });

        let loading = this.props.loading ? <div className="loading-label">Loading...</div> : '';

        if(this.props.showList){
            return (
                <div>
                    { error }
                    { loading }
                    <List > { repos }  </List>
                </div>
              );
        }else{
            return (
                <div>
                    { toolBar }
                    { error }
                    <List > { commits } </List>
                    { loading }
                </div>
              );
        }

    }

}

ItemList.contextTypes = {
    muiTheme: React.PropTypes.object
};

var styles = {
    demoCardSquare: {
        width: 320,
        height: 320,
        margin: 25
    }
};

ItemList.propTypes = {
    loading: React.PropTypes.bool,
    repos: React.PropTypes.array,
    error: React.PropTypes.string,
    commitsData: React.PropTypes.array
};

export default ItemList;


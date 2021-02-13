import React from 'react'
import {View} from 'react-native'
import { Header, Icon, Badge } from 'react-native-elements'
import firebase from 'firebase'
import db from '../config'

export default class MyHeader extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            value: '',
            userId: firebase.auth().currentUser.email
        }
    }

    getNumberOfUnreadNotification(){
        db.collection('all_notifications').where('notification_status', '==', 'unread').where('targeted_user_id', '==', this.state.userId   ).onSnapshot(
            (snapshot) => {
                var unreadNotifications = snapshot.docs.map((doc) => doc.data())
                this.setState({
                    value: unreadNotifications.length
                })
            }
        )
    }

    componentDidMount(){
        this.getNumberOfUnreadNotification()
    } 
    
    iconWithBadge = () => {
        return(
            <View> 
               <Icon
                                    name = 'bell'
                                    type = 'font-awesome'
                                    colour = "#696969"
                                    size = {25}
                                    onPress = {() => {this.props.navigation.navigate('Notifications')}}
                                />
                <Badge
                                    value = {this.state.value}
                                    containerStyle = {{position: 'absolute', top: -4, right: -4}}
                /> 
            </View>
        )
    }

    render(){
        return(
            <Header
                leftComponent = {<Icon
                                    name = 'bars'
                                    type = 'font-awesome'
                                    colour = '#696969'
                                    onPress = {() => {this.props.navigation.toggleDrawer()}}
                                />}
                centerComponent = {{text: this.props.title, style: {color: 'green', fontSize: 20, fontWeight: 'bold'}}}
                rightComponent ={<this.iconWithBadge{...this.props}/>}
                backgroundColor = '#eaf8fe'
            />
        )
    }
}
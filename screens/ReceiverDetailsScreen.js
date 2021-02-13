import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native'
import { Card } from 'react-native-elements'
import firebase from 'firebase'
import db from '../config'
import MyHeader from '../components/myHeader';

export default class ReceiverDetailsScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userId: firebase.auth().currentUser.email,
            receiverId: this.props.navigation.getParam('details')['user_id'],
            requestId: this.props.navigation.getParam('details')['request_id'],
            bookName: this.props.navigation.getParam('details')['book_name'],
            reasonForRequesting: this.props.navigation.getParam('details')['reason_to_request'],
            receiverName: '',
            receiverContact: '',
            receiverAddress: '',
            receiverRequestDocId:'',
        }
    }

    getReceiverDetails(){
        db.collection('users').where('emailId', '==', this.state.receiverId).get().then(
            snapshot => {
                snapshot.forEach(doc => {
                    this.setState({
                        receiverName: doc.data().first_name,
                        receiverContact: doc.data().contact,
                        receiverAddress: doc.data().address,
                    })
                })
            }
        )
        db.collection('requested_books').where('request_id','==',this.state.requestId).get()
        .then(snapshot=>{
            snapshot.forEach(doc => {
            this.setState({recieverRequestDocId:doc.id})
        })
        })
        console.log(this.state.receiverName)
        console.log(this.state.receiverContact)
        console.log(this.state.receiverAddress)
    }

    updateBookStatus=()=>{
        db.collection('all_donations').add({
            book_name           : this.state.bookName,
            request_id          : this.state.requestId,
            requested_by        : this.state.receiverName,
            donor_id            : this.state.userId,
            request_status      :  "Donor Interested"
        })
    }

    getUserDetails = () => {

    }

    componentDidMount(){
        this.getReceiverDetails()
        console.log("hello3")
        this.getUserDetails(this.state.userId)
      }

      addNotification = () => {
          var message = this.state.userId + "has shown interest interest in donating your book!"
          db.collection("all_notifications").add({
              targeted_user_id: this.state.receiverId,
              donor_id: this.state.userId,
              request_id: this.state.requestId,
              book_name: this.state.bookName,
              date: firebase.firestore.FieldValue.serverTimestamp(),
              notification_status: "unread",
              message: message
          })
      }

    render(){
        return(
            <View>
                <MyHeader
                    title = "About the Requester"
                    navigation = {this.props.navigation}
                />
                <View>
                    <Card>
                        <Text style = {{fontWeight: 'bold'}}>
                            Name: {this.state.receiverName}
                        </Text>
                    </Card>

                    <Card>
                        <Text style = {{fontWeight: 'bold'}}>
                            Contact: {this.state.receiverContact}
                        </Text>
                    </Card>

                    <Card>
                        <Text style = {{fontWeight: 'bold'}}>
                            Address: {this.state.receiverAddress}
                        </Text>
                    </Card>
                </View>

                <View>
                    {this.state.receiverId !== this.state.userId
                    ? (<TouchableOpacity
                          onPress = {() => {
                              this.updateBookStatus();
                              this.addNotification();
                              this.props.navigation.navigate('MyDonations')
                          }}
                       >
                        <Text>
                            I want to donate.
                        </Text>
                      </TouchableOpacity>
                      ) : null
                    }
                </View>
            </View>
        )
    }
}
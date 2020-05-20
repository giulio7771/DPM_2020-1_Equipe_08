import React from 'react'
import{
        View,
        Text,
        FlatList,
        TouchableOpacity,
        Image,

        StyleSheet
}from 'react-native';


function Device(props){
return(
    <TouchableOpacity style={styles.wrapper} onPress={props.onPress}> 

        <View  style={styles.wrapperLeft}>
    <Image style={styles.iconLeft} source={props.iconLeft}/>
        </View>
        <View style={styles.wrapperName}>
            <Text style={styles.name}>{props.name}</Text>
        </View>
        <Image style={styles.iconRight} source={props.iconRight}/>
        </TouchableOpacity>
    )
}

const styles=StyleSheet.create({
    wrapper:{
        flexDirection:'row',
        paddingLeft:20,
        paddingRight:20,
        alignItems:'center',
        padding:10,
        justifyContent:'space-between'
    },
    wrapperLeft:{
        width:40,
        height:40,
        flexDirection:'column',
        justifyContent:'center'

    },
    iconLeft:{
        width:40,
        height:40

    },
    wrapperName:{
flex:1,
justifyContent:'flex-start',
marginLeft:15
  
},
    name:{

    },
    iconRight:{
        width:20,
        height:20
    }
})

export default Device;
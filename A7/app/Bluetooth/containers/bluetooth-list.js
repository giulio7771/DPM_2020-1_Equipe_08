import React, {Component, useState, useEffect} from 'react'
import{
        View,
        Text,
        FlatList,
        StyleSheet,
        InteractionManager
}from 'react-native';
import Layout from '../components/bluetooth-list-layout';
import Empty from '../components/empty';
import Toggle from '../components/toggle.js';
import Device from '../components/device';
import Subtitle from '../components/subtitle';

function BluetoothLayout(props){
    const[lista,setLista]=useState([]);
    const [bolEnable,setbolEnable]=useState(false);
  
    useEffect(()=>{
        async function init(){
            alert("Bluetooth ativado!");
            const lista= [
                {
                    name:'Dispositivo 1',
                    key:'1'
                },
                {
                    name:'Dispositivo 2',
                    key:'2'
        
                }
            ]

            const enable=true;
            setLista(lista);
            setbolEnable(enable);
        }
        init();

    },[])



    
    const renderEmpty=()=> <Empty text='Não Há dispositivos'/>;
    const renderItem=({item})=>{
        return <Device{...item} iconLeft={require('../icones/img_laptop.png')} iconRight={require('../icones/img_settings.png')}/>
    };

    const toggleBluetooth=value=>{
        if(value){
            return enableBluetooth();
        }
        return disableBluetooth();
        

    };
    const enableBluetooth= async()=>{
        alert("Bluetooth ativado!");
        const lista= [
            {
                name:'Dispositivo 1',
                key:'1'
            },
            {
                name:'Dispositivo 2',
                key:'2'
    
            }
        ]

        setLista(lista);
        setbolEnable(true);
  
    };

    const disableBluetooth= async()=>{
        alert("Bluetooth desativado!");
        setLista();
        setbolEnable(false);
      
    };
   
    return(
        <Layout title='Bluetooth'>
            <Toggle value={bolEnable} onValueChange={toggleBluetooth}/>
            <Subtitle title='Lista de dispositivos'/>
        <FlatList
        data={lista}
        ListEmptyComponent={renderEmpty}
        renderItem={renderItem}     
        />
      </Layout>
    );
}




export default BluetoothLayout
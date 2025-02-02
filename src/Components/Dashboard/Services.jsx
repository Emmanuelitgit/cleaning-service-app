import React from 'react'
import { View, StyleSheet, Text, TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { SIZES } from '../../Constants/Theme';
import ServicesTable from "./ServicesTable"
import Search from '../Dashboard/Search';
import DashboardIncomeHeader from "../../Components/Dashboard/DashboardIncomeHeader"

const Services = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.itemsContainer}>
       <DashboardIncomeHeader/>
       <Search/>
       <ServicesTable/>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    itemsContainer:{
        paddingTop:SIZES.height*0.01,
    },
})
export default Services;
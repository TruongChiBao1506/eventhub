import { View, Text } from 'react-native'
import React from 'react'

const SearchEvents = ({navagation,route}:any) => {
  const {isFilter}: {isFilter: boolean} = route.params;
  console.log(isFilter);
  
  return (
    <View>
      <Text>SearchEvents</Text>
    </View>
  )
}

export default SearchEvents
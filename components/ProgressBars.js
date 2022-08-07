import React from 'react'
import { Text, View } from 'react-native'
import { stats } from '../assets/colors'

const Progress = ({ step, stat, height }) => {
    return (
        <>
            <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 8, width: 30 }}>{step}</Text>
            <View style={{
                height,
                backgroundColor: 'rgba(0,0,0,0.1)',
                borderTopEndRadiusRadius: height,
                borderTopRightRadius: height,
                overflow: 'hidden',
                width: 110,
                alignSelf: 'center',
            }}>
                <View style={{
                    height,
                    width: step,
                    borderTopEndRadiusRadius: height,
                    borderTopRightRadius: height,
                    backgroundColor: stats[stat],
                    overflow: 'hidden',
                    position: 'absolute',
                    left: 0,
                    top: 0
                }}></View>
            </View>
        </>
    )
}
export default Progress
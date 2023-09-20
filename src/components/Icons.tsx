import React from 'react'
import type { PropsWithChildren } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
type IconsProps=PropsWithChildren<{
    name:string;
}>
 const Icons=({name}:IconsProps)=> {

    switch (name) {
        case 'circle':
            return <Icon name="circle-thin" size={22} color="black"/>
            break;
        case 'cross':
            return <Icon name="times" size={22} color="black"/>
            break;
    
        default:
            return <Icon name='pencil' size={22} color="black"/>
            break;
    }
  
}
export default Icons
import { useDispatch } from 'react-redux'

import { ATTRIBUTE_LIST } from '../consts';
import { useAppSelector } from '../hooks/utils';
import { decrementAttribute,incrementAttribute } from "../reducers/stats"
import { getAttributeModifierValue } from '../utils';

interface AttributeTextProps {
    name: string
    val: number
    modifierVal?: number
    modifierName?: string
    onIncrementHandler: any
    onDecrementHandler: any

}

function AttributeText({ name, val, modifierVal, onDecrementHandler, onIncrementHandler }: AttributeTextProps) {

    return (
        <div>
            {name}: {val} (Modifier: {modifierVal})
            <button onClick={onIncrementHandler}>+</button>
            <button onClick={onDecrementHandler}>-</button>
        </div>
    )

}


interface AttributeBlockProps {
    name: string
}

export default function AttributeBlock({ name }: AttributeBlockProps) {

    const characterState = useAppSelector((state) => state.characters);
    const characters = characterState.data;
    const dispatch = useDispatch();


    return (
        <div className="block">
            <div>ATTRIBUTES</div>
            {
                ATTRIBUTE_LIST.map((attr, index) => {
                    return (<AttributeText
                        key={index}
                        name={attr}
                        val={characters[name].attributes[attr]}
                        modifierVal={getAttributeModifierValue(characters[name].attributes[attr])}
                        onDecrementHandler={() => {
                            dispatch(decrementAttribute({ character: name, attribute: attr }))
                        }}
                        onIncrementHandler={() => {
                            dispatch(incrementAttribute({ character: name, attribute: attr }))
                        }} />)
                })
            }
        </div>
    )
}

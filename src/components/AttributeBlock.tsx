import { useDispatch } from 'react-redux'

import { ATTRIBUTE_LIST } from '../consts';
import { useAppSelector } from '../hooks/utils';
import { decrementAttribute, incrementAttribute } from "../reducers/game"
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
        <div className="input-group mb-3 minus-buttons-group">
            <span>{name}(Modifier: {modifierVal})</span>
            <div className="btn-group plus-minus-buttons" role="group" aria-label="Update Attribute value">
                <button type="button" className="btn btn-secondary btn-sm" onClick={onIncrementHandler}>+</button>
                <span className="total-value">{val}</span>
                <button type="button" className="btn btn-secondary btn-sm" onClick={onDecrementHandler}>-</button>
            </div>
        </div>
    )

}


interface AttributeBlockProps {
    name: string
}

export default function AttributeBlock({ name }: AttributeBlockProps) {

    const characterState = useAppSelector((state) => state.game);
    const characters = characterState.data;
    const dispatch = useDispatch();


    return (
        <div className="col attribute-item">
            <div className="title">ATTRIBUTES</div>
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

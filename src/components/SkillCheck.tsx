import { useState } from 'react';
import Select from 'react-select';

import { SKILL_LIST } from '../consts';
import { useAppDispatch } from '../hooks/utils';
import { rollDiceForCharacter } from '../reducers/game';


const skillOptions = SKILL_LIST.map((skill) => {
    return { value: skill.name, label: skill.name }
})


interface ISkillCheckProps {
    charName: string
}

export default function SkillCheck({charName}: ISkillCheckProps) {

    const dispatch = useAppDispatch();

    const [dcValue, setDCValue] = useState(1);

    const [choice, setUserChoice] =  useState(skillOptions[0])
    
    //@ts-expect-error Looking into typing 
    function handleChoiceUpdate(option){
        setUserChoice(option)
    }

    return (
        <div className="container">
            <div className="form-inline">
                <div className="form-group mb-2">

                    <Select
                        name='skill'
                        defaultValue={choice}
                        isSearchable={false}
                        onChange={handleChoiceUpdate}
                        options={skillOptions} />

                    
                </div>
                <div className="form-group mx-sm-3 mb-2">
                    <input type="number" value={dcValue} onChange={(evt)=>{ setDCValue(parseInt(evt.target.value))}} className="form-control" placeholder="Please enter a number"/>
                </div>

                <button className="btn btn-secondary btn-sm" 
                onClick={()=>{ dispatch(rollDiceForCharacter({ character: charName, dcValue: dcValue,
                skill: choice.value }))}}>Roll</button>

            </div>

        </div>
    )

}

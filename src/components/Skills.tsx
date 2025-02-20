import { useDispatch } from 'react-redux'

import { SKILL_LIST } from '../consts';
import { useAppSelector } from '../hooks/utils';
import { decrementSkill, incrementSkill } from '../reducers/game';
import { getAttributeModifierValue } from '../utils';

interface SkillTextProps {
    name: string
    val: number
    modifierName: string
    modifierVal: number
    totalVal: number
    onIncrementHandler: () => void
    onDecrementHandler: () => void
}

function SkillText({ name, val, modifierName, modifierVal, totalVal, onDecrementHandler, onIncrementHandler }: SkillTextProps) {

    return (
        <div className='input-group mb-3'>
            <span>{name}: {val} (Modifier: {modifierName}): {modifierVal}</span>
            <div className="btn-group" role="group" aria-label="Basic example">
                <button className="btn btn-secondary btn-sm" onClick={onIncrementHandler}>+</button>
                <button className="btn btn-secondary btn-sm" onClick={onDecrementHandler}>-</button>
            </div>
            <span>total: {totalVal}</span>
        </div>
    )

}

interface SKillsBlockProps {
    charName: string
}

export default function SkillSBlock({ charName }: SKillsBlockProps) {
    const characterState = useAppSelector((state) => state.game);
    const dispatch = useDispatch();
    const characters = characterState.data;
    const currentCharacterSKill = characters[charName].skills;

    function getSkillPoint(): number {
        return 10 + (4 * getAttributeModifierValue(characters[charName].attributes.Intelligence))
    }

    return (
        <div className="col">
            <div>SKILLS</div>
            <div>Total skill points available: {getSkillPoint()}</div>
            {
                SKILL_LIST.map((skill, index) => {
                    const modifierVal = getAttributeModifierValue(characters[charName].attributes[skill.attributeModifier])
                    const totalVal = currentCharacterSKill[skill.name] + modifierVal
                    return (
                        <SkillText
                            key={index}
                            name={skill.name}
                            val={currentCharacterSKill[skill.name]}
                            onIncrementHandler={() => {
                                dispatch(incrementSkill({ character: charName, skill: skill.name }))
                            }}
                            onDecrementHandler={() => {
                                dispatch(decrementSkill({ character: charName, skill: skill.name }))
                            }
                            }
                            modifierVal={modifierVal}
                            totalVal={totalVal}
                            modifierName={skill.attributeModifier} />
                    )
                })
            }
        </div>
    )
}

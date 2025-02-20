import { useState } from 'react';

import { CLASS_LIST } from '../consts';
import { useAppDispatch } from '../hooks/utils';
import { saveCharacter } from '../reducers/stats';
import { type Class } from '../types';

import AttributeBlock from "./AttributeBlock";
import ClassBlock from "./ClassBlock";
import RequirementBlock from './Requirement';
import SkillSBlock from './Skills';

interface CharacterBlockProps {
    characterName: string
}

export default function CharacterWidget({ characterName }: CharacterBlockProps) {
    const [showRequirement, setShowRequirement] = useState<boolean>(false)
    const [course, setCurrentCourse] = useState<Class>("Barbarian");

    const dispatch = useAppDispatch();

    console.log("current course", course)

    // Update a specific item's count
    function handleCourseSelection(course: Class) {
        setCurrentCourse(course)
        setShowRequirement(true)
    }

    return (
        <>
            <div className='row'>Character: {characterName}</div>
            <button onClick={() => { dispatch(saveCharacter())}}>Save Character</button>
            <br />
            <div className='row'>
                <div className='row'>
                    <AttributeBlock name={characterName} />
                    <ClassBlock characterName={characterName} course={course} onClassTextClick={(courseName) => { handleCourseSelection(courseName) }} />
                    {showRequirement && <RequirementBlock reqData={CLASS_LIST[course]} onCloseHandler={() => { setShowRequirement(!showRequirement) }} />}
                    <SkillSBlock charName={characterName} />
                </div>
            </div>
        </>

    )

}

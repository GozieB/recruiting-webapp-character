import { useState } from 'react';

import { CLASS_LIST } from '../consts';
import { type Class } from '../types';

import AttributeBlock from "./AttributeBlock";
import ClassBlock from "./ClassBlock";
import RequirementBlock from './Requirement';
import SkillCheck from './SkillCheck';
import SkillSBlock from './Skills';

interface CharacterBlockProps {
    characterName: string
}

export default function CharacterWidget({ characterName }: CharacterBlockProps) {
    const [showRequirement, setShowRequirement] = useState<boolean>(false)
    const [course, setCurrentCourse] = useState<Class>("Barbarian");

    // Update a specific item's count
    function handleCourseSelection(course: Class) {
        setCurrentCourse(course)
        setShowRequirement(true)
    }

    return (
        <div className="row text-center">
            <div>Character: {characterName}</div>
            <SkillCheck charName={characterName}/>
            <div className='row'>
                    <AttributeBlock name={characterName} />
                    <ClassBlock characterName={characterName} course={course} onClassTextClick={(courseName) => { handleCourseSelection(courseName) }} />
                    {showRequirement && <RequirementBlock reqData={CLASS_LIST[course]} onCloseHandler={() => { setShowRequirement(!showRequirement) }} />}
                    <SkillSBlock charName={characterName} />
            </div>
        </div>
    )

}

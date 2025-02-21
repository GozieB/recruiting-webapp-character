import { ATTRIBUTE_LIST, CLASS_LIST } from '../consts';
import { useAppSelector } from '../hooks/utils';
import { type Class } from '../types';

interface ClassBlockProps {
    course: Class,
    characterName: string,
    onClassTextClick: (course: Class) => void

}

export default function ClassBlock({ characterName, course, onClassTextClick }: ClassBlockProps) {

    const characterState = useAppSelector((state) => state.game);
    const characters = characterState.data;
    const courses = Object.keys(CLASS_LIST) as Class[]

    function isRequirementMet(course: Class): boolean {
        let isRequirementMet = true
        for (const attribute of ATTRIBUTE_LIST) {
            if (characters[characterName].attributes[attribute] < CLASS_LIST[course][attribute]) {
                isRequirementMet = false
                break
            }
        }
        return isRequirementMet
    }

    return (
        <div className="col">
            <div>CLASSES</div>
            {
                courses.map((key, index) => {
                    return (
                        <div className={(course === key) ? "green" : ""} key={index} onClick={() => { onClassTextClick(key) }}>
                            {key} {(isRequirementMet(key)) && <>&#x2713;</>}
                        </div>)
                })
            }
        </div>)
}

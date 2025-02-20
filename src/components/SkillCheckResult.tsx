import { useAppSelector } from "../hooks/utils";

export default function SkillCheckResult() {

    const gameState = useAppSelector((state) => state.game);

    function computeResult(){
        if (typeof gameState.result.score !== "number" || typeof gameState.result.dcValue !== "number" || typeof gameState.result.name !== "string"){
            return ""
        }
        const totalSkill = Object
        .values(gameState.data[gameState.result.name].skills)
        .reduce((acc: number, y: number) => { return acc + y });


        return (  totalSkill + gameState.result.score >= gameState.result.dcValue) ? "Success" : "Failed";
    }

    return (
        <div className="card">
            <div className="card-body">
                <div>
                    Character: {gameState.result.name}
                </div>
                <div>
                    Skill: {gameState.result.skill}
                </div>
                <div>
                    You Rolled: {gameState.result.score}
                </div>
                <div>
                    The DC was {gameState.result.dcValue}
                </div>
                <div>
                    Result: {computeResult()}
                </div>
                

            </div>

        </div>)

}

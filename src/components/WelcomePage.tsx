import { useEffect } from "react"

import { useAppDispatch, useAppSelector } from '../hooks/utils';
import { fetchCharactersWithStats, saveCharacter, toggleResultScreen } from '../reducers/game';

import CharacterWidget from './CharacterWidgetSection';
import SkillCheckResult from "./SkillCheckResult";


export default function WelcomePage() {

    const dispatch = useAppDispatch();
    const gameState = useAppSelector((state) => state.game);
    const isLoading = gameState.status === "loading";
    const characters = gameState.data;

    useEffect(() => {
        dispatch(fetchCharactersWithStats());
    }, [dispatch])


    if (isLoading) {
        return (<div>Loading....</div>)
    }


    return (
        <div className="App">
            <header className="App-header">
                <h1>React Coding Exercise</h1>
            </header>
            <section className="App-section">
                <div className="container">
                    <div className="btn-group action-btn">
                        <button className="btn btn-secondary btn-sm" onClick={() => { dispatch(saveCharacter()) }}>Save All Character</button>
                        <button className="btn btn-secondary btn-sm toggle-btn" onClick={()=>{ dispatch(toggleResultScreen())}}>Toggle Skilll Check Result</button>
                    </div>

                </div>
                {(gameState.showResult) && <SkillCheckResult />}
                <div className="container">
                    {
                        Object.keys(characters).map((character, index) => {
                            return (<CharacterWidget key={index} characterName={character} />)
                        })
                    }
                </div>

            </section>
        </div>)
}

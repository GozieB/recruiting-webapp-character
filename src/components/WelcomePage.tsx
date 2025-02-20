import { useEffect } from "react"

import { useAppDispatch, useAppSelector } from '../hooks/utils';
import { fetchCharactersWithStats } from '../reducers/stats';

import CharacterWidget from './CharacterWidgetSection';


export default function WelcomePage () {

    const dispatch = useAppDispatch();
    const characterState = useAppSelector((state) => state.characters);
    const isLoading = characterState.status === "loading";
    const characters = characterState.data;

    useEffect(() => {
        dispatch(fetchCharactersWithStats());
    }, [dispatch])


    if (isLoading){
        return (<div>Loading....</div>)
    }


    return (
        <div className="App">
            <header className="App-header">
                <h1>React Coding Exercise</h1>
            </header>
            <section className="App-section">
                {
                    Object.keys(characters).map((character, index) => {
                        return (<CharacterWidget key={index} characterName={character} />)
                    })
                }
            </section>
        </div>)
}
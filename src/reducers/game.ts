import type { PayloadAction } from '@reduxjs/toolkit'
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

import { MAX_ATTRIBUTE } from '../consts';
import { RootState } from '../store';
import type { Attributes } from "../types";
import { getAttributeModifierValue } from '../utils';


const USER = `gozieb`
const MAX_NUM =  20;
const MIN_NUM = 1;

export const fetchCharactersWithStats = createAsyncThunk("fetchCharacterWithStats",
    async () => {
        const url = `https://recruiting.verylongdomaintotestwith.ca/api/${USER}/character`
        const axiosConfig = {
            headers: {
                'content-type': 'application/json',
            }
        }
        const response = await axios
            .get(url, axiosConfig)

        return response.data.body

    }

)

export const saveCharacter = createAsyncThunk("saveCharacter",
    async (_, thunkApi) => {
        const url = `https://recruiting.verylongdomaintotestwith.ca/api/${USER}/character`
        const axiosConfig = {
            headers: {
                'content-type': 'application/json',
            }
        }
        const state =  thunkApi.getState() as RootState;
        const data  = state.game.data
        await axios.post(url, data,  axiosConfig)

    }

)

interface CharactersState {
    status: 'idle' | 'loading' | "succeeded" | "failed"
    data: Record<string, {
            attributes: Attributes
            skills: Record<string, number>
        }>
    error?: string
    showResult: boolean,
    result : {
        name?: string
        score?: number
        skill?: string
        dcValue?: number
    }
}

const initialState = {
    data: {},
    status: "idle",
    result: {},
    showResult: false

} satisfies CharactersState as CharactersState

interface IAttributeAction {
    character: string
    attribute: keyof Attributes
}

interface ISkillAction {
    character: string
    skill: string
}
interface IRolDiceAction {
    character: string
    skill: string
    dcValue: number
}

const characterSlice = createSlice({
    name: "characters",
    initialState: initialState,
    reducers: {
        toggleResultScreen: (state) => {
            state.showResult = !state.showResult
        },
        rollDiceForCharacter: (state, action: PayloadAction<IRolDiceAction>) => {
            // Update current character and update the score
            state.result.name = action.payload.character
            state.result.score = Math.floor(Math.random() * (MAX_NUM - MIN_NUM + 1)) + MIN_NUM
            state.result.skill = action.payload.skill
            state.result.dcValue = action.payload.dcValue
            state.showResult = true
        },
        incrementAttribute: (state, action: PayloadAction<IAttributeAction>) => {
            const totalAttribute = Object
                .values(state.data[action.payload.character].attributes)
                .reduce((acc: number, y: number) => { return acc + y });
            if (totalAttribute === MAX_ATTRIBUTE) {
                alert("We've reached maximum number of attribute")
                return state
            }
            state.data[action.payload.character]["attributes"] = {
                ...state.data[action.payload.character].attributes,
                [action.payload.attribute]: state.data[action.payload.character].attributes[action.payload.attribute] + 1
            }

        },
        decrementAttribute: (state, action: PayloadAction<IAttributeAction>) => {

            state.data[action.payload.character].attributes = {
                ...state.data[action.payload.character].attributes,
                [action.payload.attribute]: state.data[action.payload.character].attributes[action.payload.attribute] - 1
            }

        },
        decrementSkill: (state, action: PayloadAction<ISkillAction>) => {

            state.data[action.payload.character].skills = {
                ...state.data[action.payload.character].skills,
                [action.payload.skill]: state.data[action.payload.character].skills[action.payload.skill] - 1
            }

        },
        incrementSkill: (state, action: PayloadAction<ISkillAction>) => {

            const totalSkill = Object
                .values(state.data[action.payload.character].skills)
                .reduce((acc: number, y: number) => { return acc + y });

            const maxSKill = 10 + (4 * getAttributeModifierValue(state.data[action.payload.character].attributes.Intelligence))

            if (totalSkill === maxSKill) {
                alert("You've reached the maximum number of skill!")
                return state
            }

            state.data[action.payload.character].skills = {
                ...state.data[action.payload.character].skills,
                [action.payload.skill]: state.data[action.payload.character].skills[action.payload.skill] + 1
            }

        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCharactersWithStats.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchCharactersWithStats.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload;
            })
            .addCase(fetchCharactersWithStats.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(saveCharacter.pending, (state) => {
                state.status = "loading";
            })
            .addCase(saveCharacter.fulfilled, (state) => {
                state.status = "succeeded";
            })
            .addCase(saveCharacter.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
})

export default characterSlice.reducer;
export const { incrementAttribute, decrementAttribute, decrementSkill, incrementSkill, rollDiceForCharacter, toggleResultScreen } = characterSlice.actions;

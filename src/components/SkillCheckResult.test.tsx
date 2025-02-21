import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { render, screen, waitFor } from '@testing-library/react';

import SkillCheckResult from './SkillCheckResult';
import {store} from "../store"

test('Skill Check', async () => {
    render(
        <Provider store={store}  >
            <SkillCheckResult />
        </Provider>
    );
    await waitFor(() => {
        const divElementWithAttributeText = screen.getByText(/Please roll dice for character to see result/i);
        expect(divElementWithAttributeText).toBeInTheDocument();
    });
});

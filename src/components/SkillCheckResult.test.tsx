import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { render, screen, waitFor } from '@testing-library/react';

import SkillCheckResult from './SkillCheckResult';

test.skip('Skill Check', async () => {
    const mockStore = configureStore({ reducer: {}})
    render(
        <Provider store={mockStore}  >
            <SkillCheckResult />
        </Provider>

    );
    await waitFor(() => {
        const divElementWithAttributeText = screen.getByText(/Strength/i);
        expect(divElementWithAttributeText).toBeInTheDocument();
    })

});

import { render, screen, waitFor } from '@testing-library/react';

import SkillCheckResult from './SkillCheckResult';

test.skip('renders learn react link', async () => {
    render(<SkillCheckResult/>);
    await waitFor(() => {
        const divElementWithAttributeText = screen.getByText(/Strength/i);
        expect(divElementWithAttributeText).toBeInTheDocument();
    })

});

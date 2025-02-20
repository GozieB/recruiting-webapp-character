import { render, screen, waitFor } from '@testing-library/react';

import Requirement from './Requirement';

test('renders learn react link', async () => {
    const dataToRender = {
        "Strength": 0,
        "Dexterity": 0,
        "Constitution": 0,
        'Intelligence': 0,
        'Wisdom': 0,
        'Charisma': 0,
    };

    render(<Requirement reqData={dataToRender} onCloseHandler={jest.fn} />);
    await waitFor(() => {
        const divElementWithAttributeText = screen.getByText(/Strength/i);
        expect(divElementWithAttributeText).toBeInTheDocument();
    })

});

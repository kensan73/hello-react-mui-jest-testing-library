import { render, screen } from "@testing-library/react"
import { MyForm } from "../src/MyForm"

describe('MyForm', () => {
    it('has a header', () => {
        render(<MyForm />);

        expect(screen.getByText(/hi world/i)).toBeInTheDocument();
    })
})
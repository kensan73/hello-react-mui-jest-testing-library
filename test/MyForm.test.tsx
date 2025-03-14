import { render, screen } from "@testing-library/react"
import { MyForm } from "../src/MyForm"
import { reservationExperience, tableB1, tableD1 } from "./testFixtures";

describe('MyForm', () => {
    it('has a header', () => {
        render(<MyForm effectiveHoursToTableInfo={new Map()} initialTableSelection={[]} />);

        expect(screen.getByText(/hi world/i)).toBeInTheDocument();
    })

    describe('toggle button group', () => {
        it('has toggle buttons for experience, table sizing, and online availability', () => {
            render(<MyForm effectiveHoursToTableInfo={new Map()} initialTableSelection={[]} />);

            expect(screen.getByRole('button', { name: /experience/i })).toBeInTheDocument();
            expect(screen.getByRole('button', { name: /table sizing/i })).toBeInTheDocument();
            expect(screen.getByRole('button', { name: /online/i })).toBeInTheDocument();
        })

        it('experience by default is active', () => {
            render(<MyForm effectiveHoursToTableInfo={new Map()} initialTableSelection={[]} />);

            expect(screen.getByRole('button', { name: /experiences/i })).toHaveAttribute('aria-pressed', 'true');
        })
    })


    describe('tabs', () => {
        it('has by experience and by room tabs', () => {
            render(<MyForm effectiveHoursToTableInfo={new Map()} initialTableSelection={[]} />);

            expect(screen.getByRole('tab', { name: /by experience/i })).toBeInTheDocument();
            expect(screen.getByRole('tab', { name: /by room/i })).toBeInTheDocument();
        })

        it('has by experience selected by default', () => {
            render(<MyForm effectiveHoursToTableInfo={new Map()} initialTableSelection={[]} />);

            expect(screen.getByRole('tab', { name: /by experience/i })).toHaveAttribute('aria-selected', 'true');
            expect(screen.getByRole('tab', { name: /by room/i })).toHaveAttribute('aria-selected', 'false');
        })

        // TODO: can switch tabs
    })

    describe('table selection', () => {
        it('no initial tables results in no table options', async () => {
            render(<MyForm effectiveHoursToTableInfo={new Map()} initialTableSelection={[]} />);

            expect(screen.queryAllByRole('checkbox')).toHaveLength(0);
        })

        it('pass in 1 selected table, empty initial selection, table is not selected', () => {
            render(<MyForm effectiveHoursToTableInfo={new Map([[60, [tableD1]]])} initialTableSelection={[]} />);

            expect(screen.getAllByRole('checkbox')).toHaveLength(1);
            expect(screen.getByRole('checkbox')).not.toBeChecked();
        })

        it('pass in 1 selected table, table is selected', () => {
            render(<MyForm effectiveHoursToTableInfo={new Map([[60, [tableD1]]])} initialTableSelection={[tableD1.id]} />);

            expect(screen.getAllByRole('checkbox')).toHaveLength(1);
            expect(screen.getByRole('checkbox')).toBeChecked();
        })

        it('pass in 2 selected tables, just 1 initial selection, 1 table is selected', () => {
            render(<MyForm effectiveHoursToTableInfo={new Map([[60, [tableD1, tableB1]]])} initialTableSelection={[tableD1.id]} />);

            expect(screen.getAllByRole('checkbox')).toHaveLength(2);
            expect(screen.getByLabelText('D1')).toBeChecked();
            expect(screen.getByLabelText('B1')).not.toBeChecked();
        })
    })
})
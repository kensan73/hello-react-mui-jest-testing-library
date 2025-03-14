import { render, screen } from "@testing-library/react"
import { MyForm } from "../src/MyForm"
import { myExperience, tableA1, tableT1 } from "./testFixtures";

describe('MyForm', () => {
    it('has a header', () => {
        render(<MyForm effectiveHoursToTableInfo={new Map()} initialTableSelection={[]} />);

        expect(screen.getByText(/hi world/i)).toBeInTheDocument();
    })

    describe('table selection', () => {
        it('no initial tables results in no table options', async () => {
            render(<MyForm effectiveHoursToTableInfo={new Map()} initialTableSelection={[]} />);

            expect(screen.queryAllByRole('checkbox')).toHaveLength(0);
        })

        it('pass in 1 selected table, empty initial selection, table is not selected', () => {
            render(<MyForm effectiveHoursToTableInfo={new Map([[60, [tableT1]]])} initialTableSelection={[]} />);

            expect(screen.getAllByRole('checkbox')).toHaveLength(1);
            expect(screen.getByRole('checkbox')).not.toBeChecked();
        })

        it('pass in 1 selected table, table is selected', () => {
            render(<MyForm effectiveHoursToTableInfo={new Map([[60, [tableT1]]])} initialTableSelection={[tableT1.id]} />);

            expect(screen.getAllByRole('checkbox')).toHaveLength(1);
            expect(screen.getByRole('checkbox')).toBeChecked();
        })

        it('pass in 2 selected tables, just 1 initial selection, 1 table is selected', () => {
            render(<MyForm effectiveHoursToTableInfo={new Map([[60, [tableT1, tableA1]]])} initialTableSelection={[tableT1.id]} />);

            expect(screen.getAllByRole('checkbox')).toHaveLength(2);
            expect(screen.getByLabelText('T1')).toBeChecked();
            expect(screen.getByLabelText('A1')).not.toBeChecked();
        })
    })
})
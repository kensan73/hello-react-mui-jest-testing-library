import React from 'react';
import ReactDOM from 'react-dom';
import { MyForm } from './MyForm';
import { tableT1, tableA1 } from '../test/testFixtures';

ReactDOM.render(<MyForm effectiveHoursToTableInfo={new Map([[60, [tableT1, tableA1]]])} initialTableSelection={[tableT1.id]} />, document.getElementById('root'));

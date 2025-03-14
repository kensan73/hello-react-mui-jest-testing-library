import React from 'react';
import ReactDOM from 'react-dom';
import { MyForm } from './MyForm';
import { tableD1, tableB1 } from '../test/testFixtures';

ReactDOM.render(<MyForm effectiveHoursToTableInfo={new Map([[60, [tableD1, tableB1]]])} initialTableSelection={[tableD1.id]} />, document.getElementById('root'));

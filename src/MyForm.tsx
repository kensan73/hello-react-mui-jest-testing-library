import { Typography } from "@material-ui/core";
import * as React from "react";
import { Field, Form, Formik, FormikHelpers, FormikValues } from "formik";

type ExperienceInfo = {
    id: string;
    name: string;
}

type TableInfo = {
    id: string;
    name: string;
    experiences: ExperienceInfo[]
}

type EffectiveHours = number;
type TableId = string;

type OwnProps = {
    effectiveHoursToTableInfo: Map<EffectiveHours, TableInfo[]>;
    initialTableSelection: TableId[];
}

type FormikProps = {
    selectedTables: TableId[],
    tablesForSelection: TableInfo[]
}

export const MyForm: React.FC<OwnProps> = ({ initialTableSelection, effectiveHoursToTableInfo }) => {
    const tablesForSelection: TableInfo[] = [];
    [...effectiveHoursToTableInfo.entries()].forEach(([effectiveHoursKey, tableInfos]) => {
        tableInfos.forEach((tableInfo) => tablesForSelection.push(tableInfo))
    })
    return (
        <Formik<FormikProps> initialValues={{ selectedTables: initialTableSelection, tablesForSelection }} onSubmit={() => Promise.resolve()}>
            {({ values }) => {
                return <Form>
                    <Typography>hi world</Typography>
                    {values.tablesForSelection.map((tableInfo) => (
                        <Field type="checkbox" name="selectedTables" value={`${tableInfo.id}`} key={`checkbox-${tableInfo.id}`} />))}
                </Form>
            }}
        </Formik>);
}
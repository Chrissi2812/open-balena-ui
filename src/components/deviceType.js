import * as React from "react";
import {
    Create,
    Edit,
    TextField,
    Datagrid,
    ReferenceField,
    ChipField,
    List,
    SimpleForm,
    TextInput,
    EditButton,
    DeleteButton,
    Toolbar,
    ReferenceInput,
    SelectInput,
    required,
} from 'react-admin';
import versions from '../versions'
import { useCreateDeviceType } from '../lib/deviceType'

const DeviceTypeTitle = ({ record }) => {
    return <span>Device Type {record ? `"${record.name}"` : ''}</span>;
};

const deviceTypeAlias = versions.resource("deviceTypeAlias", window.balenaConfig.REACT_APP_OPEN_BALENA_API_VERSION);

export const DeviceTypeList = props => {
    return (
        <List {...props}>
            <Datagrid>
                <TextField source="id"/>
                <TextField label="Slug" source="slug"/>
                <TextField label="Name" source="name"/>
                <ReferenceField label="CPU Architecture" source="is of-cpu architecture" reference="cpu architecture" target="id">
                    <ChipField source="slug"/>
                </ReferenceField>
                {deviceTypeAlias ? 
                <ReferenceField label="Alias" source="id" reference={deviceTypeAlias} target="device type">
                    <ChipField source="is referenced by-alias"/>
                </ReferenceField>
                : <></>
                }
                <ReferenceField label="Device Family" source="belongs to-device family" reference="device family" target="id">
                    <ChipField source="slug"/>
                </ReferenceField>
                <Toolbar style={{minHeight: 0, minWidth: 0, padding:0, margin:0, background: 0, textAlign: "center"}}>
                    <EditButton label="" color="default"/>
                    <DeleteButton label="" style={{color: "black"}} size="medium"/>
                </Toolbar>
            </Datagrid>
        </List>
    )
};

export const DeviceTypeCreate = props => {

    const createDeviceType = useCreateDeviceType();

    return (
        <Create transform={createDeviceType} {...props}>
            <SimpleForm redirect="list">
                <TextInput source="slug"/>
                <TextInput source="name"/>
                <ReferenceInput label="CPU Architecture" source="is of-cpu architecture" reference="cpu architecture" target="id" perPage={1000} sort={{field: "slug", order: "ASC"}} validate={required()}>
                    <SelectInput optionText="slug" optionValue="id"/>
                </ReferenceInput>
                <ReferenceInput label="Device Family" source="belongs to-device family" reference="device family" target="id" perPage={1000} sort={{field: "slug", order: "ASC"}} allowEmpty>
                    <SelectInput optionText="slug" optionValue="id"/>
                </ReferenceInput>
            </SimpleForm>
        </Create>
    );
}

export const DeviceTypeEdit = props => (
    <Edit title={<DeviceTypeTitle />} {...props}>
        <SimpleForm>
            <TextInput disabled source="id"/>
            <TextInput source="slug"/>
            <TextInput source="name"/>
            <ReferenceInput label="CPU Architecture" source="is of-cpu architecture" reference="cpu architecture" target="id" perPage={1000} sort={{field: "slug", order: "ASC"}} validate={required()}>
                <SelectInput optionText="slug" optionValue="id"/>
            </ReferenceInput>
            <ReferenceInput label="Device Family" source="belongs to-device family" reference="device family" target="id" perPage={1000} sort={{field: "slug", order: "ASC"}} allowEmpty>
                <SelectInput optionText="slug" optionValue="id"/>
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);

const deviceType = {
    list: DeviceTypeList,
    create: DeviceTypeCreate,
    edit: DeviceTypeEdit
}

export default deviceType;
